import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class DeleteClientDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  _id: string;
}
