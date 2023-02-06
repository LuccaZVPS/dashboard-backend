import { Architect } from "../../../domain/architect";
import { FindArchitect as FindArchitectType } from "../../../domain/useCases/architect/find-architect";
import { FindArchitectRepository } from "../../protocols/architect/find-architect-repository";
export class FindArchitect implements FindArchitectType {
  constructor(private readonly findArchitect: FindArchitectRepository) {}
  async find(_id: string): Promise<void | Architect> {
    const accountExist = await this.findArchitect.find(_id);
    if (!accountExist?._id) {
      return;
    }
    return accountExist;
  }
}
