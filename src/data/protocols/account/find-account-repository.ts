import { Account } from "../../../domain/account";

export interface FindAccountRepository {
  find: (_id: string) => Promise<Account>;
}
