import { CreateClientDTO } from "../../presentation/controllers/client/DTOs/create-client";
import { Client } from "../client";

export interface CreateClient {
  create: (createClientDTO: CreateClientDTO) => Promise<Client>;
}
