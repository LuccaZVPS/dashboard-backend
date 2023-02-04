import { CreateJwt } from "../../presentation/protocols/create-jwt";
import { sign, verify } from "jsonwebtoken";
import { DecryptJwtTs } from "../../presentation/protocols/decrypt-jwt";
export const jwt = {
  sign,
  verify,
};
export class JWTAdapter implements CreateJwt, DecryptJwtTs {
  async encrypt(_id: string): Promise<string> {
    const token = jwt.sign({ _id }, process.env.JWT_SECRET);
    return token;
  }
  async decrypt(jwtString: string): Promise<any> {
    const token = jwt.verify(jwtString, process.env.JWT_SECRET);
    return token;
  }
}
