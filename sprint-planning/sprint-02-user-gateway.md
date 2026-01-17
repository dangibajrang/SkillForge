# Sprint 2: User Management & API Gateway

**Duration:** 1 week  
**Sprint Goal:** Centralize routing and manage user data cleanly.

## Epics Covered

1. **Epic 2: User Management**
2. **Epic 3: API Gateway**

## User Stories

### Story 2.1: User Service (PostgreSQL)

**Priority:** High  
**Story Points:** 8

**Why:** User data must be reliable and transactional.

**What to Build:**
- User schema
- Role management
- Profile APIs

**How to Proceed:**
1. Design relational schema
   - Users table with required fields
   - Role enum definition
   - Indexes for performance
2. Setup PostgreSQL
   - Install PostgreSQL (local or Docker)
   - Create database
   - Run migrations
3. CRUD APIs
   - GET /users/:id - Get user profile
   - PUT /users/:id - Update user profile
   - GET /users/:id/roles - Get user roles
4. Role enum
   - Define roles: 'learner', 'instructor', 'admin'
   - Store in database
   - Validate in API

**Acceptance Criteria:**
- ✅ User profile APIs working
- ✅ Roles enforced
- ✅ User data persisted in PostgreSQL
- ✅ User can update their profile
- ✅ Roles can be retrieved

**Definition of Done:**
- [ ] PostgreSQL database setup
- [ ] User schema created with migrations
- [ ] User model/entity defined
- [ ] GET /users/:id endpoint working
- [ ] PUT /users/:id endpoint working
- [ ] GET /users/:id/roles endpoint working
- [ ] Role validation implemented
- [ ] Integration tests for user APIs
- [ ] Error handling for invalid user IDs

---

### Story 2.2: API Gateway Setup

**Priority:** High  
**Story Points:** 8

**Why:** Single entry point simplifies auth & routing.

**What to Build:**
- Gateway using Express
- Route forwarding
- Auth middleware integration

**How to Proceed:**
1. Gateway validates JWT
   - Use JWT middleware from Sprint 1
   - Reject unauthenticated requests
   - Extract user context
2. Forwards request to services
   - Route configuration
   - Proxy requests to service endpoints
   - Handle service responses
3. Error handling
   - Service unavailable errors
   - Timeout handling
   - Error response formatting

**Acceptance Criteria:**
- ✅ Frontend talks only to gateway
- ✅ Gateway validates JWT before forwarding
- ✅ Requests routed to correct services
- ✅ Responses returned to client
- ✅ Unauthenticated requests rejected

**Definition of Done:**
- [ ] API Gateway service created
- [ ] Gateway runs on port 3000 (or configured port)
- [ ] JWT middleware integrated
- [ ] Route forwarding to Auth Service
- [ ] Route forwarding to User Service
- [ ] Error handling for service failures
- [ ] CORS configured for frontend
- [ ] Health check endpoint

---

## Technical Tasks

### User Service Tasks
- [ ] Setup PostgreSQL connection
- [ ] Create database schema
  ```sql
  CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    provider VARCHAR(50), -- 'google' | 'github'
    provider_id VARCHAR(255),
    role VARCHAR(50) DEFAULT 'learner', -- 'learner' | 'instructor' | 'admin'
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
  
  CREATE INDEX idx_users_email ON users(email);
  CREATE INDEX idx_users_provider ON users(provider, provider_id);
  ```
- [ ] Create User model/entity
- [ ] Implement GET /users/:id
- [ ] Implement PUT /users/:id
- [ ] Implement GET /users/:id/roles
- [ ] Add input validation
- [ ] Add error handling
- [ ] Write integration tests

### API Gateway Tasks
- [ ] Initialize Express app
- [ ] Install http-proxy-middleware or similar
- [ ] Create route configuration
  ```javascript
  routes = {
    '/auth/*': 'http://auth-service:3001',
    '/users/*': 'http://user-service:3002'
  }
  ```
- [ ] Integrate JWT middleware
- [ ] Implement proxy logic
- [ ] Add CORS middleware
- [ ] Add error handling
- [ ] Create health check endpoint
- [ ] Write tests for routing

### Integration Tasks
- [ ] Update Auth Service to create user in User Service
- [ ] Test end-to-end flow: Login → Get User Profile
- [ ] Test gateway routing
- [ ] Test authentication flow through gateway

---

## Sprint Backlog

### Must Have (P0)
1. Story 2.1: User Service (PostgreSQL)
2. Story 2.2: API Gateway Setup

### Nice to Have (P1)
- User search functionality
- User list endpoint (with pagination)
- Gateway request logging
- Gateway metrics

---

## Definition of Done (Sprint Level)

- [ ] All P0 stories completed
- [ ] All acceptance criteria met
- [ ] PostgreSQL database operational
- [ ] API Gateway routing all requests
- [ ] End-to-end authentication flow working through gateway
- [ ] Code reviewed and merged
- [ ] Tests passing
- [ ] Documentation updated

---

## Demo Checklist

### User Service Demo
- [ ] Show user profile retrieval
- [ ] Show user profile update
- [ ] Show role retrieval
- [ ] Show database structure
- [ ] Show error handling (invalid user ID)

### API Gateway Demo
- [ ] Show request to gateway
- [ ] Show JWT validation at gateway
- [ ] Show request forwarding to services
- [ ] Show response returning through gateway
- [ ] Show 401 error for unauthenticated request
- [ ] Show service unavailable error handling

### Integration Demo
- [ ] Complete flow: Login → Get Profile
- [ ] All requests go through gateway
- [ ] Frontend can call gateway endpoints

---

## Database Schema

### Users Table
```sql
CREATE TYPE user_role AS ENUM ('learner', 'instructor', 'admin');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  provider VARCHAR(50) NOT NULL, -- 'google' | 'github'
  provider_id VARCHAR(255) NOT NULL,
  role user_role DEFAULT 'learner',
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_provider ON users(provider, provider_id);
CREATE INDEX idx_users_role ON users(role);
```

---

## API Endpoints

### User Service
- `GET /users/:id` - Get user profile
- `PUT /users/:id` - Update user profile
- `GET /users/:id/roles` - Get user roles

### API Gateway
- `POST /auth/google` - Google OAuth (proxied)
- `POST /auth/github` - GitHub OAuth (proxied)
- `GET /users/:id` - Get user (proxied)
- `PUT /users/:id` - Update user (proxied)
- `GET /health` - Gateway health check

---

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| PostgreSQL setup issues | High | Use Docker for local dev, document setup clearly |
| Gateway routing complexity | Medium | Start simple, use proven libraries |
| Service discovery | Medium | Use environment variables for service URLs initially |
| User creation on first login | High | Integrate Auth Service with User Service |

---

## Notes

- User Service should create user on first OAuth login
- Gateway should handle service-to-service communication
- Consider using environment variables for service URLs
- Gateway is the single entry point - all external requests go through it
- User Service should be called by Auth Service to create/update users

---

## Next Sprint Preview

**Sprint 3** will focus on:
- Course Service with MongoDB
- Course schema design
- Course APIs (create, list, enroll)
- Frontend course UI
