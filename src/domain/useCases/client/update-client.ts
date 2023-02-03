import { UpdateClientDTO } from "../../../presentation/controllers/client/DTOs/update-client";
import { Client } from "../../client";

export interface UpdateClient {
  update: (client: UpdateClientDTO) => Promise<Client>;
}
