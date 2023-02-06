import { AuthenticationError } from "apollo-server-core";
import { GetArchitecs } from "../../../domain/useCases/architect/get-architects";
import { Context, Contoller, Data } from "../../protocols/controller";
import { DTOValidator } from "../../protocols/DTO-validator";

export class GetArchitectsController implements Contoller {
  constructor(private readonly getArchitects: GetArchitecs) {}
  async handle(_: any, data: Data, { userId }: Context): Promise<any> {
    if (!userId) {
      throw new AuthenticationError("must be logged in");
    }
    const architects = await this.getArchitects.get();
    return architects;
  }
}
