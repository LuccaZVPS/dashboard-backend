import { FindArchitect } from "../../../src/data/useCases/architect/find-architect";
import { FindArchitectRepository } from "../../../src/data/protocols/architect/find-architect-repository";
import { Architect } from "../../../src/domain/architect";
describe("FindArchitect use case", () => {
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
  const makeFindArchitectRepositoryStub = () => {
    class FindArchitectRepositoryStub implements FindArchitectRepository {
      async find(_id: string): Promise<Architect> {
        return architectMock;
      }
    }
    return new FindArchitectRepositoryStub();
  };
  const makeSut = () => {
    const findArchitectRepositoryStub = makeFindArchitectRepositoryStub();
    return {
      findArchitectRepositoryStub,
      sut: new FindArchitect(findArchitectRepositoryStub),
    };
  };
  test("should call find method with correct value", async () => {
    const { sut, findArchitectRepositoryStub } = makeSut();
    const spy = jest.spyOn(findArchitectRepositoryStub, "find");
    await sut.find(architectMock._id);
    expect(spy).toHaveBeenCalledWith(architectMock._id);
  });
  test("should throws if find method throws", async () => {
    const { sut, findArchitectRepositoryStub } = makeSut();
    jest
      .spyOn(findArchitectRepositoryStub, "find")
      .mockImplementationOnce(() => {
        throw new Error();
      });
    expect(async () => {
      await sut.find(architectMock._id);
    }).rejects.toThrow();
  });
  test("should return void if find method cant find an architect", async () => {
    const { sut, findArchitectRepositoryStub } = makeSut();
    jest
      .spyOn(findArchitectRepositoryStub, "find")
      .mockImplementationOnce(async () => {
        return { ...architectMock, _id: "" };
      });
    const architectExist = await sut.find(architectMock._id);
    expect(architectExist).toBeFalsy();
  });
  test("should return an architect if find returns an architect", async () => {
    const { sut, findArchitectRepositoryStub } = makeSut();
    const spy = jest.spyOn(findArchitectRepositoryStub, "find");

    const architectExist = await sut.find(architectMock._id);
    expect(architectExist).toBe(architectMock);
  });
});
