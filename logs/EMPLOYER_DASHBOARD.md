# Employer Dashboard Implementation

## Overview
A comprehensive company dashboard that displays analytics, job statistics, and performance metrics for employer accounts on StageConnect.

## Features

### 📊 Analytics Dashboard
The employer home page (`/app/(Employer)/Home/page.tsx`) provides:

1. **Key Performance Indicators (KPIs)**
   - Profile Views with growth percentage
   - Connections with growth tracking
   - Active Jobs count
   - Total Applications received

2. **Visual Analytics**
   - **Monthly Views Chart**: Bar chart showing profile views over the last 6 months
   - **Applications by Status**: Visual breakdown of application statuses (submitted, under review, shortlisted, selected, rejected, etc.)

3. **Recent Activity Feed**
   - Real-time updates of new applications
   - Applicant names and timestamps
   - Application status tracking

4. **Posted Jobs Overview**
   - List of all posted jobs
   - Application counts per job
   - New applications indicator
   - Job status (active, draft, closed)

5. **Quick Actions**
   - Post a Job
   - Browse Talent
   - Edit Profile

## File Structure

```
app/
├── (Employer)/
│   └── Home/
│       └── page.tsx          # Employer dashboard page
├── Actions/
│   ├── analytics.ts          # Server actions for analytics
│   └── company.ts            # Company registration & management
├── api/
│   └── user/
│       └── role/
│           └── route.ts      # API route to fetch user role
├── Components/
│   └── CompanyDashboard.tsx  # Reusable dashboard component (if needed)
└── CreatePage/
    └── page.tsx              # Company registration page
```

## User Flow

### Company Registration Flow
1. Company visits `/CreatePage`
2. Fills out registration form with:
   - Company details (name, industry, size)
   - Contact information
   - Address
   - Legal information (optional)
   - Password
3. On successful registration, redirected to `/Home`
4. System detects user role as "employer"
5. Displays employer-specific dashboard

### Employer Home Page Flow
1. User logs in or is redirected after registration
2. System fetches:
   - Company analytics (views, connections, growth)
   - Posted jobs with application stats
   - Recent activity
3. Dashboard displays all metrics with interactive charts
4. User can take quick actions (post job, browse talent, edit profile)

## Technical Implementation

### Server Actions

#### `getCompanyAnalytics(userId: string)`
Located in `/app/Actions/analytics.ts`

**Returns:**
```typescript
{
  success: boolean;
  data?: {
    profileViews: number;
    connections: number;
    connectionsGrowth: number;
    activeJobs: number;
    totalApplications: number;
    viewsGrowth: number;
    monthlyViews: { month: string; views: number }[];
    applicationsByStatus: { status: string; count: number }[];
    recentActivity: {
      type: string;
      title: string;
      date: Date;
      metadata?: any;
    }[];
  };
  error?: string;
}
```

**Features:**
- Verifies user is an employer
- Fetches all jobs posted by the company
- Calculates application statistics
- Generates monthly views trend (6 months)
- Compiles recent activity from applications

#### `getCompanyJobs(userId: string)`
Located in `/app/Actions/analytics.ts`

**Returns:**
```typescript
{
  success: boolean;
  data?: Array<{
    ...job,
    applicationCount: number;
    newApplications: number; // Last 7 days
  }>;
  error?: string;
}
```

**Features:**
- Fetches up to 10 most recent jobs
- Includes application counts
- Highlights new applications (within 7 days)

### API Routes

#### `/api/user/role`
**Method:** GET  
**Query Params:** `userId`

Returns the user's role (talent/employer) for routing logic.

## Styling & Design

### Color Scheme
- **Primary Gold:** `#D4AF37` to `#F7D76A` (gradients)
- **Background:** Gradient from `#FFF8E7` → white → `#FCE4EC`
- **Cards:** White with `#F3E6C9` borders
- **Text:** `#2E2E2E` (primary), `#6B6B6B` (secondary)

### UI Components
- **Stat Cards:** Hover effects with scale animation
- **Charts:** Animated progress bars with gradient fills
- **Activity Feed:** Custom scrollbar, hover states
- **Quick Actions:** Card-based navigation with icons

### Responsive Design
- Mobile-first approach
- Grid layouts adapt: 1 column (mobile) → 2-3 columns (tablet) → 4 columns (desktop)
- Custom scrollbars for content areas
- Touch-friendly interactive elements

## Data Flow

```
User Registration
    ↓
Company Profile Created (role: employer)
    ↓
Redirect to /Home
    ↓
Fetch User Role via API
    ↓
Load Analytics & Jobs Data
    ↓
Render Dashboard with Charts
    ↓
User Interacts (Post Job, Browse Talent, etc.)
```

## Future Enhancements

### Planned Features
1. **Real-time Notifications**
   - WebSocket integration for live updates
   - Push notifications for new applications

2. **Advanced Analytics**
   - Conversion rates (views → applications)
   - Time-to-hire metrics
   - Talent pool insights

3. **Export Functionality**
   - Download analytics as PDF/CSV
   - Generate reports

4. **Comparison Views**
   - Compare current period vs. previous
   - Benchmark against industry averages

5. **Interactive Charts**
   - Clickable chart elements
   - Drill-down functionality
   - Date range selectors

6. **Profile View Tracking**
   - Implement actual view tracking (currently using mock data)
   - Track unique vs. repeat views
   - Geographic distribution of views

## Usage

### For Developers

#### Adding New Analytics Metrics
1. Update the `CompanyAnalytics` interface in `analytics.ts`
2. Modify `getCompanyAnalytics()` to fetch/calculate new metric
3. Update dashboard UI to display the metric

#### Customizing Dashboard Layout
Edit `/app/(Employer)/Home/page.tsx`:
```tsx
// Add new stat card
<div className="bg-white/80 backdrop-blur-sm border-2 border-[#F3E6C9] rounded-2xl p-6">
  {/* Your custom metric */}
</div>
```

#### Adding Quick Actions
```tsx
<Link href="/your-route" className="flex items-center gap-4 p-5 bg-white rounded-xl">
  <div className="w-14 h-14 bg-gradient-to-br from-[color] to-[color] rounded-xl">
    <Icon />
  </div>
  <div>
    <h4>Action Title</h4>
    <p>Description</p>
  </div>
</Link>
```

## Testing

### Manual Testing Checklist
- [ ] Company registration redirects to employer home
- [ ] Analytics load correctly for employer accounts
- [ ] Charts display with accurate data
- [ ] Recent activity shows latest applications
- [ ] Posted jobs list updates after creating new job
- [ ] Quick action links navigate correctly
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Loading states display properly
- [ ] Error states handled gracefully

### Test Data
Use the database seed scripts in `/prisma/seed.ts` to generate test companies and jobs.

## Troubleshooting

### Dashboard not loading
1. Check if user has `role: employer` in their profile
2. Verify NextAuth session includes user ID
3. Check browser console for API errors

### No analytics data showing
1. Ensure company has posted jobs
2. Check database for auditions related to jobs
3. Verify `getCompanyAnalytics()` is not throwing errors

### Charts not rendering
1. Verify data structure matches expected format
2. Check if maxViews calculation is correct
3. Ensure percentages are valid (0-100)

## Contributing
When adding features to the employer dashboard:
1. Maintain consistent styling with existing components
2. Ensure mobile responsiveness
3. Add loading/error states
4. Update this README with new features
5. Test with different data scenarios (empty, partial, full)

## License
Part of the StageConnect platform.
