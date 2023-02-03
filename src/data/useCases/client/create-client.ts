import { Client } from "../../../domain/client";
import { CreateClient as CreateClientType } from "../../../domain/useCases/client/create-client";
import { CreateClientDTO } from "../../../presentation/controllers/client/DTOs/create-client";
import { CreateClientRepository } from "../../protocols/client/create-client-repository";
export class CreateClient implements CreateClientType {
  constructor(private readonly createRepository: CreateClientRepository) {}
  async create(createClientDTO: CreateClientDTO): Promise<Client> {
    const client = await this.createRepository.create(createClientDTO);
    return client;
  }
}
