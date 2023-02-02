import { validate as validateDTO } from "class-validator";
import { DTOValidator } from "../../presentation/protocols/DTO-validator";
export const Validate = async (classModel: any) => {
  return await validateDTO(classModel);
};
class Validator implements DTOValidator {
  async validate(classModel: any) {
    const isValid = await validators.Validate(classModel);
    if (isValid.length === 0) {
      return { errors: "" };
    }

    const errors = JSON.stringify(
      isValid.map((errors) => {
        return {
          field: errors.property,
          errors: errors.constraints,
        };
      })
    );

    return { errors };
  }
}
export const validators = { Validator, Validate };
