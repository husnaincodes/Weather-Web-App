const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (
    !mongoUri ||
    mongoUri === "your_mongodb_connection_string" ||
    (!mongoUri.startsWith("mongodb://") &&
      !mongoUri.startsWith("mongodb+srv://"))
  ) {
    console.error(
      "Invalid MONGO_URI. Set a valid mongodb:// or mongodb+srv:// URI in Backend/.env"
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;