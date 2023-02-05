import { ExpressContext } from "apollo-server-express";
import { AuthMiddleware } from "../../presentation/middlewares/auth";
import { JWTAdapter } from "../encrypter/jwt-adapter";
export const context = async ({ req, res }) => {
  const decrypt = new JWTAdapter();
  const userId = await new AuthMiddleware(decrypt).auth(req);

  return {
    userId,
    express: { res },
  };
};
export interface context {
  userId: undefined | string;
  express: ExpressContext;
}
