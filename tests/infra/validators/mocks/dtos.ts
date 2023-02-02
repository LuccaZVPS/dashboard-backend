import { IsNotEmpty, IsString } from "class-validator";

export class ClientDTO {
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
}
