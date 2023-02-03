import { Client } from "../../../domain/client";

export interface FindClientRepository {
  find: (_id: string) => Promise<Client | void>;
}
