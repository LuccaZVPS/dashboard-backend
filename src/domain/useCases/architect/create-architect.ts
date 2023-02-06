import { CreateArchitectDTO } from "../../../presentation/controllers/architect/DTOs/create-architect-dto";
import { Architect } from "../../architect";

export interface CreateArchitect {
  create: (createArchitectDTO: CreateArchitectDTO) => Promise<Architect>;
}
