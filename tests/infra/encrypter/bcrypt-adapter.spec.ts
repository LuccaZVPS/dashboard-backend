import {
  bcrypt,
  BcryptAdapter,
} from "../../../src/infra/encrypter/bcrypt-adapter";
describe("BcryptAdapter", () => {
  const makeSut = () => {
    return {
      sut: new BcryptAdapter(),
    };
  };
  test("should call compare method with correct value", async () => {
    const { sut } = makeSut();
    const spy = jest.spyOn(bcrypt, "compareSync");
    await sut.compare("any", "any");
    expect(spy).toHaveBeenCalledWith("any", "any");
  });
  test("should return true if compare method returns true", async () => {
    const { sut } = makeSut();
    jest.spyOn(bcrypt, "compareSync").mockImplementationOnce(() => {
      return true;
    });
    const response = await sut.compare("any", "any");
    expect(response).toBe(true);
  });
  test("should return fale if compare method returns false", async () => {
    const { sut } = makeSut();
    jest.spyOn(bcrypt, "compareSync").mockImplementationOnce(() => {
      return false;
    });
    const response = await sut.compare("any", "any");
    expect(response).toBe(false);
  });
});
