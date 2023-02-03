import { Client } from "../../../domain/client";
import { GetClients as GetClientsType } from "../../../domain/useCases/client/get-clients";
import { GetClientsRepository } from "../../protocols/client/get-clients-repository";
export class GetClients implements GetClientsType {
  constructor(private readonly getClientsRepository: GetClientsRepository) {}
  async get(): Promise<Client[]> {
    const clients = await this.getClientsRepository.get();
    return clients;
  }
}
