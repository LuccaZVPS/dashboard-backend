import { Client } from "../../../domain/client";

export interface GetClientsRepository {
  get: () => Promise<Client[]>;
}
