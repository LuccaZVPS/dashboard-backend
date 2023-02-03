import { AuthenticationError } from "apollo-server-core";
import { GetClients } from "../../../domain/useCases/client/get-clients";
import { Context, Contoller, Data } from "../../protocols/controller";

export class GetClientsController implements Contoller {
  constructor(private readonly getClients: GetClients) {}
  async handle(_: any, data: Data, { userId }: Context): Promise<any> {
    if (!userId) {
      throw new AuthenticationError("must be logged in");
    }
    const clients = await this.getClients.get();
    return clients;
  }
}
