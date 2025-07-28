// Import dependencies
const express = require('express');
const os = require('os');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require("dotenv").config();
console.log("JWT secret:", process.env.JWT_SECRET);

const app = express();
const PORT = 5000;

// Enable CORS + JSON parsing
app.use(cors());
app.use(express.json());

// Load users from JSON
let users = [];
try {
  const usersData = fs.readFileSync(__dirname + '/api/login/users.json', 'utf8');
  users = usersData.trim() ? JSON.parse(usersData) : [];
} catch (err) {
  console.error('Failed to load users.json:', err.message);
  users = [];
}

// Health check route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// 🧠 System info endpoint for SystemMonitor
app.get('/api/system-info', (req, res) => {
  const info = {
    cpuLoad: os.loadavg()[0],
    totalMem: os.totalmem(),
    freeMem: os.freemem(),
    uptime: os.uptime()
  };
  res.json(info);
});

// 🔑 Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) return res.status(401).send('User not found');

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).send('Incorrect password');

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// 🛡️ Middleware for protected routes
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('No token provided');

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).send('Token invalid or expired');
  }
};

// 🔐 Example protected route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.send('Access granted to protected data');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});