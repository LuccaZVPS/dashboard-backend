import {
  AuthenticationError,
  UserInputError,
  ValidationError,
} from "apollo-server-core";
import { FindArchitect } from "../../../domain/useCases/architect/find-architect";
import { UpdateArchitect } from "../../../domain/useCases/architect/update-architect";
import { Context, Contoller, Data } from "../../protocols/controller";
import { DTOValidator } from "../../protocols/DTO-validator";
import { UpdateArchitectDTO } from "./DTOs/update-architect";

export class UpdateArchitectController implements Contoller {
  constructor(
    private readonly validator: DTOValidator,
    private readonly findArchitect: FindArchitect,
    private readonly updateArchitect: UpdateArchitect
  ) {}
  async handle(_: any, { data }: Data, { userId }: Context): Promise<any> {
    if (!userId) {
      throw new AuthenticationError("must be logged in");
    }
    const fields = [
      "_id",
      "name",
      "email",
      "address",
      "number",
      "instagram",
      "observations",
      "sampleDate",
      "catalog",
      "bankInfo",
      "_id",
    ];
    const createArchitectDTO = new UpdateArchitectDTO();
    for (let field of fields) {
      if (data[field]) {
        createArchitectDTO[field] = data[field];
      }
    }
    const isValidDTO = await this.validator.validate(createArchitectDTO);
    if (isValidDTO.errors) {
      throw new UserInputError(isValidDTO.errors);
    }
    const architectExist = await this.findArchitect.find(
      createArchitectDTO._id
    );
    if (!architectExist) {
      throw new ValidationError("architect does not exist");
    }
    const updatedUser = await this.updateArchitect.update(createArchitectDTO);
    return updatedUser;
  }
}
