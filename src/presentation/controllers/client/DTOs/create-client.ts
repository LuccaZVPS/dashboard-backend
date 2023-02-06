import { IsDefined, ValidateIf } from "class-validator";

export class CreateClientDTO {
  @IsDefined()
  @ValidateIf((e) => e === "")
  name: string;
  @IsDefined()
  @ValidateIf((e) => e === "")
  email: string;
  @IsDefined()
  @ValidateIf((e) => e === "")
  address: string;
  @IsDefined()
  @ValidateIf((e) => e === "")
  number: string;
  @IsDefined()
  @ValidateIf((e) => e === "")
  instagram: string;
  @IsDefined()
  @ValidateIf((e) => e === "")
  indication: string;
  @IsDefined()
  @ValidateIf((e) => e === "")
  aquisitions: string;
  @IsDefined()
  @ValidateIf((e) => e === "")
  observations: string;
}
