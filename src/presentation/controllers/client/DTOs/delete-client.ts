import { IsNotEmpty, IsString } from "class-validator";

export class DeleteClientDTO {
  @IsNotEmpty()
  @IsString()
  _id: string;
}
