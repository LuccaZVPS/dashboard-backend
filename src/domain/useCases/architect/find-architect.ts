import { Architect } from "../../architect";
export interface FindArchitect {
  find: (_id: string) => Promise<Architect | void>;
}
