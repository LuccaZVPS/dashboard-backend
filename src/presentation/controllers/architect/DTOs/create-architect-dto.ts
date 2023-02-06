import { IsDefined, ValidateIf } from "class-validator";

export class CreateArchitectDTO {
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
  observations: string;
  @IsDefined()
  @ValidateIf((e) => e === "")
  sampleDate: string;
  @IsDefined()
  @ValidateIf((e) => e === "")
  catalog: string;
  @IsDefined()
  @ValidateIf((e) => e === "")
  bankInfo: string;
}
