import { AuthenticationError, UserInputError } from "apollo-server-core";
import { DeleteArchitect } from "../../../domain/useCases/architect/delete-architect";
import { Context, Contoller, Data } from "../../protocols/controller";
import { DTOValidator } from "../../protocols/DTO-validator";
import { DeleteArchitectDTO } from "./DTOs/delete-architect-dto";

export class DeleteArchitectController implements Contoller {
  constructor(
    private readonly deleteArchitect: DeleteArchitect,
    private readonly validator: DTOValidator
  ) {}
  async handle(_: any, { data }: Data, { userId }: Context): Promise<any> {
    if (!userId) {
      throw new AuthenticationError("must be logged in");
    }
    const deleteArchitectDTO = new DeleteArchitectDTO();
    if (data?._id) {
      deleteArchitectDTO._id = data?._id;
    }
    const isValidDTO = await this.validator.validate(deleteArchitectDTO);
    if (isValidDTO.errors) {
      throw new UserInputError(isValidDTO.errors);
    }
  }
}
