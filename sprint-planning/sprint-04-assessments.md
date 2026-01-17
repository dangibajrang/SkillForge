# Sprint 4: Assessments & Certification

**Duration:** 1 week  
**Sprint Goal:** Measure learning outcomes.

## Epics Covered

1. **Epic 5: Assessment Service**
2. **Epic 7: Frontend Integration (Part 2)**

## User Stories

### Story 4.1: Quiz Engine

**Priority:** High  
**Story Points:** 8

**Why:** Assessment validates learning.

**What to Build:**
- Question schema
- Answer submission
- Scoring logic

**How to Proceed:**
1. Question schema
   - Design assessment and question documents
   - Support multiple question types (MCQ, True/False)
   - Store correct answers
2. Answer submission
   - Create submission endpoint
   - Validate answers
   - Store submission with timestamp
3. Scoring logic
   - Calculate score based on correct answers
   - Store score and percentage
   - Determine pass/fail

**Acceptance Criteria:**
- ✅ Assessments can be created
- ✅ Questions are stored correctly
- ✅ Answers can be submitted
- ✅ Score calculated correctly
- ✅ Results stored in database

**Definition of Done:**
- [ ] Assessment schema designed
- [ ] Question schema designed
- [ ] POST /assessments endpoint (create)
- [ ] GET /assessments/:id endpoint
- [ ] POST /assessments/:id/submit endpoint
- [ ] Scoring algorithm implemented
- [ ] Results stored correctly
- [ ] Integration tests written

---

### Story 4.2: Certification Logic

**Priority:** High  
**Story Points:** 5

**Why:** Certificates provide proof of completion.

**What to Build:**
- Pass/fail threshold
- Certificate trigger
- Certificate generation/storage

**How to Proceed:**
1. Pass/fail threshold
   - Configurable threshold (e.g., 70%)
   - Check score against threshold
2. Certificate trigger
   - On assessment completion → check score
   - If pass → generate certificate
3. Event publishing
   - Publish CERTIFICATION_ISSUED event to Kafka
   - Include certificate metadata

**Acceptance Criteria:**
- ✅ Certificate issued on pass
- ✅ Pass threshold is configurable
- ✅ Certificate event published to Kafka
- ✅ Certificate data stored

**Definition of Done:**
- [ ] Pass threshold configuration
- [ ] Certificate generation logic
- [ ] Certificate schema/model
- [ ] Kafka event publishing (CERTIFICATION_ISSUED)
- [ ] Certificate retrieval endpoint
- [ ] Integration with assessment completion

---

### Story 4.3: Assessment UI

**Priority:** High  
**Story Points:** 8

**Why:** Users need interface to take assessments.

**What to Build:**
- Quiz UI
- Result screen
- Certificate display

**How to Proceed:**
1. React components
   - Quiz component with questions
   - Answer selection UI
   - Submit button
   - Result screen
2. State management
   - Assessment state in Redux
   - Answer tracking
   - Submission handling
3. API integration
   - Fetch assessment
   - Submit answers
   - Display results

**Acceptance Criteria:**
- ✅ User can complete assessment
- ✅ Questions displayed correctly
- ✅ Answers can be selected
- ✅ Results shown after submission
- ✅ Certificate displayed if passed

**Definition of Done:**
- [ ] Assessment slice in Redux
- [ ] Quiz component created
- [ ] Question rendering
- [ ] Answer selection UI
- [ ] Submit functionality
- [ ] Result screen
- [ ] Certificate display
- [ ] Loading and error states

---

## Technical Tasks

### Assessment Service Tasks
- [ ] Create Assessment schema
  ```javascript
  {
    _id: ObjectId,
    course_id: ObjectId,
    title: String,
    description: String,
    pass_threshold: Number, // 0-100
    questions: [{
      _id: ObjectId,
      question_text: String,
      question_type: String, // 'mcq' | 'true_false'
      options: [String], // for MCQ
      correct_answer: String | Number | Boolean,
      points: Number
    }],
    total_points: Number,
    created_at: Date
  }
  ```
- [ ] Create Submission schema
  ```javascript
  {
    _id: ObjectId,
    assessment_id: ObjectId,
    user_id: String,
    answers: [{
      question_id: ObjectId,
      answer: String | Number | Boolean
    }],
    score: Number,
    percentage: Number,
    passed: Boolean,
    submitted_at: Date
  }
  ```
- [ ] Create Certificate schema
  ```javascript
  {
    _id: ObjectId,
    user_id: String,
    course_id: ObjectId,
    assessment_id: ObjectId,
    certificate_id: String, // unique identifier
    issued_at: Date,
    score: Number
  }
  ```
- [ ] Implement POST /assessments
- [ ] Implement GET /assessments/:id
- [ ] Implement POST /assessments/:id/submit
- [ ] Implement scoring algorithm
- [ ] Implement certificate generation
- [ ] Setup Kafka producer
- [ ] Publish CERTIFICATION_ISSUED event
- [ ] Implement GET /certificates/:id
- [ ] Add error handling
- [ ] Write integration tests

### Frontend Tasks
- [ ] Create assessment slice in Redux
  ```javascript
  - fetchAssessment (async thunk)
  - submitAssessment (async thunk)
  - fetchCertificate (async thunk)
  ```
