# Quick Start Guide - Auditions Functionality

## For Developers

### Running the Application

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Access the pages:**
   - Auditions (My Applications): `http://localhost:3000/Auditions`
   - Browse Jobs: `http://localhost:3000/Jobs`
   - Profile: `http://localhost:3000/Profile`

### Project Setup

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run database migrations (if needed)
npx prisma migrate dev

# Seed database (if seed file exists)
npx prisma db seed
```

## User Workflows

### As a Talent (User applying for jobs):

#### 1. **Browse Available Jobs**
- Navigate to `/Jobs` page
- View all active job listings
- See job details: title, company, location, compensation, deadline
- Check if you've already applied (green badge appears)

#### 2. **Apply to a Job**
- Click "Apply Now" button on a job card
- Application modal opens with:
  - Full job description
  - Portfolio item selector (optional)
  - Cover letter text area (optional)
- Click "Submit Application"
- Success message appears
- Button changes to "Already Applied"

#### 3. **View Your Auditions**
- Navigate to `/Auditions` page
- See dashboard with statistics:
  - Total auditions
  - Pending (submitted + under review)
  - Scheduled auditions
  - Selected applications
- Filter by status using dropdown
- View detailed cards for each audition showing:
  - Job title and company
  - Submission date
  - Current status (color-coded)
  - Location and compensation
  - Attached portfolio item
  - Employer notes (if any)
  - Rating (if provided)

#### 4. **Manage Your Auditions**
- **Withdraw**: Click "Withdraw Application" on submitted auditions
- **Delete**: Remove rejected or withdrawn auditions
- **View Details**: See more info on scheduled auditions
- **View Contract**: Check details for selected applications

### As an Employer (Future Enhancement):

#### View Applicants
```typescript
// This functionality can be added using existing actions
const auditions = await getAuditionsByJob(jobId);
```

#### Update Application Status
```typescript
await updateAuditionStatus(auditionId, AuditionStatus.shortlisted);
```

## Code Examples

### Fetching User's Auditions

```typescript
import { getUserAuditions } from '@/app/Actions/auditions';

const loadAuditions = async (userId: string) => {
  const result = await getUserAuditions(userId);
  if (result.success) {
    console.log(result.data); // Array of auditions
  } else {
    console.error(result.error);
  }
};
```

### Submitting an Application

```typescript
import { submitAudition } from '@/app/Actions/auditions';

const applyToJob = async () => {
  const result = await submitAudition({
    userId: session.user.id,
    jobId: selectedJob.job_id,
    portfolioId: selectedPortfolio || undefined,
    coverLetter: coverLetterText || undefined,
  });
  
  if (result.success) {
    alert('Application submitted!');
  } else {
    alert(result.error);
  }
};
```

### Checking Application Status

```typescript
import { hasUserApplied } from '@/app/Actions/jobs';

const checkStatus = async (userId: string, jobId: string) => {
  const result = await hasUserApplied(userId, jobId);
  if (result.success) {
    const alreadyApplied = result.data; // boolean
    console.log(alreadyApplied ? 'Already applied' : 'Not applied yet');
  }
};
```

### Getting Audition Statistics

```typescript
import { getAuditionStats } from '@/app/Actions/auditions';

const loadStats = async (userId: string) => {
  const result = await getAuditionStats(userId);
  if (result.success) {
    console.log('Total:', result.data.total);
    console.log('By Status:', result.data.byStatus);
    // Example: { submitted: 5, selected: 2, rejected: 1 }
  }
};
```

## Status Workflow

```
submitted → under_review → shortlisted → audition_scheduled → selected
                ↓              ↓              ↓
            rejected       rejected       rejected
                ↓
            withdrawn (user action)
```

### Status Colors

- **Submitted**: Blue
- **Under Review**: Yellow
- **Shortlisted**: Purple
- **Audition Scheduled**: Gold
- **Selected**: Green
- **Rejected**: Red
- **Withdrawn**: Gray

## API Response Format

All server actions return a consistent format:

```typescript
// Success response
{
  success: true,
  data: any // The requested data
}

// Error response
{
  success: false,
  error: string // User-friendly error message
}
```

## Environment Variables Required

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth Providers (if used)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

## Common Issues & Solutions

### Issue: Prisma Client not found
**Solution:**
```bash
npx prisma generate
```

### Issue: Database connection error
**Solution:**
- Check DATABASE_URL in .env file
- Ensure PostgreSQL is running
- Run: `npx prisma migrate dev`

### Issue: Session not found
**Solution:**
- Ensure user is logged in
- Check NextAuth configuration
- Verify session provider wraps the app

### Issue: Types not recognized
**Solution:**
```bash
npm install
npx prisma generate
# Restart TypeScript server in VS Code: Cmd+Shift+P → "Restart TS Server"
```

## Testing Checklist

### Basic Functionality
- [ ] Can view jobs list
- [ ] Can open application modal
- [ ] Can select portfolio item
- [ ] Can submit application
- [ ] Application appears in "My Auditions"
- [ ] Status updates reflect correctly
- [ ] Can withdraw application
- [ ] Can delete rejected/withdrawn applications

### UI/UX
- [ ] Loading states show properly
- [ ] Error messages display correctly
- [ ] Animations work smoothly
- [ ] Responsive on mobile
- [ ] Status colors are correct
- [ ] Buttons are disabled when appropriate

### Data Integrity
- [ ] Can't apply twice to same job
- [ ] Statistics calculate correctly
- [ ] Filters work properly
- [ ] Dates format correctly
- [ ] Compensation displays properly

## File Locations

```
Key Files:
├── app/
│   ├── Auditions/page.tsx         # My auditions page
│   ├── Jobs/page.tsx              # Browse jobs page
│   └── Actions/
│       ├── auditions.ts           # Audition server actions
│       ├── jobs.ts                # Job server actions
│       ├── portfolio.ts           # Portfolio server actions
│       └── enums.ts               # All enums
├── prisma/
│   └── schema.prisma              # Database schema
└── lib/
    └── prisma.ts                  # Prisma client instance
```

## Next Development Steps

1. **Add Search**: Implement text search across jobs
2. **Add Filters**: Category, location, compensation filters
3. **Add Pagination**: Limit results per page
4. **Employer View**: Page to manage received applications
5. **Notifications**: Email/push when status changes
6. **Calendar**: View scheduled auditions in calendar
7. **Analytics**: Track application success rates

## Support

For issues or questions:
1. Check the main README.md
2. Review Actions/README.md for server actions documentation
3. Check AUDITIONS_FUNCTIONALITY_SUMMARY.md for implementation details
4. Review Prisma schema for database structure

---

**Happy Coding! 🎭✨**
