import { Architect } from "../../architect";

export interface GetArchitecs {
  get: () => Promise<Architect[]>;
}
