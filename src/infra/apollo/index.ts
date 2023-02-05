import { ApolloServer } from "apollo-server";
import { resolvers, typeDefs } from "./rootTypes";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { config } from "dotenv";
import { mongoHelper } from "../db/connection";
import { context } from "./context";
config();
mongoHelper.connect("mongodb://127.0.0.1:27017/test").then(() => {
  console.log("Mongo connected");
});
export const apolloServer = new ApolloServer({
  resolvers,
  typeDefs,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context,
});
