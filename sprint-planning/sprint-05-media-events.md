# Sprint 5: Media Delivery & Event-Driven System

**Duration:** 1 week  
**Sprint Goal:** Optimize performance and decouple workflows.

## Epics Covered

1. **Epic 6: Media Delivery & Performance**
2. **Epic 7: Event-Driven Notifications (Kafka Setup)**

## User Stories

### Story 5.1: Media Upload

**Priority:** High  
**Story Points:** 8

**Why:** Backend should not serve videos directly.

**What to Build:**
- Upload files to S3
- Generate signed URLs
- File metadata storage

**How to Proceed:**
1. Upload files to S3
   - Setup AWS S3 bucket
   - Configure IAM permissions
   - Implement upload endpoint
2. Generate signed URLs
   - Create presigned URLs for secure access
   - Set expiration times
3. File metadata
   - Store file info in MongoDB (optional)
   - Track file type, size, upload date

**Acceptance Criteria:**
- ✅ Files stored in S3
- ✅ Signed URLs generated
- ✅ Upload endpoint working
- ✅ File metadata tracked

**Definition of Done:**
- [ ] AWS S3 bucket created
- [ ] IAM permissions configured
- [ ] POST /media/upload endpoint
- [ ] File upload to S3 working
- [ ] Signed URL generation
- [ ] File metadata storage (optional)
- [ ] Error handling for upload failures
- [ ] File size/type validation

---

### Story 5.2: CloudFront Integration

**Priority:** High  
**Story Points:** 5

**Why:** CDN provides fast, global content delivery.

**What to Build:**
- CDN distribution
- Public content delivery
- Signed URL integration with CDN

**How to Proceed:**
1. CDN distribution
   - Create CloudFront distribution
   - Point to S3 bucket
   - Configure caching policies
2. Public content delivery
   - Generate CloudFront URLs
   - Use signed URLs for private content
   - Configure CORS

**Acceptance Criteria:**
- ✅ Videos load via CDN
- ✅ Content delivery optimized
- ✅ Signed URLs work with CDN
- ✅ Caching configured

**Definition of Done:**
- [ ] CloudFront distribution created
- [ ] S3 bucket connected to CloudFront
- [ ] CloudFront URLs generated
- [ ] Signed URLs for private content
- [ ] CORS configured
- [ ] Cache policies set
- [ ] CDN URLs returned in API responses

---

### Story 5.3: Kafka Setup

**Priority:** High  
**Story Points:** 8

**Why:** Event-driven architecture enables scalability and decoupling.

**What to Build:**
- Kafka broker
- Topics
- Event producers
- Event consumers (basic)

**How to Proceed:**
1. Kafka broker
   - Setup Kafka (local or cloud)
   - Configure brokers
2. Topics
   - Create topics for events:
     - `user.events`
     - `course.events`
     - `assessment.events`
     - `certification.events`
3. Event producers
   - Integrate Kafka producer in services
   - Publish events on key actions
4. Event consumers
   - Setup basic consumer (for testing)
   - Log events received

**Acceptance Criteria:**
- ✅ Events published successfully
- ✅ Topics created
- ✅ Consumers can receive events
- ✅ Event schemas defined

**Definition of Done:**
- [ ] Kafka broker running
- [ ] Topics created
- [ ] Producer library integrated
- [ ] Events published from User Service
- [ ] Events published from Course Service
- [ ] Events published from Assessment Service
- [ ] Basic consumer logging events
- [ ] Event schemas documented

---

## Technical Tasks

### Media Service Tasks
- [ ] Setup AWS S3 bucket
- [ ] Configure IAM roles and policies
- [ ] Install AWS SDK
- [ ] Create Media Service (Express)
- [ ] Implement POST /media/upload
  - Handle multipart/form-data
  - Validate file type and size
  - Upload to S3
  - Store metadata (optional)
- [ ] Implement GET /media/:id/url
  - Generate signed URL
  - Set expiration
  - Return URL
- [ ] Implement CloudFront integration
  - Generate CloudFront URLs
  - Signed URLs for private content
- [ ] Add error handling
- [ ] Write integration tests

### Kafka Setup Tasks
- [ ] Setup Kafka broker (local Docker or cloud)
- [ ] Create topics:
  ```bash
  user.events
  course.events
  assessment.events
  certification.events
  ```
- [ ] Install Kafka client library (kafkajs)
- [ ] Create Kafka producer utility
- [ ] Integrate producer in User Service
  - Publish USER_REGISTERED event
- [ ] Integrate producer in Course Service
  - Publish COURSE_ENROLLED event
- [ ] Integrate producer in Assessment Service
  - Publish ASSESSMENT_COMPLETED event
  - Publish CERTIFICATION_ISSUED event
- [ ] Create basic consumer for testing
- [ ] Document event schemas

### Integration Tasks
- [ ] Add media routes to API Gateway
- [ ] Update Course Service to use media URLs
- [ ] Test file upload flow
- [ ] Test CDN delivery
- [ ] Test event publishing
- [ ] Verify events in Kafka

---

