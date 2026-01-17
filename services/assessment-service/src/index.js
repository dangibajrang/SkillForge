const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'assessment-service' });
});

// TODO: Implement assessment routes
// POST /assessments
// GET /assessments/:id
// POST /assessments/:id/submit
// GET /assessments/:id/result
// GET /certificates/:id

app.listen(PORT, () => {
  console.log(`Assessment Service running on port ${PORT}`);
});
