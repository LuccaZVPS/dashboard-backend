import { IsNotEmpty, IsString } from "class-validator";

export class DeleteArchitectDTO {
  @IsNotEmpty()
  @IsString()
  _id: String;
}
