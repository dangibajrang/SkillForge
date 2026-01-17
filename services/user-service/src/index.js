const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'user-service' });
});

// TODO: Implement user routes
// GET /users/:id
// PUT /users/:id
// GET /users/:id/roles

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
