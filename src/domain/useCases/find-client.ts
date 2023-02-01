import { Client } from "../client";

export interface FindClient {
  find: (_id: string) => Promise<Client | undefined>;
}
