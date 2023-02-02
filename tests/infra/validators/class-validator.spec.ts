import { validators } from "../../../src/infra/validators/class-validator";
import { ClientDTO } from "./mocks/dtos";

describe("Validator", () => {
  const makeSut = () => {
    return {
      sut: new validators.Validator(),
    };
  };
  test("should call validate with correct value", async () => {
    const { sut } = makeSut();
    const spy = jest.spyOn(validators, "Validate");
    const dto = new ClientDTO();
    dto.name = "Lucca";
    await sut.validate(dto);
    expect(spy).toBeCalledWith(dto);
  });
  test("should return errors if invalid DTO is provided", async () => {
    const { sut } = makeSut();
    const dto = new ClientDTO();
    dto.name = "Lucca";
    const { errors } = await sut.validate(dto);
    expect(errors).toBeTruthy();
  });
  test("should not return errors if valid DTO is provided", async () => {
    const { sut } = makeSut();
    const dto = new ClientDTO();
    dto.name = "Lucca";
    dto.lastName = "Lucca";
    const { errors } = await sut.validate(dto);
    expect(errors).toBeFalsy();
  });
});
