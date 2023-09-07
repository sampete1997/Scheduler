import mongoose from "mongoose";
import User from "./user.model";
import Appointments from "./appointments.model";

const connectDB = async (MongoURI: string) => {
  try {
    const connection = await mongoose.connect(MongoURI);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

/* all db collections */

export const dbCollections = {
  User,
  Appointments,
};

export default connectDB;
