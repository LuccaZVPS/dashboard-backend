import { Contoller } from "../../protocols/controller";
import { Data, Context } from "../../protocols/controller";
import { CreateClientDTO } from "./DTOs/create-client";
import { DTOValidator } from "../../protocols/DTO-validator";
import { UserInputError } from "apollo-server-core";
export class CreateClient implements Contoller {
  constructor(private readonly validator: DTOValidator) {}
  async handle(_: any, { data }, context: Context) {
    const createClientDTO = new CreateClientDTO();
    const fields = [
      "name",
      "email",
      "address",
      "number",
      "instagram",
      "indication",
      "aquisitions",
      "observations",
    ];
    for (let field of fields) {
      if (data[field]) {
        createClientDTO[field] = data[field];
      }
    }
    const validate = await this.validator.validate(createClientDTO);
    if (validate.errors) {
      throw new UserInputError(validate.errors);
    }
  }
}
