# Environment Variables Reference

This document lists all environment variables needed for each service. Copy these to `.env` files in each service directory.

## Auth Service (`services/auth-service/.env`)

```env
# Server
PORT=3001
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/callback/google

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:3001/auth/callback/github

# User Service (for creating users on first login)
USER_SERVICE_URL=http://localhost:3002
```

## User Service (`services/user-service/.env`)

```env
# Server
PORT=3002
NODE_ENV=development

# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=skillforge_users
DB_USER=postgres
DB_PASSWORD=postgres
```

## Course Service (`services/course-service/.env`)

```env
# Server
PORT=3003
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/skillforge_courses

# User Service (for enrollment validation)
USER_SERVICE_URL=http://localhost:3002
```

## Assessment Service (`services/assessment-service/.env`)

```env
# Server
PORT=3004
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/skillforge_assessments

# Kafka
KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=assessment-service

# Course Service
COURSE_SERVICE_URL=http://localhost:3003
```

## Media Service (`services/media-service/.env`)

```env
# Server
PORT=3005
NODE_ENV=development

# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET_NAME=skillforge-media

# CloudFront
CLOUDFRONT_DOMAIN=your-cloudfront-domain.cloudfront.net
CLOUDFRONT_KEY_PAIR_ID=your-key-pair-id
CLOUDFRONT_PRIVATE_KEY=your-private-key

# File Upload Limits
MAX_FILE_SIZE=104857600
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,video/mp4,application/pdf
```

## Notification Service (`services/notification-service/.env`)

```env
# Server
PORT=3006
NODE_ENV=development

# Kafka
KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=notification-service
KAFKA_GROUP_ID=notification-service-group

# SendGrid
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@skillforge.com
SENDGRID_FROM_NAME=SkillForge
```

## API Gateway (`gateway/.env`)

```env
# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Service URLs
AUTH_SERVICE_URL=http://localhost:3001
USER_SERVICE_URL=http://localhost:3002
COURSE_SERVICE_URL=http://localhost:3003
ASSESSMENT_SERVICE_URL=http://localhost:3004
MEDIA_SERVICE_URL=http://localhost:3005
NOTIFICATION_SERVICE_URL=http://localhost:3006

# CORS
CORS_ORIGIN=http://localhost:3000
```

## Frontend (`frontend/.env`)

```env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
REACT_APP_GITHUB_CLIENT_ID=your-github-client-id
```

## Quick Setup Script

You can create all `.env` files at once by running this in your terminal (from project root):

```bash
# Create .env files from this template
# Copy the content above to respective .env files manually
# Or use this script:

# Auth Service
cat > services/auth-service/.env << 'EOF'
PORT=3001
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/callback/google
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:3001/auth/callback/github
USER_SERVICE_URL=http://localhost:3002
EOF

# User Service
cat > services/user-service/.env << 'EOF'
PORT=3002
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=skillforge_users
DB_USER=postgres
DB_PASSWORD=postgres
EOF

# Course Service
cat > services/course-service/.env << 'EOF'
PORT=3003
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/skillforge_courses
USER_SERVICE_URL=http://localhost:3002
EOF

# Assessment Service
cat > services/assessment-service/.env << 'EOF'
PORT=3004
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/skillforge_assessments
KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=assessment-service
COURSE_SERVICE_URL=http://localhost:3003
EOF

# Media Service
cat > services/media-service/.env << 'EOF'
PORT=3005
NODE_ENV=development
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET_NAME=skillforge-media
CLOUDFRONT_DOMAIN=your-cloudfront-domain.cloudfront.net
CLOUDFRONT_KEY_PAIR_ID=your-key-pair-id
CLOUDFRONT_PRIVATE_KEY=your-private-key
MAX_FILE_SIZE=104857600
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,video/mp4,application/pdf
EOF

# Notification Service
cat > services/notification-service/.env << 'EOF'
PORT=3006
NODE_ENV=development
KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=notification-service
KAFKA_GROUP_ID=notification-service-group
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@skillforge.com
SENDGRID_FROM_NAME=SkillForge
EOF

# API Gateway
cat > gateway/.env << 'EOF'
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-in-production
AUTH_SERVICE_URL=http://localhost:3001
USER_SERVICE_URL=http://localhost:3002
COURSE_SERVICE_URL=http://localhost:3003
ASSESSMENT_SERVICE_URL=http://localhost:3004
MEDIA_SERVICE_URL=http://localhost:3005
NOTIFICATION_SERVICE_URL=http://localhost:3006
CORS_ORIGIN=http://localhost:3000
EOF

# Frontend
cat > frontend/.env << 'EOF'
REACT_APP_API_URL=http://localhost:3000
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
REACT_APP_GITHUB_CLIENT_ID=your-github-client-id
EOF
```

**Note:** Remember to replace placeholder values with your actual credentials!
