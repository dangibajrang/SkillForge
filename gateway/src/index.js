const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'api-gateway' });
});

// Service URLs
const services = {
  auth: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
  user: process.env.USER_SERVICE_URL || 'http://localhost:3002',
  course: process.env.COURSE_SERVICE_URL || 'http://localhost:3003',
  assessment: process.env.ASSESSMENT_SERVICE_URL || 'http://localhost:3004',
  media: process.env.MEDIA_SERVICE_URL || 'http://localhost:3005',
  notification: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3006',
};

// TODO: Add JWT middleware for protected routes
// const jwtMiddleware = require('./middleware/jwt');

// Proxy routes
app.use('/auth', createProxyMiddleware({
  target: services.auth,
  changeOrigin: true,
  pathRewrite: { '^/auth': '' },
}));

app.use('/users', createProxyMiddleware({
  target: services.user,
  changeOrigin: true,
  pathRewrite: { '^/users': '/users' },
}));

app.use('/courses', createProxyMiddleware({
  target: services.course,
  changeOrigin: true,
  pathRewrite: { '^/courses': '/courses' },
}));

app.use('/assessments', createProxyMiddleware({
  target: services.assessment,
  changeOrigin: true,
  pathRewrite: { '^/assessments': '/assessments' },
}));

app.use('/media', createProxyMiddleware({
  target: services.media,
  changeOrigin: true,
  pathRewrite: { '^/media': '/media' },
}));

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log('Proxying to services:');
  Object.entries(services).forEach(([name, url]) => {
    console.log(`  ${name}: ${url}`);
  });
});
