import { Client } from "../../client";

export interface GetClients {
  get: () => Promise<Client[]>;
}
