import { FindAccountRepository } from "../../../data/protocols/account/find-account-repository";
import { Account } from "../../../domain/account";
import { accountModel } from "../schemas/account.schema";

export class AccountRepository implements FindAccountRepository {
  async find(username: string): Promise<Account> {
    const account = await accountModel.findOne({
      username: username,
    });
    return account as unknown as Account;
  }
}
