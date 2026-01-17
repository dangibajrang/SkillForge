# Technical Requirements

## Technology Stack

### Backend Services
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript/JavaScript

### Databases
- **Relational:** PostgreSQL (User Service)
- **NoSQL:** MongoDB (Course Service)

### Authentication & Security
- **OAuth Providers:** Google OAuth, GitHub OAuth
- **Token Management:** JWT (JSON Web Tokens)
- **Authorization:** Role-based access control (RBAC)

### Infrastructure & Cloud
- **Storage:** AWS S3 (Media files)
- **CDN:** AWS CloudFront (Content delivery)
- **Message Broker:** Apache Kafka (Event streaming)

### Frontend
- **Framework:** React
- **State Management:** Redux Toolkit (RTK)
- **HTTP Client:** Axios or Fetch API

### DevOps & Tools
- **Email Service:** SendGrid
- **Logging:** Structured logging (Winston/Pino)
- **API Documentation:** OpenAPI/Swagger
- **Code Quality:** ESLint, Prettier

## Infrastructure Requirements

### Service Architecture
- **Pattern:** Microservices
- **Communication:** REST APIs, Event-driven (Kafka)
- **Gateway:** API Gateway (Express-based)
- **Deployment:** Independent service deployment capability

### Database Requirements
- **PostgreSQL:** ACID compliance for user data
- **MongoDB:** Flexible schema for course content
- **Connection Pooling:** Required for production

### Security Requirements
- **HTTPS:** All communications encrypted
- **Environment Variables:** Secrets stored securely
- **Rate Limiting:** API protection against abuse
- **Input Validation:** All user inputs validated
- **CORS:** Properly configured for frontend access

### Performance Requirements
- **Response Time:** API responses < 500ms (p95)
- **Media Delivery:** CDN-based for optimal performance
- **Concurrent Users:** Support 1000+ concurrent users
- **Scalability:** Horizontal scaling capability

## Integration Requirements

### OAuth Integration
- Google OAuth 2.0
- GitHub OAuth 2.0
- OAuth callback handling
- User profile extraction

### AWS Integration
- S3 bucket for media storage
- CloudFront distribution
- IAM roles and policies
- Signed URL generation

### Kafka Integration
- Kafka broker setup
- Topic creation and management
- Producer/Consumer implementation
- Event schema definition

### Email Integration
- SendGrid API integration
- Email template management
- Async email delivery

## Development Requirements

### Code Quality
- **Linting:** ESLint configuration
- **Formatting:** Prettier configuration
- **Type Safety:** TypeScript where applicable
- **Code Reviews:** Required before merge

### Documentation
- **API Documentation:** OpenAPI/Swagger specs
- **Architecture Diagrams:** System design documentation
- **README:** Setup and run instructions
- **Code Comments:** Complex logic documented

### Testing
- **Unit Tests:** Core business logic
- **Integration Tests:** API endpoints
- **E2E Tests:** Critical user flows

## Environment Requirements

### Development
- Node.js 18+ installed
- Docker (optional, for local services)
- PostgreSQL instance
- MongoDB instance
- Kafka broker (local or cloud)

### Production
- Cloud hosting (AWS/Azure/GCP)
- Database hosting (managed services)
- CDN configuration
- Monitoring and alerting
- Backup and disaster recovery

## Non-Functional Requirements

See [Non-Functional Requirements](./06-non-functional-requirements.md) for detailed specifications.
