# Architecture Requirements

## System Architecture Pattern

**Primary Pattern:** Microservices Architecture

### Core Principles
1. **Service Independence:** Each service can be developed, deployed, and scaled independently
2. **Stateless Services:** Services don't maintain session state
3. **API-First Design:** Well-defined REST APIs for inter-service communication
4. **Event-Driven:** Asynchronous communication via Kafka for decoupling

## Service Breakdown

### 1. Auth Service
- **Responsibility:** Authentication and token generation
- **Database:** None (stateless)
- **Dependencies:** OAuth providers
- **Endpoints:**
  - `POST /auth/google`
  - `POST /auth/github`
  - `POST /auth/refresh`

### 2. User Service
- **Responsibility:** User profile and role management
- **Database:** PostgreSQL
- **Dependencies:** Auth Service (for user context)
- **Endpoints:**
  - `GET /users/:id`
  - `PUT /users/:id`
  - `GET /users/:id/roles`

### 3. API Gateway
- **Responsibility:** Request routing and authentication
- **Database:** None
- **Dependencies:** All services
- **Endpoints:** Proxies to all services

### 4. Course Service
- **Responsibility:** Course and content management
- **Database:** MongoDB
- **Dependencies:** User Service (for enrollment)
- **Endpoints:**
  - `GET /courses`
  - `POST /courses`
  - `POST /courses/:id/enroll`
  - `GET /courses/:id`

### 5. Assessment Service
- **Responsibility:** Quiz engine and scoring
- **Database:** MongoDB
- **Dependencies:** Course Service, User Service
- **Endpoints:**
  - `GET /assessments/:id`
  - `POST /assessments/:id/submit`
  - `GET /assessments/:id/result`

### 6. Media Service
- **Responsibility:** File upload and CDN management
- **Database:** None (metadata in MongoDB if needed)
- **Dependencies:** AWS S3, CloudFront
- **Endpoints:**
  - `POST /media/upload`
  - `GET /media/:id/url`

### 7. Notification Service
- **Responsibility:** Email notifications
- **Database:** None (optional: notification history)
- **Dependencies:** Kafka (consumer), SendGrid
- **Endpoints:** Internal only (triggered by events)

## Data Flow Patterns

### Authentication Flow
```
Client → API Gateway → Auth Service → OAuth Provider
Client ← API Gateway ← Auth Service (JWT)
```

### Request Flow (Authenticated)
```
Client → API Gateway (JWT validation) → Target Service → Database
Client ← API Gateway ← Target Service ← Database
```

### Event Flow
```
Service → Kafka Topic → Notification Service → SendGrid
```

## Database Design

### PostgreSQL Schema (User Service)
```sql
users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE,
  name VARCHAR,
  provider VARCHAR, -- 'google' | 'github'
  provider_id VARCHAR,
  role VARCHAR, -- 'learner' | 'instructor' | 'admin'
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### MongoDB Collections (Course Service)
```javascript
courses {
  _id: ObjectId,
  title: String,
  description: String,
  instructor_id: String,
  modules: [{
    title: String,
    lessons: [{
      title: String,
      content: String,
      media_url: String,
      order: Number
    }]
  }],
  created_at: Date,
  updated_at: Date
}

enrollments {
  _id: ObjectId,
  user_id: String,
  course_id: String,
  enrolled_at: Date,
  progress: Number
}
```

## Security Architecture

### Authentication Layer
- OAuth 2.0 for external authentication
- JWT for stateless session management
- Token refresh mechanism

### Authorization Layer
- Role-based access control (RBAC)
- Middleware-based route protection
- Service-level permission checks

### Data Security
- Encrypted connections (HTTPS)
- Secure environment variable management
- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- NoSQL injection prevention (MongoDB)

## Scalability Considerations

### Horizontal Scaling
- Stateless services enable easy scaling
- Database connection pooling
- Load balancing at API Gateway

### Performance Optimization
- CDN for static/media content
- Database indexing strategy
- Caching layer (Redis - future enhancement)
- Async processing for heavy operations

## Event-Driven Architecture

### Kafka Topics
- `user.events` - User registration, profile updates
- `course.events` - Course creation, enrollment
- `assessment.events` - Assessment completion, scoring
- `certification.events` - Certificate issuance

### Event Schema
```json
{
  "event_type": "COURSE_ENROLLED",
  "timestamp": "2024-01-01T00:00:00Z",
  "user_id": "uuid",
  "course_id": "uuid",
  "metadata": {}
}
```

## API Design Principles

### RESTful Conventions
- Resource-based URLs
- HTTP methods (GET, POST, PUT, DELETE)
- Proper status codes
- Consistent error responses

### Response Format
```json
{
  "success": true,
  "data": {},
  "error": null,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Error Format
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Deployment Architecture

### Development
- Local services running independently
- Local databases
- Docker Compose for orchestration (optional)

### Production
- Containerized services (Docker)
- Orchestration (Kubernetes or similar)
- Managed databases
- Cloud infrastructure (AWS/Azure/GCP)
- CI/CD pipeline
