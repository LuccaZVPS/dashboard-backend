import { AuthenticationError, UserInputError } from "apollo-server-core";
import { DeleteClient } from "../../../src/domain/useCases/delete-client";
import { DeleteClientController } from "../../../src/presentation/controllers/client/delete-client";
import { DTOValidator } from "../../../src/presentation/protocols/DTO-validator";

describe("DeleteClientController", () => {
  const makeValidatorStub = () => {
    class DTOValidator implements DTOValidator {
      async validate() {
        return { errors: "" };
      }
    }
    return new DTOValidator();
  };
  const makeDeleteClientStub = () => {
    class DeleteClientStub implements DeleteClient {
      async delete(): Promise<boolean> {
        return true;
      }
    }
    return new DeleteClientStub();
  };
  const makeSut = () => {
    const deleteClientStub = makeDeleteClientStub();
    const validator = makeValidatorStub();
    return {
      validator,
      deleteClientStub,
      sut: new DeleteClientController(deleteClientStub, validator),
    };
  };
  test("should throws auth error if no userId is provided", () => {
    const { sut } = makeSut();
    expect(async () => {
      await sut.handle("", { data: "" }, { userId: "" });
    }).rejects.toThrow(new AuthenticationError("must be logged in"));
  });
  test("should throw bad user input if validator returns an error", () => {
    const { sut, validator } = makeSut();
    jest.spyOn(validator, "validate").mockImplementationOnce(async () => {
      return { errors: "Any_error" };
    });
    expect(async () => {
      await sut.handle("", { data: { _id: "" } }, { userId: "valid_id" });
    }).rejects.toThrow();
  });
  test("should call deleteClient method with correct values", async () => {
    const { sut, deleteClientStub } = makeSut();
    const spy = jest.spyOn(deleteClientStub, "delete");
    await sut.handle("", { data: { _id: "valid_id" } }, { userId: "valid_id" });
    expect(spy).toHaveBeenCalledWith("valid_id");
  });
  test("should return the same value of deleteClient method", async () => {
    const { sut, deleteClientStub } = makeSut();
    var response = await sut.handle(
      "",
      { data: { _id: "valid_id" } },
      { userId: "valid_id" }
    );
    expect(response).toBe(true);
    jest.spyOn(deleteClientStub, "delete").mockImplementationOnce(async () => {
      return false;
    });
    response = await sut.handle(
      "",
      { data: { _id: "valid_id" } },
      { userId: "valid_id" }
    );
    expect(response).toBe(false);
  });
  test("should throw if deleteClient method throws", () => {
    const { sut, deleteClientStub } = makeSut();
    jest.spyOn(deleteClientStub, "delete").mockImplementationOnce(async () => {
      throw new Error();
    });
    expect(async () => {
      await sut.handle("", { data: { _id: "id" } }, { userId: "valid_id" });
    }).rejects.toThrow();
  });
});
