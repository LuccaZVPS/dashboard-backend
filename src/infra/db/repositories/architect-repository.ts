import { CreateArchitectRepository } from "../../../data/protocols/architect/create-architect-repository";
import { DeleteArchitectRepository } from "../../../data/protocols/architect/delete-architect-repositort";
import { FindArchitectRepository } from "../../../data/protocols/architect/find-architect-repository";
import { GetArchitectsRepository } from "../../../data/protocols/architect/get-architects-repository";
import { UpdateArchitectRepository } from "../../../data/protocols/architect/update-architect-repository";
import { Architect } from "../../../domain/architect";
import { CreateArchitectDTO } from "../../../presentation/controllers/architect/DTOs/create-architect-dto";
import { UpdateArchitectDTO } from "../../../presentation/controllers/architect/DTOs/update-architect";
import { architectModel } from "../schemas/architect.schema";

export class ArchitectRepository
  implements
    GetArchitectsRepository,
    CreateArchitectRepository,
    FindArchitectRepository,
    DeleteArchitectRepository,
    UpdateArchitectRepository
{
  async get(): Promise<Architect[]> {
    return (await architectModel
      .find()
      .sort({ name: "asc" })) as unknown as Architect[];
  }
  async create(architect: CreateArchitectDTO): Promise<Architect> {
    const createdArchitect = await architectModel.create(architect);
    return createdArchitect as unknown as Architect;
  }
  async find(_id: string): Promise<Architect> {
    const architectFind = await architectModel.findOne({ _id: _id });
    return architectFind as unknown as Architect;
  }
  async delete(_id: string): Promise<void> {
    await architectModel.findOneAndDelete({ _id: _id });
  }
  async update(architect: UpdateArchitectDTO): Promise<Architect> {
    const updatedArchitect = await architectModel.findOneAndUpdate(
      { _id: architect._id },
      { ...architect },
      { new: true }
    );
    return updatedArchitect as unknown as Architect;
  }
}
