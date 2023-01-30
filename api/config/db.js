import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;
const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(MONGODB_URL)
    .then(console.log("DB connected successfully!"))
    .catch((error) => {
      console.log("DB connection failed!");
      console.log(error);
      process.exit(1);
    });
};
export default connect;
