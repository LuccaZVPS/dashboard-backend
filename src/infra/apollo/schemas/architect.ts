import { gql } from "apollo-server-core";
import {
  makeCreateArchitectController,
  makeDeleteArchitectController,
  makeGetArchitectController,
  makeUpdateArchitectController,
} from "../factories/architects";

export const architectTypeDefs = gql`
  extend type Query {
    getArchitects: [Architect!]!
  }
  extend type Mutation {
    createArchitect(data: CreateArchitectDTO!): Architect!
    updateArchitect(data: UpdateArchitectDTO!): Architect!
    deleteArchitect(data: DeleteArchitect): Boolean
  }

  type Architect {
    name: String
    email: String
    address: String
    number: String
    instagram: String
    observations: String
    sampleDate: String
    catalog: String
    bankInfo: String
    _id: String
  }
  input DeleteArchitect {
    _id: String
  }
  input UpdateArchitectDTO {
    name: String
    email: String
    address: String
    number: String
    instagram: String
    observations: String
    sampleDate: String
    catalog: String
    bankInfo: String
    _id: String
  }
  input CreateArchitectDTO {
    name: String
    email: String
    address: String
    number: String
    instagram: String
    observations: String
    sampleDate: String
    catalog: String
    bankInfo: String
  }
`;
export const architectResolvers = {
  Query: {
    getArchitects: makeGetArchitectController,
  },
  Mutation: {
    createArchitect: makeCreateArchitectController,
    updateArchitect: makeUpdateArchitectController,
    deleteArchitect: makeDeleteArchitectController,
  },
};
