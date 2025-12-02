# Quick Seed Data Reference

## Database Commands

```bash
# Seed the database with test data
npx prisma db seed

# Reset database and reseed (WARNING: Deletes all data)
npx prisma migrate reset

# View data in Prisma Studio (GUI)
npx prisma studio
```

## Test Accounts Quick Reference

### 🎭 Talent Users

| Name | Email | Category | Specialties | Rate |
|------|-------|----------|-------------|------|
| Priya Sharma | priya.sharma@example.com | Dancer | Bharatanatyam, Contemporary, Kathak | ₹5,000/hr |
| Rahul Verma | rahul.verma@example.com | Actor | Theatre, Film, TV, Voice Acting | ₹8,000/hr |
| Anjali Desai | anjali.desai@example.com | Singer | Playback, Classical, Bollywood, Fusion | ₹10,000/hr |
| Arjun Kapoor | arjun.kapoor@example.com | Model | Runway, Print, Commercial, Fitness | ₹7,500/hr |
| Neha Patel | neha.patel@example.com | Photographer | Fashion, Events, Commercial, Portrait | ₹6,000/hr |

### 🏢 Employer Users

| Company Name | Email | Industry | Focus Area |
|--------------|-------|----------|------------|
| Bollywood Productions | contact@bollywoodprod.com | Entertainment | Films, Web Series |
| Fashion Week India | hiring@fashionweekindia.com | Fashion | Fashion Shows, Modeling |
| Concert Masters | talent@concertmasters.com | Event Management | Concerts, Live Music |

## Job Postings Overview

### Active Jobs (All accepting applications)

1. **Lead Actress for Romantic Drama** (Bollywood Productions)
   - Category: Actor
   - Compensation: ₹5L - ₹15L per project
   - Location: Mumbai
   - Deadline: Jan 31, 2025
   - Audition: Required (Feb 5, 2025)

2. **Male Models for Fashion Week Runway** (Fashion Week India)
   - Category: Model
   - Compensation: ₹50K - ₹150K per day
   - Location: New Delhi
   - Slots: 10 positions
   - Deadline: Jan 25, 2025

3. **Playback Singer for Live Concert** (Concert Masters)
   - Category: Singer
   - Compensation: ₹1L - ₹3L per event
   - Location: Bangalore
   - Slots: 2 positions
   - Deadline: Jan 20, 2025

4. **Classical Dancers for Movie Song** (Bollywood Productions)
   - Category: Dancer
   - Compensation: ₹75K - ₹150K per project
   - Location: Mumbai
   - Slots: 5 positions
   - Deadline: Feb 10, 2025

5. **Event Photographer for Music Festival** (Concert Masters)
   - Category: Photographer
   - Compensation: ₹150K - ₹250K per event
   - Location: Goa
   - 3-day festival coverage
   - No audition required

6. **Female Models - Print Campaign** (Fashion Week India)
   - Category: Model
   - Compensation: ₹40K - ₹100K per day
   - Location: Mumbai
   - Slots: 3 positions
   - Deadline: Jan 15, 2025

## Audition Status Examples

| Talent | Job | Status | Notes |
|--------|-----|--------|-------|
| Priya Sharma | Classical Dancers for Movie | ✅ Shortlisted | Rating: 5/5, Callback scheduled |
| Priya Sharma | Lead Actress | ⏳ Under Review | Awaiting review |
| Rahul Verma | Lead Actress | 📅 Audition Scheduled | Rating: 4/5 |
| Anjali Desai | Playback Singer | 🎉 Selected | Rating: 5/5, Perfect fit |
| Arjun Kapoor | Male Models Runway | 📝 Submitted | Pending review |
| Arjun Kapoor | Female Models Print | ❌ Rejected | Gender mismatch |
| Neha Patel | Event Photographer | ✅ Shortlisted | Rating: 4/5 |

## Testing Workflows

### 1. Talent Profile Features
- View complete profile with bio, specializations, rates
- Browse portfolio items (videos, images, audio)
- Check work experience and education history
- Review social media links and contact info

### 2. Job Search & Applications
- Search jobs by category (singer, dancer, actor, etc.)
- Filter by location (Mumbai, Delhi, Bangalore, Goa)
- View job details and requirements
- See application deadlines and audition dates

### 3. Audition Management
- Submit applications to jobs
- Track application status
- View employer feedback and ratings
- Manage multiple applications

### 4. Employer Features
- Post and manage jobs
- Review received applications
- Rate and shortlist candidates
- Schedule auditions
- View applicant portfolios

### 5. Portfolio Showcase
Each talent has:
- **Featured items** (highlighted in profile)
- **Multiple media types** (video, audio, image, document)
- **Tagged content** for easy categorization
- **Professional descriptions**

## Data Relationships to Test

```
User (Priya Sharma)
  ├── Profile (Dancer)
  │   ├── Specializations: [Bharatanatyam, Contemporary, Kathak]
  │   └── Rate: ₹5,000/hr
  ├── Experience (2 records)
  │   ├── Lead Dancer - World Tour
  │   └── Choreographer - TV Show
  ├── Education (1 record)
  │   └── Kalakshetra - Bharatanatyam Diploma
  ├── Portfolio (3 items)
  │   ├── Shiva Tandava Performance (Video - Featured)
  │   ├── Contemporary Fusion (Video - Featured)
  │   └── Dance Photoshoot (Image)
  └── Auditions (2 applications)
      ├── Classical Dancers → Shortlisted ⭐
      └── Lead Actress → Under Review
```

## Portfolio Content by User

### Priya Sharma (Dancer)
- 2 video performances
- 1 photo gallery

### Rahul Verma (Actor)
- 2 acting reels (dramatic & comedy)
- 1 professional headshot

### Anjali Desai (Singer)
- 2 audio recordings (classical & Bollywood)
- 1 concert performance video

### Arjun Kapoor (Model)
- 1 runway walk video
- 1 commercial portfolio photo

### Neha Patel (Photographer)
- 1 portfolio document (PDF)

## Useful Queries for Testing

### Find all active jobs for dancers
```typescript
const jobs = await prisma.job.findMany({
  where: {
    talent_category: 'dancer',
    status: 'active'
  }
});
```

### Get talent's complete profile with portfolio
```typescript
const user = await prisma.user.findUnique({
  where: { email: 'priya.sharma@example.com' },
  include: {
    profile: true,
    portfolioItems: true,
    experiences: true,
    educations: true,
    auditions: {
      include: {
        job: true
      }
    }
  }
});
```

### View job with all applications
```typescript
const job = await prisma.job.findUnique({
  where: { job_id: '<job-id>' },
  include: {
    auditions: {
      include: {
        user: {
          include: {
            profile: true
          }
        },
        portfolio: true
      }
    }
  }
});
```

## Tips

- 🔍 Use **Prisma Studio** (`npx prisma studio`) for a visual database browser
- 📧 All email addresses are fake - use for testing only
- 📅 Job deadlines are set in near future for realistic testing
- ⭐ Some auditions have ratings/notes to test feedback features
- 🎯 Portfolio items are marked as "featured" to test highlighting
- 🔗 All media URLs are placeholders - replace with actual storage URLs

## Next Steps

1. ✅ Database is seeded with test data
2. 🚀 Run your Next.js app: `npm run dev`
3. 🔐 Test login with any of the email addresses above
4. 🧪 Explore all features using the seeded data
5. 📊 Use Prisma Studio to visualize relationships
6. 🔄 Re-run seed anytime to reset to clean test data

Happy Testing! 🎉
