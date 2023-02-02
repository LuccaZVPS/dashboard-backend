import { config } from "dotenv";
import { mongoHelper } from "../../../src/infra/db/connection";
import { ClientRepository } from "../../../src/infra/db/repositories/client-repository";
import { clientModel } from "../../../src/infra/db/schemas/client.schema";

config();

describe("Client repository", () => {
  const DTOMock = {
    name: "any_name",
    email: "any_email",
    instagram: "any_instagram",
    observations: "any_observations",
    aquisitions: "any_aquisitions",
    indication: "any_indication",
    addres: "any_adress",
    number: "any_number",
  };
  beforeAll(() => {
    mongoHelper.connect(process.env.MONGO_URL);
  });
  afterAll(() => {
    mongoHelper.close();
  });
  afterEach(async () => {
    await clientModel.deleteMany();
  });
  const makeSut = () => {
    return {
      sut: new ClientRepository(),
    };
  };
  test("Create method should save a client", async () => {
    const { sut } = makeSut();
    const response = await sut.create(DTOMock);
    const isSaved = await clientModel.findOne({ _id: response._id });
    expect(isSaved).toBeTruthy();
  });
  test("create method should throws if mongo throws", async () => {
    const { sut } = makeSut();
    jest.spyOn(clientModel, "create").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(async () => {
      await sut.create(DTOMock);
    }).rejects.toThrow(new Error());
  });

  test("get method should list all clients ", async () => {
    const { sut } = makeSut();
    await clientModel.create(DTOMock);
    await clientModel.create(DTOMock);
    const clients = await sut.get();
    expect(clients.length).toBe(2);
    expect(clients[0]._id).toBeTruthy();
    expect(clients[1]._id).toBeTruthy();
  });
  test("get method should throws if mongo throws", async () => {
    const { sut } = makeSut();
    jest.spyOn(clientModel, "find").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(async () => {
      await sut.get();
    }).rejects.toThrow(new Error());
  });
  test("delete method should delete a client ", async () => {
    const { sut } = makeSut();
    const clientToDelete = await clientModel.create(DTOMock);
    const isDeleted = await sut.delete(clientToDelete._id as unknown as string);
    expect(isDeleted).toBe(true);
    const clients = await sut.get();
    expect(clients.length).toBe(0);
  });
});
