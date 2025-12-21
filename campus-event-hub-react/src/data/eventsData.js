// Events data for the application
export const events = [
  {
    id: 1,
    title: "Hackfest 2025",
    category: "tech",
    date: "Dec 25-26",
    time: "9:00 AM - 9:00 PM",
    duration: "36 Hours",
    venue: "Tech Arena, Block A",
    image: "/images/hackfest_poster_1766237981164.png",
    attendees: 120,
    maxAttendees: 200,
    club: "CodeCraft Labs",
    organizer: "Rahul Sharma",
    email: "codecraftlabs@campus.edu",
    registrationDeadline: "Dec 23, 2025",
    description: "Join the ultimate coding marathon! Hackfest 2025 brings together the brightest minds to build innovative solutions in just 36 hours. Whether you're a beginner or a seasoned developer, this is your chance to learn, collaborate, and create something amazing. Top teams win exciting prizes including internship opportunities and tech gadgets!",
    requirements: ["Laptop with charger", "Valid student ID", "Basic programming knowledge", "Team of 2-4 members"],
    highlights: ["₹50,000 Prize Pool", "Industry Mentors", "Free Food & Swag", "Networking Sessions", "Workshop on AI/ML"]
  },
  {
    id: 2,
    title: "Rhythm Night 2025",
    category: "music",
    date: "Dec 28",
    time: "6:00 PM - 11:00 PM",
    duration: "5 Hours",
    venue: "Main Stage, Open Air",
    image: "/images/music_fest_poster_1766238003180.png",
    attendees: 350,
    maxAttendees: 500,
    club: "Harmonic Vibes Society",
    organizer: "Priya Menon",
    email: "harmonicvibes@campus.edu",
    registrationDeadline: "Dec 26, 2025",
    description: "Get ready for the most electrifying night of the year! Rhythm Night 2025 features live performances from top college bands, solo artists, and a special guest DJ. Experience music that moves your soul under the stars. Food stalls, glow merchandise, and good vibes guaranteed!",
    requirements: ["Valid student ID", "Entry pass (collect at registration)", "Comfortable shoes for dancing"],
    highlights: ["Live Band Performances", "Guest DJ Set", "Open Mic Sessions", "Food Stalls", "Glow Merchandise"]
  },
  {
    id: 3,
    title: "Sports Arena 2025",
    category: "sports",
    date: "Jan 5-10",
    time: "8:00 AM - 6:00 PM",
    duration: "6 Days",
    venue: "Central Stadium",
    image: "/images/sports_poster_1766238022728.png",
    attendees: 500,
    maxAttendees: 800,
    club: "Champions League Alliance",
    organizer: "Arjun Reddy",
    email: "championsleague@campus.edu",
    registrationDeadline: "Jan 2, 2025",
    description: "The biggest inter-college sports event is here! Sports Arena 2025 features competitions in Cricket, Football, Basketball, Volleyball, Badminton, Table Tennis, and Athletics. Represent your department, showcase your skills, and bring home the championship trophy!",
    requirements: ["Sports kit and gear", "Medical fitness certificate", "Team registration form", "Student ID card"],
    highlights: ["10+ Sports Events", "Inter-Department Competition", "Championship Trophies", "Sports Kits for Winners", "Celebrity Guest Appearance"]
  },
  {
    id: 4,
    title: "Artverse Expo",
    category: "art",
    date: "Jan 12",
    time: "10:00 AM - 8:00 PM",
    duration: "10 Hours",
    venue: "Gallery Hall, Block C",
    image: "/images/art_expo_poster_1766238044100.png",
    attendees: 200,
    maxAttendees: 300,
    club: "Visionary Canvas Collective",
    organizer: "Ananya Das",
    email: "visionarycanvas@campus.edu",
    registrationDeadline: "Jan 10, 2025",
    description: "Immerse yourself in a world of creativity! Artverse Expo showcases stunning artworks from talented student artists. From classical paintings to digital art, sculptures to photography, experience the diverse artistic expressions of our campus community. Participate in live art sessions and take home unique creations!",
    requirements: ["Art supplies (for workshops)", "Student ID", "Pre-registration for competitions"],
    highlights: ["Art Exhibition", "Live Painting Sessions", "Photography Contest", "Art Auction", "Workshop by Professional Artists"]
  },
  {
    id: 5,
    title: "Stage Showcase",
    category: "drama",
    date: "Jan 15",
    time: "5:00 PM - 10:00 PM",
    duration: "5 Hours",
    venue: "Main Auditorium",
    image: "/images/drama_fest_poster_1766238059958.png",
    attendees: 180,
    maxAttendees: 400,
    club: "The Spotlight Ensemble",
    organizer: "Vikram Iyer",
    email: "spotlightensemble@campus.edu",
    registrationDeadline: "Jan 12, 2025",
    description: "Witness the magic of theater! Stage Showcase brings you captivating plays, monologues, and street theater performances. From comedy to drama, our talented performers will take you on an emotional journey. Special performance by the award-winning college drama team!",
    requirements: ["Entry ticket (free for students)", "Arrive 15 minutes early", "Silence mobile phones"],
    highlights: ["3 Full-Length Plays", "Monologue Competition", "Street Theater", "Award Ceremony", "Meet & Greet with Artists"]
  },
  {
    id: 6,
    title: "Dance Fever 2025",
    category: "dance",
    date: "Jan 20",
    time: "4:00 PM - 10:00 PM",
    duration: "6 Hours",
    venue: "Main Stage, Open Air",
    image: "/images/dance_fest_poster_1766238085199.png",
    attendees: 300,
    maxAttendees: 600,
    club: "Rhythm Revolution Crew",
    organizer: "Neha Kapoor",
    email: "rhythmrevolution@campus.edu",
    registrationDeadline: "Jan 17, 2025",
    description: "Let your body move to the rhythm! Dance Fever 2025 is the ultimate celebration of dance featuring competitions in Classical, Western, Hip-Hop, and Fusion categories. Watch stunning performances, participate in flash mobs, and dance the night away with the best dancers on campus!",
    requirements: ["Dance costume", "Music track (USB/CD)", "Team registration for group performances", "Student ID"],
    highlights: ["Solo & Group Competitions", "Flash Mob", "Dance Battle", "Celebrity Judge Panel", "₹30,000 Prize Money"]
  }
];


