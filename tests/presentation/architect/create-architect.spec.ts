import { AuthenticationError } from "apollo-server-core";
import { Architect } from "../../../src/domain/architect";
import { CreateArchitect } from "../../../src/domain/useCases/architect/create-architect";
import { CreateArchitectController } from "../../../src/presentation/controllers/architect/create-architect";
import { CreateArchitectDTO } from "../../../src/presentation/controllers/architect/DTOs/create-architect-dto";
import {
  DTOValidator,
  error,
} from "../../../src/presentation/protocols/DTO-validator";

describe("CreateArchitect controller", () => {
  const createArchitectMockDTO = {
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
  const makeCreateArchitectStub = () => {
    class CreateArchitectStub implements CreateArchitect {
      async create(createArchitectDTO: CreateArchitectDTO): Promise<Architect> {
        return { ...createArchitectMockDTO, _id: "any_id" };
      }
    }
    return new CreateArchitectStub();
  };
  const makeValidatorStub = () => {
    class ValidatorStub implements DTOValidator {
      async validate(classModel: any): Promise<error> {
        return { errors: "" };
      }
    }
    return new ValidatorStub();
  };
  const makeSut = () => {
    const validatorStub = makeValidatorStub();
    const createArchitectStub = makeCreateArchitectStub();
    return {
      validatorStub,
      createArchitectStub,
      sut: new CreateArchitectController(validatorStub, createArchitectStub),
    };
  };
  test("should throw auth error if no userId is provided by context", () => {
    const { sut } = makeSut();
    expect(async () => {
      await sut.handle("", { data: "" }, { userId: "" });
    }).rejects.toThrow(new AuthenticationError("must be logged in"));
  });
  test("should call validator with correct value", async () => {
    const { sut, validatorStub } = makeSut();
    const spy = jest.spyOn(validatorStub, "validate");
    await sut.handle(
      "",
      { data: { ...createArchitectMockDTO } },
      { userId: "any" }
    );
    expect(spy).toHaveBeenCalledWith({ ...createArchitectMockDTO });
  });
  test("should return user input error if validate returns errors messages", () => {
    const { sut, validatorStub } = makeSut();
    jest.spyOn(validatorStub, "validate").mockImplementationOnce(async () => {
      return { errors: "any_errors" };
    });
    expect(async () => {
      await sut.handle(
        "",
        { data: { ...createArchitectMockDTO } },
        { userId: "any" }
      );
    }).rejects.toThrow(new AuthenticationError("any_errors"));
  });
  test("should call create method with correct value", async () => {
    const { sut, createArchitectStub } = makeSut();
    const spy = jest.spyOn(createArchitectStub, "create");
    await sut.handle(
      "",
      { data: { ...createArchitectMockDTO } },
      { userId: "any" }
    );
    expect(spy).toHaveBeenCalledWith({ ...createArchitectMockDTO });
  });
  test("should throw if create method throws", () => {
    const { sut, createArchitectStub } = makeSut();
    jest.spyOn(createArchitectStub, "create").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(async () => {
      await sut.handle(
        "",
        { data: { ...createArchitectMockDTO } },
        { userId: "any" }
      );
    }).rejects.toThrow();
  });
  test("should return the architect created by create method", async () => {
    const { sut } = makeSut();
    const architect = await sut.handle(
      "",
      { data: { ...createArchitectMockDTO } },
      { userId: "any" }
    );
    expect(architect).toEqual({ ...createArchitectMockDTO, _id: "any_id" });
  });
});
