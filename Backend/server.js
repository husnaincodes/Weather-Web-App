const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const weatherRoutes = require("./routes/weather");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/weather", weatherRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();