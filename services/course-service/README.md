# Course Service

Course and content management service with MongoDB.

## Setup

1. Copy `.env.example` to `.env` and configure MongoDB connection
2. Ensure MongoDB is running locally or update connection string
3. Install dependencies: `npm install`
4. Run: `npm run dev`

## Endpoints

- `GET /health` - Health check
- `POST /courses` - Create course
- `GET /courses` - List courses (with pagination)
- `GET /courses/:id` - Get course details
- `POST /courses/:id/enroll` - Enroll in course

## Port

Default: 3003
