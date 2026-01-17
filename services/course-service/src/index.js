const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'course-service' });
});

// TODO: Implement course routes
// POST /courses
// GET /courses
// GET /courses/:id
// POST /courses/:id/enroll

app.listen(PORT, () => {
  console.log(`Course Service running on port ${PORT}`);
});
