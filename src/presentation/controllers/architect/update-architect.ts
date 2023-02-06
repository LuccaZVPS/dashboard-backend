import { AuthenticationError } from "apollo-server-core";
import { FindArchitect } from "../../../domain/useCases/architect/find-architect";
import { UpdateArchitect } from "../../../domain/useCases/architect/update-architect";
import { Context, Contoller, Data } from "../../protocols/controller";
import { DTOValidator } from "../../protocols/DTO-validator";

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
  }
}
