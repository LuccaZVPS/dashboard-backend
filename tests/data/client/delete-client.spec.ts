import { DeleteClientRepository } from "../../../src/data/protocols/client/delete-client-repository";
import { DeleteClient } from "../../../src/data/useCases/client/delete-client";

describe("Delete client use case", () => {
  const makeDeleteClientRepositoryStub = () => {
    class DeleteClientRepositoryStub implements DeleteClientRepository {
      async delete(_id: string): Promise<boolean> {
        return true;
      }
    }
    return new DeleteClientRepositoryStub();
  };
  const makeSut = () => {
    const deleteClientRepository = makeDeleteClientRepositoryStub();
    return {
      deleteClientRepository,
      sut: new DeleteClient(deleteClientRepository),
    };
  };
  test("should call delete method with correct value", async () => {
    const { deleteClientRepository, sut } = makeSut();
    const spy = jest.spyOn(deleteClientRepository, "delete");
    await sut.delete("any_id");
    expect(spy).toHaveBeenCalledWith("any_id");
  });
  test("should throw if deleteClientRepository method returns false", async () => {
    const { deleteClientRepository, sut } = makeSut();
    jest
      .spyOn(deleteClientRepository, "delete")
      .mockImplementationOnce(async () => {
        return false;
      });
    expect(async () => {
      await sut.delete("any_id");
    }).rejects.toThrow();
  });
  test("should throw if delete method throws", async () => {
    const { deleteClientRepository, sut } = makeSut();
    jest.spyOn(deleteClientRepository, "delete").mockRejectedValueOnce(() => {
      throw new Error();
    });
    expect(async () => {
      await sut.delete("any_id");
    }).rejects.toThrow();
  });
  test("should resolve if deleteClientRepository method returns true", async () => {
    const { sut } = makeSut();
    const response = await sut.delete("any_id");
    expect(response).toBeFalsy();
  });
});
