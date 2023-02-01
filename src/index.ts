import { apolloServer } from "./infra/apollo";

apolloServer.listen(8000).then(() => {
  console.log("Server is on!");
});
