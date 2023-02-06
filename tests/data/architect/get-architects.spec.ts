import { GetArchitectsRepository } from "../../../src/data/protocols/architect/get-architects-repository";
import { GetArchitects } from "../../../src/data/useCases/architect/get-architects";
import { Architect } from "../../../src/domain/architect";

describe("GetArchitects", () => {
  const makeGetArchitectsRepository = () => {
    class GetArchitectsRepositoryStub implements GetArchitectsRepository {
      async get(): Promise<Architect[]> {
        return [
          {
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
          },
        ];
      }
    }
    return new GetArchitectsRepositoryStub();
  };
  const makeSut = () => {
    const getArchitectsRepository = makeGetArchitectsRepository();
    return {
      getArchitectsRepository,
      sut: new GetArchitects(getArchitectsRepository),
    };
  };
  test("should call get method", async () => {
    const { sut, getArchitectsRepository } = makeSut();
    const spy = jest.spyOn(getArchitectsRepository, "get");
    await sut.get();
    expect(spy).toHaveBeenCalled();
  });
  test("should throws if get method throws", () => {
    const { sut, getArchitectsRepository } = makeSut();
    jest.spyOn(getArchitectsRepository, "get").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(async () => {
      await sut.get();
    }).rejects.toThrow();
  });
  test("should return the same value as get method", async () => {
    const { sut } = makeSut();
    const architects = await sut.get();
    expect(architects).toEqual([
      {
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
      },
    ]);
  });
});
