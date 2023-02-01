import { CreateClientDTO } from "../../presentation/controllers/client/DTOs/create-client";
import { Client } from "../client";
import { CreateClient } from "./create-client";

export interface UpdateClient {
  update: (client: CreateClientDTO) => Promise<Client>;
}
