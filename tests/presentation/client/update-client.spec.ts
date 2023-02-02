import { AuthenticationError, UserInputError } from "apollo-server-core";
import { Client } from "../../../src/domain/client";
import { FindClient } from "../../../src/domain/useCases/find-client";
import { UpdateClient } from "../../../src/domain/useCases/update-client";
import { UpdateClientDTO } from "../../../src/presentation/controllers/client/DTOs/update-client";
import { UpdateClientController } from "../../../src/presentation/controllers/client/update-client";
import { DTOValidator } from "../../../src/presentation/protocols/DTO-validator";

describe("UpdateClientController", () => {
  const makeFindClientStub = () => {
    class FindClientStub implements FindClient {
      async find(): Promise<undefined | Client> {
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
    return new FindClientStub();
  };

  const makeUpdateClientStub = () => {
    class UpdateClientStub implements UpdateClient {
      async update(createClientDTO: UpdateClientDTO): Promise<Client> {
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
    return new UpdateClientStub();
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
    const validator = makeValidatorSutb();
    const findClient = makeFindClientStub();
    const updateClient = makeUpdateClientStub();
    return {
      validator,
      findClient,
      updateClient,
      sut: new UpdateClientController(validator, findClient, updateClient),
    };
  };
  test("should throw auth error if no userId is provided", () => {
    const { sut } = makeSut();
    expect(async () => {
      await sut.handle("", { data: "" }, { userId: "" });
    }).rejects.toThrow(new AuthenticationError("must be logged in"));
  });
  test("should throw user input error if invalid client is provided", () => {
    const { sut, validator } = makeSut();
    jest.spyOn(validator, "validate").mockImplementationOnce(async () => {
      return { errors: "any_error" };
    });
    expect(async () => {
      await sut.handle("", { data: "" }, { userId: "any_id" });
    }).rejects.toThrow(new UserInputError("any_error"));
  });
  test("should throw userInputError if no client exist with provided id ", () => {
    const { sut, findClient } = makeSut();
    jest.spyOn(findClient, "find").mockImplementationOnce(async () => {
      return {} as Client;
    });
    expect(async () => {
      await sut.handle("", { data: "" }, { userId: "any_id" });
    }).rejects.toThrow(new UserInputError("client not found"));
  });
  test("should call update method with correct values", async () => {
    const { sut, updateClient } = makeSut();
    const spy = jest.spyOn(updateClient, "update");
    const data = { data: { name: "Lucca" } };
    await sut.handle("", data, { userId: "valid_id" });
    expect(spy).toHaveBeenCalledWith({ name: "Lucca" });
  });
});
