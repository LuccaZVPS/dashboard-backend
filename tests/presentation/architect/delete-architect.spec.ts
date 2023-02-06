import { AuthenticationError, UserInputError } from "apollo-server-core";
import { DeleteArchitect } from "../../../src/domain/useCases/architect/delete-architect";
import { DeleteArchitectController } from "../../../src/presentation/controllers/architect/delete-architect";
import {
  DTOValidator,
  error,
} from "../../../src/presentation/protocols/DTO-validator";

describe("DeleteArchitect Controller", () => {
  const makeValidatorStub = () => {
    class ValidatorStub implements DTOValidator {
      async validate(classModel: any): Promise<error> {
        return { errors: "" };
      }
    }
    return new ValidatorStub();
  };
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
    const validatorStub = makeValidatorStub();
    return {
      validatorStub,
      deleteArchitectStub,
      sut: new DeleteArchitectController(deleteArchitectStub, validatorStub),
    };
  };
  test("should throws auth error if no userId if provided by context", () => {
    const { sut } = makeSut();
    expect(async () => {
      await sut.handle("", { data: "" }, { userId: "" });
    }).rejects.toThrow(new AuthenticationError("must be logged in"));
  });
  test("should call validator with correct value", async () => {
    const { sut, validatorStub } = makeSut();
    const spy = jest.spyOn(validatorStub, "validate");
    await sut.handle("", { data: { _id: "any_id" } }, { userId: "any_id" });
    expect(spy).toHaveBeenCalledWith({ _id: "any_id" });
  });
  test("should return user input error if validate method returns errors messages", async () => {
    const { sut, validatorStub } = makeSut();
    jest.spyOn(validatorStub, "validate").mockImplementationOnce(async () => {
      return { errors: "any_errors" };
    });
    expect(async () => {
      await sut.handle("", { data: { _id: "any_id" } }, { userId: "any_id" });
    }).rejects.toThrow(new UserInputError("any_errors"));
  });
  test("should call delete method with correct value", async () => {
    const { sut, deleteArchitectStub } = makeSut();
    const spy = jest.spyOn(deleteArchitectStub, "delete");
    await sut.handle("", { data: { _id: "any_id" } }, { userId: "any_id" });
    expect(spy).toHaveBeenCalledWith("any_id");
  });
  test("should return true", async () => {
    const { sut } = makeSut();
    const isDeleted = await sut.handle(
      "",
      { data: { _id: "any_id" } },
      { userId: "any_id" }
    );
    expect(isDeleted).toBe(true);
  });
});
