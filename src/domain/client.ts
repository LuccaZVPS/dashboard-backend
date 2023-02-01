import { Document } from "mongoose";

export interface Client extends Document {
  name: string;
  email: string;
  addres: string;
  number: string;
  instagram: string;
  indication: string;
  aquisitions: string;
  observations: string;
  _id: string;
}
