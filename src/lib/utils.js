import mongoose from "mongoose";

let isConnected = false; // track connection

export const connectToDb = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "blog",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;
        console.log('MongoDB connected')
    } catch (error) {
        console.log('Error in mongo connection: ', error);
    }

}