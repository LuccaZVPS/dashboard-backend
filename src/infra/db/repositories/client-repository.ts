import { CreateClientRepository } from "../../../data/protocols/client/create-client-repository";
import { DeleteClientRepository } from "../../../data/protocols/client/delete-client-repository";
import { FindClientRepository } from "../../../data/protocols/client/find-client-repository";
import { GetClientsRepository } from "../../../data/protocols/client/get-clients-repository";
import { UpdateClientRepository } from "../../../data/protocols/client/update-client-repository";
import { Client } from "../../../domain/client";
import { CreateClientDTO } from "../../../presentation/controllers/client/DTOs/create-client";
import { UpdateClientDTO } from "../../../presentation/controllers/client/DTOs/update-client";
import { clientModel } from "../schemas/client.schema";

export class ClientRepository
  implements
    CreateClientRepository,
    GetClientsRepository,
    DeleteClientRepository,
    UpdateClientRepository,
    FindClientRepository
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
    const clients = await clientModel.find().sort({ name: "asc" });
    return clients as unknown as Client[];
  }
  async delete(_id: string): Promise<boolean> {
    const isDeleted = clientModel.deleteOne({ _id });
    if ((await isDeleted).deletedCount < 1) {
      throw new Error();
    }
    return true;
  }
  async update(client: UpdateClientDTO): Promise<Client> {
    const updatedClient = await clientModel.findOneAndUpdate(
      { _id: client._id },
      {
        $set: {
          ...client,
        },
      },
      { new: true }
    );
    return updatedClient as unknown as Client;
  }
  async find(_id: String): Promise<Client | void> {
    const client = await clientModel.findOne({ _id });
    if (client) {
      return client as unknown as Client;
    }
  }
}
