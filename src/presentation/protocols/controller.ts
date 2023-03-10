import { ExpressContext } from "apollo-server-express";

export class Contoller {
  handle: (_: any, data: Data, context: Context) => Promise<any>;
}
export interface Data {
  data: any;
}
export interface Context {
  userId: string;
  express?: ExpressContext;
}
