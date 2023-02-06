import { AuthenticationError, ValidationError } from "apollo-server-core";
import { Architect } from "../../../src/domain/architect";
import { FindArchitect } from "../../../src/domain/useCases/architect/find-architect";
import { UpdateArchitect } from "../../../src/domain/useCases/architect/update-architect";
import { UpdateArchitectDTO } from "../../../src/presentation/controllers/architect/DTOs/update-architect";
import { UpdateArchitectController } from "../../../src/presentation/controllers/architect/update-architect";
import {
  DTOValidator,
  error,
} from "../../../src/presentation/protocols/DTO-validator";

describe("UpdateArchitect controller", () => {
  const updateArchitectMockDTO = {
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
  const makeValidatorStub = () => {
    class ValidatorStub implements DTOValidator {
      async validate(classModel: any): Promise<error> {
        return { errors: "" };
      }
    }
    return new ValidatorStub();
  };
  const makeFindArchitectStub = () => {
    class FindArchitectStub implements FindArchitect {
      async find(_id: string): Promise<void | Architect> {
        return updateArchitectMockDTO;
      }
    }
    return new FindArchitectStub();
  };
  const makeUpdateArchitectStub = () => {
    class UpdateArchitectStub implements UpdateArchitect {
      async update(architect: UpdateArchitectDTO): Promise<Architect> {
        return { ...updateArchitectMockDTO, name: "updated_name" };
      }
    }
    return new UpdateArchitectStub();
  };
  const makeSut = () => {
    const validatorStub = makeValidatorStub();
    const findArchitectStub = makeFindArchitectStub();
    const updateArchitectStub = makeUpdateArchitectStub();
    return {
      validatorStub,
      findArchitectStub,
      updateArchitectStub,
      sut: new UpdateArchitectController(
        validatorStub,
        findArchitectStub,
        updateArchitectStub
      ),
    };
  };
  test("should throws auth error if userId is not provided by context", () => {
    const { sut } = makeSut();
    expect(async () => {
      await sut.handle("", { data: "" }, { userId: "" });
    }).rejects.toThrow(new AuthenticationError("must be logged in"));
  });
  test("should call validate method with correct values", async () => {
    const { sut, validatorStub } = makeSut();
    const spy = jest.spyOn(validatorStub, "validate");
    await sut.handle(
      "",
      { data: { ...updateArchitectMockDTO } },
      { userId: "any_id" }
    );
    expect(spy).toBeCalledWith({ ...updateArchitectMockDTO });
  });
  test("should throws user input error if validate return errors messages", () => {
    const { sut, validatorStub } = makeSut();
    jest.spyOn(validatorStub, "validate").mockImplementationOnce(async () => {
      return { errors: "any_errors" };
    });
    expect(async () => {
      await sut.handle(
        "",
        { data: { ...updateArchitectMockDTO } },
        { userId: "any" }
      );
    }).rejects.toThrow(new AuthenticationError("any_errors"));
  });
  test("should call find method with correct value", async () => {
    const { sut, findArchitectStub } = makeSut();
    const spy = jest.spyOn(findArchitectStub, "find");
    await sut.handle(
      "",
      { data: { ...updateArchitectMockDTO } },
      { userId: "any" }
    );
    expect(spy).toHaveBeenCalledWith(updateArchitectMockDTO._id);
  });
  test("should return validation error if find method returns void", async () => {
    const { sut, findArchitectStub } = makeSut();
    jest.spyOn(findArchitectStub, "find").mockImplementationOnce(async () => {
      return;
    });

    expect(async () => {
      await sut.handle(
        "",
        { data: { ...updateArchitectMockDTO } },
        { userId: "any" }
      );
    }).rejects.toThrow(new ValidationError("architect does not exist"));
  });
  test("should call update method with correct values", async () => {
    const { sut, updateArchitectStub } = makeSut();
    const spy = jest.spyOn(updateArchitectStub, "update");
    await sut.handle(
      "",
      { data: { ...updateArchitectMockDTO } },
      { userId: "any" }
    );
    expect(spy).toHaveBeenCalledWith({ ...updateArchitectMockDTO });
  });
  test("should throws if update method throws", () => {
    const { sut, updateArchitectStub } = makeSut();
    jest.spyOn(updateArchitectStub, "update").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(async () => {
      await sut.handle(
        "",
        { data: { ...updateArchitectMockDTO } },
        { userId: "any" }
      );
    }).rejects.toThrow();
  });
  test("should throws if find method throws", () => {
    const { sut, findArchitectStub } = makeSut();
    jest.spyOn(findArchitectStub, "find").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(async () => {
      await sut.handle(
        "",
        { data: { ...updateArchitectMockDTO } },
        { userId: "any" }
      );
    }).rejects.toThrow();
  });
  test("should return an updated architect", async () => {
    const { sut } = makeSut();
    const updatedArchitect = await sut.handle(
      "",
      { data: { ...updateArchitectMockDTO } },
      { userId: "any" }
    );
    expect(updatedArchitect).toEqual({
      ...updateArchitectMockDTO,
      name: "updated_name",
    });
  });
});
