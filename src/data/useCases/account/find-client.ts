import { Account } from "../../../domain/account";
import { FindAccount as FindAccountType } from "../../../domain/useCases/account/find-account";
import { DecryptHash } from "../../protocols/account/decrypt";
import { FindAccountRepository } from "../../protocols/account/find-account-repository";
export class FindAccount implements FindAccountType {
  constructor(
    private readonly findAccountRepository: FindAccountRepository,
    private readonly bcryptAdapter: DecryptHash
  ) {}
  async find(username: string, password: string): Promise<void | Account> {
    const accountExist = await this.findAccountRepository.find(username);
    if (!accountExist._id) {
      return;
    }
    const decryptedPassword = await this.bcryptAdapter.decrypt(
      accountExist.password
    );
    if (password !== decryptedPassword) {
      return;
    }

    return accountExist;
  }
}
