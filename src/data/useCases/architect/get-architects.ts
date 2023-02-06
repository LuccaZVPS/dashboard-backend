import { GetArchitectsRepository } from "../../protocols/architect/get-architects-repository";
import { GetArchitecs as GetArchitecsType } from "../../../domain/useCases/architect/get-architects";
import { Architect } from "../../../domain/architect";
export class GetArchitects implements GetArchitecsType {
  constructor(
    private readonly getArchitectsRepository: GetArchitectsRepository
  ) {}
  async get(): Promise<Architect[]> {
    const architects = await this.getArchitectsRepository.get();
    return architects;
  }
}
