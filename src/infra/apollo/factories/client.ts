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
const createClient = new CreateClient(clientRepository);
export const createClientResolver = new CreateClientController(
  validator,
  createClient
).handle;
//Get Clients Resolver
const getClients = new GetClients(clientRepository);
export const getClientsResolver = new GetClientsController(getClients).handle;
//Delete Client Resolver
const deleteClient = new DeleteClient(clientRepository);
export const deleteClientResolver = new DeleteClientController(
  deleteClient,
  validator
).handle;
//Update Client Resolver
const updateClient = new UpdateClient(clientRepository);
const findClient = new FindClient(clientRepository);
export const updateClientResolver = new UpdateClientController(
  validator,
  findClient,
  updateClient
).handle;
