import { Document } from "mongoose";

export interface Architect extends Document {
  name: string;
  email: string;
  address: string;
  number: string;
  instagram: string;
  observations: string;
  sampleDate: string;
  catalog: string;
  bankInfo: string;
  _id: string;
}
