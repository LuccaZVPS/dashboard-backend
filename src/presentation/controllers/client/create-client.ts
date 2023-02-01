import { Contoller } from "../../protocols/controller";
import { Context } from "../../protocols/controller";
import { CreateClientDTO } from "./DTOs/create-client";
import { DTOValidator } from "../../protocols/DTO-validator";
import { UserInputError } from "apollo-server-core";
import { CreateClient } from "../../../domain/useCases/create-client";
export class CreateClientController implements Contoller {
  constructor(
    private readonly validator: DTOValidator,
    private readonly createClient: CreateClient
  ) {}
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

    const client = await this.createClient.create(createClientDTO);
    return client;
  }
}
