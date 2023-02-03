import { mongoHelper } from "../../../src/infra/db/connection";
import { AccountRepository } from "../../../src/infra/db/repositories/account-repository";
import { config } from "dotenv";
import { accountModel } from "../../../src/infra/db/schemas/account.schema";
config();
describe("Account repository", () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL);
  });
  afterAll(async () => {
    await mongoHelper.close();
  });
  afterEach(async () => {
    await accountModel.deleteMany();
  });
  const makeSut = () => {
    return {
      sut: new AccountRepository(),
    };
  };
  test("find method should call fidnOne with correct values", async () => {
    const { sut } = makeSut();
    const spy = jest.spyOn(accountModel, "findOne");
    await sut.find("any_username");
    expect(spy).toHaveBeenCalledWith({ username: "any_username" });
  });
  test("find method should return an account if exist", async () => {
    const { sut } = makeSut();
    const accountToFind = await accountModel.create({
      username: "any_username",
      password: "any_hashed_password",
    });
    const account = await sut.find("any_username");
    expect(account._id).toEqual(accountToFind._id);
  });
  test("find method should return null if account does not exist", async () => {
    const { sut } = makeSut();
    const account = await sut.find("any_username");
    expect(account).toEqual(null);
  });
});
