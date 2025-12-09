# Server Actions API Reference

Complete reference for all server actions in the StageConnect application.

---

## Auditions Module

### `getUserAuditions(userId: string)`

Fetches all auditions for a specific user with complete job and portfolio details.

**Parameters:**
- `userId` (string): The UUID of the user

**Returns:**
```typescript
{
  success: boolean,
  data?: Array<{
    audition_id: string,
    user_id: string,
    job_id: string,
    portfolio_id: string | null,
    cover_letter: string | null,
    submitted_at: Date,
    status: AuditionStatus,
    audition_notes: string | null,
    rating: number | null,
    updated_at: Date,
    job: {
      job_id: string,
      title: string,
      description: string,
      // ... other job fields
      profile: {
        company_name: string | null,
        contact_person_name: string | null,
        user: {
          name: string | null,
          email: string
        }
      }
    },
    portfolio: {
      portfolio_id: string,
      title: string | null,
      media_url: string,
      media_type: string,
      thumbnail_url: string | null
    } | null
  }>,
  error?: string
}
```

**Example:**
```typescript
const result = await getUserAuditions("user-uuid");
if (result.success) {
  result.data.forEach(audition => {
    console.log(audition.job.title, audition.status);
  });
}
```

---

### `getAuditionById(auditionId: string)`

Fetches detailed information about a single audition.

**Parameters:**
- `auditionId` (string): The UUID of the audition

**Returns:**
```typescript
{
  success: boolean,
  data?: {
    // Same structure as getUserAuditions items
    // Plus additional user info
    user: {
      name: string | null,
      email: string
    }
  },
  error?: string
}
```

**Example:**
```typescript
const result = await getAuditionById("audition-uuid");
if (result.success) {
  console.log('Audition for:', result.data.job.title);
  console.log('Status:', result.data.status);
}
```

---

### `submitAudition(data)`

Submits a new audition application. Validates that user hasn't already applied.

**Parameters:**
```typescript
{
  userId: string,
  jobId: string,
  portfolioId?: string,
  coverLetter?: string
}
```

**Returns:**
```typescript
{
  success: boolean,
  data?: {
    audition_id: string,
    status: AuditionStatus,
    submitted_at: Date,
    job: {
      title: string
    }
  },
  error?: string // "You have already applied for this job" if duplicate
}
```

**Example:**
```typescript
const result = await submitAudition({
  userId: "user-uuid",
  jobId: "job-uuid",
  portfolioId: "portfolio-uuid", // optional
  coverLetter: "I am perfect for this role..." // optional
});

if (result.success) {
  alert(`Applied to ${result.data.job.title}!`);
}
```

**Side Effects:**
- Revalidates `/Auditions` path

---

### `updateAuditionStatus(auditionId: string, status: AuditionStatus)`

Updates the status of an audition. Typically used by employers.

**Parameters:**
- `auditionId` (string): The UUID of the audition
- `status` (AuditionStatus): New status value

**Returns:**
```typescript
{
  success: boolean,
  data?: {
    audition_id: string,
    status: AuditionStatus,
    updated_at: Date
  },
  error?: string
}
```

**Example:**
```typescript
import { AuditionStatus } from '@/app/Actions/enums';

const result = await updateAuditionStatus(
  "audition-uuid",
  AuditionStatus.shortlisted
);
```

**Side Effects:**
- Revalidates `/Auditions` path

---

### `withdrawAudition(auditionId: string)`

Allows a user to withdraw their application.

**Parameters:**
- `auditionId` (string): The UUID of the audition

**Returns:**
```typescript
{
  success: boolean,
  message?: string,
  error?: string
}
```

**Example:**
```typescript
if (confirm('Withdraw this application?')) {
  const result = await withdrawAudition("audition-uuid");
  if (result.success) {
    alert(result.message);
  }
}
```

**Side Effects:**
- Sets status to `withdrawn`
- Revalidates `/Auditions` path

---

### `deleteAudition(auditionId: string)`

Permanently deletes an audition record.

**Parameters:**
- `auditionId` (string): The UUID of the audition

**Returns:**
```typescript
{
  success: boolean,
  message?: string,
  error?: string
}
```

**Example:**
```typescript
const result = await deleteAudition("audition-uuid");
```

**Side Effects:**
- Permanently removes record from database
- Revalidates `/Auditions` path

---

### `getAuditionsByStatus(userId: string, status?: AuditionStatus)`

Fetches auditions filtered by status.

