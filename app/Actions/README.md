# Server Actions Directory

This directory contains all server actions for the StageConnect application. Server actions are organized by domain to maintain modularity and readability.

## Structure

```
Actions/
├── auditions.ts    # Audition-related server actions
├── jobs.ts         # Job-related server actions
├── portfolio.ts    # Portfolio-related server actions
└── types.ts        # Shared TypeScript types
```

## Auditions Actions (`auditions.ts`)

### Functions

#### `getUserAuditions(userId: string)`
Retrieves all auditions for a specific user with job and portfolio details.

**Returns:** Array of auditions ordered by submission date (newest first)

#### `getAuditionById(auditionId: string)`
Gets detailed information about a single audition.

**Returns:** Audition object with related job, profile, and portfolio data

#### `submitAudition(data: { userId, jobId, portfolioId?, coverLetter? })`
Submits a new audition application for a job.

**Validates:** User hasn't already applied to the job

**Returns:** Created audition object

#### `updateAuditionStatus(auditionId: string, status: AuditionStatus)`
Updates the status of an audition (typically used by employers).

**Returns:** Updated audition object

#### `withdrawAudition(auditionId: string)`
Allows user to withdraw their audition application.

**Updates:** Status to `withdrawn`

**Returns:** Success status

#### `deleteAudition(auditionId: string)`
Permanently deletes an audition record.

**Returns:** Success status

#### `getAuditionsByStatus(userId: string, status?: AuditionStatus)`
Retrieves auditions filtered by status.

**Returns:** Filtered auditions array

#### `getAuditionStats(userId: string)`
Gets statistics about user's auditions (total count and breakdown by status).

**Returns:** Statistics object with total and byStatus counts

### Audition Status Values

- `submitted` - Initial submission
- `under_review` - Being reviewed by employer
- `shortlisted` - Moved to shortlist
- `audition_scheduled` - Audition date set
- `selected` - Talent has been selected
- `rejected` - Application rejected
- `withdrawn` - Withdrawn by talent

## Jobs Actions (`jobs.ts`)

### Functions

#### `getActiveJobs()`
Retrieves all active jobs with unexpired application deadlines.

**Includes:** Company profile and audition count

**Returns:** Array of active jobs

#### `getJobById(jobId: string)`
Gets detailed information about a specific job.

**Includes:** Full company profile and applicant count

**Returns:** Job object with related data

#### `searchJobs(filters: { talentCategory?, locationType?, jobType?, city?, search? })`
Searches jobs with multiple filter options.

**Filters:**
- `talentCategory` - Type of talent needed (singer, actor, etc.)
- `locationType` - Remote, on-site, or hybrid
- `jobType` - Full-time, part-time, contract, or gig
- `city` - City name (case-insensitive)
- `search` - Free text search in title and description

**Returns:** Filtered jobs array

#### `hasUserApplied(userId: string, jobId: string)`
Checks if a user has already applied to a specific job.

**Returns:** Boolean indicating application status

## Portfolio Actions (`portfolio.ts`)

### Functions

#### `getUserPortfolio(userId: string)`
Gets all portfolio items for a user.

**Ordering:** Featured first, then by display order, then by upload date

**Returns:** Array of portfolio items

#### `getPortfolioItemById(portfolioId: string)`
Gets details of a single portfolio item.

**Returns:** Portfolio item object

#### `getFeaturedPortfolio(userId: string)`
Gets only the featured portfolio items for a user.

**Returns:** Array of featured items

#### `getPortfolioByMediaType(userId: string, mediaType: MediaType)`
Filters portfolio items by media type.

**Media Types:** `image`, `video`, `audio`, `document`

**Returns:** Filtered portfolio items

#### `createPortfolioItem(data: { ... })`
Creates a new portfolio item.

**Required:** `userId`, `mediaUrl`, `mediaType`

**Optional:** `title`, `thumbnailUrl`, `fileSize`, `duration`, `description`, `tags`, `isFeatured`

**Returns:** Created portfolio item

#### `updatePortfolioItem(portfolioId: string, data: { ... })`
Updates an existing portfolio item's metadata.

**Updatable:** `title`, `description`, `tags`, `isFeatured`, `displayOrder`

**Returns:** Updated portfolio item

#### `deletePortfolioItem(portfolioId: string)`
Permanently deletes a portfolio item.

**Returns:** Success status

## Usage Example

### In a Client Component

```tsx
"use client";
import { getUserAuditions, withdrawAudition } from "@/app/Actions/auditions";
import { useSession } from "next-auth/react";

export default function MyComponent() {
  const { data: session } = useSession();
  
  const loadData = async () => {
    const result = await getUserAuditions(session.user.id);
    if (result.success) {
      console.log(result.data);
    }
  };
  
  const handleWithdraw = async (auditionId: string) => {
    const result = await withdrawAudition(auditionId);
    if (result.success) {
      // Refresh data
      loadData();
    }
  };
}
```

## Error Handling

All server actions return a consistent response format:

```typescript
// Success
{ success: true, data: <result> }

// Error
{ success: false, error: <error message> }
```

Always check the `success` property before accessing `data`.

## Cache Revalidation

Server actions automatically revalidate relevant paths:
- Audition actions: `/Auditions`
- Portfolio actions: `/Profile`

This ensures the UI stays up-to-date after mutations.

## Database

All actions use Prisma Client to interact with the PostgreSQL database. The Prisma instance is imported from `@/lib/prisma`.

## Security

- All server actions are marked with `"use server"` directive
- Authentication should be verified at the component level
- Always validate user permissions before allowing operations
- Use NextAuth session to get the authenticated user ID

## Future Enhancements

- Add rate limiting for audition submissions
- Implement email notifications for status changes
- Add file upload handling for portfolio items
- Create audit logs for important actions
- Add pagination for large result sets
