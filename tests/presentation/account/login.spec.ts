import { UserInputError, ValidationError } from "apollo-server-core";
import { Account } from "../../../src/domain/account";
import { FindAccount } from "../../../src/domain/useCases/account/find-account";
import { LoginController } from "../../../src/presentation/controllers/acccount/login";
import { CreateJwt } from "../../../src/presentation/protocols/create-jwt";
import { ExpressContext } from "apollo-server-express";

import {
  DTOValidator,
  error,
} from "../../../src/presentation/protocols/DTO-validator";
enum sameSiteTypes {
  NONE,
  STRICT,
  LEX,
}
interface cookie {
  httpOnly: boolean;
  sameSite: sameSiteTypes;
  secure: boolean;
  maxAge: number;
}
describe("LoginController", () => {
  const mockExpressCookie = {
    cookie: (cookieName: string, value: any, config: cookie): void => {
      return;
    },
  };
  const makeCreateJWTStub = () => {
    class CreateJWTStub implements CreateJwt {
      async encrypt(_id: string): Promise<string> {
        return "valid_jwt";
      }
    }
    return new CreateJWTStub();
  };
  const makeFindAccountStub = () => {
    class FindAccountStub implements FindAccount {
      async find(username: string, password: string): Promise<void | Account> {
        return { username: "Lucca", password: "12345678", _id: "any_id" };
      }
    }
    return new FindAccountStub();
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
    const findAccount = makeFindAccountStub();
    const createJWTStub = makeCreateJWTStub();
    return {
      validatorStub,
      findAccount,
      createJWTStub,
      sut: new LoginController(validatorStub, findAccount, createJWTStub),
    };
  };
  test("should call validate method with correct value", async () => {
    const { sut, validatorStub } = makeSut();
    const spy = jest.spyOn(validatorStub, "validate");
    await sut.handle(
      "",
      {
        data: {
          username: "lucca",
          password: "12345678",
        },
      },
      {
        userId: "",
        express: {
          res: { cookie: mockExpressCookie.cookie },
        } as ExpressContext,
      }
    );
    expect(spy).toHaveBeenCalledWith({
      username: "lucca",
      password: "12345678",
    });
  });
  test("should throws user input error if validator returns error messages", async () => {
    const { sut, validatorStub } = makeSut();
    jest.spyOn(validatorStub, "validate").mockImplementationOnce(async () => {
      return { errors: "Password must be provided" };
    });

    expect(async () => {
      await sut.handle(
        "",
        {
          data: {
            username: "lucca",
          },
        },
        {
          userId: "",
          express: {
            res: { cookie: mockExpressCookie.cookie },
          } as ExpressContext,
        }
      );
    }).rejects.toThrow(new UserInputError("Password must be provided"));
  });
  test("should call find method with correct value", async () => {
    const { findAccount, sut } = makeSut();
    const spy = jest.spyOn(findAccount, "find");
    await sut.handle(
      "",
      {
        data: {
          username: "lucca",
          password: "12345678",
        },
      },
      {
        userId: "",
        express: {
          res: { cookie: mockExpressCookie.cookie },
        } as ExpressContext,
      }
    );
    expect(spy).toHaveBeenCalledWith("lucca", "12345678");
  });
  test("should throw validation error if find method return void", async () => {
    const { findAccount, sut } = makeSut();
    jest.spyOn(findAccount, "find").mockImplementationOnce(async () => {
      return;
    });
    expect(async () => {
      await sut.handle(
        "",
        {
          data: {
            username: "lucca",
            password: "12345678",
          },
        },
        {
          userId: "",
          express: {
            res: { cookie: mockExpressCookie.cookie },
          } as ExpressContext,
        }
      );
    }).rejects.toThrow(new ValidationError("Account does not exist"));
  });
  test("should call encrypt method with correct value", async () => {
    const { sut, createJWTStub } = makeSut();
    const spy = jest.spyOn(createJWTStub, "encrypt");
    await sut.handle(
      "",
      {
        data: {
          username: "lucca",
          password: "12345678",
        },
      },
      {
        userId: "",
        express: {
          res: { cookie: mockExpressCookie.cookie },
        } as ExpressContext,
      }
    );
    expect(spy).toHaveBeenCalledWith("any_id");
  });
  test("should create a cookie with correct config", async () => {
    const { sut } = makeSut();

    const spy = jest.spyOn(mockExpressCookie, "cookie");
    await sut.handle(
      "",
      {
        data: {
          username: "lucca",
          password: "12345678",
        },
      },
      {
        userId: "",
        express: {
          res: { cookie: mockExpressCookie.cookie },
        } as ExpressContext,
      }
    );

    expect(spy).toBeCalledWith("jwt", "valid_jwt", {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "none",
    });
  });
  test("should create a cookie with correct config", async () => {
    const { sut } = makeSut();

    const response = await sut.handle(
      "",
      {
        data: {
          username: "lucca",
          password: "12345678",
        },
      },
      {
        userId: "",
        express: {
          res: { cookie: mockExpressCookie.cookie },
        } as ExpressContext,
      }
    );
    expect(response).toBe(true);
  });
});
