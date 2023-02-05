import { FindAccount } from "../../../data/useCases/account/find-client";
import { LoginController } from "../../../presentation/controllers/acccount/login";
import { AccountRepository } from "../../db/repositories/account-repository";
import { BcryptAdapter } from "../../encrypter/bcrypt-adapter";
import { JWTAdapter } from "../../encrypter/jwt-adapter";
import { validators } from "../../validators/class-validator";

export const makeLoginController = async (_: any, __: any, ___: any) => {
  const validator = new validators.Validator();
  const accountRepository = new AccountRepository();
  const jwtAdapter = new JWTAdapter();
  const bcryptAdapter = new BcryptAdapter();
  const findAccount = new FindAccount(accountRepository, bcryptAdapter);
  const loginController = new LoginController(
    validator,
    findAccount,
    jwtAdapter
  );
  return await loginController.handle(_, __, ___);
};
