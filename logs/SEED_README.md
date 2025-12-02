# Database Seed Script

This seed script populates your StageConnect database with comprehensive dummy data for testing all features of the application.

## What's Included

### Users (8 total)
- **5 Talent Users**: Dancers, Actors, Singers, Models, and Photographers
- **3 Employer Users**: Film Productions, Fashion Events, and Concert Management

### Profiles (8 total)
Complete profiles for all users with:
- Personal information (name, contact, location)
- Professional details (bio, specializations, rates)
- Social media links
- Portfolio references

### Experiences (5 records)
Professional work history for talent users including:
- Lead dancer in world tours
- Theatre and film acting roles
- Playback singing projects

### Education (3 records)
Educational background for talent users:
- Classical dance training
- Theatre and performing arts degrees
- Music education

### Portfolio Items (13 items)
Diverse portfolio content including:
- Video performances (dance, acting, runway)
- Audio recordings (classical, Bollywood)
- Professional photographs
- Portfolio documents

### Jobs (6 opportunities)
Various job postings across categories:
- Film acting roles
- Fashion runway shows
- Live concert performances
- Classical dance sequences
- Event photography gigs
- Print modeling campaigns

### Auditions (7 applications)
Sample auditions in various stages:
- Submitted applications
- Under review
- Shortlisted candidates
- Auditions scheduled
- Selected/Rejected candidates

## Test Credentials

### Talent Users
You can test login functionality with these accounts:

```
priya.sharma@example.com     - Classical Dancer (Bharatanatyam, Contemporary)
rahul.verma@example.com      - Actor (Theatre, Film, TV)
anjali.desai@example.com     - Singer (Classical, Bollywood)
arjun.kapoor@example.com     - Model (Runway, Print, Commercial)
neha.patel@example.com       - Photographer (Fashion, Events)
```

### Employer Users
```
contact@bollywoodprod.com    - Film Production Company
hiring@fashionweekindia.com  - Fashion Event Platform
talent@concertmasters.com    - Concert & Event Management
```

## Running the Seed Script

### Prerequisites
1. Ensure your database is set up and the connection string is configured in `.env`
2. Run Prisma migrations to create the database schema:
   ```bash
   npx prisma migrate dev
   ```

### Execute the Seed
Run the following command from the project root:

```bash
npx prisma db seed
```

Or manually:
```bash
npx ts-node prisma/seed.ts
```

### Reset Database (Clean Slate)
To reset the database and reseed:
```bash
npx prisma migrate reset
```
This will:
1. Drop the database
2. Recreate it
3. Run all migrations
4. Run the seed script

## Testing Scenarios

### For Talent Users
1. **View Profile**: Login as any talent user to see their complete profile
2. **Portfolio Management**: Check portfolio items with various media types
3. **Job Search**: Browse available jobs matching talent categories
4. **Apply to Jobs**: View existing auditions in different statuses
5. **Experience & Education**: Review professional background

### For Employer Users
1. **Post Jobs**: See examples of job postings (6 different types)
2. **Manage Applications**: Review auditions submitted to jobs
3. **Candidate Evaluation**: Check rating and notes systems
4. **Job Status**: Test different job statuses (active, closed, etc.)

### General Features
1. **Search & Filters**: Test filtering by talent category, location, experience level
2. **Audition Workflow**: Follow the complete audition lifecycle
3. **Media Types**: Test with images, videos, audio files, and documents
4. **Relationships**: Verify all data relationships are properly connected

## Data Relationships

The seed data creates interconnected records:
- Users → Profiles (1:1)
- Users → Experiences (1:many)
- Users → Education (1:many)
- Users → Portfolio Items (1:many)
- Employers → Jobs (1:many)
- Users + Jobs → Auditions (many:many with metadata)
- Auditions → Portfolio Items (reference featured work)

## Customization

To modify the seed data:
1. Edit `/prisma/seed.ts`
2. Adjust user details, job descriptions, or add more records
3. Re-run the seed script

## Notes

- The script cleans existing data before seeding to avoid duplicates
- All dates are set relative to current dates for realistic testing
- Portfolio URLs are placeholder links (replace with actual S3/storage URLs)
- Email addresses are fake and for testing only
- Phone numbers use the format `+91-XXXXXXXXXX` (Indian format)

## Troubleshooting

### Error: "Unique constraint failed"
- Run `npx prisma migrate reset` to clean the database

### Error: "Module not found"
- Ensure all dependencies are installed: `npm install`
- Check that `ts-node` is installed in devDependencies

### Error: "Cannot find module @prisma/client"
- Generate the Prisma client: `npx prisma generate`

## Data Volume Summary
```
👤 Users:          8 (5 talent + 3 employers)
🎭 Profiles:       8 (complete professional profiles)
💼 Experiences:    5 (work history records)
🎓 Education:      3 (educational background)
📸 Portfolio:     13 (media items across all types)
💼 Jobs:           6 (active job postings)
🎬 Auditions:      7 (applications in various states)
```

This provides a comprehensive dataset to test all major features of the StageConnect platform!
