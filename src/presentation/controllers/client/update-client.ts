import { AuthenticationError, UserInputError } from "apollo-server-core";
import { FindClient } from "../../../domain/useCases/find-client";
import { UpdateClient } from "../../../domain/useCases/update-client";
import { Context, Contoller, Data } from "../../protocols/controller";
import { DTOValidator } from "../../protocols/DTO-validator";
import { UpdateClientDTO } from "./DTOs/update-client";

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
    const updateClientDTO = new UpdateClientDTO();
    const fields = [
      "name",
      "email",
      "address",
      "number",
      "instagram",
      "indication",
      "aquisitions",
      "observations",
      "_id",
    ];
    for (let field of fields) {
      if (data[field]) {
        updateClientDTO[field] = data[field];
      }
    }
    const validate = await this.validator.validate(updateClientDTO);
    if (validate.errors) {
      throw new UserInputError(validate.errors);
    }
    const clientExist = await this.findClient.find(updateClientDTO._id);
    if (!clientExist) {
      throw new UserInputError("client not found");
    }
    const updatedClient = this.updateClient.update({ ...updateClientDTO });
    return updatedClient;
  }
}
