import mongoose from "mongoose";

const connectDb = async () => {
   try {
      const connect = await mongoose.connect(process.env.MONGO_URL);
      console.log(`Database Connected at ${mongoose.connection.host}`);
   } catch (err) {
      console.log(`Mongoose Error ${error}`);
   }
};

export default connectDb;
