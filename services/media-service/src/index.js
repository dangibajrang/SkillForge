const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'media-service' });
});

// TODO: Implement media routes
// POST /media/upload
// GET /media/:id/url
// GET /media/:id

app.listen(PORT, () => {
  console.log(`Media Service running on port ${PORT}`);
});