export const clubs = [
  {
    id: 1,
    name: "CodeCraft Labs",
    avatar: "💻",
    events: 72,
    members: "1.2K",
    xp: "12,850",
    rank: 1
  },
  {
    id: 2,
    name: "The Spotlight Ensemble",
    avatar: "🎭",
    events: 45,
    members: "680",
    xp: "8,540",
    rank: 2
  },
  {
    id: 3,
    name: "Visionary Canvas Collective",
    avatar: "🎨",
    events: 38,
    members: "420",
    xp: "6,320",
    rank: 3
  }
];

export const features = [
  {
    id: 1,
    title: "Real-Time Event Tracking",
    description: "Never miss an event again. Get instant notifications when new events drop.",
    icon: "clock",
    color: ""
  },
  {
    id: 2,
    title: "Club Dashboard",
    description: "Powerful tools for clubs to manage events, track RSVPs, and grow their community.",
    icon: "users",
    color: "purple"
  },
  {
    id: 3,
    title: "Leaderboard & Rankings",
    description: "Compete with other clubs. Climb the ranks and become the most popular club on campus.",
    icon: "star",
    color: "pink"
  },
  {
    id: 4,
    title: "Smart Calendar Sync",
    description: "Sync events directly to your calendar. Never double-book or miss a deadline again.",
    icon: "calendar",
    color: "cyan"
  },
  {
    id: 5,
    title: "Community Forums",
    description: "Connect with fellow students, discuss events, and build lasting relationships.",
    icon: "chat",
    color: "orange"
  },
  {
    id: 6,
    title: "Verified Events",
    description: "All events are verified by official club representatives. 100% legit, 0% FOMO.",
    icon: "shield",
    color: "green"
  }
];
