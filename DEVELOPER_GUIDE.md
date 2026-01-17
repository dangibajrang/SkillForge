# Developer Guide - SkillForge

Welcome to the SkillForge development team! This guide will help you understand the project structure, development workflow, and best practices.

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Getting Started](#getting-started)
4. [Development Workflow](#development-workflow)
5. [Code Standards](#code-standards)
6. [Testing Guidelines](#testing-guidelines)
7. [Git Workflow](#git-workflow)
8. [Common Tasks](#common-tasks)
9. [Troubleshooting](#troubleshooting)
10. [Resources](#resources)

---

## Project Overview

### What is SkillForge?

SkillForge is a scalable, secure, microservices-based learning platform with event-driven architecture. It enables users to:
- Authenticate via OAuth (Google, GitHub)
- Browse and enroll in courses
- Take assessments and earn certificates
- Access media content via CDN

### Technology Stack

**Backend:**
- Node.js + Express.js
- PostgreSQL (User Service)
- MongoDB (Course & Assessment Services)
- Apache Kafka (Event Streaming)
- AWS S3 + CloudFront (Media Delivery)

**Frontend:**
- React 18
- Redux Toolkit (State Management)
- React Router (Navigation)
- Axios (HTTP Client)

**Infrastructure:**
- Microservices Architecture
- API Gateway Pattern
- Event-Driven Architecture
- RESTful APIs

---

## Architecture

### System Architecture

```
┌─────────────┐
│   Frontend  │ (React + Redux)
│  Port: 3000 │
└──────┬──────┘
       │
┌──────▼──────┐
│ API Gateway │ (Port: 3000)
└──────┬──────┘
       │
       ├──► Auth Service (3001)
       ├──► User Service (3002) ──► PostgreSQL
       ├──► Course Service (3003) ──► MongoDB
       ├──► Assessment Service (3004) ──► MongoDB
       ├──► Media Service (3005) ──► AWS S3/CloudFront
       └──► Notification Service (3006) ──► Kafka ──► SendGrid
```

### Service Responsibilities

| Service | Port | Database | Responsibility |
|---------|------|----------|---------------|
| API Gateway | 3000 | None | Request routing, JWT validation |
| Auth Service | 3001 | None | OAuth, JWT generation |
| User Service | 3002 | PostgreSQL | User profiles, roles |
| Course Service | 3003 | MongoDB | Courses, enrollments |
| Assessment Service | 3004 | MongoDB | Quizzes, certificates |
| Media Service | 3005 | None | File uploads, CDN URLs |
| Notification Service | 3006 | None | Email notifications |

### Data Flow

1. **Authentication Flow:**
   ```
   Client → Gateway → Auth Service → OAuth Provider
   Client ← Gateway ← Auth Service (JWT)
   ```

2. **Request Flow:**
   ```
   Client → Gateway (JWT validation) → Service → Database
   Client ← Gateway ← Service ← Database
   ```

3. **Event Flow:**
   ```
   Service → Kafka Topic → Notification Service → SendGrid
   ```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/download/))
- **MongoDB** 6+ ([Download](https://www.mongodb.com/try/download/community))
- **Git** ([Download](https://git-scm.com/downloads))
- **Code Editor** (VS Code recommended)

### Initial Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd SkillForge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   npm run install:all
   ```

3. **Setup databases:**
   ```bash
   # PostgreSQL
   createdb skillforge_users
   cd services/user-service
   psql -U postgres -d skillforge_users -f src/db/schema.sql
   
   # MongoDB (ensure it's running)
   mongod
   ```

4. **Configure environment variables:**
   - See [ENV_VARIABLES.md](./ENV_VARIABLES.md)
   - Create `.env` files in each service directory
   - Fill in OAuth credentials, database passwords, etc.

5. **Start services:**
   ```bash
   # Terminal 1 - Gateway
   npm run dev:gateway
   
   # Terminal 2 - Auth Service
   npm run dev:auth
   
   # Terminal 3 - User Service
   npm run dev:user
   
   # Terminal 4 - Frontend
   npm run dev:frontend
   ```

6. **Verify setup:**
   ```bash
   curl http://localhost:3000/health
   curl http://localhost:3001/health
   curl http://localhost:3002/health
   ```

### Recommended VS Code Extensions

- ESLint
- Prettier
- REST Client (for API testing)
- Docker (if using containers)
- PostgreSQL (database management)

---

## Development Workflow

### Sprint-Based Development

We follow **Agile (Scrum)** methodology with 6 sprints, 1 week each:

1. **Sprint Planning** - Review sprint goals and tasks
2. **Daily Development** - Work on assigned stories
3. **Code Review** - Submit PRs for review
4. **Sprint Demo** - Showcase completed work
5. **Refactor** - Improve code quality

### Working on a Feature

1. **Check current sprint:**
   - Review [Sprint Planning](./sprint-planning/) folder
   - Understand sprint goals and user stories

2. **Create a branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Develop:**
   - Follow code standards (see below)
   - Write tests
   - Update documentation

4. **Test locally:**
   ```bash
   # Run service
   npm run dev:auth  # or relevant service
   
   # Test endpoints
   curl http://localhost:3001/health
   ```

5. **Commit:**
   ```bash
   git add .
   git commit -m "feat: add OAuth Google login"
   ```

6. **Push and create PR:**
   ```bash
   git push origin feature/your-feature-name
   # Create PR on GitHub/GitLab
   ```

### Service Development

Each service follows this structure:

```
service-name/
├── src/
│   ├── index.js          # Entry point
│   ├── routes/           # API routes
│   ├── controllers/      # Business logic
│   ├── models/          # Data models
│   ├── middleware/      # Custom middleware
│   └── utils/           # Utilities
├── tests/               # Test files
├── .env                 # Environment variables
├── package.json
└── README.md
```

### Frontend Development

Frontend structure:

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── store/          # Redux store & slices
│   ├── services/       # API service layer
│   ├── utils/         # Utility functions
│   └── App.js         # Main app component
├── public/
└── package.json
```

---

## Code Standards

### JavaScript/Node.js

**Naming Conventions:**
- Variables/Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Classes: `PascalCase`
- Files: `kebab-case.js`

**Example:**
```javascript
// Good
const userService = new UserService();
const MAX_RETRIES = 3;
const userId = req.params.id;

// Bad
const UserService = new userService();
const maxRetries = 3;
const user_id = req.params.id;
```

**Code Style:**
- Use `const` by default, `let` when reassignment needed
- Avoid `var`
- Use arrow functions for callbacks
- Use async/await over promises
- Use template literals for strings

**Example:**
```javascript
// Good
const getUser = async (userId) => {
  const user = await db.users.findById(userId);
  return user;
};

// Bad
function getUser(userId) {
  return db.users.findById(userId).then(user => {
    return user;
  });
}
```

### React

**Component Structure:**
```javascript
// Component file structure
import React from 'react';
import PropTypes from 'prop-types';
import './Component.css';

const Component = ({ prop1, prop2 }) => {
  // Hooks at the top
  const [state, setState] = React.useState(null);
  
  // Event handlers
  const handleClick = () => {
    // Logic
  };
  
  // Render
  return (
    <div className="component">
      {/* JSX */}
    </div>
  );
};

Component.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

export default Component;
```

**Best Practices:**
- Use functional components with hooks
- Extract reusable logic to custom hooks
- Keep components small and focused
- Use Redux for global state, local state for UI

### API Design

**RESTful Conventions:**
- Use HTTP methods correctly (GET, POST, PUT, DELETE)
- Use resource-based URLs
- Return consistent response format

**Response Format:**
```javascript
// Success
{
  "success": true,
  "data": { ... },
  "error": null,
  "timestamp": "2024-01-01T00:00:00Z"
}

// Error
{
  "success": false,
  "data": null,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": { ... }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

**Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

### Error Handling

**Backend:**
```javascript
// Use try-catch for async operations
try {
  const user = await getUserById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'USER_NOT_FOUND',
        message: 'User not found'
      }
    });
  }
  res.json({ success: true, data: user });
} catch (error) {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An error occurred'
    }
  });
}
```

**Frontend:**
```javascript
// Use error boundaries for React
// Handle API errors in interceptors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error);
  }
);
```

### Comments and Documentation

**When to Comment:**
- Complex business logic
- Non-obvious code decisions
- API endpoints (JSDoc)
- TODO items for future work

**Example:**
```javascript
/**
 * Generates JWT token for authenticated user
 * @param {Object} user - User object with id and email
 * @returns {string} JWT token
 */
const generateToken = (user) => {
  // Implementation
};
```

---

## Testing Guidelines

### Unit Tests

**Backend:**
```javascript
// services/auth-service/tests/auth.test.js
const request = require('supertest');
const app = require('../src/index');

describe('Auth Service', () => {
  test('GET /health returns 200', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
  });
});
```

**Frontend:**
```javascript
// frontend/src/components/__tests__/Button.test.js
import { render, screen } from '@testing-library/react';
import Button from '../Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### Integration Tests

