import { jwt, JWTAdapter } from "../../../src/infra/encrypter/jwt";
import { config } from "dotenv";
config();
describe("JWT adapter", () => {
  const makeSut = () => {
    return {
      sut: new JWTAdapter(),
    };
  };
  test("should call sign method with correct value", async () => {
    const { sut } = makeSut();
    const spy = jest.spyOn(jwt, "sign");
    await sut.encrypt("any_string");
    expect(spy).toHaveBeenCalledWith(
      { _id: "any_string" },
      process.env.JWT_SECRET
    );
  });
  test("should return the jwt", async () => {
    const { sut } = makeSut();
    jest.spyOn(jwt, "sign").mockImplementationOnce(() => {
      return "jwt";
    });
    const response = await sut.encrypt("any_string");
    expect(response).toBe("jwt");
  });
  test("should throws if jwt throws", async () => {
    const { sut } = makeSut();
    jest.spyOn(jwt, "sign").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(async () => {
      await sut.encrypt("any_string");
    }).rejects.toThrow(new Error());
  });
});
