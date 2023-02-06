import { AuthenticationError } from "apollo-server-core";
import { CreateArchitect } from "../../../domain/useCases/architect/create-architect";
import { Context, Contoller, Data } from "../../protocols/controller";
import { DTOValidator } from "../../protocols/DTO-validator";
import { CreateArchitectDTO } from "./DTOs/create-architect-dto";

export class CreateArchitectController implements Contoller {
  constructor(
    private readonly validator: DTOValidator,
    private readonly createArchitect: CreateArchitect
  ) {}
  async handle(_: any, { data }: Data, { userId }: Context): Promise<any> {
    if (!userId) {
      throw new AuthenticationError("must be logged in");
    }
    const fields = [
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
    const createArchitectDTO = new CreateArchitectDTO();
    for (let field of fields) {
      if (data[field]) {
        createArchitectDTO[field] = data[field];
      }
    }
    const isValidDTO = await this.validator.validate(createArchitectDTO);
    if (isValidDTO.errors) {
      throw new AuthenticationError(isValidDTO.errors);
    }
    const createdArchitect = await this.createArchitect.create(
      createArchitectDTO
    );
    return createdArchitect;
  }
}
