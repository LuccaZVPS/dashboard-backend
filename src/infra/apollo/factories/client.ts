import { CreateClient } from "../../../data/useCases/client/create-client";
import { DeleteClient } from "../../../data/useCases/client/delete-client";
import { FindClient } from "../../../data/useCases/client/find-client";
import { GetClients } from "../../../data/useCases/client/get-clients";
import { UpdateClient } from "../../../data/useCases/client/update-client";
import { CreateClientController } from "../../../presentation/controllers/client/create-client";
import { DeleteClientController } from "../../../presentation/controllers/client/delete-client";
import { GetClientsController } from "../../../presentation/controllers/client/get-clients";
import { UpdateClientController } from "../../../presentation/controllers/client/update-client";

import { ClientRepository } from "../../db/repositories/client-repository";
import { validators } from "../../validators/class-validator";
//Create Client Resolver
const validator = new validators.Validator();
const clientRepository = new ClientRepository();
export const makeCreateClientController = async (_, __, ___) => {
  const createClient = new CreateClient(clientRepository);
  return await new CreateClientController(validator, createClient).handle(
    _,
    __,
    ___
  );
};
//Get Clients Resolver
export const makeGetClientsController = async (_, __, ___) => {
  const getClients = new GetClients(clientRepository);
  return await new GetClientsController(getClients).handle(_, __, ___);
};
//Delete Client Resolver
export const makeDeleteClientController = async (_, __, ___) => {
  const deleteClient = new DeleteClient(clientRepository);
  return await new DeleteClientController(deleteClient, validator).handle(
    _,
    __,
    ___
  );
};
//Update Client Resolver
export const makeUpdateClientControlller = async (_, __, ___) => {
  const updateClient = new UpdateClient(clientRepository);
  const findClient = new FindClient(clientRepository);
  return new UpdateClientController(validator, findClient, updateClient).handle(
    _,
    __,
    ___
  );
};
