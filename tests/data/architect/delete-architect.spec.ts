import { DeleteArchitectRepository } from "../../../src/data/protocols/architect/delete-architect-repositort";
import { DeleteArchitect } from "../../../src/data/useCases/architect/delete-architect";

describe("DeleteArchitect use case", () => {
  const makeDeleteArchitectRepositoryStub = () => {
    class DeleteArchitectRepositoryStub implements DeleteArchitectRepository {
      async delete(_id: string): Promise<void> {
        return;
      }
    }
    return new DeleteArchitectRepositoryStub();
  };
  const makeSut = () => {
    const deleteArchitectRepositoryStub = makeDeleteArchitectRepositoryStub();
    return {
      deleteArchitectRepositoryStub,
      sut: new DeleteArchitect(deleteArchitectRepositoryStub),
    };
  };
  test("should call delete method with correct value", async () => {
    const { sut, deleteArchitectRepositoryStub } = makeSut();
    const spy = jest.spyOn(deleteArchitectRepositoryStub, "delete");
    await sut.delete("any_id");
    expect(spy).toBeCalledWith("any_id");
  });
  test("should throws if delete methos throws", () => {
    const { sut, deleteArchitectRepositoryStub } = makeSut();
    jest
      .spyOn(deleteArchitectRepositoryStub, "delete")
      .mockImplementationOnce(() => {
        throw new Error();
      });
    expect(async () => {
      await sut.delete("any_id");
    }).rejects.toThrow();
  });
});
