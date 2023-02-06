import { UserInputError } from "apollo-server-core";
import { Architect } from "../../../src/domain/architect";
import { GetArchitecs } from "../../../src/domain/useCases/architect/get-architects";
import { GetArchitectsController } from "../../../src/presentation/controllers/architect/get-architects";

describe("GetArchitects Controller", () => {
  const makeGetArchitectsStub = () => {
    class GetArchitectsStub implements GetArchitecs {
      async get(): Promise<Architect[]> {
        return [
          {
            _id: "any_id",
            name: "any",
            email: "any",
            address: "any",
            number: "any",
            instagram: "any",
            observations: "any",
            sampleDate: "any",
            catalog: "any",
            bankInfo: "any",
          },
        ];
      }
    }
    return new GetArchitectsStub();
  };
  const makeSut = () => {
    const getArchitectsStub = makeGetArchitectsStub();
    return {
      getArchitectsStub,
      sut: new GetArchitectsController(getArchitectsStub),
    };
  };
  test("should throw auth error if userId is not provided by context", () => {
    const { sut } = makeSut();
    expect(async () => {
      await sut.handle("", { data: "" }, { userId: "" });
    }).rejects.toThrow(new UserInputError("must be logged in"));
  });
  test("should return the list returned by create method", async () => {
    const { sut } = makeSut();
    const response = await sut.handle("", { data: "" }, { userId: "any" });
    expect(response).toEqual([
      {
        _id: "any_id",
        name: "any",
        email: "any",
        address: "any",
        number: "any",
        instagram: "any",
        observations: "any",
        sampleDate: "any",
        catalog: "any",
        bankInfo: "any",
      },
    ]);
  });
  test("should throws if create method throws", () => {
    const { sut, getArchitectsStub } = makeSut();
    jest.spyOn(getArchitectsStub, "get").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(async () => {
      await sut.handle("", { data: "" }, { userId: "" });
    }).rejects.toThrow();
  });
});
