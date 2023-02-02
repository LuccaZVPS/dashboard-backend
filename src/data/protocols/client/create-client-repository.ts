import { Client } from "../../../domain/client";
import { CreateClientDTO } from "../../../presentation/controllers/client/DTOs/create-client";

export interface CreateClientRepository {
  create: (DTO: CreateClientDTO) => Promise<Client>;
}
