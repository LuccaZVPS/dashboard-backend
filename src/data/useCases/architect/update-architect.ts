import { Architect } from "../../../domain/architect";
import { UpdateArchitect as UpdateArchitectType } from "../../../domain/useCases/architect/update-architect";
import { UpdateArchitectDTO } from "../../../presentation/controllers/architect/DTOs/update-architect";
import { UpdateArchitectRepository } from "../../protocols/architect/update-architect-repository";
export class UpdateArchitect implements UpdateArchitectType {
  constructor(
    private readonly updateArchitectRepository: UpdateArchitectRepository
  ) {}
  async update(architect: UpdateArchitectDTO): Promise<Architect> {
    const updatedArchitect = await this.updateArchitectRepository.update(
      architect
    );
    return updatedArchitect;
  }
}
