const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3006;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'notification-service' });
});

// TODO: Implement Kafka consumer
// Consume events from:
// - user.events (USER_REGISTERED)
// - course.events (COURSE_ENROLLED, COURSE_COMPLETED)
// - certification.events (CERTIFICATION_ISSUED)

app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});
