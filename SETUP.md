# SkillForge Setup Guide

Complete setup instructions for getting the SkillForge project running locally.

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/download/))
- **MongoDB** 6+ ([Download](https://www.mongodb.com/try/download/community))
- **Git** ([Download](https://git-scm.com/downloads))

Optional:
- **Docker** (for running services in containers)
- **Postman** or **Insomnia** (for API testing)

## Step 1: Clone and Install

```bash
# Navigate to project directory
cd SkillForge

# Install root dependencies
npm install

# Install all service dependencies
npm run install:all
```

## Step 2: Database Setup

### PostgreSQL (User Service)

```bash
# Create database
createdb skillforge_users

# Or using psql
psql -U postgres
CREATE DATABASE skillforge_users;
\q

# Run schema (from user-service directory)
cd services/user-service
psql -U postgres -d skillforge_users -f src/db/schema.sql
```

### MongoDB (Course & Assessment Services)

```bash
# Start MongoDB (if not running as service)
mongod

# MongoDB will create databases automatically when first accessed
# Databases: skillforge_courses, skillforge_assessments
```

## Step 3: Environment Configuration

### Auth Service

```bash
cd services/auth-service
cp .env.example .env
```

Edit `.env` and configure:
- `JWT_SECRET` - Generate a strong secret key
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` - From Google Cloud Console
- `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` - From GitHub Developer Settings

### User Service

```bash
cd services/user-service
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials.

### Course Service

```bash
cd services/course-service
cp .env.example .env
```

Edit `.env` with your MongoDB connection string.

### Assessment Service

```bash
cd services/assessment-service
cp .env.example .env
```

Edit `.env` with MongoDB and Kafka configuration.

### Media Service

```bash
cd services/media-service
cp .env.example .env
```

Edit `.env` with AWS credentials (S3 and CloudFront).

### Notification Service

```bash
cd services/notification-service
cp .env.example .env
```

Edit `.env` with Kafka and SendGrid configuration.

### API Gateway

```bash
cd gateway
cp .env.example .env
```

Edit `.env` - service URLs should be correct by default.

### Frontend

```bash
cd frontend
cp .env.example .env
```

Edit `.env` with API URL (default: http://localhost:3000).

## Step 4: OAuth Setup

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Set authorized redirect URI: `http://localhost:3001/auth/callback/google`
6. Copy Client ID and Client Secret to auth-service `.env`

### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Set Authorization callback URL: `http://localhost:3001/auth/callback/github`
4. Copy Client ID and Client Secret to auth-service `.env`

## Step 5: AWS Setup (For Media Service - Sprint 5)

1. Create AWS account
2. Create S3 bucket: `skillforge-media`
3. Create CloudFront distribution pointing to S3 bucket
4. Configure IAM user with S3 and CloudFront permissions
5. Add credentials to media-service `.env`

## Step 6: Kafka Setup (For Event System - Sprint 5)

### Option 1: Local Kafka with Docker

```bash
docker run -d \
  --name kafka \
  -p 9092:9092 \
  apache/kafka:latest
```

### Option 2: Use Cloud Service

- Confluent Cloud (free tier available)
- AWS MSK
- Azure Event Hubs

## Step 7: Running the Services

### Development Mode

Open multiple terminal windows:

**Terminal 1 - API Gateway:**
```bash
npm run dev:gateway
```

**Terminal 2 - Auth Service:**
```bash
npm run dev:auth
```

**Terminal 3 - User Service:**
```bash
npm run dev:user
```

**Terminal 4 - Course Service:**
```bash
npm run dev:course
```

**Terminal 5 - Assessment Service:**
```bash
npm run dev:assessment
```

**Terminal 6 - Media Service:**
```bash
npm run dev:media
```

**Terminal 7 - Notification Service:**
```bash
npm run dev:notification
```

**Terminal 8 - Frontend:**
```bash
npm run dev:frontend
```

### Service Ports

- API Gateway: `http://localhost:3000`
- Auth Service: `http://localhost:3001`
- User Service: `http://localhost:3002`
- Course Service: `http://localhost:3003`
- Assessment Service: `http://localhost:3004`
- Media Service: `http://localhost:3005`
- Notification Service: `http://localhost:3006`
- Frontend: `http://localhost:3000` (React default, may conflict with gateway)

## Step 8: Verify Setup

### Health Checks

Test each service:

```bash
# API Gateway
curl http://localhost:3000/health

# Auth Service
curl http://localhost:3001/health

# User Service
curl http://localhost:3002/health

# Course Service
curl http://localhost:3003/health

# Assessment Service
curl http://localhost:3004/health

# Media Service
curl http://localhost:3005/health

# Notification Service
curl http://localhost:3006/health
```

## Troubleshooting

### Port Already in Use

If a port is already in use, either:
1. Stop the service using that port
2. Change the port in the service's `.env` file

### Database Connection Issues

- **PostgreSQL**: Ensure PostgreSQL is running and credentials are correct
- **MongoDB**: Ensure MongoDB is running (`mongod` or as a service)

### Module Not Found Errors

Run `npm install` in the specific service directory or use `npm run install:all` from root.

### CORS Errors

Ensure CORS is properly configured in each service and the frontend `.env` has the correct API URL.

## Next Steps

1. Review [Sprint 1 Plan](../sprint-planning/sprint-01-foundation-auth.md)
2. Start implementing OAuth authentication
3. Follow the sprint plans week by week

## Development Tips

- Use `nodemon` for auto-reloading (already configured)
- Check service logs for debugging
- Use Postman/Insomnia to test APIs
- Follow the TODO comments in code for implementation guidance

---

**Ready to start development! 🚀**
