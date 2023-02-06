import { GetClientsRepository } from "../../../src/data/protocols/client/get-clients-repository";
import { GetClients } from "../../../src/data/useCases/client/get-clients";
import { Client } from "../../../src/domain/client";

describe("Get clients use case", () => {
  const clientListMock = [
    {
      _id: "any_id",
      name: "any_name",
      email: "any_email",
      instagram: "any_instagram",
      observations: "any_observations",
      aquisitions: "any_aquisitions",
      indication: "any_indication",
      address: "any_adress",
      number: "any_number",
    },
  ];
  const makeGetClientsRepository = () => {
    class GetClientsRepositoryStub implements GetClientsRepository {
      async get(): Promise<Client[]> {
        return clientListMock;
      }
    }
    return new GetClientsRepositoryStub();
  };
  const makeSut = () => {
    const getClientsRepositoryStub = makeGetClientsRepository();
    return {
      getClientsRepositoryStub,
      sut: new GetClients(getClientsRepositoryStub),
    };
  };
  test("should return the same value as getClients repository ", async () => {
    const { sut } = makeSut();
    const clients = await sut.get();
    expect(clients).toEqual(clientListMock);
  });
  test("should throws if getClientsRepository throws", async () => {
    const { sut, getClientsRepositoryStub } = makeSut();
    jest.spyOn(getClientsRepositoryStub, "get").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(async () => {
      await sut.get();
    }).rejects.toThrow();
  });
});
