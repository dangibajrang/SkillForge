# Sprint 3: Course & Content Management

**Duration:** 1 week  
**Sprint Goal:** Enable course creation and browsing.

## Epics Covered

1. **Epic 4: Course Service (MongoDB)**
2. **Epic 7: Frontend Integration (Part 1)**

## User Stories

### Story 3.1: Course Schema Design

**Priority:** High  
**Story Points:** 5

**Why:** Courses evolve; schema flexibility needed.

**What to Build:**
- Course → Modules → Lessons structure
- Metadata support
- Flexible schema for future changes

**How to Proceed:**
1. MongoDB collections
   - Design Course collection
   - Design Enrollment collection
2. Nested documents
   - Modules as array in Course
   - Lessons as array in Module
3. Schema validation
   - Define required fields
   - Set up indexes

**Acceptance Criteria:**
- ✅ Course structure stored correctly
- ✅ Nested modules and lessons work
- ✅ Schema supports future extensions
- ✅ Indexes created for performance

**Definition of Done:**
- [ ] MongoDB database setup
- [ ] Course collection schema designed
- [ ] Enrollment collection schema designed
- [ ] Indexes created
- [ ] Sample course data inserted
- [ ] Schema documented

---

### Story 3.2: Course APIs

**Priority:** High  
**Story Points:** 8

**Why:** Core business functionality.

**What to Build:**
- Create course
- List courses
- Get course details
- Enroll user

**How to Proceed:**
1. MongoDB queries
   - Create course document
   - Query courses with filters
   - Get course by ID
   - Create enrollment document
2. CRUD endpoints
   - POST /courses - Create course
   - GET /courses - List courses (with pagination)
   - GET /courses/:id - Get course details
   - POST /courses/:id/enroll - Enroll in course
3. Integration with User Service
   - Validate user exists
   - Check enrollment status

**Acceptance Criteria:**
- ✅ Users can browse courses
- ✅ Users can enroll in courses
- ✅ Course details are accessible
- ✅ Enrollment is tracked
- ✅ Pagination works for course list

**Definition of Done:**
- [ ] POST /courses endpoint working
- [ ] GET /courses endpoint with pagination
- [ ] GET /courses/:id endpoint working
- [ ] POST /courses/:id/enroll endpoint working
- [ ] Enrollment validation (no duplicate enrollments)
- [ ] Integration with User Service
- [ ] Error handling implemented
- [ ] Integration tests written

---

### Story 3.3: Course UI

**Priority:** High  
**Story Points:** 8

**Why:** Users need a way to interact with courses.

**What to Build:**
- Course listing page
- Course detail page
- Enrollment flow

**How to Proceed:**
1. React + RTK slices
   - Setup Redux Toolkit
   - Create course slice
   - Create async thunks for API calls
2. Async API calls
   - Fetch courses list
   - Fetch course details
   - Handle enrollment
3. UI Components
   - Course card component
   - Course list page
   - Course detail page
   - Enrollment button

**Acceptance Criteria:**
- ✅ Courses visible in UI
- ✅ Course details displayed
- ✅ Enrollment button works
- ✅ Loading states handled
- ✅ Error states displayed

**Definition of Done:**
- [ ] React app setup (if not already)
- [ ] Redux Toolkit configured
- [ ] Course slice created
- [ ] Course list page implemented
- [ ] Course detail page implemented
- [ ] Enrollment functionality working
- [ ] Loading and error states handled
- [ ] UI is responsive

---

## Technical Tasks

### Course Service Tasks
- [ ] Setup MongoDB connection
- [ ] Create Course schema/model
  ```javascript
  {
    _id: ObjectId,
    title: String,
    description: String,
    instructor_id: String,
    thumbnail_url: String,
    modules: [{
      title: String,
      description: String,
      order: Number,
      lessons: [{
        title: String,
        content: String,
        media_url: String,
        order: Number,
        duration: Number
      }]
    }],
    created_at: Date,
    updated_at: Date
  }
  ```
- [ ] Create Enrollment schema/model
  ```javascript
  {
    _id: ObjectId,
    user_id: String,
    course_id: String,
    enrolled_at: Date,
    progress: Number,
    completed: Boolean
  }
  ```
- [ ] Create indexes
  - Index on course_id in enrollments
  - Index on user_id in enrollments
  - Index on instructor_id in courses
