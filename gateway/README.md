# API Gateway

Single entry point for all client requests with centralized authentication.

## Setup

1. Copy `.env.example` to `.env`
2. Install dependencies: `npm install`
3. Run: `npm run dev`

## Routes

All routes are proxied to respective services:
- `/auth/*` → Auth Service
- `/users/*` → User Service
- `/courses/*` → Course Service
- `/assessments/*` → Assessment Service
- `/media/*` → Media Service

## Port

Default: 3000
