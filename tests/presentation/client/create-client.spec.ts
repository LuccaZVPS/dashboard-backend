import { CreateClient } from "../../../src/presentation/controllers/client/create-client";
import { DTOValidator } from "../../../src/presentation/protocols/DTO-validator";

describe("CreateClientController", () => {
  const makeValidatorSutb = () => {
    class ValidatorStub implements DTOValidator {
      async validate(classModel: any) {
        return { errors: "" };
      }
    }
    return new ValidatorStub();
  };
  const makeSut = () => {
    const validatorStub = makeValidatorSutb();
    return {
      validatorStub,
      sut: new CreateClient(validatorStub),
    };
  };
  test("should call validate with correct value", async () => {
    const { sut, validatorStub } = makeSut();
    const validate = jest.spyOn(validatorStub, "validate");
    await sut.handle("", { data: { name: "test" } }, { userId: "" });
    expect(validate).toHaveBeenCalledWith({ name: "test" });
  });
  test("should throw input error if validator return an error", async () => {
    const { sut, validatorStub } = makeSut();
    jest.spyOn(validatorStub, "validate").mockImplementationOnce(async () => {
      return { errors: "Missing password propertie" };
    });
    expect(async () => {
      await sut.handle("", { data: {} }, { userId: "14" });
    }).rejects.toThrow();
  });
});
