const mongoose = require('mongoose');



const MongoDBconnection = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("Connection string is not there in env variables");
    }

    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};




module.exports = MongoDBconnection;