import { AuthenticationError } from "apollo-server-core";
import { DeleteArchitect } from "../../../domain/useCases/architect/delete-architect";
import { Context, Contoller, Data } from "../../protocols/controller";

export class DeleteArchitectController implements Contoller {
  constructor(private readonly deleteArchitect: DeleteArchitect) {}
  async handle(_: any, data: Data, { userId }: Context): Promise<any> {
    if (!userId) {
      throw new AuthenticationError("must be logged in");
    }
  }
}
