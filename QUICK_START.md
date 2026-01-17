# Quick Start Guide

Get SkillForge up and running in 5 minutes!

## 1. Install Dependencies

```bash
npm install
npm run install:all
```

## 2. Setup Databases

### PostgreSQL
```bash
createdb skillforge_users
cd services/user-service
psql -U postgres -d skillforge_users -f src/db/schema.sql
```

### MongoDB
```bash
# Just ensure MongoDB is running
mongod
```

## 3. Configure Environment Variables

See [ENV_VARIABLES.md](./ENV_VARIABLES.md) for all environment variables.

Quick setup:
1. Copy environment variables from `ENV_VARIABLES.md`
2. Create `.env` files in each service directory
3. Fill in your OAuth credentials, database passwords, etc.

## 4. Start Services

Open multiple terminals:

```bash
# Terminal 1
npm run dev:gateway

# Terminal 2
npm run dev:auth

# Terminal 3
npm run dev:user

# Terminal 4
npm run dev:frontend
```

## 5. Test

Visit:
- Frontend: http://localhost:3000
- API Gateway: http://localhost:3000/health
- Auth Service: http://localhost:3001/health

## Next Steps

1. Follow [Sprint 1 Plan](./sprint-planning/sprint-01-foundation-auth.md)
2. Implement OAuth authentication
3. Build features incrementally

For detailed setup, see [SETUP.md](./SETUP.md)
