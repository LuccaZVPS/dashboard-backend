import { Client } from "../../../domain/client";
import { UpdateClient as UpdateClientType } from "../../../domain/useCases/update-client";
import { UpdateClientDTO } from "../../../presentation/controllers/client/DTOs/update-client";
import { UpdateClientRepository } from "../../protocols/client/update-client-repository";
export class UpdateClient implements UpdateClientType {
  constructor(
    private readonly updateClientRepository: UpdateClientRepository
  ) {}
  async update(client: UpdateClientDTO): Promise<Client> {
    const updatedClient = await this.updateClientRepository.update(client);
    return updatedClient;
  }
}