- [ ] Implement POST /courses
- [ ] Implement GET /courses (with pagination, filters)
- [ ] Implement GET /courses/:id
- [ ] Implement POST /courses/:id/enroll
- [ ] Add input validation
- [ ] Add error handling
- [ ] Write integration tests

### Frontend Tasks
- [ ] Setup React app (if not already)
- [ ] Install Redux Toolkit
- [ ] Create course slice
  ```javascript
  - fetchCourses (async thunk)
  - fetchCourseById (async thunk)
  - enrollInCourse (async thunk)
  ```
- [ ] Create API service layer
- [ ] Create CourseCard component
- [ ] Create CourseList page
- [ ] Create CourseDetail page
- [ ] Add routing (React Router)
- [ ] Style components
- [ ] Handle loading/error states

### Integration Tasks
- [ ] Add course routes to API Gateway
- [ ] Test end-to-end: Browse → View → Enroll
- [ ] Test authentication flow with courses
- [ ] Verify enrollment tracking

---

## Sprint Backlog

### Must Have (P0)
1. Story 3.1: Course Schema Design
2. Story 3.2: Course APIs
3. Story 3.3: Course UI

### Nice to Have (P1)
- Course search functionality
- Course filtering (by category, instructor)
- Course rating/reviews
- Progress tracking UI

---

## Definition of Done (Sprint Level)

- [ ] All P0 stories completed
- [ ] All acceptance criteria met
- [ ] MongoDB database operational
- [ ] Course APIs working through gateway
- [ ] Frontend displaying courses
- [ ] Enrollment flow working end-to-end
- [ ] Code reviewed and merged
- [ ] Tests passing
- [ ] Documentation updated

---

## Demo Checklist

### Course Service Demo
- [ ] Show course creation via API
- [ ] Show course listing with pagination
- [ ] Show course details retrieval
- [ ] Show enrollment creation
- [ ] Show MongoDB collections and documents

### Frontend Demo
- [ ] Show course listing page
- [ ] Show course cards with information
- [ ] Show course detail page
- [ ] Show enrollment button and flow
- [ ] Show loading states
- [ ] Show error handling

### Integration Demo
- [ ] Complete flow: Browse → View → Enroll
- [ ] All requests go through gateway
- [ ] Authentication required for enrollment
- [ ] Enrollment tracked in database

---

## MongoDB Schema

### Courses Collection
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  instructor_id: String (required),
  thumbnail_url: String,
  category: String,
  difficulty: String, // 'beginner' | 'intermediate' | 'advanced'
  modules: [{
    _id: ObjectId,
    title: String (required),
    description: String,
    order: Number,
    lessons: [{
      _id: ObjectId,
      title: String (required),
      content: String,
      media_url: String,
      order: Number,
      duration: Number // in minutes
    }]
  }],
  created_at: Date,
  updated_at: Date
}
```

### Enrollments Collection
```javascript
{
  _id: ObjectId,
  user_id: String (required),
  course_id: ObjectId (required),
  enrolled_at: Date,
  progress: Number, // 0-100
  completed: Boolean,
  last_accessed_at: Date
}
```

### Indexes
```javascript
// Courses
db.courses.createIndex({ instructor_id: 1 })
db.courses.createIndex({ created_at: -1 })

// Enrollments
db.enrollments.createIndex({ user_id: 1, course_id: 1 }, { unique: true })
db.enrollments.createIndex({ course_id: 1 })
db.enrollments.createIndex({ user_id: 1 })
```

---

## API Endpoints

### Course Service
- `POST /courses` - Create course (instructor/admin only)
- `GET /courses` - List courses (query params: page, limit, category)
- `GET /courses/:id` - Get course details
- `POST /courses/:id/enroll` - Enroll in course
- `GET /courses/:id/enrollments` - Get enrollment status (for enrolled user)

### API Gateway
- All above endpoints proxied through gateway

---

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| MongoDB schema design issues | Medium | Start simple, iterate based on needs |
| Frontend-backend integration | High | Use consistent API response format |
| Enrollment race conditions | Medium | Use unique index, handle duplicate errors |
| Large course lists performance | Low | Implement pagination from start |

---

## Notes

- Course creation should be restricted to instructors/admins
- Enrollment should check if user is already enrolled
- Frontend should handle authentication state
- Consider adding course categories/tags for future filtering
- Progress tracking can be added in future sprints

---

## Next Sprint Preview

**Sprint 4** will focus on:
- Assessment Service with quiz engine
- Question and answer management
- Scoring logic
- Certification generation
- Assessment UI
