# SkillForge – Learning & Assessment Platform

A scalable, secure, microservices-based learning platform with event-driven architecture.

## 📚 Documentation Structure

This project is organized into two main documentation folders:

### 📋 [Requirements](./requirements/)
Complete project requirements, epics, technical specifications, and user stories.

- [Project Overview](./requirements/01-project-overview.md)
- [Epic Definitions](./requirements/02-epic-definitions.md)
- [Technical Requirements](./requirements/03-technical-requirements.md)
- [Architecture Requirements](./requirements/04-architecture-requirements.md)
- [User Stories](./requirements/05-user-stories.md)
- [Non-Functional Requirements](./requirements/06-non-functional-requirements.md)

### 🗓️ [Sprint Planning](./sprint-planning/)
Detailed sprint-by-sprint breakdown for the 6-week development cycle.

- [Sprint 1: Foundation & Authentication](./sprint-planning/sprint-01-foundation-auth.md)
- [Sprint 2: User Management & API Gateway](./sprint-planning/sprint-02-user-gateway.md)
- [Sprint 3: Course & Content Management](./sprint-planning/sprint-03-course-content.md)
- [Sprint 4: Assessments & Certification](./sprint-planning/sprint-04-assessments.md)
- [Sprint 5: Media Delivery & Event System](./sprint-planning/sprint-05-media-events.md)
- [Sprint 6: Notifications & Production Readiness](./sprint-planning/sprint-06-notifications-production.md)

## 🎯 Project Overview

**Product Goal:** Build a scalable, secure, microservices-based learning platform with event-driven architecture, capable of handling authentication, content delivery, assessments, and notifications.

**Methodology:** Agile (Scrum) - 6 Sprints, 1 week each

## 🏗️ Architecture

- **Pattern:** Microservices Architecture
- **Communication:** REST APIs + Event-Driven (Kafka)
- **Databases:** PostgreSQL (User Service) + MongoDB (Course Service)
- **Authentication:** OAuth 2.0 (Google, GitHub) + JWT
- **Media:** AWS S3 + CloudFront CDN
- **Frontend:** React + Redux Toolkit

## 📦 Key Epics

1. Authentication & Security
2. User Management
3. Course & Content Management
4. Assessment & Certification
5. Media Delivery & Performance
6. Event-Driven Notifications
7. Frontend Integration
8. DevOps & Quality

## 🚀 Quick Start

### For New Developers

**👉 Start here:** Read the [Developer Guide](./DEVELOPER_GUIDE.md) for comprehensive onboarding instructions.

### Quick Setup

1. **Install dependencies:**
   ```bash
   npm install
   npm run install:all
   ```

2. **Configure environment variables:**
   - See [ENV_VARIABLES.md](./ENV_VARIABLES.md) for all required variables
   - Create `.env` files in each service directory

3. **Setup databases:**
   - PostgreSQL: Create database `skillforge_users`
   - MongoDB: Ensure MongoDB is running

4. **Start services:**
   ```bash
   npm run dev:gateway    # Terminal 1
   npm run dev:auth       # Terminal 2
   npm run dev:user       # Terminal 3
   npm run dev:frontend   # Terminal 4
   ```

5. **Follow Sprint Plans:**
   - Review [Sprint 1 Plan](./sprint-planning/sprint-01-foundation-auth.md)
   - See [Developer Guide](./DEVELOPER_GUIDE.md) for detailed workflow

## 📖 How to Use This Documentation

1. **New to the project?** → Start with [Developer Guide](./DEVELOPER_GUIDE.md)
2. **Setting up?** → Follow [SETUP.md](./SETUP.md) or [QUICK_START.md](./QUICK_START.md)
3. **For Planning:** → Review [Requirements](./requirements/) folder
4. **For Development:** → Follow [Sprint Planning](./sprint-planning/) week by week
5. **After 6 Weeks:** → Check [Future Enhancements](./FUTURE_ENHANCEMENTS.md) for 2026 market alignment
6. **For Reference:** → Use [Epic Definitions](./requirements/02-epic-definitions.md) and [User Stories](./requirements/05-user-stories.md)

## 🎓 Learning Outcomes

After completing all 6 sprints, you'll have:

✅ Microservices architecture experience  
✅ OAuth + JWT security implementation  
✅ Event-driven system with Kafka  
✅ CDN-based media delivery  
✅ Full-stack integration  
✅ Production-ready application  
✅ Comprehensive documentation

## 🚀 Future Enhancements

After the initial 6-week sprint, check out [Future Enhancements](./FUTURE_ENHANCEMENTS.md) for:
- 🤖 AI Integration (Chatbot, Recommendations, Auto-grading)
- 📘 TypeScript Migration (Industry Standard)
- ⚡ Real-Time Features (WebSockets, Live Classes)
- 🎨 Next.js Migration (Modern Frontend)
- 📊 Observability (OpenTelemetry, Monitoring)
- 🔌 GraphQL API Layer

These enhancements align the project with 2026 market trends and make it even more impressive!

## 📁 Project Structure

```
SkillForge/
├── services/              # Backend microservices
│   ├── auth-service/      # Authentication & JWT
│   ├── user-service/      # User management (PostgreSQL)
│   ├── course-service/    # Course management (MongoDB)
│   ├── assessment-service/# Assessments & certificates
│   ├── media-service/     # Media upload (S3/CloudFront)
│   └── notification-service/ # Email notifications
├── gateway/               # API Gateway
├── frontend/              # React frontend
├── shared/                # Shared utilities
├── requirements/          # Project requirements
├── sprint-planning/       # Sprint plans
├── DEVELOPER_GUIDE.md     # 👈 Comprehensive developer guide
├── SETUP.md              # Detailed setup instructions
├── QUICK_START.md        # Quick start guide
├── ENV_VARIABLES.md      # Environment variables reference
└── FUTURE_ENHANCEMENTS.md # 🚀 Post-6-week enhancements for 2026
```

## 🔧 Development

Each service can be run independently:
- Services run on ports 3001-3006
- API Gateway runs on port 3000
- Frontend runs on port 3000 (React default)

## 📝 License

This is a learning project. Use it as a reference for building microservices-based applications.

---

**Happy Coding! 🚀**
