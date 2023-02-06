import { UpdateClientRepository } from "../../../src/data/protocols/client/update-client-repository";
import { UpdateClient } from "../../../src/data/useCases/client/update-client";
import { Client } from "../../../src/domain/client";
import { UpdateClientDTO } from "../../../src/presentation/controllers/client/DTOs/update-client";

describe("Update client use case", () => {
  const updateDTOMock = {
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
  const updatedClient = {
    _id: "any_id",
    name: "updated_name",
    email: "any_email",
    instagram: "any_instagram",
    observations: "any_observations",
    aquisitions: "any_aquisitions",
    indication: "updated_indication",
    address: "any_adress",
    number: "any_number",
  };
  const makeUpdateClientRepositoryStub = () => {
    class UpdateClientRepositoryStub implements UpdateClientRepository {
      async update(client: UpdateClientDTO): Promise<Client> {
        return updatedClient;
      }
    }
    return new UpdateClientRepositoryStub();
  };
  const makeSut = () => {
    const updateClientRepository = makeUpdateClientRepositoryStub();
    return {
      updateClientRepository,
      sut: new UpdateClient(updateClientRepository),
    };
  };
  test("should call update method with correct values", async () => {
    const { sut, updateClientRepository } = makeSut();
    const spy = jest.spyOn(updateClientRepository, "update");
    await sut.update(updateDTOMock);
    expect(spy).toHaveBeenCalledWith(updateDTOMock);
  });
  test("should return an updated client", async () => {
    const { sut, updateClientRepository } = makeSut();
    const updatedClient = await sut.update(updateDTOMock);
    expect(updatedClient).toEqual(updatedClient);
  });
  test("should throws if updateRepository throws", async () => {
    const { sut, updateClientRepository } = makeSut();
    jest.spyOn(updateClientRepository, "update").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(async () => {
      await sut.update(updateDTOMock);
    }).rejects.toThrow();
  });
});
