import { AuthenticationError, UserInputError } from "apollo-server-core";
import { FindClient } from "../../../domain/useCases/find-client";
import { UpdateClient } from "../../../domain/useCases/update-client";
import { Context, Contoller, Data } from "../../protocols/controller";
import { DTOValidator } from "../../protocols/DTO-validator";
import { CreateClientDTO } from "./DTOs/create-client";

export class UpdateClientController implements Contoller {
  constructor(
    private readonly validator: DTOValidator,
    private readonly findClient: FindClient,
    private readonly updateClient: UpdateClient
  ) {}
  async handle(_: any, { data }: Data, { userId }: Context): Promise<any> {
    if (!userId) {
      throw new AuthenticationError("must be logged in");
    }
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
