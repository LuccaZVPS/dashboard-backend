import { CreateArchitect } from "../../../data/useCases/architect/create-architect";
import { DeleteArchitect } from "../../../data/useCases/architect/delete-architect";
import { FindArchitect } from "../../../data/useCases/architect/find-architect";
import { GetArchitects } from "../../../data/useCases/architect/get-architects";
import { UpdateArchitect } from "../../../data/useCases/architect/update-architect";
import { CreateArchitectController } from "../../../presentation/controllers/architect/create-architect";
import { DeleteArchitectController } from "../../../presentation/controllers/architect/delete-architect";
import { GetArchitectsController } from "../../../presentation/controllers/architect/get-architects";
import { UpdateArchitectController } from "../../../presentation/controllers/architect/update-architect";
import { ArchitectRepository } from "../../db/repositories/architect-repository";
import { validators } from "../../validators/class-validator";

const validator = new validators.Validator();
const architectRepository = new ArchitectRepository();
export const makeGetArchitectController = async (_, __, ___) => {
  const getArchitects = new GetArchitects(architectRepository);
  return await new GetArchitectsController(getArchitects).handle(_, __, ___);
};
export const makeCreateArchitectController = async (_, __, ___) => {
  const createArchitect = new CreateArchitect(architectRepository);
  return await new CreateArchitectController(validator, createArchitect).handle(
    _,
    __,
    ___
  );
};
export const makeDeleteArchitectController = async (_, __, ___) => {
  const deleteArchitect = new DeleteArchitect(architectRepository);
  return await new DeleteArchitectController(deleteArchitect, validator).handle(
    _,
    __,
    ___
  );
};
export const makeUpdateArchitectController = async (_, __, ___) => {
  const findArchitect = new FindArchitect(architectRepository);
  const updateArchitect = new UpdateArchitect(architectRepository);

  return await new UpdateArchitectController(
    validator,
    findArchitect,
    updateArchitect
  ).handle(_, __, ___);
};
