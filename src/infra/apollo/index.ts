import { ApolloServer } from "apollo-server";
import { resolvers, typeDefs } from "./rootTypes";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
export const apolloServer = new ApolloServer({
  resolvers,
  typeDefs,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});
