# User Service

User management service with PostgreSQL database.

## Setup

1. Copy `.env.example` to `.env` and configure PostgreSQL connection
2. Create PostgreSQL database: `createdb skillforge_users`
3. Run migrations: `npm run migrate`
4. Install dependencies: `npm install`
5. Run: `npm run dev`

## Database Setup

```sql
CREATE DATABASE skillforge_users;
```

Then run the schema from `src/db/schema.sql`

## Endpoints

- `GET /health` - Health check
- `GET /users/:id` - Get user profile
- `PUT /users/:id` - Update user profile
- `GET /users/:id/roles` - Get user roles

## Port

Default: 3002