## Sprint Backlog

### Must Have (P0)
1. Story 5.1: Media Upload
2. Story 5.2: CloudFront Integration
3. Story 5.3: Kafka Setup

### Nice to Have (P1)
- Media metadata API
- File deletion endpoint
- Media transcoding (for videos)
- Event replay capability
- Event monitoring dashboard

---

## Definition of Done (Sprint Level)

- [ ] All P0 stories completed
- [ ] All acceptance criteria met
- [ ] S3 bucket operational
- [ ] CloudFront distribution working
- [ ] Kafka broker running
- [ ] Events published from all services
- [ ] Media upload working through gateway
- [ ] Code reviewed and merged
- [ ] Tests passing
- [ ] Documentation updated

---

## Demo Checklist

### Media Service Demo
- [ ] Show file upload via API
- [ ] Show file in S3 bucket
- [ ] Show signed URL generation
- [ ] Show CloudFront URL
- [ ] Show file access via CDN
- [ ] Show error handling

### Kafka Demo
- [ ] Show Kafka topics
- [ ] Show event publishing from User Service
- [ ] Show event publishing from Course Service
- [ ] Show event publishing from Assessment Service
- [ ] Show consumer receiving events
- [ ] Show event payloads

### Integration Demo
- [ ] Complete flow: Upload → Get URL → Access via CDN
- [ ] Course with media content
- [ ] Events published on key actions
- [ ] All requests authenticated

---

## AWS Configuration

### S3 Bucket Setup
```yaml
Bucket Name: skillforge-media
Region: us-east-1 (or preferred)
Versioning: Enabled (optional)
Public Access: Blocked
CORS Configuration: Allow frontend origin
```

### IAM Policy (for Media Service)
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::skillforge-media/*"
    }
  ]
}
```

### CloudFront Distribution
```yaml
Origin: S3 bucket (skillforge-media)
Distribution Type: Web
Default Cache Behavior: 
  - Viewer Protocol Policy: Redirect HTTP to HTTPS
  - Allowed HTTP Methods: GET, HEAD, OPTIONS
  - Cache Policy: CachingOptimized
Signed URLs: Enabled for private content
```

---

## Kafka Topics & Events

### Topics
1. **user.events**
   - USER_REGISTERED
   - USER_UPDATED
   - USER_ROLE_CHANGED

2. **course.events**
   - COURSE_CREATED
   - COURSE_ENROLLED
   - COURSE_COMPLETED

3. **assessment.events**
   - ASSESSMENT_COMPLETED
   - ASSESSMENT_SUBMITTED

4. **certification.events**
   - CERTIFICATION_ISSUED

### Event Schemas

#### USER_REGISTERED
```json
{
  "event_type": "USER_REGISTERED",
  "timestamp": "2024-01-01T00:00:00Z",
  "user_id": "uuid",
  "email": "user@example.com",
  "name": "User Name",
  "provider": "google"
}
```

#### COURSE_ENROLLED
```json
{
  "event_type": "COURSE_ENROLLED",
  "timestamp": "2024-01-01T00:00:00Z",
  "user_id": "uuid",
  "course_id": "uuid",
  "course_title": "Course Name"
}
```

#### ASSESSMENT_COMPLETED
```json
{
  "event_type": "ASSESSMENT_COMPLETED",
  "timestamp": "2024-01-01T00:00:00Z",
  "user_id": "uuid",
  "assessment_id": "uuid",
  "course_id": "uuid",
  "score": 85,
  "percentage": 85,
  "passed": true
}
```

#### CERTIFICATION_ISSUED
```json
{
  "event_type": "CERTIFICATION_ISSUED",
  "timestamp": "2024-01-01T00:00:00Z",
  "user_id": "uuid",
  "course_id": "uuid",
  "assessment_id": "uuid",
  "certificate_id": "CERT-2024-001",
  "score": 85,
  "percentage": 85
}
```

---

## API Endpoints

### Media Service
- `POST /media/upload` - Upload file to S3
- `GET /media/:id/url` - Get signed URL for file
- `GET /media/:id` - Get file metadata
- `DELETE /media/:id` - Delete file (optional)

### API Gateway
- All above endpoints proxied through gateway

---

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| AWS setup complexity | High | Use AWS console, document step-by-step |
| S3 costs | Medium | Monitor usage, set up alerts |
| Kafka setup issues | High | Use Docker for local, or managed service |
| File size limits | Medium | Implement chunked uploads if needed |
| CDN configuration | Medium | Follow AWS documentation, test thoroughly |

---

## Notes

- Media Service should validate file types (images, videos, PDFs)
- Implement file size limits (e.g., 100MB max)
- Use presigned URLs for secure, time-limited access
- CloudFront caching improves performance significantly
- Kafka events enable async processing (notifications in Sprint 6)
- Consider adding media transcoding in future for video optimization

---

## Next Sprint Preview

**Sprint 6** will focus on:
- Notification Service with email sending
- Kafka consumer implementation
- Error handling and logging
- Security hardening
- Documentation and production readiness
- Final demo preparation
