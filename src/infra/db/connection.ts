import mongoose from "mongoose";

export const mongoHelper = {
  connect: (url: string) => {
    mongoose.connect(url);
  },
  close: () => {
    mongoose.connection.close();
  },
};
