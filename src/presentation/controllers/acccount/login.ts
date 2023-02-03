import { UserInputError, ValidationError } from "apollo-server-core";
import { FindAccount } from "../../../domain/useCases/account/find-account";
import { Context, Contoller, Data } from "../../protocols/controller";
import { CreateJwt } from "../../protocols/create-jwt";
import { DTOValidator } from "../../protocols/DTO-validator";
import { LoginDTO } from "./DTOs/login";

export class LoginController implements Contoller {
  constructor(
    private readonly validator: DTOValidator,
    private readonly findAccount: FindAccount,
    private readonly createJWT: CreateJwt
  ) {}
  async handle(
    _: any,
    { data }: Data,
    { userId, express }: Context
  ): Promise<any> {
    const loginDTO = new LoginDTO();
    const fields = ["username", "password"];
    for (let field of fields) {
      if (data[field]) {
        loginDTO[field] = data[field];
      }
    }
    const isValidDTO = await this.validator.validate(loginDTO);
    if (isValidDTO.errors) {
      throw new UserInputError(isValidDTO.errors);
    }
    const accountExist = await this.findAccount.find(
      loginDTO.username,
      loginDTO.password
    );
    if (!accountExist) {
      throw new ValidationError("Account does not exist");
    }
    const jwt = await this.createJWT.encrypt(accountExist._id);
    express.res.cookie("jwt", jwt, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "none",
    });
    return true;
  }
}
