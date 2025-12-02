import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clean existing data
  console.log('🧹 Cleaning existing data...');
  await prisma.audition.deleteMany();
  await prisma.portfolioItem.deleteMany();
  await prisma.education.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.job.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // Create Talent Users
  console.log('👤 Creating talent users...');
  
  const talentUser1 = await prisma.user.create({
    data: {
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      emailVerified: new Date(),
      image: 'https://i.pravatar.cc/300?img=1',
    },
  });

  const talentUser2 = await prisma.user.create({
    data: {
      name: 'Rahul Verma',
      email: 'rahul.verma@example.com',
      emailVerified: new Date(),
      image: 'https://i.pravatar.cc/300?img=2',
    },
  });

  const talentUser3 = await prisma.user.create({
    data: {
      name: 'Anjali Desai',
      email: 'anjali.desai@example.com',
      emailVerified: new Date(),
      image: 'https://i.pravatar.cc/300?img=3',
    },
  });

  const talentUser4 = await prisma.user.create({
    data: {
      name: 'Arjun Kapoor',
      email: 'arjun.kapoor@example.com',
      emailVerified: new Date(),
      image: 'https://i.pravatar.cc/300?img=4',
    },
  });

  const talentUser5 = await prisma.user.create({
    data: {
      name: 'Neha Patel',
      email: 'neha.patel@example.com',
      emailVerified: new Date(),
      image: 'https://i.pravatar.cc/300?img=5',
    },
  });

  // Create Employer Users
  console.log('🏢 Creating employer users...');
  
  const employerUser1 = await prisma.user.create({
    data: {
      name: 'Bollywood Productions',
      email: 'contact@bollywoodprod.com',
      emailVerified: new Date(),
      image: 'https://i.pravatar.cc/300?img=50',
    },
  });

  const employerUser2 = await prisma.user.create({
    data: {
      name: 'Fashion Week India',
      email: 'hiring@fashionweekindia.com',
      emailVerified: new Date(),
      image: 'https://i.pravatar.cc/300?img=51',
    },
  });

  const employerUser3 = await prisma.user.create({
    data: {
      name: 'Concert Masters',
      email: 'talent@concertmasters.com',
      emailVerified: new Date(),
      image: 'https://i.pravatar.cc/300?img=52',
    },
  });

  // Create Talent Profiles
  console.log('🎭 Creating talent profiles...');
  
  await prisma.profile.create({
    data: {
      user_id: talentUser1.id,
      role: 'talent',
      first_name: 'Priya',
      last_name: 'Sharma',
      phone_number: '+91-9876543210',
      address: 'Mumbai, Maharashtra',
      instagram_profile: 'https://instagram.com/priya_sharma',
      youtube_profile: 'https://youtube.com/@priyasharma',
      bio: 'Professional classical dancer with 10+ years of experience in Bharatanatyam and Contemporary dance. Performed at national and international stages.',
      visibility: 'public',
      gig_count: 15,
      talent_category: 'dancer',
      specializations: ['Bharatanatyam', 'Contemporary', 'Kathak'],
      height: 165,
      weight: 55,
      age: 28,
      languages: ['Hindi', 'English', 'Tamil'],
      intro_video_url: 'https://example.com/videos/priya-intro.mp4',
      profile_photos: [
        'https://i.pravatar.cc/300?img=1',
        'https://i.pravatar.cc/300?img=11',
        'https://i.pravatar.cc/300?img=21',
      ],
      skills: ['Classical Dance', 'Contemporary', 'Choreography', 'Teaching'],
      hourly_rate: 5000,
      availability: 'Weekends and evenings',
    },
  });

  await prisma.profile.create({
    data: {
      user_id: talentUser2.id,
      role: 'talent',
      first_name: 'Rahul',
      last_name: 'Verma',
      phone_number: '+91-9876543211',
      address: 'Delhi, India',
      instagram_profile: 'https://instagram.com/rahul_verma',
      youtube_profile: 'https://youtube.com/@rahulverma',
      bio: 'Versatile actor with experience in theatre, television, and film. Specializing in dramatic and comedic roles.',
      visibility: 'public',
      gig_count: 22,
      talent_category: 'actor',
      specializations: ['Theatre', 'Film', 'TV Series', 'Voice Acting'],
      height: 178,
      weight: 75,
      age: 32,
      languages: ['Hindi', 'English', 'Punjabi', 'Urdu'],
      intro_video_url: 'https://example.com/videos/rahul-intro.mp4',
      profile_photos: [
        'https://i.pravatar.cc/300?img=2',
        'https://i.pravatar.cc/300?img=12',
        'https://i.pravatar.cc/300?img=22',
      ],
      skills: ['Method Acting', 'Improvisation', 'Stage Combat', 'Voice Modulation'],
      hourly_rate: 8000,
      availability: 'Full-time',
    },
  });

  await prisma.profile.create({
    data: {
      user_id: talentUser3.id,
      role: 'talent',
      first_name: 'Anjali',
      last_name: 'Desai',
      phone_number: '+91-9876543212',
      address: 'Bangalore, Karnataka',
      instagram_profile: 'https://instagram.com/anjali_desai',
      bio: 'Professional playback singer and music composer. Trained in Hindustani classical music with expertise in Bollywood and fusion.',
      visibility: 'public',
      gig_count: 30,
      talent_category: 'singer',
      specializations: ['Playback Singing', 'Classical', 'Bollywood', 'Fusion'],
      height: 160,
      weight: 52,
      age: 26,
      languages: ['Hindi', 'English', 'Kannada', 'Tamil'],
      intro_video_url: 'https://example.com/videos/anjali-intro.mp4',
      profile_photos: [
        'https://i.pravatar.cc/300?img=3',
        'https://i.pravatar.cc/300?img=13',
      ],
      skills: ['Hindustani Classical', 'Playback Singing', 'Music Composition', 'Recording'],
      hourly_rate: 10000,
      availability: 'Flexible',
    },
  });

  await prisma.profile.create({
    data: {
      user_id: talentUser4.id,
      role: 'talent',
      first_name: 'Arjun',
      last_name: 'Kapoor',
      phone_number: '+91-9876543213',
      address: 'Chennai, Tamil Nadu',
      instagram_profile: 'https://instagram.com/arjun_kapoor',
      bio: 'Fashion and commercial model with experience in runway, print, and digital campaigns. Worked with top Indian brands.',
      visibility: 'public',
      gig_count: 18,
      talent_category: 'model',
      specializations: ['Runway', 'Print', 'Commercial', 'Fitness'],
      height: 185,
      weight: 78,
      age: 25,
      languages: ['Hindi', 'English', 'Tamil'],
      intro_video_url: 'https://example.com/videos/arjun-intro.mp4',
      profile_photos: [
        'https://i.pravatar.cc/300?img=4',
        'https://i.pravatar.cc/300?img=14',
        'https://i.pravatar.cc/300?img=24',
      ],
      skills: ['Runway Walking', 'Posing', 'Fitness Modeling', 'Commercial Shoots'],
      hourly_rate: 7500,
      availability: 'Full-time',
    },
  });

  await prisma.profile.create({
    data: {
      user_id: talentUser5.id,
      role: 'talent',
      first_name: 'Neha',
      last_name: 'Patel',
      phone_number: '+91-9876543214',
      address: 'Pune, Maharashtra',
      instagram_profile: 'https://instagram.com/neha_patel',
      bio: 'Creative photographer and videographer specializing in fashion, events, and commercial shoots.',
      visibility: 'public',
      gig_count: 12,
      talent_category: 'photographer',
      specializations: ['Fashion Photography', 'Event Coverage', 'Commercial', 'Portrait'],
      height: 168,
      weight: 60,
      age: 29,
      languages: ['Hindi', 'English', 'Gujarati'],
      intro_video_url: 'https://example.com/videos/neha-intro.mp4',
      profile_photos: [
        'https://i.pravatar.cc/300?img=5',
        'https://i.pravatar.cc/300?img=15',
      ],
      skills: ['Photography', 'Videography', 'Photo Editing', 'Lighting'],
      hourly_rate: 6000,
      availability: 'Weekends and evenings',
    },
  });

  // Create Employer Profiles
  console.log('🏭 Creating employer profiles...');
  
  await prisma.profile.create({
    data: {
      user_id: employerUser1.id,
      role: 'employer',
      first_name: 'Bollywood',
      last_name: 'Productions',
      phone_number: '+91-9876543220',
      address: 'Andheri West, Mumbai',
      bio: 'Leading film production house creating blockbuster Bollywood movies for over 25 years.',
      visibility: 'public',
      gig_count: 0,
      company_name: 'Bollywood Productions Pvt Ltd',
      company_description: 'We are a premier production house in Mumbai, creating engaging content across films, web series, and digital platforms. Known for discovering and nurturing new talent.',
      industry: 'Entertainment',
      website: 'https://bollywoodprod.com',
      contact_person_name: 'Rajesh Kumar',
      contact_person_email: 'rajesh@bollywoodprod.com',
      company_logo_url: 'https://i.pravatar.cc/300?img=50',
    },
  });

  await prisma.profile.create({
    data: {
      user_id: employerUser2.id,
      role: 'employer',
      first_name: 'Fashion',
      last_name: 'Week India',
      phone_number: '+91-9876543221',
      address: 'Mehrauli, New Delhi',
      bio: 'India\'s premier fashion event platform, showcasing top designers and models.',
      visibility: 'public',
      gig_count: 0,
      company_name: 'Fashion Week India',
      company_description: 'Organizing India\'s most prestigious fashion events, bringing together top designers, models, and fashion enthusiasts.',
      industry: 'Fashion',
      website: 'https://fashionweekindia.com',
      contact_person_name: 'Sonia Mehra',
      contact_person_email: 'sonia@fashionweekindia.com',
      company_logo_url: 'https://i.pravatar.cc/300?img=51',
    },
  });

  await prisma.profile.create({
    data: {
      user_id: employerUser3.id,
      role: 'employer',
      first_name: 'Concert',
      last_name: 'Masters',
      phone_number: '+91-9876543222',
      address: 'Koramangala, Bangalore',
      bio: 'Premier concert and event management company specializing in live music performances.',
      visibility: 'public',
      gig_count: 0,
      company_name: 'Concert Masters Pvt Ltd',
      company_description: 'Leading event management company organizing concerts, music festivals, and live performances across India.',
      industry: 'Event Management',
      website: 'https://concertmasters.com',
      contact_person_name: 'Vikram Singh',
      contact_person_email: 'vikram@concertmasters.com',
      company_logo_url: 'https://i.pravatar.cc/300?img=52',
    },
  });

  // Create Experiences
  console.log('💼 Creating experiences...');
  
  await prisma.experience.create({
    data: {
      user_id: talentUser1.id,
      title: 'Lead Dancer',
      company_name: 'Nritya Dance Company',
      project_name: 'Echoes of India - World Tour',
      location: 'Mumbai, India',
      start_date: new Date('2020-01-01'),
      end_date: new Date('2022-12-31'),
      description: 'Performed as lead dancer in a world tour showcasing Indian classical dance forms. Toured 15 countries across 3 continents.',
      media_urls: [
        'https://example.com/experiences/priya-tour1.jpg',
        'https://example.com/experiences/priya-tour2.jpg',
      ],
    },
  });

  await prisma.experience.create({
    data: {
      user_id: talentUser1.id,
      title: 'Dance Choreographer',
      company_name: 'Bollywood Productions',
      project_name: 'Dance Reality Show - Season 5',
      location: 'Mumbai, India',
      start_date: new Date('2023-01-01'),
      end_date: null,
      description: 'Choreographing performances for a popular dance reality TV show.',
      media_urls: ['https://example.com/experiences/priya-choreo.jpg'],
    },
  });

  await prisma.experience.create({
    data: {
      user_id: talentUser2.id,
      title: 'Lead Actor',
      company_name: 'National Theatre',
      project_name: 'Hamlet - Modern Adaptation',
      location: 'New Delhi, India',
      start_date: new Date('2019-06-01'),
      end_date: new Date('2020-02-28'),
      description: 'Played the lead role in a contemporary adaptation of Shakespeare\'s Hamlet. Received critical acclaim and awards.',
      media_urls: [
        'https://example.com/experiences/rahul-hamlet1.jpg',
        'https://example.com/experiences/rahul-hamlet2.jpg',
      ],
    },
  });

  await prisma.experience.create({
    data: {
      user_id: talentUser2.id,
      title: 'Supporting Actor',
      company_name: 'Bollywood Productions',
      project_name: 'Urban Legends (Web Series)',
      location: 'Mumbai, India',
      start_date: new Date('2022-03-01'),
      end_date: new Date('2023-08-31'),
      description: 'Recurring role in a popular web series spanning 2 seasons.',
      media_urls: ['https://example.com/experiences/rahul-series.jpg'],
    },
  });

  await prisma.experience.create({
    data: {
      user_id: talentUser3.id,
      title: 'Playback Singer',
      company_name: 'T-Series',
      project_name: 'Various Bollywood Movies',
      location: 'Mumbai, India',
      start_date: new Date('2018-01-01'),
      end_date: null,
      description: 'Recorded songs for over 20 Bollywood films, including several chart-topping hits.',
      media_urls: ['https://example.com/experiences/anjali-recording.jpg'],
    },
  });

  // Create Educations
  console.log('🎓 Creating education records...');
  
  await prisma.education.create({
    data: {
      user_id: talentUser1.id,
      institution_name: 'Kalakshetra Foundation',
      degree: 'Diploma in Bharatanatyam',
      field_of_study: 'Classical Dance',
      start_date: new Date('2010-06-01'),
      end_date: new Date('2015-05-31'),
      description: 'Intensive training in Bharatanatyam dance under renowned gurus.',
      certificate_url: 'https://example.com/certificates/priya-kalakshetra.pdf',
    },
  });

  await prisma.education.create({
    data: {
      user_id: talentUser2.id,
      institution_name: 'National School of Drama',
      degree: 'Bachelor of Performing Arts',
      field_of_study: 'Theatre and Acting',
      start_date: new Date('2012-07-01'),
      end_date: new Date('2015-06-30'),
      description: 'Comprehensive training in theatre, acting techniques, and performance arts.',
      certificate_url: 'https://example.com/certificates/rahul-nsd.pdf',
    },
  });

  await prisma.education.create({
    data: {
      user_id: talentUser3.id,
      institution_name: 'Gandharva Mahavidyalaya',
      degree: 'Masters in Hindustani Classical Music',
      field_of_study: 'Vocal Music',
      start_date: new Date('2015-08-01'),
      end_date: new Date('2019-07-31'),
      description: 'Advanced training in Hindustani classical vocal music and music theory.',
      certificate_url: 'https://example.com/certificates/anjali-gandharva.pdf',
    },
  });

  // Create Portfolio Items
  console.log('📸 Creating portfolio items...');
  
  const portfolio1 = await prisma.portfolioItem.create({
    data: {
      user_id: talentUser1.id,
      title: 'Bharatanatyam Performance - Shiva Tandava',
      media_url: 'https://example.com/portfolio/priya-shiva-tandava.mp4',
      thumbnail_url: 'https://example.com/portfolio/thumbs/priya-shiva-tandava.jpg',
      media_type: "video",
      file_size: 45000000,
      duration: 420,
      description: 'Classical Bharatanatyam performance depicting the cosmic dance of Shiva.',
      tags: ['bharatanatyam', 'classical', 'indian-dance', 'shiva'],
      is_featured: true,
      display_order: 1,
    },
  });

  await prisma.portfolioItem.create({
    data: {
      user_id: talentUser1.id,
      title: 'Contemporary Fusion Dance',
      media_url: 'https://example.com/portfolio/priya-contemporary.mp4',
      thumbnail_url: 'https://example.com/portfolio/thumbs/priya-contemporary.jpg',
      media_type: "video",
      file_size: 38000000,
      duration: 300,
      description: 'Contemporary dance piece blending classical and modern styles.',
      tags: ['contemporary', 'fusion', 'modern-dance'],
      is_featured: true,
      display_order: 2,
    },
  });

  await prisma.portfolioItem.create({
    data: {
      user_id: talentUser1.id,
      title: 'Dance Photoshoot',
      media_url: 'https://example.com/portfolio/priya-photo1.jpg',
      media_type: "image",
      file_size: 3500000,
      description: 'Professional dance photography showcasing various poses and expressions.',
      tags: ['photography', 'classical', 'dance'],
      is_featured: false,
      display_order: 3,
    },
  });

  const portfolio2 = await prisma.portfolioItem.create({
    data: {
      user_id: talentUser2.id,
      title: 'Dramatic Monologue Reel',
      media_url: 'https://example.com/portfolio/rahul-monologue.mp4',
      thumbnail_url: 'https://example.com/portfolio/thumbs/rahul-monologue.jpg',
      media_type: "video",
      file_size: 25000000,
      duration: 180,
      description: 'Collection of powerful monologues showcasing emotional range and intensity.',
      tags: ['acting', 'monologue', 'dramatic', 'theatre'],
      is_featured: true,
      display_order: 1,
    },
  });

  await prisma.portfolioItem.create({
    data: {
      user_id: talentUser2.id,
      title: 'Comedy Scene Performance',
      media_url: 'https://example.com/portfolio/rahul-comedy.mp4',
      thumbnail_url: 'https://example.com/portfolio/thumbs/rahul-comedy.jpg',
      media_type: "video",
      file_size: 30000000,
      duration: 240,
      description: 'Comedic performance demonstrating timing and humor.',
      tags: ['acting', 'comedy', 'theatre', 'performance'],
      is_featured: true,
      display_order: 2,
    },
  });

  await prisma.portfolioItem.create({
    data: {
      user_id: talentUser2.id,
      title: 'Professional Headshots',
      media_url: 'https://example.com/portfolio/rahul-headshot.jpg',
      media_type: "image",
      file_size: 2800000,
      description: 'Professional acting headshots for casting submissions.',
      tags: ['headshots', 'acting', 'professional'],
      is_featured: false,
      display_order: 3,
    },
  });

  const portfolio3 = await prisma.portfolioItem.create({
    data: {
      user_id: talentUser3.id,
      title: 'Classical Raag Performance',
      media_url: 'https://example.com/portfolio/anjali-raag.mp3',
      media_type: "audio",
      file_size: 12000000,
      duration: 480,
      description: 'Hindustani classical music performance - Raag Yaman.',
      tags: ['classical-music', 'hindustani', 'vocal', 'raag'],
      is_featured: true,
      display_order: 1,
    },
  });

  await prisma.portfolioItem.create({
    data: {
      user_id: talentUser3.id,
      title: 'Bollywood Song Recording',
      media_url: 'https://example.com/portfolio/anjali-bollywood.mp3',
      media_type: "audio",
      file_size: 8000000,
      duration: 280,
      description: 'Playback singing sample from a recent Bollywood movie.',
      tags: ['bollywood', 'playback', 'modern', 'hindi'],
      is_featured: true,
      display_order: 2,
    },
  });

  await prisma.portfolioItem.create({
    data: {
      user_id: talentUser3.id,
      title: 'Concert Performance Video',
      media_url: 'https://example.com/portfolio/anjali-concert.mp4',
      thumbnail_url: 'https://example.com/portfolio/thumbs/anjali-concert.jpg',
      media_type: "video",
      file_size: 50000000,
      duration: 600,
      description: 'Live concert performance at Mumbai Music Festival.',
      tags: ['live', 'concert', 'vocal', 'performance'],
      is_featured: false,
      display_order: 3,
    },
  });

  const portfolio4 = await prisma.portfolioItem.create({
    data: {
      user_id: talentUser4.id,
      title: 'Fashion Week Runway Walk',
      media_url: 'https://example.com/portfolio/arjun-runway.mp4',
      thumbnail_url: 'https://example.com/portfolio/thumbs/arjun-runway.jpg',
      media_type: "video",
      file_size: 35000000,
      duration: 180,
      description: 'Runway walk from India Fashion Week showcasing designer collection.',
      tags: ['runway', 'fashion', 'modeling', 'walk'],
      is_featured: true,
      display_order: 1,
    },
  });

  await prisma.portfolioItem.create({
    data: {
      user_id: talentUser4.id,
      title: 'Commercial Photoshoot Portfolio',
      media_url: 'https://example.com/portfolio/arjun-commercial.jpg',
      media_type: "image",
      file_size: 4200000,
      description: 'Professional modeling portfolio for commercial campaigns.',
      tags: ['commercial', 'modeling', 'photography', 'fashion'],
      is_featured: true,
      display_order: 2,
    },
  });

  const portfolio5 = await prisma.portfolioItem.create({
    data: {
      user_id: talentUser5.id,
      title: 'Fashion Photography Portfolio',
      media_url: 'https://example.com/portfolio/neha-fashion-portfolio.pdf',
      media_type: "document",
      file_size: 15000000,
      description: 'Complete fashion photography portfolio showcasing various campaigns and editorials.',
      tags: ['photography', 'fashion', 'portfolio', 'professional'],
      is_featured: true,
      display_order: 1,
    },
  });

  // Create Jobs
  console.log('💼 Creating jobs...');
  
  const job1 = await prisma.job.create({
    data: {
      employer_id: employerUser1.id,
      title: 'Lead Actress for Romantic Drama',
      description: 'We are looking for a talented actress for the lead role in our upcoming romantic drama film. The role requires strong emotional range and excellent chemistry with co-actors.',
      requirements: 'Must have prior acting experience in films or theatre. Should be comfortable with emotional and dramatic scenes. Dance skills are a plus.',
      responsibilities: 'Lead role performance, promotional activities, script readings, rehearsals, and shooting as per schedule.',
      talent_category: "actor",
      location_type: "on_site",
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      venue: 'Film City Studios, Mumbai',
      job_type: "contract",
      compensation_min: 500000,
      compensation_max: 1500000,
      compensation_type: 'per project',
      event_date: new Date('2025-03-15'),
      experience_level: "professional",
      application_deadline: new Date('2025-01-31'),
      audition_required: true,
      audition_date: new Date('2025-02-05'),
      audition_location: 'Andheri West, Mumbai',
      status: "active",
      required_skills: ['Acting', 'Dialogue Delivery', 'Dance', 'Emotional Range'],
      preferred_age_min: 22,
      preferred_age_max: 32,
      slots_available: 1,
    },
  });

  const job2 = await prisma.job.create({
    data: {
      employer_id: employerUser2.id,
      title: 'Male Models for Fashion Week Runway',
      description: 'Fashion Week India is looking for professional male models for our upcoming fashion week. You will be walking the ramp for top Indian designers.',
      requirements: 'Professional modeling experience required. Height: 180cm+. Must have runway experience. Portfolio mandatory.',
      responsibilities: 'Runway walks, designer fittings, photo shoots, promotional events.',
      talent_category: "model",
      location_type: "on_site",
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
      venue: 'Pragati Maidan, New Delhi',
      job_type: "gig",
      compensation_min: 50000,
      compensation_max: 150000,
      compensation_type: 'per day',
      event_date: new Date('2025-02-20'),
      experience_level: "professional",
      application_deadline: new Date('2025-01-25'),
      audition_required: true,
      audition_date: new Date('2025-01-28'),
      audition_location: 'Mehrauli, New Delhi',
      status: "active",
      required_skills: ['Runway Walking', 'Posing', 'Professional Etiquette'],
      preferred_age_min: 20,
      preferred_age_max: 30,
      slots_available: 10,
    },
  });

  const job3 = await prisma.job.create({
    data: {
      employer_id: employerUser3.id,
      title: 'Playback Singer for Live Concert',
      description: 'Looking for a talented playback singer for a live concert featuring Bollywood hits. Must have excellent stage presence and vocal range.',
      requirements: 'Professional singing experience, Bollywood repertoire, ability to perform live without backing track. Prior concert experience preferred.',
      responsibilities: 'Live performance, rehearsals, sound checks, promotional appearances.',
      talent_category: "singer",
      location_type: "on_site",
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      venue: 'Palace Grounds, Bangalore',
      job_type: "gig",
      compensation_min: 100000,
      compensation_max: 300000,
      compensation_type: 'per event',
      event_date: new Date('2025-02-14'),
      experience_level: "professional",
      application_deadline: new Date('2025-01-20'),
      audition_required: true,
      audition_date: new Date('2025-01-22'),
      audition_location: 'Koramangala, Bangalore',
      status: "active",
      required_skills: ['Live Singing', 'Stage Performance', 'Bollywood Songs', 'Vocal Range'],
      preferred_age_min: 20,
      preferred_age_max: 40,
      slots_available: 2,
    },
  });

  const job4 = await prisma.job.create({
    data: {
      employer_id: employerUser1.id,
      title: 'Classical Dancers for Movie Song Sequence',
      description: 'Need trained classical dancers for a grand song sequence in an upcoming period drama. Bharatanatyam or Kathak expertise required.',
      requirements: 'Professional training in Bharatanatyam or Kathak. Minimum 5 years experience. Must be able to follow choreography quickly.',
      responsibilities: 'Performance in song sequence, rehearsals, costume fittings.',
      talent_category: "dancer",
      location_type: "on_site",
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      venue: 'Film City, Goregaon',
      job_type: "contract",
      compensation_min: 75000,
      compensation_max: 150000,
      compensation_type: 'per project',
      event_date: new Date('2025-03-01'),
      experience_level: "professional",
      application_deadline: new Date('2025-02-10'),
      audition_required: true,
      audition_date: new Date('2025-02-12'),
      audition_location: 'Andheri West, Mumbai',
      status: "active",
      required_skills: ['Bharatanatyam', 'Kathak', 'Classical Dance', 'Choreography'],
      preferred_age_min: 20,
      preferred_age_max: 35,
      slots_available: 5,
    },
  });

  const job5 = await prisma.job.create({
    data: {
      employer_id: employerUser3.id,
      title: 'Event Photographer for Music Festival',
      description: 'Looking for an experienced event photographer to cover our 3-day music festival. Must capture performances, crowd, and behind-the-scenes moments.',
      requirements: 'Professional photography equipment, experience in event/concert photography, ability to work in low light conditions, quick delivery of edited photos.',
      responsibilities: 'Event coverage, photo editing, delivery of high-resolution images, potential social media content creation.',
      talent_category: "photographer",
      location_type: "on_site",
      city: 'Goa',
      state: 'Goa',
      country: 'India',
      venue: 'Vagator Beach, Goa',
      job_type: "gig",
      compensation_min: 150000,
      compensation_max: 250000,
      compensation_type: 'per event',
      event_date: new Date('2025-02-28'),
      experience_level: "professional",
      application_deadline: new Date('2025-02-01'),
      audition_required: false,
      status: "active",
      required_skills: ['Event Photography', 'Concert Photography', 'Photo Editing', 'Low Light Photography'],
      preferred_age_min: 25,
      preferred_age_max: 45,
      slots_available: 2,
    },
  });

  const job6 = await prisma.job.create({
    data: {
      employer_id: employerUser2.id,
      title: 'Female Models - Print Campaign',
      description: 'Seeking female models for a premium jewelry brand print campaign. Will be featured in magazines and digital platforms.',
      requirements: 'Modeling experience, good skin, expressive face, comfortable with close-up shots.',
      responsibilities: 'Photo shoot, try different jewelry pieces, promotional content.',
      talent_category: "model",
      location_type: "hybrid",
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      venue: 'Studio in Bandra',
      job_type: "gig",
      compensation_min: 40000,
      compensation_max: 100000,
      compensation_type: 'per day',
      event_date: new Date('2025-01-30'),
      experience_level: "mid",
      application_deadline: new Date('2025-01-15'),
      audition_required: false,
      status: "active",
      required_skills: ['Print Modeling', 'Jewelry Modeling', 'Posing'],
      preferred_age_min: 20,
      preferred_age_max: 30,
      slots_available: 3,
    },
  });

  // Create Auditions
  console.log('🎬 Creating auditions...');
  
  await prisma.audition.create({
    data: {
      user_id: talentUser1.id,
      job_id: job4.job_id,
      portfolio_id: portfolio1.portfolio_id,
      cover_letter: 'I am a trained Bharatanatyam dancer with over 10 years of experience. I have performed in numerous classical productions and would love to be part of this period drama. My portfolio showcases my classical dance expertise.',
      status: "shortlisted",
      audition_notes: 'Excellent classical technique. Great stage presence. Shortlisted for callback.',
      rating: 5,
    },
  });

  await prisma.audition.create({
    data: {
      user_id: talentUser1.id,
      job_id: job1.job_id,
      portfolio_id: portfolio1.portfolio_id,
      cover_letter: 'While my primary expertise is dance, I have acting experience from various dance-dramas and would like to audition for this role.',
      status: "under_review",
    },
  });

  await prisma.audition.create({
    data: {
      user_id: talentUser2.id,
      job_id: job1.job_id,
      portfolio_id: portfolio2.portfolio_id,
      cover_letter: 'I am very interested in this lead role. My experience in theatre and web series has prepared me for this opportunity. I bring strong emotional depth and have worked on similar romantic dramas.',
      status: "audition_scheduled",
      audition_notes: 'Strong portfolio. Fits the character profile. Schedule for audition.',
      rating: 4,
    },
  });

  await prisma.audition.create({
    data: {
      user_id: talentUser3.id,
      job_id: job3.job_id,
      portfolio_id: portfolio3.portfolio_id,
      cover_letter: 'I have extensive experience in live performances and Bollywood playback singing. I would be thrilled to perform at this concert. Please find my audio samples in my portfolio.',
      status: "selected",
      audition_notes: 'Perfect voice quality and experience level. Selected for the concert.',
      rating: 5,
    },
  });

  await prisma.audition.create({
    data: {
      user_id: talentUser4.id,
      job_id: job2.job_id,
      portfolio_id: portfolio4.portfolio_id,
      cover_letter: 'I meet all the requirements for this runway show. I have walked for several fashion weeks and have professional runway experience. Looking forward to being part of Fashion Week India.',
      status: "submitted",
    },
  });

  await prisma.audition.create({
    data: {
      user_id: talentUser4.id,
      job_id: job6.job_id,
      portfolio_id: portfolio4.portfolio_id,
      cover_letter: 'While I primarily do runway, I also have experience with print campaigns and would love to be considered for this jewelry campaign.',
      status: "rejected",
      audition_notes: 'Looking for female models only for this campaign.',
    },
  });

  await prisma.audition.create({
    data: {
      user_id: talentUser5.id,
      job_id: job5.job_id,
      portfolio_id: portfolio5.portfolio_id,
      cover_letter: 'I specialize in event and concert photography. I have covered multiple music festivals and have professional equipment for all lighting conditions. I can deliver edited photos within 48 hours of the event.',
      status: "shortlisted",
      audition_notes: 'Great portfolio. Experienced in music festivals. Shortlisted.',
      rating: 4,
    },
  });

  console.log('✅ Seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log('  - 5 Talent Users created');
  console.log('  - 3 Employer Users created');
  console.log('  - 8 Profiles created (5 talent + 3 employer)');
  console.log('  - 5 Experiences created');
  console.log('  - 3 Education records created');
  console.log('  - 13 Portfolio Items created');
  console.log('  - 6 Jobs created');
  console.log('  - 7 Auditions created');
  console.log('\n🔐 Test Login Credentials:');
  console.log('\nTalent Users:');
  console.log('  - priya.sharma@example.com (Dancer)');
  console.log('  - rahul.verma@example.com (Actor)');
  console.log('  - anjali.desai@example.com (Singer)');
  console.log('  - arjun.kapoor@example.com (Model)');
  console.log('  - neha.patel@example.com (Photographer)');
  console.log('\nEmployer Users:');
  console.log('  - contact@bollywoodprod.com (Film Production)');
  console.log('  - hiring@fashionweekindia.com (Fashion)');
  console.log('  - talent@concertmasters.com (Events)');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error during seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
