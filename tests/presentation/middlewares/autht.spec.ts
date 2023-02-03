import { ExpressContext } from "apollo-server-express";
import {
  AuthMiddleware,
  cookieParser,
} from "../../../src/presentation/middlewares/auth";
import { DecryptJwtTs } from "../../../src/presentation/protocols/decrypt-jwt";

describe("AuthMiddleware", () => {
  const makeDecryptJWTStub = () => {
    class DecryptJWTStub implements DecryptJwtTs {
      async decrypt(jwt: string): Promise<any> {
        return { _id: "any_id" };
      }
    }
    return new DecryptJWTStub();
  };
  const jwt = "jwt=any_token; ga=asdasdasd";

  const cookieMock = {
    headers: {
      cookie: jwt,
    },
  };
  const makeSut = () => {
    const decryptJWT = makeDecryptJWTStub();
    return {
      decryptJWT,
      sut: new AuthMiddleware(decryptJWT),
    };
  };

  test("should call cookie parser with correct value", async () => {
    const { sut } = makeSut();
    const spy = jest.spyOn(cookieParser, "parser");
    await sut.auth({
      req: { ...cookieMock } as Express.Request,
      res: {},
    } as unknown as ExpressContext);
    expect(spy).toHaveBeenCalledWith(cookieMock.headers.cookie);
  });
  test("should call decrypt method with correct value", async () => {
    const { sut, decryptJWT } = makeSut();
    const spy = jest.spyOn(decryptJWT, "decrypt");
    await sut.auth({
      req: { ...cookieMock } as Express.Request,
      res: {},
    } as unknown as ExpressContext);
    expect(spy).toHaveBeenCalledWith("any_token");
  });
  test("should return an userId", async () => {
    const { sut } = makeSut();
    const { userId } = await sut.auth({
      req: { ...cookieMock } as Express.Request,
      res: {},
    } as unknown as ExpressContext);
    expect(userId).toBeTruthy();
  });
});
