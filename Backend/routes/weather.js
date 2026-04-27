const express = require("express");
const router = express.Router();

const {
  getWeather,
  getHistory,
  clearHistory
} = require("../controllers/weatherController");

router.get("/history/all", getHistory);
router.delete("/history/all", clearHistory);
router.get("/:city", getWeather);

module.exports = router; // ✅ VERY IMPORTANT