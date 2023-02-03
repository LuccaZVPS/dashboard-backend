import { ExpressContext } from "apollo-server-express";

export interface Auth {
  auth: ({ req, res }: ExpressContext) => Promise<{ userId: string }>;
}
