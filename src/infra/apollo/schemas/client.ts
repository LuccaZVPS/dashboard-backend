import { gql } from "apollo-server-core";
import {
  makeCreateClientController,
  makeDeleteClientController,
  makeGetClientsController,
  makeUpdateClientControlller,
} from "../factories/client";

export const clientTypeDefs = gql`
  extend type Query {
    getClients: [Client!]!
  }
  extend type Mutation {
    updateClient(data: InputUpdateClient!): Client!
    createClient(data: InputCreateClient!): Client!
    deleteClient(data: DeleteClient): Boolean
  }

  type Client {
    name: String
    email: String
    address: String
    number: String
    instagram: String
    indication: String
    aquisitions: String
    observations: String
    _id: String
  }
  input InputUpdateClient {
    name: String!
    email: String!
    address: String!
    number: String!
    instagram: String!
    indication: String!
    aquisitions: String!
    observations: String!
    _id: String!
  }
  input InputCreateClient {
    name: String!
    email: String!
    address: String!
    number: String!
    instagram: String!
    indication: String!
    aquisitions: String!
    observations: String!
  }
  input DeleteClient {
    _id: String!
  }
`;
export const clientResolvers = {
  Query: {
    getClients: makeGetClientsController,
  },
  Mutation: {
    createClient: makeCreateClientController,
    updateClient: makeUpdateClientControlller,
    deleteClient: makeDeleteClientController,
  },
};
