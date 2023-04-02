// 3 routes

const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  verifyUser,
  addToPact,
  getPact,
  removeFromPact,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/:id/verify/:token", verifyUser);
router.post("/pact", protect, addToPact);
router.get("/pact", protect, getPact);
router.delete("/pact", protect, removeFromPact);

module.exports = router;
