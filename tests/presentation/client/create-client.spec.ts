import { AuthenticationError, UserInputError } from "apollo-server-core";
import { Client } from "../../../src/domain/client";
import { CreateClient } from "../../../src/domain/useCases/client/create-client";
import { CreateClientController } from "../../../src/presentation/controllers/client/create-client";
import { CreateClientDTO } from "../../../src/presentation/controllers/client/DTOs/create-client";
import { DTOValidator } from "../../../src/presentation/protocols/DTO-validator";

describe("CreateClientController", () => {
  const makeCreateClientStub = () => {
    class CreateClientStub implements CreateClient {
      async create(createClientDTO: CreateClientDTO): Promise<Client> {
        return {
          _id: "id",
          name: "any_name",
          email: "any_email",
          instagram: "any_instagram",
          observations: "any_observations",
          aquisitions: "any_aquisitions",
          indication: "any_indication",
          addres: "any_adress",
          number: "any_number",
        };
      }
    }
    return new CreateClientStub();
  };
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
    const createClientStub = makeCreateClientStub();
    return {
      createClientStub,
      validatorStub,
      sut: new CreateClientController(validatorStub, createClientStub),
    };
  };
  test("should throw auth error with no userId is provided", async () => {
    const { sut } = makeSut();
    expect(async () => {
      await sut.handle("", { data: { name: "test" } }, { userId: null });
    }).rejects.toThrow(new AuthenticationError("must be logged in"));
  });

  test("should call validate with correct value", async () => {
    const { sut, validatorStub } = makeSut();
    const validate = jest.spyOn(validatorStub, "validate");
    await sut.handle("", { data: { name: "test" } }, { userId: "valid_id" });
    expect(validate).toHaveBeenCalledWith({ name: "test" });
  });
  test("should throw input error if validator return an error", async () => {
    const { sut, validatorStub } = makeSut();
    jest.spyOn(validatorStub, "validate").mockImplementationOnce(async () => {
      return { errors: "Missing name propertie" };
    });
    expect(async () => {
      await sut.handle("", { data: {} }, { userId: "valid_id" });
    }).rejects.toThrow(new UserInputError("Missing name propertie"));
  });
  test("should throw input error if validator throws", async () => {
    const { sut, validatorStub } = makeSut();
    jest.spyOn(validatorStub, "validate").mockImplementationOnce(async () => {
      throw new Error();
    });
    expect(async () => {
      await sut.handle("", { data: {} }, { userId: "valid_id" });
    }).rejects.toThrow();
  });
  test("should call createClient method with correct values", async () => {
    const { sut, createClientStub } = makeSut();
    const spy = jest.spyOn(createClientStub, "create");
    await sut.handle("", { data: { name: "test" } }, { userId: "valid_id" });
    expect(spy).toHaveBeenCalledWith({ name: "test" });
  });
  test("should throw if createClient method throws", async () => {
    const { sut, createClientStub } = makeSut();
    jest.spyOn(createClientStub, "create").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(async () => {
      await sut.handle("", { data: { name: "test" } }, { userId: "valid_id" });
    }).rejects.toThrow();
  });
  test("should throw if createClient method throws", async () => {
    const { sut } = makeSut();
    const client = await sut.handle(
      "",
      { data: { name: "test" } },
      { userId: "valid_id" }
    );
    expect(client).toEqual({
      _id: "id",
      name: "any_name",
      email: "any_email",
      instagram: "any_instagram",
      observations: "any_observations",
      aquisitions: "any_aquisitions",
      indication: "any_indication",
      addres: "any_adress",
      number: "any_number",
    });
  });
});
