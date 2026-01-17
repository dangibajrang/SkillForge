# Assessment Service

Assessment and certification service with quiz engine.

## Setup

1. Copy `.env.example` to `.env` and configure MongoDB and Kafka
2. Install dependencies: `npm install`
3. Run: `npm run dev`

## Endpoints

- `GET /health` - Health check
- `POST /assessments` - Create assessment
- `GET /assessments/:id` - Get assessment
- `POST /assessments/:id/submit` - Submit answers
- `GET /assessments/:id/result` - Get result
- `GET /certificates/:id` - Get certificate

## Port

Default: 3004
