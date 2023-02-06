import { DeleteArchitect as DeleteArchitectType } from "../../../domain/useCases/architect/delete-architect";
import { DeleteArchitectRepository } from "../../protocols/architect/delete-architect-repositort";
export class DeleteArchitect implements DeleteArchitectType {
  constructor(
    private readonly deleteArchitectRepository: DeleteArchitectRepository
  ) {}
  async delete(_id: string): Promise<void> {
    await this.deleteArchitectRepository.delete(_id);
  }
}
