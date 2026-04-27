const axios = require("axios");
const Search = require("../models/Search");

exports.getWeather = async (req, res) => {
  try {
    const city = req.params.city;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`
    );

    const data = response.data;

    // Save to DB
    await Search.create({
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description
    });

    res.json(data);
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ message: "City not found" });
    }

    res.status(500).json({
      message: "Error fetching weather",
      error: error.message
    });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await Search.find().sort({ date: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching history",
      error: error.message
    });
  }
};

exports.clearHistory = async (req, res) => {
  try {
    const result = await Search.deleteMany({});
    res.json({
      message: "Search history cleared",
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({
      message: "Error clearing history",
      error: error.message
    });
  }
};