import mongoose, { Model } from "mongoose";
import { ENV } from "@/constant/env";

// connection function
export const dbConnect = async () => {
  const conn = await mongoose
    .connect(ENV.DB_URL as string)
    .catch((err) => console.log(err));
  console.log("Mongoose Connection Established");
  return conn;
};
