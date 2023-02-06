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
});
