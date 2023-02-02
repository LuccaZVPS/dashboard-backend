import { CreateClientRepository } from "../../../data/protocols/client/create-client-repository";
import { GetClientsRepository } from "../../../data/protocols/client/get-clients-repository";
import { Client } from "../../../domain/client";
import { CreateClientDTO } from "../../../presentation/controllers/client/DTOs/create-client";
import { clientModel } from "../schemas/client.schema";

export class ClientRepository
  implements CreateClientRepository, GetClientsRepository
{
  async create(DTO: CreateClientDTO): Promise<Client> {
    const client = await clientModel.create({
      ...DTO,
    });

    if (client._id) {
      return client as unknown as Client;
    }
    throw new Error();
  }
  async get(): Promise<Client[]> {
    const clients = await clientModel.find();
    return clients as unknown as Client[];
  }
}
