import { Architect } from "../../../domain/architect";
import { UpdateArchitectDTO } from "../../../presentation/controllers/architect/DTOs/update-architect";

export interface UpdateArchitectRepository {
  update: (architect: UpdateArchitectDTO) => Promise<Architect>;
}