Test API endpoints end-to-end:
```javascript
describe('User API', () => {
  test('GET /users/:id returns user', async () => {
    const response = await request(app)
      .get('/users/123')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('id');
  });
});
```

### Running Tests

```bash
# Backend service
cd services/auth-service
npm test

# Frontend
cd frontend
npm test
```

---

## Git Workflow

### Branch Naming

- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates

**Examples:**
- `feature/oauth-google-login`
- `bugfix/user-profile-update`
- `refactor/auth-middleware`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

**Examples:**
```
feat(auth): add Google OAuth login
fix(user): correct profile update validation
docs(readme): update setup instructions
```

### Pull Request Process

1. **Create PR:**
   - Clear title and description
   - Link to related issue/story
   - Add screenshots if UI changes

2. **Code Review:**
   - Address review comments
   - Ensure all tests pass
   - Update documentation if needed

3. **Merge:**
   - Squash and merge (preferred)
   - Delete branch after merge

---

## Common Tasks

### Adding a New API Endpoint

1. **Create route:**
   ```javascript
   // services/user-service/src/routes/users.js
   router.get('/users/:id', getUserById);
   ```

2. **Create controller:**
   ```javascript
   // services/user-service/src/controllers/userController.js
   const getUserById = async (req, res) => {
     // Implementation
   };
   ```

