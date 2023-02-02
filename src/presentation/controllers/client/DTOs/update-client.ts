import { IsNotEmpty, IsString } from "class-validator";

export class UpdateClientDTO {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  addres: string;
  @IsString()
  number: string;
  @IsString()
  instagram: string;
  @IsString()
  indication: string;
  @IsString()
  aquisitions: string;
  @IsString()
  observations: string;
  @IsNotEmpty()
  @IsString()
  _id: string;
}
