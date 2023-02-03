import { DeleteClient as DeleteClientType } from "../../../domain/useCases/client/delete-client";
import { DeleteClientRepository } from "../../protocols/client/delete-client-repository";
export class DeleteClient implements DeleteClientType {
  constructor(
    private readonly deleteClientRepository: DeleteClientRepository
  ) {}
  async delete(_id: string): Promise<void> {
    const isDeleted = await this.deleteClientRepository.delete(_id);
    if (!isDeleted) {
      throw new Error();
    }
  }
}
