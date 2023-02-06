import { UpdateArchitectDTO } from "../../../presentation/controllers/architect/DTOs/update-architect";
import { Architect } from "../../architect";

export interface UpdateArchitect {
  update: (architect: UpdateArchitectDTO) => Promise<Architect>;
}
