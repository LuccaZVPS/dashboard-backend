import { DecryptHash } from "../../data/protocols/account/decrypt";
import { compareSync } from "bcryptjs";
export const bcrypt = {
  compareSync,
};
export class BcryptAdapter implements DecryptHash {
  async compare(string: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(string, hash);
  }
}
