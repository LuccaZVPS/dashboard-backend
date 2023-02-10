import { resolvers, typeDefs } from "./rootTypes";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { config } from "dotenv";
import { mongoHelper } from "../db/connection";
import { ApolloServer } from "apollo-server-express";
import { context } from "./context";
import express from "express";
import cors from "cors";
config();
mongoHelper.connect(process.env.DATABASE_URL).then(() => {
  console.log("Mongo connected");
});
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
export const main = async () => {
  const apolloServer = new ApolloServer({
    resolvers,
    typeDefs,
    context,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    path: "/graphql",
    app,
    cors: { origin: process.env.CLIENT_URL, credentials: true },
  });
  app.listen(3000, () => {
    console.log("Server running");
  });
};
