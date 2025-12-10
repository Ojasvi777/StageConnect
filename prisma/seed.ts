import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive seed...');

  // Clean existing data
  console.log('🧹 Cleaning existing data...');
  await prisma.blogComment.deleteMany();
  await prisma.blogLike.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.audition.deleteMany();
  await prisma.portfolioItem.deleteMany();
  await prisma.education.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.job.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // Create Talent Users (10 users for more realistic data)
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

  const talentUser6 = await prisma.user.create({
    data: {
      name: 'Vikram Singh',
      email: 'vikram.singh@example.com',
      emailVerified: new Date(),
      image: 'https://i.pravatar.cc/300?img=6',
    },
  });

  const talentUser7 = await prisma.user.create({
    data: {
      name: 'Kavya Menon',
      email: 'kavya.menon@example.com',
      emailVerified: new Date(),
      image: 'https://i.pravatar.cc/300?img=7',
    },
  });

  const talentUser8 = await prisma.user.create({
    data: {
      name: 'Aditya Rao',
      email: 'aditya.rao@example.com',
      emailVerified: new Date(),
      image: 'https://i.pravatar.cc/300?img=8',
    },
  });

  const talentUser9 = await prisma.user.create({
    data: {
      name: 'Sanya Malhotra',
      email: 'sanya.malhotra@example.com',
      emailVerified: new Date(),
      image: 'https://i.pravatar.cc/300?img=9',
    },
  });

  const talentUser10 = await prisma.user.create({
    data: {
      name: 'Karthik Iyer',
      email: 'karthik.iyer@example.com',
      emailVerified: new Date(),
      image: 'https://i.pravatar.cc/300?img=10',
    },
  });

  // Create Employer Users (5 employers)
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

  const employerUser4 = await prisma.user.create({
    data: {
      name: 'Digital Media Studios',
      email: 'hr@digitalmedia.com',
      emailVerified: new Date(),
      image: 'https://i.pravatar.cc/300?img=53',
    },
  });

  const employerUser5 = await prisma.user.create({
    data: {
      name: 'Theatre Arts Collective',
      email: 'casting@theatrearts.com',
      emailVerified: new Date(),
      image: 'https://i.pravatar.cc/300?img=54',
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

  await prisma.profile.create({
    data: {
      user_id: talentUser6.id,
      role: 'talent',
      first_name: 'Vikram',
      last_name: 'Singh',
      phone_number: '+91-9876543215',
      address: 'Jaipur, Rajasthan',
      instagram_profile: 'https://instagram.com/vikram_singh',
      youtube_profile: 'https://youtube.com/@vikramsingh',
      bio: 'Professional musician and composer specializing in folk fusion and contemporary Indian music. Multi-instrumentalist.',
      visibility: 'public',
      gig_count: 25,
      talent_category: 'musician',
      specializations: ['Guitar', 'Tabla', 'Music Composition', 'Folk Fusion'],
      height: 175,
      weight: 72,
      age: 31,
      languages: ['Hindi', 'English', 'Rajasthani', 'Punjabi'],
      intro_video_url: 'https://example.com/videos/vikram-intro.mp4',
      profile_photos: [
        'https://i.pravatar.cc/300?img=6',
        'https://i.pravatar.cc/300?img=16',
      ],
      skills: ['Guitar', 'Tabla', 'Composition', 'Music Production', 'Live Performance'],
      hourly_rate: 8500,
      availability: 'Full-time',
    },
  });

  await prisma.profile.create({
    data: {
      user_id: talentUser7.id,
      role: 'talent',
      first_name: 'Kavya',
      last_name: 'Menon',
      phone_number: '+91-9876543216',
      address: 'Kochi, Kerala',
      instagram_profile: 'https://instagram.com/kavya_menon',
      bio: 'Voice artist and dubbing professional with expertise in multiple languages and character voices.',
      visibility: 'public',
      gig_count: 20,
      talent_category: 'voice_artist',
      specializations: ['Dubbing', 'Character Voice', 'Narration', 'Commercial VO'],
      height: 162,
      weight: 56,
      age: 27,
      languages: ['Malayalam', 'Hindi', 'English', 'Tamil', 'Telugu'],
      intro_video_url: 'https://example.com/videos/kavya-intro.mp4',
      profile_photos: [
        'https://i.pravatar.cc/300?img=7',
        'https://i.pravatar.cc/300?img=17',
      ],
      skills: ['Voice Acting', 'Dubbing', 'Narration', 'Voice Modulation', 'Multiple Accents'],
      hourly_rate: 7000,
      availability: 'Flexible',
    },
  });

  await prisma.profile.create({
    data: {
      user_id: talentUser8.id,
      role: 'talent',
      first_name: 'Aditya',
      last_name: 'Rao',
      phone_number: '+91-9876543217',
      address: 'Hyderabad, Telangana',
      instagram_profile: 'https://instagram.com/aditya_rao',
      bio: 'Choreographer specializing in contemporary, hip-hop, and Bollywood dance. Also work as a dance instructor.',
      visibility: 'public',
      gig_count: 16,
      talent_category: 'choreographer',
      specializations: ['Hip Hop', 'Contemporary', 'Bollywood', 'Dance Direction'],
      height: 180,
      weight: 74,
      age: 28,
      languages: ['Telugu', 'Hindi', 'English'],
      intro_video_url: 'https://example.com/videos/aditya-intro.mp4',
      profile_photos: [
        'https://i.pravatar.cc/300?img=8',
        'https://i.pravatar.cc/300?img=18',
      ],
      skills: ['Choreography', 'Hip Hop', 'Contemporary Dance', 'Teaching', 'Dance Direction'],
      hourly_rate: 6500,
      availability: 'Weekends and evenings',
    },
  });

  await prisma.profile.create({
    data: {
      user_id: talentUser9.id,
      role: 'talent',
      first_name: 'Sanya',
      last_name: 'Malhotra',
      phone_number: '+91-9876543218',
      address: 'Chandigarh, Punjab',
      instagram_profile: 'https://instagram.com/sanya_malhotra',
      youtube_profile: 'https://youtube.com/@sanyamalhotra',
      bio: 'Professional makeup artist specializing in bridal, editorial, and special effects makeup.',
      visibility: 'public',
      gig_count: 28,
      talent_category: 'makeup_artist',
      specializations: ['Bridal Makeup', 'Editorial', 'Special Effects', 'HD Makeup'],
      height: 165,
      weight: 58,
      age: 26,
      languages: ['Hindi', 'English', 'Punjabi'],
      intro_video_url: 'https://example.com/videos/sanya-intro.mp4',
      profile_photos: [
        'https://i.pravatar.cc/300?img=9',
        'https://i.pravatar.cc/300?img=19',
      ],
      skills: ['Makeup Artistry', 'Bridal Makeup', 'SFX Makeup', 'Hairstyling', 'Airbrush'],
      hourly_rate: 7500,
      availability: 'Full-time',
    },
  });

  await prisma.profile.create({
    data: {
      user_id: talentUser10.id,
      role: 'talent',
      first_name: 'Karthik',
      last_name: 'Iyer',
      phone_number: '+91-9876543219',
      address: 'Bangalore, Karnataka',
      instagram_profile: 'https://instagram.com/karthik_iyer',
      bio: 'Professional videographer and editor specializing in music videos, short films, and commercial content.',
      visibility: 'public',
      gig_count: 14,
      talent_category: 'videographer',
      specializations: ['Music Videos', 'Short Films', 'Commercial Videos', 'Editing'],
      height: 177,
      weight: 76,
      age: 30,
      languages: ['Tamil', 'Hindi', 'English', 'Kannada'],
      intro_video_url: 'https://example.com/videos/karthik-intro.mp4',
      profile_photos: [
        'https://i.pravatar.cc/300?img=10',
        'https://i.pravatar.cc/300?img=20',
      ],
      skills: ['Videography', 'Video Editing', 'Color Grading', 'Cinematography', 'Drone Operation'],
      hourly_rate: 8000,
      availability: 'Flexible',
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

  await prisma.profile.create({
    data: {
      user_id: employerUser4.id,
      role: 'employer',
      first_name: 'Digital',
      last_name: 'Media Studios',
      phone_number: '+91-9876543223',
      address: 'Whitefield, Bangalore',
      bio: 'Digital content creation studio producing web series, music videos, and branded content.',
      visibility: 'public',
      gig_count: 0,
      company_name: 'Digital Media Studios Pvt Ltd',
      company_description: 'Innovative digital content studio creating viral content, web series, and digital campaigns for brands and artists.',
      industry: 'Digital Media',
      website: 'https://digitalmedia.com',
      contact_person_name: 'Priya Nair',
      contact_person_email: 'priya@digitalmedia.com',
      company_logo_url: 'https://i.pravatar.cc/300?img=53',
    },
  });

  await prisma.profile.create({
    data: {
      user_id: employerUser5.id,
      role: 'employer',
      first_name: 'Theatre',
      last_name: 'Arts Collective',
      phone_number: '+91-9876543224',
      address: 'Bandra West, Mumbai',
      bio: 'Experimental theatre group producing contemporary and classical plays.',
      visibility: 'public',
      gig_count: 0,
      company_name: 'Theatre Arts Collective',
      company_description: 'Mumbai-based theatre collective known for bold, innovative productions and nurturing new theatrical talent.',
      industry: 'Theatre',
      website: 'https://theatrearts.com',
      contact_person_name: 'Arjun Mathur',
      contact_person_email: 'arjun@theatrearts.com',
      company_logo_url: 'https://i.pravatar.cc/300?img=54',
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

  await prisma.experience.create({
    data: {
      user_id: talentUser6.id,
      title: 'Music Composer',
      company_name: 'Indie Music Collective',
      project_name: 'Folk Fusion Album "Roots"',
      location: 'Jaipur, India',
      start_date: new Date('2020-01-01'),
      end_date: new Date('2021-12-31'),
      description: 'Composed and produced a full-length folk fusion album blending Rajasthani folk with contemporary sounds.',
      media_urls: ['https://example.com/experiences/vikram-roots.jpg'],
    },
  });

  await prisma.experience.create({
    data: {
      user_id: talentUser7.id,
      title: 'Voice Actor',
      company_name: 'Dreamworks India',
      project_name: 'Animated Series - Various Characters',
      location: 'Mumbai, India',
      start_date: new Date('2021-06-01'),
      end_date: null,
      description: 'Providing character voices for multiple animated series and dubbing international content.',
      media_urls: ['https://example.com/experiences/kavya-dubbing.jpg'],
    },
  });

  await prisma.experience.create({
    data: {
      user_id: talentUser8.id,
      title: 'Choreographer',
      company_name: 'Dance Studio Hyderabad',
      project_name: 'Annual Dance Festival',
      location: 'Hyderabad, India',
      start_date: new Date('2019-03-01'),
      end_date: new Date('2023-02-28'),
      description: 'Choreographed and directed multiple performances for annual dance festivals and competitions.',
      media_urls: ['https://example.com/experiences/aditya-festival.jpg'],
    },
  });

  await prisma.experience.create({
    data: {
      user_id: talentUser9.id,
      title: 'Bridal Makeup Artist',
      company_name: 'Glamour Bridal Studio',
      project_name: 'Premium Bridal Services',
      location: 'Chandigarh, India',
      start_date: new Date('2020-01-01'),
      end_date: null,
      description: 'Providing professional bridal makeup services for 100+ weddings.',
      media_urls: ['https://example.com/experiences/sanya-bridal.jpg'],
    },
  });

  await prisma.experience.create({
    data: {
      user_id: talentUser10.id,
      title: 'Music Video Director',
      company_name: 'Indie Artists Collective',
      project_name: 'Various Music Videos',
      location: 'Bangalore, India',
      start_date: new Date('2021-01-01'),
      end_date: null,
      description: 'Directed and produced 15+ music videos for independent artists and record labels.',
      media_urls: ['https://example.com/experiences/karthik-mv.jpg'],
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

  await prisma.education.create({
    data: {
      user_id: talentUser4.id,
      institution_name: 'Pearl Academy',
      degree: 'Diploma in Fashion Communication',
      field_of_study: 'Fashion & Modeling',
      start_date: new Date('2016-08-01'),
      end_date: new Date('2018-07-31'),
      description: 'Professional modeling training and fashion industry fundamentals.',
      certificate_url: 'https://example.com/certificates/arjun-pearl.pdf',
    },
  });

  await prisma.education.create({
    data: {
      user_id: talentUser6.id,
      institution_name: 'Swarnabhoomi Academy of Music',
      degree: 'Diploma in Music Production',
      field_of_study: 'Contemporary Music',
      start_date: new Date('2013-07-01'),
      end_date: new Date('2016-06-30'),
      description: 'Comprehensive training in music composition, production, and performance.',
      certificate_url: 'https://example.com/certificates/vikram-swarna.pdf',
    },
  });

  await prisma.education.create({
    data: {
      user_id: talentUser7.id,
      institution_name: 'Voice Academy of India',
      degree: 'Advanced Diploma in Voice Acting',
      field_of_study: 'Voice Arts',
      start_date: new Date('2017-01-01'),
      end_date: new Date('2019-12-31'),
      description: 'Professional voice acting, dubbing techniques, and voice modulation training.',
      certificate_url: 'https://example.com/certificates/kavya-voice.pdf',
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

  const portfolio6 = await prisma.portfolioItem.create({
    data: {
      user_id: talentUser6.id,
      title: 'Folk Fusion Live Performance',
      media_url: 'https://example.com/portfolio/vikram-folk-fusion.mp4',
      thumbnail_url: 'https://example.com/portfolio/thumbs/vikram-folk-fusion.jpg',
      media_type: "video",
      file_size: 42000000,
      duration: 360,
      description: 'Live performance of original folk fusion composition blending Rajasthani folk with modern elements.',
      tags: ['music', 'folk', 'fusion', 'live', 'guitar'],
      is_featured: true,
      display_order: 1,
    },
  });

  await prisma.portfolioItem.create({
    data: {
      user_id: talentUser6.id,
      title: 'Music Production Showreel',
      media_url: 'https://example.com/portfolio/vikram-production.mp3',
      media_type: "audio",
      file_size: 18000000,
      duration: 540,
      description: 'Compilation of original compositions and music productions.',
      tags: ['music-production', 'composition', 'original'],
      is_featured: true,
      display_order: 2,
    },
  });

  const portfolio7 = await prisma.portfolioItem.create({
    data: {
      user_id: talentUser7.id,
      title: 'Voice Acting Demo Reel',
      media_url: 'https://example.com/portfolio/kavya-voice-reel.mp3',
      media_type: "audio",
      file_size: 9000000,
      duration: 240,
      description: 'Professional voice acting demo reel showcasing range of characters and accents.',
      tags: ['voice-acting', 'dubbing', 'characters', 'demo'],
      is_featured: true,
      display_order: 1,
    },
  });

  await prisma.portfolioItem.create({
    data: {
      user_id: talentUser7.id,
      title: 'Commercial Narration Samples',
      media_url: 'https://example.com/portfolio/kavya-commercial.mp3',
      media_type: "audio",
      file_size: 6000000,
      duration: 180,
      description: 'Samples of commercial narration work for brands and advertisements.',
      tags: ['narration', 'commercial', 'voice-over'],
      is_featured: false,
      display_order: 2,
    },
  });

  const portfolio8 = await prisma.portfolioItem.create({
    data: {
      user_id: talentUser8.id,
      title: 'Hip Hop Choreography Performance',
      media_url: 'https://example.com/portfolio/aditya-hiphop.mp4',
      thumbnail_url: 'https://example.com/portfolio/thumbs/aditya-hiphop.jpg',
      media_type: "video",
      file_size: 38000000,
      duration: 280,
      description: 'Original hip hop choreography performed with dance crew.',
      tags: ['choreography', 'hip-hop', 'dance', 'crew'],
      is_featured: true,
      display_order: 1,
    },
  });

  await prisma.portfolioItem.create({
    data: {
      user_id: talentUser8.id,
      title: 'Contemporary Dance Film',
      media_url: 'https://example.com/portfolio/aditya-contemporary.mp4',
      thumbnail_url: 'https://example.com/portfolio/thumbs/aditya-contemporary.jpg',
      media_type: "video",
      file_size: 45000000,
      duration: 320,
      description: 'Contemporary dance piece choreographed for a short film.',
      tags: ['contemporary', 'choreography', 'dance-film'],
      is_featured: true,
      display_order: 2,
    },
  });

  const portfolio9 = await prisma.portfolioItem.create({
    data: {
      user_id: talentUser9.id,
      title: 'Bridal Makeup Portfolio',
      media_url: 'https://example.com/portfolio/sanya-bridal-portfolio.pdf',
      media_type: "document",
      file_size: 22000000,
      description: 'Professional bridal makeup portfolio featuring 50+ bridal looks.',
      tags: ['makeup', 'bridal', 'portfolio', 'professional'],
      is_featured: true,
      display_order: 1,
    },
  });

  await prisma.portfolioItem.create({
    data: {
      user_id: talentUser9.id,
      title: 'Editorial Makeup Photoshoot',
      media_url: 'https://example.com/portfolio/sanya-editorial.jpg',
      media_type: "image",
      file_size: 5200000,
      description: 'Editorial makeup work for fashion magazine shoots.',
      tags: ['editorial', 'makeup', 'fashion', 'photography'],
      is_featured: true,
      display_order: 2,
    },
  });

  const portfolio10 = await prisma.portfolioItem.create({
    data: {
      user_id: talentUser10.id,
      title: 'Music Video Showreel',
      media_url: 'https://example.com/portfolio/karthik-mv-reel.mp4',
      thumbnail_url: 'https://example.com/portfolio/thumbs/karthik-mv-reel.jpg',
      media_type: "video",
      file_size: 55000000,
      duration: 420,
      description: 'Compilation of music videos directed and produced for various artists.',
      tags: ['music-video', 'videography', 'direction', 'editing'],
      is_featured: true,
      display_order: 1,
    },
  });

  await prisma.portfolioItem.create({
    data: {
      user_id: talentUser10.id,
      title: 'Short Film - "The Last Dance"',
      media_url: 'https://example.com/portfolio/karthik-short-film.mp4',
      thumbnail_url: 'https://example.com/portfolio/thumbs/karthik-short-film.jpg',
      media_type: "video",
      file_size: 78000000,
      duration: 900,
      description: 'Award-winning short film about a dancer\'s journey.',
      tags: ['short-film', 'cinematography', 'storytelling'],
      is_featured: true,
      display_order: 2,
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

  const job7 = await prisma.job.create({
    data: {
      employer_id: employerUser4.id,
      title: 'Voice Artists for Web Series Dubbing',
      description: 'Digital Media Studios needs talented voice artists for dubbing our upcoming web series in Hindi, Tamil, and Telugu.',
      requirements: 'Professional voice acting experience, clear pronunciation, ability to match lip sync, experience with character voices.',
      responsibilities: 'Dubbing work, voice synchronization, character interpretation, studio recording sessions.',
      talent_category: "voice_artist",
      location_type: "on_site",
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      venue: 'Digital Media Studios, Whitefield',
      job_type: "contract",
      compensation_min: 50000,
      compensation_max: 150000,
      compensation_type: 'per project',
      event_date: new Date('2025-02-10'),
      experience_level: "mid",
      application_deadline: new Date('2025-01-20'),
      audition_required: true,
      audition_date: new Date('2025-01-25'),
      audition_location: 'Whitefield, Bangalore',
      status: "active",
      required_skills: ['Voice Acting', 'Dubbing', 'Multiple Languages', 'Character Voice'],
      preferred_age_min: 22,
      preferred_age_max: 45,
      slots_available: 4,
    },
  });

  const job8 = await prisma.job.create({
    data: {
      employer_id: employerUser5.id,
      title: 'Theatre Actors for Contemporary Play',
      description: 'Theatre Arts Collective is casting for our new contemporary play "Echoes". Looking for passionate theatre actors.',
      requirements: 'Strong theatre background, improvisation skills, availability for 3 months of rehearsals and performances.',
      responsibilities: 'Rehearsals, performances, promotional events, script development workshops.',
      talent_category: "actor",
      location_type: "on_site",
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      venue: 'Prithvi Theatre, Juhu',
      job_type: "contract",
      compensation_min: 75000,
      compensation_max: 200000,
      compensation_type: 'per project',
      event_date: new Date('2025-03-01'),
      experience_level: "mid",
      application_deadline: new Date('2025-01-28'),
      audition_required: true,
      audition_date: new Date('2025-02-02'),
      audition_location: 'Bandra West, Mumbai',
      status: "active",
      required_skills: ['Theatre Acting', 'Improvisation', 'Script Reading', 'Stage Performance'],
      preferred_age_min: 25,
      preferred_age_max: 40,
      slots_available: 6,
    },
  });

  const job9 = await prisma.job.create({
    data: {
      employer_id: employerUser4.id,
      title: 'Choreographer for Music Video',
      description: 'Need an experienced choreographer for a high-budget music video featuring a popular artist. Contemporary/hip-hop style preferred.',
      requirements: 'Professional choreography experience, ability to work with large groups, creative vision, music video experience.',
      responsibilities: 'Choreography creation, dancer coordination, shoot day direction, rehearsal management.',
      talent_category: "choreographer",
      location_type: "on_site",
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      venue: 'Film City, Mumbai',
      job_type: "gig",
      compensation_min: 100000,
      compensation_max: 250000,
      compensation_type: 'per project',
      event_date: new Date('2025-02-15'),
      experience_level: "professional",
      application_deadline: new Date('2025-01-22'),
      audition_required: false,
      status: "active",
      required_skills: ['Choreography', 'Hip Hop', 'Contemporary', 'Music Video Direction'],
      preferred_age_min: 25,
      preferred_age_max: 40,
      slots_available: 1,
    },
  });

  const job10 = await prisma.job.create({
    data: {
      employer_id: employerUser1.id,
      title: 'Makeup Artists for Film Production',
      description: 'Bollywood Productions is hiring makeup artists for our upcoming period drama. Experience with period looks required.',
      requirements: 'Professional makeup artist certification, portfolio of work, experience with film/HD makeup, period makeup knowledge.',
      responsibilities: 'Daily makeup for actors, continuity maintenance, special effects makeup, long shoot hours.',
      talent_category: "makeup_artist",
      location_type: "on_site",
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      venue: 'Film City Studios, Mumbai',
      job_type: "contract",
      compensation_min: 60000,
      compensation_max: 120000,
      compensation_type: 'per month',
      event_date: new Date('2025-03-01'),
      experience_level: "professional",
      application_deadline: new Date('2025-02-05'),
      audition_required: false,
      status: "active",
      required_skills: ['Film Makeup', 'HD Makeup', 'Period Looks', 'SFX Makeup'],
      preferred_age_min: 23,
      preferred_age_max: 45,
      slots_available: 3,
    },
  });

  const job11 = await prisma.job.create({
    data: {
      employer_id: employerUser3.id,
      title: 'Live Musicians for Concert Series',
      description: 'Concert Masters is organizing a fusion music concert series. Looking for talented musicians who can blend Indian classical with contemporary.',
      requirements: 'Professional musicianship, ability to improvise, experience in live performances, knowledge of both classical and contemporary music.',
      responsibilities: 'Rehearsals, live performances, collaborative compositions, sound checks.',
      talent_category: "musician",
      location_type: "on_site",
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      venue: 'Multiple venues across Bangalore',
      job_type: "gig",
      compensation_min: 80000,
      compensation_max: 200000,
      compensation_type: 'per event',
      event_date: new Date('2025-02-25'),
      experience_level: "professional",
      application_deadline: new Date('2025-01-30'),
      audition_required: true,
      audition_date: new Date('2025-02-03'),
      audition_location: 'Koramangala, Bangalore',
      status: "active",
      required_skills: ['Live Performance', 'Indian Classical', 'Fusion Music', 'Improvisation'],
      preferred_age_min: 22,
      preferred_age_max: 45,
      slots_available: 5,
    },
  });

  const job12 = await prisma.job.create({
    data: {
      employer_id: employerUser4.id,
      title: 'Videographers for Corporate Events',
      description: 'Seeking professional videographers for a series of corporate events and product launches. High-quality equipment required.',
      requirements: 'Professional videography equipment (4K camera minimum), event coverage experience, video editing skills, quick turnaround ability.',
      responsibilities: 'Event coverage, video editing, highlight reel creation, drone footage (if applicable).',
      talent_category: "videographer",
      location_type: "hybrid",
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      venue: 'Various locations',
      job_type: "part_time",
      compensation_min: 25000,
      compensation_max: 60000,
      compensation_type: 'per day',
      event_date: new Date('2025-02-01'),
      experience_level: "mid",
      application_deadline: new Date('2025-01-18'),
      audition_required: false,
      status: "active",
      required_skills: ['Videography', 'Video Editing', 'Event Coverage', '4K Recording'],
      preferred_age_min: 24,
      preferred_age_max: 40,
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

  await prisma.audition.create({
    data: {
      user_id: talentUser6.id,
      job_id: job11.job_id,
      portfolio_id: portfolio6.portfolio_id,
      cover_letter: 'I am a professional musician specializing in folk fusion music. My work blends traditional Rajasthani folk with contemporary sounds, which aligns perfectly with your fusion concert series.',
      status: "selected",
      audition_notes: 'Excellent fusion work. Perfect fit for the concert series. Selected.',
      rating: 5,
    },
  });

  await prisma.audition.create({
    data: {
      user_id: talentUser7.id,
      job_id: job7.job_id,
      portfolio_id: portfolio7.portfolio_id,
      cover_letter: 'I am a professional voice artist with fluency in Hindi, Tamil, Telugu, and Malayalam. I have extensive dubbing experience and can match lip sync perfectly.',
      status: "audition_scheduled",
      audition_notes: 'Great voice samples. Multilingual capability is excellent. Schedule audition.',
      rating: 4,
    },
  });

  await prisma.audition.create({
    data: {
      user_id: talentUser8.id,
      job_id: job9.job_id,
      portfolio_id: portfolio8.portfolio_id,
      cover_letter: 'I specialize in contemporary and hip-hop choreography with extensive experience in music videos. I would love to bring creative vision to this high-budget music video.',
      status: "under_review",
    },
  });

  await prisma.audition.create({
    data: {
      user_id: talentUser9.id,
      job_id: job10.job_id,
      portfolio_id: portfolio9.portfolio_id,
      cover_letter: 'I am an experienced makeup artist with a strong portfolio in film and HD makeup. I have worked on period dramas before and understand the requirements for continuity and historical accuracy.',
      status: "shortlisted",
      audition_notes: 'Impressive portfolio. Period makeup experience is valuable. Shortlisted.',
      rating: 5,
    },
  });

  await prisma.audition.create({
    data: {
      user_id: talentUser10.id,
      job_id: job12.job_id,
      portfolio_id: portfolio10.portfolio_id,
      cover_letter: 'I am a professional videographer with 4K equipment and extensive experience in corporate event coverage. I can provide quick turnaround with professional editing.',
      status: "selected",
      audition_notes: 'Professional equipment and experience. Hired for upcoming events.',
      rating: 5,
    },
  });

  await prisma.audition.create({
    data: {
      user_id: talentUser2.id,
      job_id: job8.job_id,
      portfolio_id: portfolio2.portfolio_id,
      cover_letter: 'Theatre is my passion! I have extensive experience in contemporary theatre and would love to be part of "Echoes". I am comfortable with improvisation and can commit to the full rehearsal schedule.',
      status: "submitted",
    },
  });

  await prisma.audition.create({
    data: {
      user_id: talentUser3.id,
      job_id: job11.job_id,
      portfolio_id: portfolio3.portfolio_id,
      cover_letter: 'As a trained Hindustani classical singer with experience in fusion music, I believe I would be a great addition to your concert series.',
      status: "under_review",
    },
  });

  // Create Blogs
  console.log('📝 Creating blog posts...');

  const blog1 = await prisma.blog.create({
    data: {
      author_id: talentUser1.id,
      title: 'My Journey from Student to Professional Dancer',
      content: `When I started learning Bharatanatyam at age 10, I never imagined I would be performing on international stages one day. The journey has been filled with challenges, but every moment has been worth it.

The early years were tough. Long hours of practice, strict discipline, and countless repetitions of the same moves. But my guru taught me that dance is not just about physical movement – it's about expressing emotions and telling stories.

My breakthrough came when I was selected for the "Echoes of India" world tour. Performing in 15 countries across 3 continents taught me so much about different cultures and how classical Indian dance is appreciated globally.

Today, as I work as a choreographer for TV shows while continuing my performances, I realize that success in this field requires persistence, continuous learning, and a genuine love for the art form.

For aspiring dancers: Don't give up. Every practice session, every rejection, every small performance is preparing you for something bigger. Stay humble, keep learning, and let your passion shine through your movements.`,
      category: 'dancing',
      image_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800',
      published: true,
    },
  });

  const blog2 = await prisma.blog.create({
    data: {
      author_id: talentUser2.id,
      title: 'Theatre vs Film: An Actor\'s Perspective',
      content: `Having worked extensively in both theatre and film, I often get asked about the differences. Both mediums have taught me invaluable lessons as an actor.

Theatre is raw and immediate. There's no room for error – every performance must be perfect because you can't do a retake. The energy exchange with the live audience is magical and irreplaceable. In my experience with the National School of Drama and productions like "Hamlet", I learned the importance of voice projection, stage presence, and connecting with the audience.

Film, on the other hand, is about subtlety. The camera catches every micro-expression, every fleeting emotion. Working on the web series "Urban Legends" taught me how to be more restrained and natural. The ability to do multiple takes allows for experimentation and refinement.

My advice to aspiring actors: Train in theatre first. It builds a strong foundation in acting fundamentals, voice control, and stage presence. Then, when you transition to film, you'll have the skills to adapt to the medium's unique demands.

Both mediums are equally challenging and rewarding. The key is to approach each project with respect for the craft and a willingness to learn.`,
      category: 'acting',
      image_url: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800',
      published: true,
    },
  });

  const blog3 = await prisma.blog.create({
    data: {
      author_id: talentUser3.id,
      title: 'The Art of Playback Singing: More Than Just a Voice',
      content: `Playback singing in Bollywood is often misunderstood. People think it's just about having a good voice, but there's so much more to it.

First, you need classical training. My years at Gandharva Mahavidyalaya gave me the foundation in Hindustani classical music that allows me to handle any genre – from classical to contemporary fusion.

But technical skill is just the beginning. You need to understand the character, the emotion of the scene, and the director's vision. When I record a song, I watch the video if available, understand the context, and try to embody the character's emotions through my voice.

Studio work requires different skills than live performance. You need to deliver perfect takes consistently, handle long recording sessions, and be able to modulate your voice based on the music director's requirements.

The industry is competitive, but there's always room for dedicated artists. My advice: Invest in proper training, build your unique style while being versatile, network genuinely with music directors and composers, and most importantly, love what you do.

Every song I record is a new challenge and a new opportunity to tell a story through music.`,
      category: 'singing',
      image_url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800',
      published: true,
    },
  });

  const blog4 = await prisma.blog.create({
    data: {
      author_id: talentUser4.id,
      title: 'Breaking Into Modeling: My First Year Experience',
      content: `One year ago, I was a college student with a dream of becoming a professional model. Today, I've walked for Fashion Week India and worked with top brands. Here's what I learned:

1. Your portfolio is everything: Invest in good photography. Work with emerging photographers if you can't afford established ones – it's mutually beneficial.

2. Fitness is non-negotiable: This industry demands physical fitness, but it's about being healthy, not starving yourself.

3. Rejection is part of the journey: I've been rejected more times than selected. Each "no" taught me something and made me stronger.

4. Networking matters: The relationships you build with photographers, designers, and other models can open doors.

5. Professionalism sets you apart: Always be on time, maintain a positive attitude, and be easy to work with.

The runway might look glamorous, but there's serious hard work behind those few minutes of walking. You're standing for hours in fittings, maintaining poses during photoshoots, and constantly working on your craft.

For aspiring models: Start local, build your portfolio, work on your walk and poses, and most importantly, develop thick skin. This industry will test you, but if you truly love it, the journey is incredible.`,
      category: 'modeling',
      image_url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800',
      published: true,
    },
  });

  const blog5 = await prisma.blog.create({
    data: {
      author_id: talentUser5.id,
      title: 'Essential Photography Tips for Capturing Performers',
      content: `As a photographer specializing in fashion and events, I've learned that capturing performers requires a unique skill set. Here are my top tips:

**1. Understand Lighting:** Whether it's natural light for outdoor fashion shoots or stage lighting for performances, knowing how to work with available light is crucial. Invest time in learning about ISO, shutter speed, and aperture.

**2. Anticipate the Moment:** Performers move fast. Learn to anticipate the peak moment – the perfect expression, the highest jump, the most dramatic pose.

**3. Know Your Equipment:** In low-light concert situations, you need fast lenses and a camera that handles high ISO well. Don't skimp on equipment if you're serious about this profession.

**4. Build Relationships:** The best shots come when subjects are comfortable with you. Spend time talking with performers, understand their vision, and create a collaborative environment.

**5. Post-Processing:** Great photography doesn't end with the click. Learn professional editing software and develop your unique style.

I've had the privilege of covering fashion shows, music festivals, and editorial shoots. Each genre requires different techniques, but the fundamental principle remains: capture the essence, the emotion, and the story.

For aspiring photographers: Practice constantly, study the work of photographers you admire, and never stop learning.`,
      category: 'photography',
      image_url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800',
      published: true,
    },
  });

  const blog6 = await prisma.blog.create({
    data: {
      author_id: talentUser6.id,
      title: 'Folk Fusion: Bridging Traditional and Modern Music',
      content: `Growing up in Rajasthan, I was surrounded by rich folk music traditions. As I learned contemporary music production, I realized there was beautiful potential in blending these worlds.

Folk fusion is about respecting tradition while embracing innovation. When I compose, I ensure the essence of folk music – its soul, its stories, its cultural roots – remains intact while introducing modern instrumentation and production techniques.

The "Roots" album was my attempt to showcase how Rajasthani folk melodies can blend with electronic beats, rock guitars, and contemporary arrangements. The response has been overwhelming, especially from younger audiences who are discovering their cultural heritage through a modern lens.

For musicians exploring fusion: Study the traditional form deeply before attempting to innovate. Understand the cultural context, the traditional instruments, and the stories being told. Only then can you respectfully introduce modern elements.

Technology has made music production accessible to everyone, but the heart of music remains the same – it's about emotion, storytelling, and connecting with your audience.`,
      category: 'singing',
      image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
      published: true,
    },
  });

  const blog7 = await prisma.blog.create({
    data: {
      author_id: talentUser7.id,
      title: 'Voice Acting: Finding Your Unique Sound in the Dubbing Industry',
      content: `Voice acting is an invisible art form. Unlike on-screen actors, we tell stories purely through our voice, and that requires unique skills.

When I started dubbing for animated series, I had to learn to match lip sync perfectly while maintaining natural delivery. It's harder than it looks! You need to convey emotions, create distinct character voices, and maintain consistency across long dubbing sessions.

What sets apart good voice actors? Versatility. I can voice a young child, an elderly person, a villain, or a hero – each requires different vocal techniques and emotional understanding.

My training at the Voice Academy taught me voice modulation, accent work, and how to protect my voice during long sessions. Your voice is your instrument – you must take care of it.

For aspiring voice artists:
- Practice different characters and accents daily
- Record yourself and analyze critically
- Learn about voice health and proper breathing techniques
- Watch international voice actors and study their techniques
- Network with dubbing studios and content creators

The dubbing industry in India is growing rapidly with OTT platforms creating content in multiple languages. There's never been a better time to enter this field.`,
      category: 'voiceover',
      image_url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800',
      published: true,
    },
  });

  const blog8 = await prisma.blog.create({
    data: {
      author_id: talentUser8.id,
      title: 'Contemporary Choreography: Creating Movement That Tells a Story',
      content: `Choreography is storytelling through movement. Every step, every gesture should serve the narrative and evoke emotion.

When I choreograph, I start with the emotion and the story I want to tell. The technical steps come later. Whether it's hip-hop, contemporary, or Bollywood, the foundation is always the emotional truth.

Working with dance crews has taught me the importance of understanding each dancer's strengths. A good choreographer doesn't just create steps – they create opportunities for each performer to shine.

Music videos present unique challenges. You're working with camera angles, editing cuts, and the song's narrative. The choreography must look good from multiple angles and tell the story the director envisions.

My advice for aspiring choreographers:
- Study various dance forms to expand your vocabulary
- Watch performances critically, analyzing what works and why
- Collaborate with dancers and incorporate their ideas
- Understand music theory – it helps tremendously
- Don't be afraid to experiment and fail

Every dance piece is a new opportunity to create something meaningful. Trust your vision, but stay open to collaboration.`,
      category: 'dancing',
      image_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800',
      published: true,
    },
  });

  const blog9 = await prisma.blog.create({
    data: {
      author_id: talentUser9.id,
      title: 'Bridal Makeup Artistry: Creating Dreams for the Most Important Day',
      content: `Being a bridal makeup artist is about more than applying makeup – it's about understanding dreams, managing emotions, and creating confidence for one of life's most important days.

Every bride is unique. Some want natural looks, others desire glamorous transformation. My job is to listen, understand their vision, and enhance their natural beauty while ensuring they feel comfortable and confident.

The technical aspects are crucial: understanding skin types, choosing products that photograph well, ensuring makeup lasts through long ceremonies and emotional moments. HD makeup techniques are essential in today's digital age where every moment is captured in high resolution.

Over my years working with 100+ brides, I've learned:
- Communication is key – have detailed consultations
- Trial sessions are mandatory – never skip them
- Stay updated with trends but respect traditional preferences
- Manage time efficiently on the wedding day
- Keep backup products for any situation

The joy on a bride's face when she sees herself transformed – that makes all the 4 AM start times and long days worthwhile.

For aspiring makeup artists: Invest in quality products and training, build a diverse portfolio, and remember – technical skill plus emotional intelligence equals success in this field.`,
      category: 'tips',
      image_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800',
      published: true,
    },
  });

  const blog10 = await prisma.blog.create({
    data: {
      author_id: talentUser10.id,
      title: 'Music Video Production: From Concept to Final Cut',
      content: `Directing music videos combines visual storytelling with musical narrative. It's one of the most creative and challenging forms of short-form content.

My process starts with understanding the song. What story does it tell? What emotions does it evoke? Then I conceptualize visuals that complement and enhance the music.

Pre-production is crucial: storyboarding, location scouting, coordinating with choreographers, planning shots, and managing budgets. A well-planned shoot saves time and money.

On shoot day, it's about managing chaos creatively. You're coordinating dancers, operating or directing cameras, working with lighting, and ensuring the artist's vision is realized.

Post-production is where magic happens. Color grading sets the mood, editing creates rhythm that matches the music, and effects add that professional polish.

My short film "The Last Dance" taught me about long-form storytelling, which improved my music video work. Understanding cinematography, narrative structure, and emotional arcs makes you a better video director.

For aspiring videographers:
- Master your camera and editing software
- Study music videos from directors you admire
- Understand music theory and rhythm
- Network with musicians and artists
- Start with small projects and build your portfolio

Every project is a learning opportunity. Stay curious, stay creative, and keep pushing boundaries.`,
      category: 'tips',
      image_url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800',
      published: true,
    },
  });

  // Create Blog Likes (inter-user engagement)
  console.log('❤️ Creating blog likes...');

  await prisma.blogLike.create({ data: { blog_id: blog1.blog_id, user_id: talentUser2.id } });
  await prisma.blogLike.create({ data: { blog_id: blog1.blog_id, user_id: talentUser3.id } });
  await prisma.blogLike.create({ data: { blog_id: blog1.blog_id, user_id: talentUser8.id } });
  
  await prisma.blogLike.create({ data: { blog_id: blog2.blog_id, user_id: talentUser1.id } });
  await prisma.blogLike.create({ data: { blog_id: blog2.blog_id, user_id: talentUser5.id } });
  
  await prisma.blogLike.create({ data: { blog_id: blog3.blog_id, user_id: talentUser6.id } });
  await prisma.blogLike.create({ data: { blog_id: blog3.blog_id, user_id: talentUser7.id } });
  await prisma.blogLike.create({ data: { blog_id: blog3.blog_id, user_id: talentUser1.id } });
  
  await prisma.blogLike.create({ data: { blog_id: blog4.blog_id, user_id: talentUser1.id } });
  await prisma.blogLike.create({ data: { blog_id: blog4.blog_id, user_id: talentUser9.id } });
  
  await prisma.blogLike.create({ data: { blog_id: blog5.blog_id, user_id: talentUser4.id } });
  await prisma.blogLike.create({ data: { blog_id: blog5.blog_id, user_id: talentUser10.id } });
  
  await prisma.blogLike.create({ data: { blog_id: blog6.blog_id, user_id: talentUser3.id } });
  await prisma.blogLike.create({ data: { blog_id: blog7.blog_id, user_id: talentUser2.id } });
  await prisma.blogLike.create({ data: { blog_id: blog8.blog_id, user_id: talentUser1.id } });
  await prisma.blogLike.create({ data: { blog_id: blog9.blog_id, user_id: talentUser1.id } });
  await prisma.blogLike.create({ data: { blog_id: blog10.blog_id, user_id: talentUser5.id } });

  // Create Blog Comments (inter-user engagement)
  console.log('💬 Creating blog comments...');

  await prisma.blogComment.create({
    data: {
      blog_id: blog1.blog_id,
      user_id: talentUser2.id,
      content: 'This is so inspiring! Your journey resonates with my own experience in theatre. Persistence truly is key.',
    },
  });

  await prisma.blogComment.create({
    data: {
      blog_id: blog1.blog_id,
      user_id: talentUser8.id,
      content: 'As a choreographer, I have immense respect for classical dancers. The discipline and dedication required is incredible!',
    },
  });

  await prisma.blogComment.create({
    data: {
      blog_id: blog2.blog_id,
      user_id: talentUser1.id,
      content: 'Great insights! I come from a dance background and have been considering theatre. This gives me a lot to think about.',
    },
  });

  await prisma.blogComment.create({
    data: {
      blog_id: blog3.blog_id,
      user_id: talentUser6.id,
      content: 'Loved reading this! Classical training really does make all the difference. It\'s the foundation for everything else.',
    },
  });

  await prisma.blogComment.create({
    data: {
      blog_id: blog4.blog_id,
      user_id: talentUser1.id,
      content: 'Your honesty about rejection is refreshing. We all face it but rarely talk about it. Thank you for sharing!',
    },
  });

  await prisma.blogComment.create({
    data: {
      blog_id: blog5.blog_id,
      user_id: talentUser4.id,
      content: 'This is super helpful! I\'m always looking to work with great photographers. Understanding their perspective helps.',
    },
  });

  await prisma.blogComment.create({
    data: {
      blog_id: blog6.blog_id,
      user_id: talentUser3.id,
      content: 'Beautiful approach to fusion music! Respecting tradition while innovating is exactly what our industry needs.',
    },
  });

  await prisma.blogComment.create({
    data: {
      blog_id: blog7.blog_id,
      user_id: talentUser2.id,
      content: 'Voice acting is such an underrated art form. Your dedication to the craft is evident. Keep creating magic!',
    },
  });

  await prisma.blogComment.create({
    data: {
      blog_id: blog8.blog_id,
      user_id: talentUser1.id,
      content: 'As a dancer, I appreciate choreographers who focus on storytelling. That\'s what makes dance truly memorable.',
    },
  });

  await prisma.blogComment.create({
    data: {
      blog_id: blog9.blog_id,
      user_id: talentUser1.id,
      content: 'The emotional intelligence aspect is so true! Working with great makeup artists who understand this makes all the difference.',
    },
  });

  await prisma.blogComment.create({
    data: {
      blog_id: blog10.blog_id,
      user_id: talentUser5.id,
      content: 'As a photographer, I find videography fascinating. The movement and rhythm aspects are so different from stills!',
    },
  });

  await prisma.blogComment.create({
    data: {
      blog_id: blog10.blog_id,
      user_id: talentUser6.id,
      content: 'Would love to collaborate on a music video sometime! Your understanding of music and visuals is impressive.',
    },
  });

  console.log('✅ Seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log('  - 10 Talent Users created');
  console.log('  - 5 Employer Users created');
  console.log('  - 15 Profiles created (10 talent + 5 employer)');
  console.log('  - 10 Experiences created');
  console.log('  - 7 Education records created');
  console.log('  - 23 Portfolio Items created');
  console.log('  - 12 Jobs created');
  console.log('  - 15 Auditions created');
  console.log('  - 10 Blog Posts created');
  console.log('  - 17 Blog Likes created');
  console.log('  - 12 Blog Comments created');
  console.log('\n🔐 Test Login Credentials:');
  console.log('\nTalent Users:');
  console.log('  - priya.sharma@example.com (Dancer)');
  console.log('  - rahul.verma@example.com (Actor)');
  console.log('  - anjali.desai@example.com (Singer)');
  console.log('  - arjun.kapoor@example.com (Model)');
  console.log('  - neha.patel@example.com (Photographer)');
  console.log('  - vikram.singh@example.com (Musician)');
  console.log('  - kavya.menon@example.com (Voice Artist)');
  console.log('  - aditya.rao@example.com (Choreographer)');
  console.log('  - sanya.malhotra@example.com (Makeup Artist)');
  console.log('  - karthik.iyer@example.com (Videographer)');
  console.log('\nEmployer Users:');
  console.log('  - contact@bollywoodprod.com (Film Production)');
  console.log('  - hiring@fashionweekindia.com (Fashion)');
  console.log('  - talent@concertmasters.com (Events)');
  console.log('  - hr@digitalmedia.com (Digital Media)');
  console.log('  - casting@theatrearts.com (Theatre)');
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
