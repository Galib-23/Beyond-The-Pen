import mongoose from "mongoose";

const connection = {};

export const connectToDb = async() => {
  try {

    if (connection.isConnected) {
        console.log("Already Connected");
    }

    const db = await mongoose.connect(process.env.MONGO_URL);
    connection.isConnected = db.connection[0].readyState;

  } catch (error) {
    console.log(error)
  }

}