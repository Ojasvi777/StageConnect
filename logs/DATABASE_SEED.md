# 🌱 StageConnect Database Seed Scripts

Complete database seeding solution for testing all features of the StageConnect platform.

## 📋 Table of Contents
- [Quick Start](#quick-start)
- [What's Included](#whats-included)
- [Available Commands](#available-commands)
- [Test Credentials](#test-credentials)
- [Detailed Documentation](#detailed-documentation)

## 🚀 Quick Start

### 1. Generate Prisma Client
```bash
npx prisma generate
```

### 2. Run Database Migrations
```bash
npx prisma migrate dev
```

### 3. Seed the Database
```bash
npm run db:seed
```

### 4. Verify the Data
```bash
npm run db:verify
```

### 5. Browse Data Visually
```bash
npm run db:studio
```

## 📦 What's Included

The seed script creates a complete dataset for testing:

| Resource | Count | Description |
|----------|-------|-------------|
| 👤 Users | 8 | 5 talent + 3 employer users |
| 🎭 Profiles | 8 | Complete professional profiles |
| 💼 Experiences | 5 | Work history records |
| 🎓 Education | 3 | Educational background |
| 📸 Portfolio | 13 | Videos, images, audio, documents |
| 💼 Jobs | 6 | Active job postings |
| 🎬 Auditions | 7 | Applications in various states |

### Talent Users (5)
- **Priya Sharma** - Classical Dancer (Bharatanatyam, Contemporary)
- **Rahul Verma** - Actor (Theatre, Film, TV)
- **Anjali Desai** - Singer (Classical, Bollywood, Playback)
- **Arjun Kapoor** - Model (Runway, Print, Commercial)
- **Neha Patel** - Photographer (Fashion, Events)

### Employer Users (3)
- **Bollywood Productions** - Film Production House
- **Fashion Week India** - Fashion Event Platform
- **Concert Masters** - Event Management Company

## 🔧 Available Commands

### Database Management
```bash
# Seed the database with test data
npm run db:seed

# Reset database (WARNING: Deletes all data and reseeds)
npm run db:reset

# Verify seeded data
npm run db:verify

# Open Prisma Studio (Visual Database Browser)
npm run db:studio
```

### Direct Prisma Commands
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database
npx prisma db seed

# Reset and reseed
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

## 🔐 Test Credentials

### Talent Accounts

| Name | Email | Category | Rate |
|------|-------|----------|------|
| Priya Sharma | `priya.sharma@example.com` | Dancer | ₹5,000/hr |
| Rahul Verma | `rahul.verma@example.com` | Actor | ₹8,000/hr |
| Anjali Desai | `anjali.desai@example.com` | Singer | ₹10,000/hr |
| Arjun Kapoor | `arjun.kapoor@example.com` | Model | ₹7,500/hr |
| Neha Patel | `neha.patel@example.com` | Photographer | ₹6,000/hr |

### Employer Accounts

| Company | Email | Industry |
|---------|-------|----------|
| Bollywood Productions | `contact@bollywoodprod.com` | Entertainment |
| Fashion Week India | `hiring@fashionweekindia.com` | Fashion |
| Concert Masters | `talent@concertmasters.com` | Events |

> 📝 **Note:** These are test accounts. No actual authentication is implemented by the seed script. You'll need to configure authentication separately.

## 📚 Detailed Documentation

For more detailed information, see:

- **[SEED_README.md](./prisma/SEED_README.md)** - Complete seed script documentation
- **[SEED_QUICK_REFERENCE.md](./SEED_QUICK_REFERENCE.md)** - Quick reference guide with all test data details

## 🧪 Testing Workflows

### For Talent Users
✅ View and edit profile  
✅ Upload and manage portfolio items  
✅ Browse available jobs  
✅ Apply to jobs with auditions  
✅ Track application status  
✅ View professional experience and education  

### For Employer Users
✅ Create and manage job postings  
✅ Review received applications  
✅ Rate and provide feedback on candidates  
✅ Shortlist and select talent  
✅ Schedule auditions  
✅ View candidate portfolios  

### Data Relationships to Test
✅ User → Profile (one-to-one)  
✅ User → Portfolio Items (one-to-many)  
✅ User → Experiences (one-to-many)  
✅ User → Education (one-to-many)  
✅ Employer → Jobs (one-to-many)  
✅ Talent + Job → Auditions (many-to-many)  
✅ Audition → Portfolio Item (featured work)  

## 📊 Sample Data Overview

### Job Postings (6 Active)

1. **Lead Actress for Romantic Drama** (Actor)
   - Location: Mumbai
   - Budget: ₹5L - ₹15L per project
   - Deadline: Jan 31, 2025
   - 2 applications

2. **Male Models for Fashion Week Runway** (Model)
   - Location: New Delhi
   - Budget: ₹50K - ₹150K per day
   - 10 positions available
   - 1 application

3. **Playback Singer for Live Concert** (Singer)
   - Location: Bangalore
   - Budget: ₹1L - ₹3L per event
   - 2 positions
   - 1 application (selected)

4. **Classical Dancers for Movie Song** (Dancer)
   - Location: Mumbai
   - Budget: ₹75K - ₹150K per project
   - 5 positions
   - 1 application (shortlisted)

5. **Event Photographer for Music Festival** (Photographer)
   - Location: Goa
   - Budget: ₹150K - ₹250K per event
   - 3-day festival
   - 1 application (shortlisted)

6. **Female Models - Print Campaign** (Model)
   - Location: Mumbai
   - Budget: ₹40K - ₹100K per day
   - 3 positions
   - 1 application

### Audition Statuses

- ✅ **Selected** (1) - Candidate chosen for the job
- 📋 **Shortlisted** (2) - Under consideration
- 📅 **Audition Scheduled** (1) - Callback arranged
- 🔍 **Under Review** (1) - Being evaluated
- 📝 **Submitted** (1) - Newly applied
- ❌ **Rejected** (1) - Not selected

### Portfolio Items by Type

- 🎥 **Videos** (6) - Performances, reels, runway walks
- 📷 **Images** (3) - Professional photos, headshots
- 🎵 **Audio** (2) - Classical and Bollywood recordings
- 📄 **Documents** (1) - Photography portfolio PDF

## 🎯 Key Features Demonstrated

### Talent Profiles
- Complete bio and professional information
- Specialization tags (e.g., Bharatanatyam, Theatre, Playback)
- Hourly rates and availability
- Social media links (Instagram, YouTube)
- Age, height, weight (for modeling/acting)
- Languages spoken
- Skills and experience level

### Job Postings
- Multiple talent categories
- Location types (on-site, remote, hybrid)
- Job types (full-time, contract, gig)
- Compensation ranges
- Application deadlines
- Audition requirements and schedules
- Slots available

### Portfolio Items
- Multiple media types support
- Featured item flagging
- Tagging and categorization
- Display ordering
- File size and duration tracking
- Thumbnails for videos

### Auditions
- Application tracking
- Status progression
- Employer ratings (1-5)
- Audition notes and feedback
- Cover letter submissions
- Portfolio item references

## 🔍 Verification Output

After running `npm run db:verify`, you'll see:

```
🔍 Verifying seeded data...

📊 Record Counts:
  Users:          8
  Profiles:       8
  Experiences:    5
  Educations:     3
  Portfolio:      13
  Jobs:           6
  Auditions:      7

🎭 Talent Users:
  [Detailed list of talent with portfolio and audition counts]

🏢 Employer Users:
  [Detailed list of employers with industry info]

💼 Active Jobs:
  [List of all jobs with locations and deadlines]

🎬 Auditions by Status:
  [Breakdown by status type]

📸 Portfolio Items by Type:
  [Breakdown by media type]
```

## 💡 Tips

- 🎨 All profile photos use placeholder URLs from `pravatar.cc`
- 🔗 Media URLs are placeholders - replace with actual S3/storage URLs
- 📧 Email addresses are fake and for testing only
- 📞 Phone numbers use Indian format (+91)
- 💰 All amounts are in Indian Rupees (₹)
- 📅 Job deadlines are set in the near future
- ⭐ Some auditions include ratings to test the feedback system

## 🐛 Troubleshooting

### Error: "Unique constraint failed"
```bash
# Solution: Reset the database
npm run db:reset
```

### Error: "Module not found"
```bash
# Solution: Install dependencies
npm install
```

### Error: "Cannot find module @prisma/client"
```bash
# Solution: Generate Prisma client
npx prisma generate
```

### Error: "Unknown file extension .ts"
```bash
# Solution: Ensure ts-node is installed
npm install --save-dev ts-node
```

## 📝 Next Steps

1. ✅ Database is seeded with comprehensive test data
2. 🚀 Start your development server: `npm run dev`
3. 🔍 Browse data visually: `npm run db:studio`
4. 🧪 Test all features using the seeded accounts
5. 📖 Refer to SEED_QUICK_REFERENCE.md for detailed data info
6. 🔄 Re-run seed anytime to reset to clean test data

## 📄 Files Created

- `/prisma/seed.ts` - Main seed script
- `/prisma/verify-seed.ts` - Data verification script
- `/prisma/SEED_README.md` - Detailed documentation
- `/SEED_QUICK_REFERENCE.md` - Quick reference guide
- `/DATABASE_SEED.md` - This file

## 🤝 Contributing

To add more seed data:
1. Edit `/prisma/seed.ts`
2. Add your data following the existing patterns
3. Run `npm run db:seed` to test
4. Run `npm run db:verify` to verify

## 📞 Support

For issues or questions:
- Check the detailed documentation in `/prisma/SEED_README.md`
- Review the quick reference in `/SEED_QUICK_REFERENCE.md`
- Verify data with `npm run db:verify`
- Browse data with `npm run db:studio`

---

**Happy Testing! 🎉**

Made with ❤️ for StageConnect
