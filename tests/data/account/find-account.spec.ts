import { DecryptHash } from "../../../src/data/protocols/account/decrypt";
import { FindAccountRepository } from "../../../src/data/protocols/account/find-account-repository";
import { FindAccount } from "../../../src/data/useCases/account/find-client";
import { Account } from "../../../src/domain/account";

describe("Find Account use case", () => {
  const makeBcryptAdapter = () => {
    class DecryptStub implements DecryptHash {
      async decrypt(string: string): Promise<string> {
        return "correct_password";
      }
    }
    return new DecryptStub();
  };
  const makeFindAccountRepositoryStub = () => {
    class FindAccountRepositoryStub implements FindAccountRepository {
      async find(_id: string): Promise<Account> {
        return {
          username: "any_username",
          password: "any_hashed_password",
          _id: "any_id",
        };
      }
    }
    return new FindAccountRepositoryStub();
  };
  const makeSut = () => {
    const findAccountRepositoryStub = makeFindAccountRepositoryStub();
    const bcryptAdapter = makeBcryptAdapter();
    return {
      findAccountRepositoryStub,
      bcryptAdapter,
      sut: new FindAccount(findAccountRepositoryStub, bcryptAdapter),
    };
  };
  test("should call find method with correct value", async () => {
    const { sut, findAccountRepositoryStub } = makeSut();
    const spy = jest.spyOn(findAccountRepositoryStub, "find");
    await sut.find("any_username", "any_password");
    expect(spy).toHaveBeenCalledWith("any_username");
  });
  test("should return void if find method dont find an account", async () => {
    const { sut, findAccountRepositoryStub } = makeSut();
    jest
      .spyOn(findAccountRepositoryStub, "find")
      .mockImplementationOnce(async () => {
        return {
          username: "any_username",
          password: "any_hashed_password",
          _id: "",
        };
      });
    const response = await sut.find("any_username", "any_password");
    expect(response).toBeFalsy();
  });
  test("should call decrypt method with correct value", async () => {
    const { sut, bcryptAdapter } = makeSut();
    const spy = jest.spyOn(bcryptAdapter, "decrypt");
    await sut.find("any_username", "any_password");
    expect(spy).toHaveBeenCalledWith("any_hashed_password");
  });
  test("should return void if passwords do not match", async () => {
    const { sut } = makeSut();
    const response = await sut.find("any_username", "wrong_password");
    expect(response).toBeFalsy();
  });
  test("should return the account returned in find method if passwords match", async () => {
    const { sut } = makeSut();
    const response = await sut.find("any_username", "correct_password");
    expect(response).toEqual({
      username: "any_username",
      password: "any_hashed_password",
      _id: "any_id",
    });
  });
});
