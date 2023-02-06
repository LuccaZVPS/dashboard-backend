import { Architect } from "../../../domain/architect";
import { CreateArchitectDTO } from "../../../presentation/controllers/architect/DTOs/create-architect-dto";

export interface CreateArchitectRepository {
  create: (architect: CreateArchitectDTO) => Promise<Architect>;
}