3. **Add to service:**
   ```javascript
   // services/user-service/src/index.js
   app.use('/users', userRoutes);
   ```

4. **Add to gateway:**
   ```javascript
   // Gateway already proxies /users/* to user-service
   ```

### Adding a New Redux Slice

1. **Create slice:**
   ```javascript
   // frontend/src/store/slices/courseSlice.js
   import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
   import api from '../../services/api';
   
   export const fetchCourses = createAsyncThunk(
     'courses/fetchCourses',
     async () => {
       const response = await api.get('/courses');
       return response.data;
     }
   );
   
   const courseSlice = createSlice({
     name: 'courses',
     initialState: { items: [], loading: false },
     reducers: {},
     extraReducers: (builder) => {
       builder
         .addCase(fetchCourses.pending, (state) => {
           state.loading = true;
         })
         .addCase(fetchCourses.fulfilled, (state, action) => {
           state.items = action.payload;
           state.loading = false;
         });
     },
   });
   
   export default courseSlice.reducer;
   ```

2. **Add to store:**
   ```javascript
   // frontend/src/store/store.js
   import courseReducer from './slices/courseSlice';
   
   export const store = configureStore({
     reducer: {
       courses: courseReducer,
     },
   });
   ```

### Adding Environment Variables

1. **Add to service `.env`:**
   ```env
   NEW_VARIABLE=value
   ```