- [ ] Create Quiz component
- [ ] Create Question component
- [ ] Create AnswerOption component
- [ ] Create ResultScreen component
- [ ] Create CertificateDisplay component
- [ ] Add routing for assessment pages
- [ ] Handle timer (if needed)
- [ ] Style components
- [ ] Handle loading/error states

### Integration Tasks
- [ ] Add assessment routes to API Gateway
- [ ] Test end-to-end: Start Assessment → Answer → Submit → View Result
- [ ] Test certificate generation flow
- [ ] Verify Kafka event publishing

---

## Sprint Backlog

### Must Have (P0)
1. Story 4.1: Quiz Engine
2. Story 4.2: Certification Logic
3. Story 4.3: Assessment UI

### Nice to Have (P1)
- Assessment timer
- Question navigation (previous/next)
- Review answers before submission
- Certificate PDF generation
- Assessment analytics

---

## Definition of Done (Sprint Level)

- [ ] All P0 stories completed
- [ ] All acceptance criteria met
- [ ] Assessment APIs working
- [ ] Scoring logic accurate
- [ ] Certificates generated on pass
- [ ] Kafka events published
- [ ] Frontend assessment flow working
- [ ] Code reviewed and merged
- [ ] Tests passing
- [ ] Documentation updated

---

## Demo Checklist

### Assessment Service Demo
- [ ] Show assessment creation
- [ ] Show assessment retrieval
- [ ] Show answer submission
- [ ] Show score calculation
- [ ] Show certificate generation
- [ ] Show Kafka event in console/logs

### Frontend Demo
- [ ] Show assessment start flow
- [ ] Show question display
- [ ] Show answer selection
- [ ] Show submission
- [ ] Show result screen with score
- [ ] Show certificate (if passed)
- [ ] Show error handling

### Integration Demo
- [ ] Complete flow: Start → Answer → Submit → Result
- [ ] Certificate generation on pass
- [ ] Event published to Kafka
- [ ] All requests authenticated

---

## MongoDB Schema

### Assessments Collection
```javascript
{
  _id: ObjectId,
  course_id: ObjectId (required),
  title: String (required),
  description: String,
  pass_threshold: Number (default: 70), // percentage
  questions: [{
    _id: ObjectId,
    question_text: String (required),
    question_type: String, // 'mcq' | 'true_false'
    options: [String], // for MCQ
    correct_answer: String | Number | Boolean (required),
    points: Number (default: 1),
    order: Number
  }],
  total_points: Number,
  time_limit: Number, // in minutes (optional)
  created_at: Date,
  updated_at: Date
}
```

### Submissions Collection
```javascript
{
  _id: ObjectId,
  assessment_id: ObjectId (required),
  user_id: String (required),
  answers: [{
    question_id: ObjectId,
    answer: String | Number | Boolean
  }],
  score: Number,
  percentage: Number,
  passed: Boolean,
  submitted_at: Date
}
```

### Certificates Collection
```javascript
{
  _id: ObjectId,
  user_id: String (required),
  course_id: ObjectId (required),
  assessment_id: ObjectId (required),
  certificate_id: String (required, unique), // e.g., "CERT-2024-001"
  score: Number,
  percentage: Number,
  issued_at: Date
}
```

### Indexes
```javascript
// Assessments
db.assessments.createIndex({ course_id: 1 })

// Submissions
db.submissions.createIndex({ user_id: 1, assessment_id: 1 }, { unique: true })
db.submissions.createIndex({ assessment_id: 1 })

// Certificates
db.certificates.createIndex({ user_id: 1 })
db.certificates.createIndex({ course_id: 1 })
db.certificates.createIndex({ certificate_id: 1 }, { unique: true })
```

---

## API Endpoints

### Assessment Service
- `POST /assessments` - Create assessment (instructor/admin only)
- `GET /assessments/:id` - Get assessment details
- `POST /assessments/:id/submit` - Submit answers
- `GET /assessments/:id/result` - Get submission result
- `GET /certificates/:id` - Get certificate details
- `GET /users/:userId/certificates` - Get user's certificates

### API Gateway
- All above endpoints proxied through gateway

---

## Scoring Algorithm

```javascript
function calculateScore(questions, answers) {
  let totalPoints = 0;
  let earnedPoints = 0;
  
  answers.forEach(answer => {
    const question = questions.find(q => q._id === answer.question_id);
    if (question) {
      totalPoints += question.points;
      if (answer.answer === question.correct_answer) {
        earnedPoints += question.points;
      }
    }
  });
  
  const percentage = (earnedPoints / totalPoints) * 100;
  const passed = percentage >= assessment.pass_threshold;
  
  return {
    score: earnedPoints,
    totalPoints,
    percentage,
    passed
  };
}
```

---

## Kafka Events

### CERTIFICATION_ISSUED Event
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

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Scoring algorithm bugs | High | Write comprehensive unit tests |
| Certificate generation complexity | Medium | Start with simple certificate data, add PDF later |
| Kafka setup issues | Medium | Use local Kafka or cloud service, document setup |
| Assessment timing | Low | Add timer in future sprint if needed |

---

## Notes

- One submission per user per assessment (enforced by unique index)
- Certificate generation is automatic on pass
- Kafka events enable async notification (Sprint 6)
- Consider adding question shuffling in future
- Assessment should be linked to course

---

## Next Sprint Preview

**Sprint 5** will focus on:
- Media Service with S3 integration
- File upload functionality
- CloudFront CDN setup
- Kafka event system setup
- Event producers and consumers
