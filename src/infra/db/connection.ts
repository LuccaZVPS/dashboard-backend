import mongoose from "mongoose";

export const mongoHelper = {
  connect: async (url: string) => {
    await mongoose.connect(url);
  },
  close: async () => {
    await mongoose.connection.close();
  },
};