2. **Update `ENV_VARIABLES.md`:**
   - Document the variable
   - Explain its purpose

3. **Use in code:**
   ```javascript
   const value = process.env.NEW_VARIABLE;
   ```

### Database Migrations

**PostgreSQL (User Service):**
```sql
-- services/user-service/src/db/migrations/001_add_avatar.sql
ALTER TABLE users ADD COLUMN avatar_url VARCHAR(500);
```

**MongoDB (Course Service):**
```javascript
// Schema changes are handled in Mongoose models
// No explicit migrations needed, but document changes
```

---

## Troubleshooting

### Service Won't Start

**Check:**
1. Port is not in use: `lsof -i :3001`
2. Environment variables are set
3. Dependencies installed: `npm install`
4. Database is running

**Solution:**
```bash
# Kill process on port
kill -9 $(lsof -t -i:3001)

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Database Connection Issues

**PostgreSQL:**
```bash
# Check if running
pg_isready

# Test connection
psql -U postgres -d skillforge_users
```

**MongoDB:**
```bash
# Check if running
mongosh

# Test connection
mongosh mongodb://localhost:27017/skillforge_courses
```

### CORS Errors

**Backend:**
```javascript
// Ensure CORS is configured
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
```

**Frontend:**
```javascript
// Check API URL in .env
REACT_APP_API_URL=http://localhost:3000
```

### JWT Token Issues

**Check:**
1. Token is being sent in Authorization header
2. JWT_SECRET matches in auth-service and gateway
3. Token hasn't expired

**Debug:**
```javascript
// Decode token (without verification)
const decoded = jwt.decode(token);
console.log(decoded);
```

### Module Not Found

```bash
# Reinstall dependencies
npm install

# Clear cache
rm -rf node_modules package-lock.json
npm install
```

---

## Resources

### Documentation

- [Project Requirements](./requirements/)
- [Sprint Planning](./sprint-planning/)
- [Setup Guide](./SETUP.md)
- [Environment Variables](./ENV_VARIABLES.md)

### External Resources

- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [MongoDB Docs](https://www.mongodb.com/docs/)
- [Kafka Docs](https://kafka.apache.org/documentation/)

### Code Examples

- Check existing services for patterns
- Review TODO comments for implementation guidance
- See [Architecture Requirements](./requirements/04-architecture-requirements.md)

### Getting Help

1. **Check documentation** - Most questions are answered here
2. **Review existing code** - Similar patterns may exist
3. **Ask the team** - Use team chat/email
4. **Create an issue** - For bugs or feature requests

---

## Best Practices Summary

✅ **Do:**
- Write clear, readable code
- Follow naming conventions
- Write tests for new features
- Update documentation
- Use meaningful commit messages
- Review code before merging
- Handle errors gracefully
- Use environment variables for config

❌ **Don't:**
- Commit `.env` files
- Hardcode credentials
- Skip error handling
- Write code without tests
- Ignore linting errors
- Create large PRs (break into smaller ones)
- Commit directly to main/master

---

## Sprint Checklist

Before starting a new sprint:

- [ ] Review sprint plan
- [ ] Understand user stories
- [ ] Setup local environment
- [ ] Pull latest code
- [ ] Review architecture changes
- [ ] Check dependencies

During sprint:

- [ ] Follow code standards
- [ ] Write tests
- [ ] Update documentation
- [ ] Commit frequently
- [ ] Create PRs early for feedback

End of sprint:

- [ ] Complete all assigned stories
- [ ] All tests passing
- [ ] Code reviewed
- [ ] Documentation updated
- [ ] Demo prepared

---

**Happy Coding! 🚀**

For questions or suggestions, please update this guide or reach out to the team.
