import { Client } from "../../../domain/client";
import { FindClient as FindClientType } from "../../../domain/useCases/find-client";
import { FindClientRepository } from "../../protocols/client/find-client-repository";
export class FindClient implements FindClientType {
  constructor(private readonly findClientRepository: FindClientRepository) {}
  async find(_id: string): Promise<Client | void> {
    const client = await this.findClientRepository.find(_id);
    if (client) {
      return client;
    }
  }
}
