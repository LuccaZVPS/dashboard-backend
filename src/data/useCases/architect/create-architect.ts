import { Architect } from "../../../domain/architect";
import { CreateArchitect as CreateArchitectType } from "../../../domain/useCases/architect/create-architect";
import { CreateArchitectDTO } from "../../../presentation/controllers/architect/DTOs/create-architect-dto";
import { CreateArchitectRepository } from "../../protocols/architect/create-architect-repository";
export class CreateArchitect implements CreateArchitectType {
  constructor(
    private readonly createArchitectRepository: CreateArchitectRepository
  ) {}
  async create(createArchitectDTO: CreateArchitectDTO): Promise<Architect> {
    const createdArchitect =
      this.createArchitectRepository.create(createArchitectDTO);
    return createdArchitect;
  }
}
