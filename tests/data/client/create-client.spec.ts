import { CreateClientRepository } from "../../../src/data/protocols/client/create-client-repository";
import { CreateClient } from "../../../src/data/useCases/client/create-client";
import { Client } from "../../../src/domain/client";
import { CreateClientDTO } from "../../../src/presentation/controllers/client/DTOs/create-client";

describe("Create Client use case", () => {
  const createDTOMock = {
    name: "any_name",
    email: "any_email",
    instagram: "any_instagram",
    observations: "any_observations",
    aquisitions: "any_aquisitions",
    indication: "any_indication",
    address: "any_adress",
    number: "any_number",
  };
  const makeCreateRepository = () => {
    class CreateRepositoryStub implements CreateClientRepository {
      async create(DTO: CreateClientDTO): Promise<Client> {
        return { ...createDTOMock, _id: "any_id" };
      }
    }
    return new CreateRepositoryStub();
  };

  const makeSut = () => {
    const createClientRepository = makeCreateRepository();
    return {
      createClientRepository,
      sut: new CreateClient(createClientRepository),
    };
  };
  test("should call createClientRepository with correct value", async () => {
    const { createClientRepository, sut } = makeSut();
    const spy = jest.spyOn(createClientRepository, "create");
    await sut.create(createDTOMock);

    expect(spy).toHaveBeenCalledWith(createDTOMock);
  });
  test("should throws if create method throws", async () => {
    const { createClientRepository, sut } = makeSut();
    jest.spyOn(createClientRepository, "create").mockImplementationOnce(() => {
      throw new Error();
    });

    expect(async () => {
      await sut.create(createDTOMock);
    }).rejects.toThrow();
  });
  test("should call return the same of create method", async () => {
    const { sut } = makeSut();
    const client = await sut.create(createDTOMock);
    expect(client).toEqual({ ...createDTOMock, _id: "any_id" });
  });
});
