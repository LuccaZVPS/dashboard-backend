import { CreateJwt } from "../../presentation/protocols/create-jwt";
import { sign } from "jsonwebtoken";
export const jwt = {
  sign,
};
export class JWTAdapter implements CreateJwt {
  async encrypt(_id: string): Promise<string> {
    const token = jwt.sign({ _id }, process.env.JWT_SECRET);
    console.log(token);
    return token;
  }
}
