import mongoose from "mongoose";
import dns from 'node:dns/promises';
dns.setServers(['8.8.8.8', '1.1.1.1']);
const connecDB = async () => {
  try{
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Error while connecting to MongoDB", error);
  }
}

export default connecDB;