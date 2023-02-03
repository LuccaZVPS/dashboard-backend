import { Account } from "../../account";

export interface FindAccount {
  find: (username: string, password: string) => Promise<Account | void>;
}
