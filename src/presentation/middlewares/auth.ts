import { ExpressContext } from "apollo-server-express";
import { Auth } from "../protocols/auth";
import { DecryptJwtTs } from "../protocols/decrypt-jwt";

export const cookieParser = {
  parser: (cookie: string) => {
    var token = "";
    if (cookie.includes(";")) {
      const cookieArray = cookie.split(";");
      for (let cookies of cookieArray) {
        const cookieName = cookies.split("=");
        if (cookieName[0].trim() === "jwt") {
          token = cookieName[1];
        }
      }
      return token;
    }
    if (!cookie.includes("jwt")) {
      return token;
    }

    token = cookie.split("=")[1].trim();
    return token;
  },
};
export class AuthMiddleware implements Auth {
  constructor(private readonly decryptJWT: DecryptJwtTs) {}
  async auth({ req, res }: ExpressContext): Promise<{ userId: string }> {
    try {
      const token = cookieParser.parser(req.headers.cookie);
      const isValidToken = await this.decryptJWT.decrypt(token);
      if (!isValidToken?._id) {
        return { userId: "" };
      }
      return { userId: isValidToken._id };
    } catch {
      return { userId: "" };
    }
  }
}
