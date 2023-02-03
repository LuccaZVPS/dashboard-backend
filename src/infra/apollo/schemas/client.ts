import { gql } from "apollo-server-core";
import { getClientsResolver } from "../factories/client";

export const clientTypeDefs = gql`
  extend type Query {
    getClients: [Client]!
  }

  type Client {
    name: String!
    email: String!
    addres: String!
    number: String!
    instagram: String!
    indication: String!
    aquisitions: String!
    observations: String!
    _id: String!
  }
`;
export const clientResolvers = {
  Query: {
    getClients: getClientsResolver,
  },
};
