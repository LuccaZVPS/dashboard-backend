import { CreateClientDTO } from "../../presentation/controllers/client/DTOs/create-client";
import { UpdateClientDTO } from "../../presentation/controllers/client/DTOs/update-client";
import { Client } from "../client";
import { CreateClient } from "./create-client";

export interface UpdateClient {
  update: (client: UpdateClientDTO) => Promise<Client>;
}
