import { gql } from "apollo-server-core";
import { makeLoginController } from "../factories/account";

export const accountTypeDefs = gql`
  extend type Mutation {
    login(data: LoginDTO!): Boolean
  }
  input LoginDTO {
    username: String!
    password: String!
  }
`;
export const accountResolvers = {
  Mutation: {
    login: makeLoginController,
  },
};
