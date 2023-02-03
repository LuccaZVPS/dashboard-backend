import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  username: String,
  password: String,
});
export const accountModel = mongoose.model("Account", accountSchema);
