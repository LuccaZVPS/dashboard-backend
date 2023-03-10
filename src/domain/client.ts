import { Document } from "mongoose";

export interface Client {
  name: string;
  email: string;
  address: string;
  number: string;
  instagram: string;
  indication: string;
  aquisitions: string;
  observations: string;
  _id: string;
}
