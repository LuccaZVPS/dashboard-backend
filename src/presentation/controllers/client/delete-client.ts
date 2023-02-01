import { AuthenticationError, UserInputError } from "apollo-server-core";
import { DeleteClient } from "../../../domain/useCases/delete-client";
import { Context, Contoller, Data } from "../../protocols/controller";
import { DTOValidator } from "../../protocols/DTO-validator";
import { DeleteClientDTO } from "./DTOs/delete-client";

export class DeleteClientController implements Contoller {
  constructor(
    private readonly deleteClient: DeleteClient,
    private readonly validator: DTOValidator
  ) {}
  async handle(_: any, { data }: Data, { userId }: Context): Promise<any> {
    if (!userId) {
      throw new AuthenticationError("must be logged in");
    }
    const deleteClientDTO = new DeleteClientDTO();
    if (data?._id) {
      deleteClientDTO._id = data?._id;
    }
    const validate = await this.validator.validate(deleteClientDTO);
    if (validate.errors) {
      throw new UserInputError(validate.errors);
    }
    const isDeleted = this.deleteClient.delete(deleteClientDTO._id);
    return isDeleted;
  }
}
