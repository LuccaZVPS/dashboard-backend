import { FindClientRepository } from "../../../src/data/protocols/client/find-client-repository";
import { FindClient } from "../../../src/data/useCases/client/find-client";
import { Client } from "../../../src/domain/client";

describe("FindClient use case", () => {
  const clientMock = {
    _id: "any_id",
    name: "any_name",
    email: "any_email",
    instagram: "any_instagram",
    observations: "any_observations",
    aquisitions: "any_aquisitions",
    indication: "any_indication",
    address: "any_adress",
    number: "any_number",
  };
  const makeFindClientRepository = () => {
    class FindClientRepositoryStub implements FindClientRepository {
      async find(_id: string): Promise<void | Client> {
        return clientMock;
      }
    }
    return new FindClientRepositoryStub();
  };
  const makeSut = () => {
    const findClientRepository = makeFindClientRepository();
    return {
      findClientRepository,
      sut: new FindClient(findClientRepository),
    };
  };
  test("should call findClientRepository with correct value", async () => {
    const { findClientRepository, sut } = makeSut();
    const spy = jest.spyOn(findClientRepository, "find");
    await sut.find("any_id");
    expect(spy).toHaveBeenCalledWith("any_id");
  });
  test("should throw if findClientRepository throws", async () => {
    const { findClientRepository, sut } = makeSut();
    jest.spyOn(findClientRepository, "find").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(async () => {
      await sut.find("any_id");
    }).rejects.toThrow();
  });
  test("should return the same values as findClientRepository", async () => {
    const { findClientRepository, sut } = makeSut();
    var client = await sut.find("any_id");
    expect(client).toEqual(clientMock);
    jest
      .spyOn(findClientRepository, "find")
      .mockImplementationOnce(async () => {
        return;
      });
    client = await sut.find("any_id");
    expect(client).toBeFalsy();
  });
});
