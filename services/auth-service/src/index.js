const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'auth-service' });
});

// TODO: Implement OAuth routes
// POST /auth/google
// POST /auth/github
// GET /auth/callback/google
// GET /auth/callback/github

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
