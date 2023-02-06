import { UpdateArchitectRepository } from "../../../src/data/protocols/architect/update-architect-repository";
import { UpdateArchitect } from "../../../src/data/useCases/architect/update-architect";
import { Architect } from "../../../src/domain/architect";
import { UpdateArchitectDTO } from "../../../src/presentation/controllers/architect/DTOs/update-architect";

describe("UpdateArchitect use case", () => {
  const architectMock = {
    name: "any",
    email: "any",
    address: "any",
    number: "any",
    instagram: "any",
    observations: "any",
    sampleDate: "any",
    catalog: "any",
    bankInfo: "any",
    _id: "any_id",
  };
  const makeUpdateArchitectRepositoryStub = () => {
    class UpdateArchitectStub implements UpdateArchitectRepository {
      async update(architect: UpdateArchitectDTO): Promise<Architect> {
        return architectMock;
      }
    }
    return new UpdateArchitectStub();
  };
  const makeSut = () => {
    const updateArchitectRepositoryStub = makeUpdateArchitectRepositoryStub();
    return {
      updateArchitectRepositoryStub,
      sut: new UpdateArchitect(updateArchitectRepositoryStub),
    };
  };
  test("should call update method with correct value", async () => {
    const { sut, updateArchitectRepositoryStub } = makeSut();
    const spy = jest.spyOn(updateArchitectRepositoryStub, "update");
    await sut.update(architectMock);
    expect(spy).toBeCalledWith(architectMock);
  });
  test("should throws if update method throws", () => {
    const { sut, updateArchitectRepositoryStub } = makeSut();
    jest
      .spyOn(updateArchitectRepositoryStub, "update")
      .mockImplementationOnce(() => {
        throw new Error();
      });
    expect(async () => {
      await sut.update(architectMock);
    }).rejects.toThrow();
  });
  test("should return the updated architect", async () => {
    const { sut } = makeSut();
    const updatedArchitect = await sut.update(architectMock);
    expect(updatedArchitect).toEqual(architectMock);
  });
});
