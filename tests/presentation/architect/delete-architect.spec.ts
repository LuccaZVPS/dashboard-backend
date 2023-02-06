import { AuthenticationError } from "apollo-server-core";
import { DeleteArchitect } from "../../../src/domain/useCases/architect/delete-architect";
import { DeleteArchitectController } from "../../../src/presentation/controllers/architect/delete-architect";

describe("DeleteArchitect Controller", () => {
  const makeDeleteArchitectStub = () => {
    class DeleteArchitectStub implements DeleteArchitect {
      async delete(_id: string): Promise<void> {
        return;
      }
    }
    return new DeleteArchitectStub();
  };
  const makeSut = () => {
    const deleteArchitectStub = makeDeleteArchitectStub();
    return {
      deleteArchitectStub,
      sut: new DeleteArchitectController(deleteArchitectStub),
    };
  };
  test("should throws auth error if no userId if provided by context", () => {
    const { sut } = makeSut();
    expect(async () => {
      await sut.handle("", { data: "" }, { userId: "" });
    }).rejects.toThrow(new AuthenticationError("must be logged in"));
  });
});
