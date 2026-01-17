# Auth Service

Authentication service handling OAuth (Google, GitHub) and JWT token generation.

## Setup

1. Copy `.env.example` to `.env` and fill in the values
2. Register OAuth apps with Google and GitHub
3. Install dependencies: `npm install`
4. Run: `npm run dev`

## Endpoints

- `GET /health` - Health check
- `POST /auth/google` - Initiate Google OAuth
- `POST /auth/github` - Initiate GitHub OAuth
- `GET /auth/callback/google` - Google OAuth callback
- `GET /auth/callback/github` - GitHub OAuth callback

## Port

Default: 3001
