const express = require("express");

const auth = require("../middleware/authMiddleware");

const {
  addLocation,
  getLocations,
  updateLocation,
  deleteLocation
} = require("../controllers/locationController");

const router = express.Router();

router.post("/", auth, addLocation);

router.get("/", auth, getLocations);

router.put("/:id", auth, updateLocation);

router.delete("/:id", auth, deleteLocation);

module.exports = router;