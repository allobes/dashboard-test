const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// 🛡️ Login Route
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    // ⏱️ Load users on each request to avoid stale cache
    const usersFile = path.join(__dirname, "users.json");
    const users = JSON.parse(fs.readFileSync(usersFile, "utf8"));

    // 🔍 Find user
    const user = users.find(u => u.username === username);
    if (!user) return res.status(401).send("User not found");

    // 🔐 Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send("Incorrect password");

    // 🎫 Generate JWT
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
    
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;