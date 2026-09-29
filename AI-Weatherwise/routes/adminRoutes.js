const express = require("express");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getAllUsers,
  createUser,
  deleteUser
} = require("../controllers/adminController");

const router = express.Router();

router.get("/users", auth, admin, getAllUsers);

router.post("/users", auth, admin, createUser);

router.delete("/users/:id", auth, admin, deleteUser);

router.get("/health", auth, admin, (req, res) => {
  res.json({
    status: "OK",
    message: "AI WeatherWise API is running"
  });
});

module.exports = router;