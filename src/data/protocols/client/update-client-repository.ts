import { Client } from "../../../domain/client";
import { UpdateClientDTO } from "../../../presentation/controllers/client/DTOs/update-client";

export interface UpdateClientRepository {
  update: (client: UpdateClientDTO) => Promise<Client>;
}
