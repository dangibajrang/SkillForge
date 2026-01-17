# Sprint 1: Foundation & Authentication

**Duration:** 1 week  
**Sprint Goal:** Establish a secure foundation with authentication, authorization, and project setup.

## Epics Covered

1. **Epic 1: Authentication & Security**

## User Stories

### Story 1.1: OAuth-based Authentication

**Priority:** High  
**Story Points:** 8

**Why:** Authentication is the entry point of the system. Everything depends on identity.

**What to Build:**
- Google OAuth login
- GitHub OAuth login
- User identity extraction
- Token generation

**How to Proceed:**
1. Register OAuth apps (Google/GitHub)
   - Create Google OAuth 2.0 credentials
   - Create GitHub OAuth app
   - Configure redirect URIs
2. Create Auth Service (Express)
   - Initialize Express server
   - Setup route structure
   - Install dependencies (passport, passport-google-oauth20, passport-github2)
3. Handle OAuth callback
   - Implement callback routes
   - Extract user info from provider
4. Generate JWT
   - Install jsonwebtoken
   - Create JWT payload structure
   - Sign tokens with secret

**Acceptance Criteria:**
- ✅ User can login using Google OAuth
- ✅ User can login using GitHub OAuth
- ✅ JWT token is returned on successful login
- ✅ Token contains user ID and email
- ✅ Error handling for OAuth failures

**Definition of Done:**
- [ ] OAuth apps registered and configured
- [ ] Auth service running on dedicated port
- [ ] Google OAuth flow working end-to-end
- [ ] GitHub OAuth flow working end-to-end
- [ ] JWT tokens generated with proper claims
- [ ] Unit tests for token generation
- [ ] Error handling implemented

---

### Story 1.2: JWT Authorization Middleware

**Priority:** High  
**Story Points:** 5

**Why:** Microservices must be stateless and secure.

**What to Build:**
- JWT verification middleware
- Token expiry handling
- Role extraction

**How to Proceed:**
1. Decode JWT
   - Install jsonwebtoken (if not already)
   - Create verify function
2. Validate signature
   - Use same secret as token generation
   - Handle invalid signatures
3. Attach user context to request
   - Extract user info from token
   - Add to req.user object
   - Make available to route handlers

**Acceptance Criteria:**
- ✅ Protected APIs reject unauthenticated users (401)
- ✅ Valid JWT tokens are accepted
- ✅ Expired tokens are rejected (401)
- ✅ Invalid tokens are rejected (401)
- ✅ User context available in req.user

**Definition of Done:**
- [ ] JWT middleware created
- [ ] Middleware validates token signature
- [ ] Middleware checks token expiry
- [ ] Middleware attaches user to request
- [ ] Test protected route with valid token
- [ ] Test protected route with invalid token
- [ ] Test protected route with expired token
- [ ] Test protected route without token

---

### Story 1.3: Project Skeleton Setup

**Priority:** Medium  
**Story Points:** 3

**Why:** A clean structure avoids tech debt later.

**What to Build:**
- Monorepo or repo-per-service
- Linting
- Environment config
- Basic README

**How to Proceed:**
1. Choose structure (recommend monorepo for this project)
   - Create root folder structure
   - Create service folders
2. Setup linting
   - Install ESLint
   - Configure rules
   - Add Prettier (optional but recommended)
3. Environment config
   - Create .env.example files
   - Document required variables
4. Basic README
   - Project overview
   - Setup instructions
   - Service descriptions

**Acceptance Criteria:**
- ✅ Clear folder structure established
- ✅ ESLint configured and working
- ✅ Environment variables documented
- ✅ README with setup instructions
- ✅ Services can run independently

**Definition of Done:**
- [ ] Monorepo structure created
- [ ] ESLint configuration added
- [ ] .env.example files created
- [ ] README.md with setup guide
- [ ] Each service has package.json
- [ ] Services can start independently
- [ ] Linting passes on all files

---

## Technical Tasks

### Setup Tasks
- [ ] Initialize root package.json (if monorepo)
- [ ] Create folder structure:
  ```
  SkillForge/
  ├── services/
  │   ├── auth-service/
  │   ├── user-service/
  │   ├── course-service/
  │   └── ...
  ├── gateway/
  ├── frontend/
  └── README.md
  ```
- [ ] Setup Git repository
- [ ] Create .gitignore

### Auth Service Tasks
- [ ] Initialize Express app
- [ ] Install dependencies
- [ ] Setup OAuth strategies
- [ ] Create auth routes
- [ ] Implement JWT generation
- [ ] Create JWT middleware
- [ ] Add error handling
- [ ] Write unit tests

### Documentation Tasks
- [ ] Write README
- [ ] Document environment variables
- [ ] Create architecture diagram (basic)

---

## Sprint Backlog

### Must Have (P0)
1. Story 1.1: OAuth-based Authentication
2. Story 1.2: JWT Authorization Middleware
3. Story 1.3: Project Skeleton Setup

### Nice to Have (P1)
- Refresh token mechanism
- Token blacklisting (for logout)
- Rate limiting on auth endpoints

---

## Definition of Done (Sprint Level)

- [ ] All P0 stories completed
- [ ] All acceptance criteria met
- [ ] Code reviewed and merged
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Demo prepared

---

## Demo Checklist

### Authentication Demo
- [ ] Show Google OAuth login flow
- [ ] Show GitHub OAuth login flow
- [ ] Display JWT token after login
- [ ] Show protected route access with valid token
- [ ] Show 401 error with invalid/expired token

### Project Structure Demo
- [ ] Show folder structure
- [ ] Show linting in action
- [ ] Show environment configuration
- [ ] Walk through README

---

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| OAuth app approval delays | High | Start registration early, use test credentials |
| JWT secret management | Medium | Use environment variables, document clearly |
| Project structure decisions | Low | Follow common patterns, iterate if needed |

---

## Notes

- Focus on getting authentication working end-to-end
- Don't over-engineer the project structure - keep it simple
- JWT middleware should be reusable across services
- Consider creating a shared package for JWT utilities

---

## Next Sprint Preview

**Sprint 2** will focus on:
- User Service with PostgreSQL
- API Gateway setup
- Integration with Auth Service
