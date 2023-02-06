import { Architect } from "../../../domain/architect";

export interface GetArchitectsRepository {
  get(): Promise<Architect[]>;
}
