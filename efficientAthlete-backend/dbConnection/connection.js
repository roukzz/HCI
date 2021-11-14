const mongoose = require("mongoose");

const URI =
  "mongodb+srv://roukzz:onepiece700@efficientathletedb.zrfvp.mongodb.net/userDB";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("db connected!");
};

module.exports = connectDB;
