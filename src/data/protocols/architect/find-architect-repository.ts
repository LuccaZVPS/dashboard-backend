import { Architect } from "../../../domain/architect";

export interface FindArchitectRepository {
  find: (_id: string) => Promise<Architect>;
}