**Parameters:**
- `userId` (string): The UUID of the user
- `status` (AuditionStatus, optional): Filter by this status

**Returns:**
Same structure as `getUserAuditions`

**Example:**
```typescript
import { AuditionStatus } from '@/app/Actions/enums';

// Get only submitted auditions
const result = await getAuditionsByStatus(
  "user-uuid",
  AuditionStatus.submitted
);

// Get all auditions (no filter)
const allResult = await getAuditionsByStatus("user-uuid");
```

---

### `getAuditionStats(userId: string)`

Gets statistics about user's auditions.

**Parameters:**
- `userId` (string): The UUID of the user

**Returns:**
```typescript
{
  success: boolean,
  data?: {
    total: number,
    byStatus: {
      [status: string]: number
    }
  },
  error?: string
}
```

**Example:**
```typescript
const result = await getAuditionStats("user-uuid");
if (result.success) {
  console.log('Total:', result.data.total);
  console.log('Submitted:', result.data.byStatus.submitted);
  console.log('Selected:', result.data.byStatus.selected);
}
```

---

## Jobs Module

### `getActiveJobs()`

Fetches all active jobs that are currently accepting applications.

**Parameters:** None

**Returns:**
```typescript
{
  success: boolean,
  data?: Array<{
    job_id: string,
    title: string,
    description: string,
    talent_category: TalentCategory,
    location_type: LocationType,
    city: string | null,
    state: string | null,
    country: string | null,
    job_type: JobType,
    compensation_min: Decimal | null,
    compensation_max: Decimal | null,
    application_deadline: Date,
    event_date: Date | null,
    posted_at: Date,
    status: JobStatus,
    profile: {
      company_name: string | null,
      company_logo_url: string | null,
      user: {
        name: string | null
      }
    },
    _count: {
      auditions: number
    }
  }>,
  error?: string
}
```

**Filters Applied:**
- Only jobs with status = `active`
- Only jobs where `application_deadline >= today`

**Ordering:**
- Newest first (by `posted_at`)

**Example:**
```typescript
const result = await getActiveJobs();
if (result.success) {
  console.log(`Found ${result.data.length} active jobs`);
  result.data.forEach(job => {
    console.log(`${job.title} - ${job._count.auditions} applicants`);
  });
}
```

---

### `getJobById(jobId: string)`

Fetches detailed information about a specific job.

**Parameters:**
- `jobId` (string): The UUID of the job

**Returns:**
```typescript
{
  success: boolean,
  data?: {
    // Same structure as getActiveJobs items
    // Plus additional profile fields
    profile: {
      company_name: string | null,
      company_description: string | null,
      company_logo_url: string | null,
      contact_person_name: string | null,
      website: string | null,
      user: {
        name: string | null,
        email: string
      }
    }
  },
  error?: string // "Job not found" if doesn't exist
}
```

**Example:**
```typescript
const result = await getJobById("job-uuid");
if (result.success) {
  console.log(result.data.title);
  console.log(result.data.description);
  console.log(`${result.data._count.auditions} applicants`);
}
```

---

### `searchJobs(filters)`

Searches jobs with multiple filter options.

**Parameters:**
```typescript
{
  talentCategory?: TalentCategory,
  locationType?: LocationType,
  jobType?: JobType,
  city?: string,
  search?: string
}
```

**Returns:**
Same structure as `getActiveJobs`

**Example:**
```typescript
import { TalentCategory, LocationType, JobType } from '@/app/Actions/enums';

const result = await searchJobs({
  talentCategory: TalentCategory.actor,
  locationType: LocationType.on_site,
  city: "Mumbai",
  search: "film audition"
});
```

**Search Behavior:**
- `search` parameter searches in both `title` and `description` (case-insensitive)
- All filters are AND conditions
- Always filters to active jobs with valid deadlines

---

### `hasUserApplied(userId: string, jobId: string)`

Checks if a user has already applied to a specific job.

**Parameters:**
- `userId` (string): The UUID of the user
- `jobId` (string): The UUID of the job

**Returns:**
```typescript
{
  success: boolean,
  data?: boolean, // true if applied, false if not
  error?: string
}
```

**Example:**
```typescript
const result = await hasUserApplied("user-uuid", "job-uuid");
if (result.success && result.data) {
  console.log('User has already applied');
  // Show "Already Applied" badge
} else {
  console.log('User can apply');
  // Show "Apply Now" button
}
```

---

## Portfolio Module

### `getUserPortfolio(userId: string)`

