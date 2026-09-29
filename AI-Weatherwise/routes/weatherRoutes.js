const express = require("express");
const auth = require("../middleware/authMiddleware");
const { getCurrentWeather, getAIInsight } = require("../controllers/weatherController");
const router = express.Router();

router.get("/current/:city", getCurrentWeather);
router.post("/insights", auth, getAIInsight);

module.exports = router;
