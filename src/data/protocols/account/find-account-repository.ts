import { Account } from "../../../domain/account";

export interface findAccountRepository {
  find: (_id: string) => Promise<Account>;
}