Fetches all portfolio items for a user.

**Parameters:**
- `userId` (string): The UUID of the user

**Returns:**
```typescript
{
  success: boolean,
  data?: Array<{
    portfolio_id: string,
    user_id: string,
    title: string | null,
    description: string | null,
    media_url: string,
    media_type: MediaType,
    thumbnail_url: string | null,
    is_featured: boolean,
    display_order: number | null,
    uploaded_at: Date,
    updated_at: Date
  }>,
  error?: string
}
```

**Ordering:**
1. Featured items first
2. Then by display_order (ascending)
3. Then by uploaded_at (newest first)

**Example:**
```typescript
const result = await getUserPortfolio("user-uuid");
if (result.success) {
  const featuredItems = result.data.filter(item => item.is_featured);
  console.log(`${featuredItems.length} featured items`);
}
```

---

### `getPortfolioItemById(portfolioId: string)`

Fetches a specific portfolio item.

**Parameters:**
- `portfolioId` (string): The UUID of the portfolio item

**Returns:**
```typescript
{
  success: boolean,
  data?: {
    // Same structure as getUserPortfolio items
  },
  error?: string // "Portfolio item not found" if doesn't exist
}
```

**Example:**
```typescript
const result = await getPortfolioItemById("portfolio-uuid");
if (result.success) {
  console.log(result.data.title);
  console.log(result.data.media_url);
}
```

---

## Enums Reference

### AuditionStatus
```typescript
enum AuditionStatus {
  submitted = "submitted",
  under_review = "under_review",
  shortlisted = "shortlisted",
  audition_scheduled = "audition_scheduled",
  selected = "selected",
  rejected = "rejected",
  withdrawn = "withdrawn"
}
```

### JobStatus
```typescript
enum JobStatus {
  active = "active",
  inactive = "inactive",
  closed = "closed",
  draft = "draft"
}
```

### JobType
```typescript
enum JobType {
  full_time = "full_time",
  part_time = "part_time",
  contract = "contract",
  gig = "gig"
}
```

### LocationType
```typescript
enum LocationType {
  remote = "remote",
  on_site = "on_site",
  hybrid = "hybrid"
}
```

### TalentCategory
```typescript
enum TalentCategory {
  singer = "singer",
  dancer = "dancer",
  actor = "actor",
  model = "model",
  musician = "musician",
  voice_artist = "voice_artist",
  choreographer = "choreographer",
  photographer = "photographer",
  videographer = "videographer",
  makeup_artist = "makeup_artist",
  script_writer = "script_writer",
  fashion_designer = "fashion_designer",
  other = "other"
}
```

### MediaType
```typescript
enum MediaType {
  image = "image",
  video = "video",
  audio = "audio",
  document = "document"
}
```

---

## Error Handling Pattern

All server actions follow this pattern:

```typescript
export async function actionName(params) {
  try {
    // Validation
    if (!params) {
      return { success: false, error: "Params required" };
    }

    // Database operation
    const data = await prisma.model.operation();

    // Optional: Check if found
    if (!data) {
      return { success: false, error: "Not found" };
    }

    // Optional: Revalidate path
    revalidatePath("/path");

    return { success: true, data };
  } catch (error) {
    console.error("Error in actionName:", error);
    return { success: false, error: "User-friendly message" };
  }
}
```

---

## Usage Best Practices

1. **Always check success flag:**
   ```typescript
   const result = await someAction();
   if (result.success) {
     // Use result.data
   } else {
     // Handle result.error
   }
   ```

2. **Handle loading states:**
   ```typescript
   setLoading(true);
   const result = await someAction();
   setLoading(false);
   ```

3. **Provide user feedback:**
   ```typescript
   if (result.success) {
     toast.success("Operation successful!");
   } else {
     toast.error(result.error);
   }
   ```

4. **Type safety:**
   ```typescript
   import { AuditionStatus } from '@/app/Actions/enums';
   // Use enum instead of string
   await updateAuditionStatus(id, AuditionStatus.selected);
   ```

---

## Rate Limiting & Performance

- All actions use connection pooling via Prisma
- No manual connection management needed
- Consider implementing rate limiting for public endpoints
- Use React Query or SWR for caching on client side

---

## Testing

```typescript
// Mock example for testing
jest.mock('@/app/Actions/auditions', () => ({
  getUserAuditions: jest.fn().mockResolvedValue({
    success: true,
    data: [/* mock data */]
  })
}));
```

---

**Last Updated:** 2 December 2025
