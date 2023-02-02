import mongoose from "mongoose";

export const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  number: String,
  instagram: String,
  indication: String,
  aquisitions: String,
  observations: String,
});
export const clientModel = mongoose.model("Client", clientSchema);
