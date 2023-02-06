import { CreateArchitectRepository } from "../../../src/data/protocols/architect/create-architect-repository";
import { CreateArchitect } from "../../../src/data/useCases/architect/create-architect";
import { Architect } from "../../../src/domain/architect";
import { CreateArchitectDTO } from "../../../src/presentation/controllers/architect/DTOs/create-architect-dto";

describe("CreateArchitect use case", () => {
  const createdArchitectMock = {
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
  const createArchitectDTOMock = {
    name: "any",
    email: "any",
    address: "any",
    number: "any",
    instagram: "any",
    observations: "any",
    sampleDate: "any",
    catalog: "any",
    bankInfo: "any",
  };
  const makeCreateArchitectRepositoryStub = () => {
    class CreateArchitectRepositoryStub implements CreateArchitectRepository {
      async create(architect: CreateArchitectDTO): Promise<Architect> {
        return createdArchitectMock;
      }
    }
    return new CreateArchitectRepositoryStub();
  };
  const makeSut = () => {
    const createArchitectRepositoryStub = makeCreateArchitectRepositoryStub();
    return {
      createArchitectRepositoryStub,
      sut: new CreateArchitect(createArchitectRepositoryStub),
    };
  };
  test("should call create method with correct values", async () => {
    const { sut, createArchitectRepositoryStub } = makeSut();
    const spy = jest.spyOn(createArchitectRepositoryStub, "create");
    await sut.create(createArchitectDTOMock);
    expect(spy).toHaveBeenCalledWith(createArchitectDTOMock);
  });
  test("should throw if create method throws", async () => {
    const { sut, createArchitectRepositoryStub } = makeSut();
    jest
      .spyOn(createArchitectRepositoryStub, "create")
      .mockImplementationOnce(async () => {
        throw new Error();
      });
    expect(async () => {
      await sut.create(createArchitectDTOMock);
    }).rejects.toThrow();
  });
  test("should return a created architect", async () => {
    const { sut } = makeSut();
    const createdArchitect = await sut.create(createArchitectDTOMock);
    expect(createdArchitect).toEqual(createdArchitect);
  });
});
