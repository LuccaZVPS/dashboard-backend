import mongoose from "mongoose";

const ArchitectSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  number: String,
  instagram: String,
  observations: String,
  sampleDate: String,
  catalog: String,
  bankInfo: String,
});
export const architectModel = mongoose.model("Architect", ArchitectSchema);
