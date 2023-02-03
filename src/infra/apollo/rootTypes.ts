import { gql } from "apollo-server";
import { clientResolvers, clientTypeDefs } from "./schemas/client";

const rootTypeDefs = gql`
  type Query {
    _empty: Boolean
  }
  type Mutation {
    _empty: Boolean
  }
`;
const rootResolver = {
  Query: {
    _empty: () => true,
  },
  Mutation: {
    _empty: () => true,
  },
};
export const typeDefs = [rootTypeDefs, clientTypeDefs];
export const resolvers = [rootResolver, clientResolvers];
