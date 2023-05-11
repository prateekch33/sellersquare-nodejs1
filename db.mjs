import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.MONGODB_URL;

const connect = async () => {
  await mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log(`Database not connected.\nError: ${err.message}`);
    });
};

export default connect;
