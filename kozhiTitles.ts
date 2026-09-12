export interface KozhiTier {
  minScore: number;
  maxScore: number;
  title: string;
  malayalamTitle: string;
  badgeColor: string;
  gradient: string;
  description: string;
  quotes: string[];
  signalsSummary: string;
  advice: string;
}

export const KOZHI_TIERS: KozhiTier[] = [
  {
    minScore: 0,
    maxScore: 15,
    title: "Ice Cold Kozhi 🧊",
    malayalamTitle: "ഐസ് കോൾഡ് കോഴി (Pure Pavam)",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/40",
    gradient: "from-blue-600 to-cyan-400",
    description: "Absolute innocent soul! You walk straight without looking left or right. Even when someone smiles at you, you look behind to see who they meant.",
    quotes: [
      "\"Ayyyo njan alla!\" — You when someone catches your eye.",
      "Kozhimon Certification: 0/100. Pure harmless coconut oil.",
      "Your eyes move in straight parallel lines only!"
    ],
    signalsSummary: "Smile curvature is purely polite; eye squint index indicates 100% focus on syllabus/work.",
    advice: "Try smiling at people once in a while. You won't turn into a Kozhi, promise!"
  },
  {
    minScore: 16,
    maxScore: 35,
    title: "Pavampilla Kozhi 🥥",
    malayalamTitle: "പാവംപിള്ള കോഴി (Innocent Flirt)",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    gradient: "from-emerald-500 to-teal-400",
    description: "Beginner-level charmer! You only eye people during Thrissur Pooram or college fests. Harmless, cute, and easily gets shy.",
    quotes: [
      "\"Oru mini-vayanokki!\" — Eyeing only when tea & snacks are served.",
      "You glance for 1.2 seconds, get caught, and immediately inspect your own fingernails.",
      "Subtle smile detected, but heart rate remains 100% disciplined."
    ],
    signalsSummary: "Slight eyebrow twitch detected when tea is announced; 85% innocent baseline.",
    advice: "Keep the innocent smile; it's your biggest charm factor!"
  },
  {
    minScore: 36,
    maxScore: 55,
    title: "Part-Time Kozhi ⏳",
    malayalamTitle: "പാർട്ട് ടൈം കോഴി (Weekend Flirt)",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    gradient: "from-amber-500 to-yellow-400",
    description: "Seasonal charmer! Strictly 9 to 5 focused on work, but fully activated on Saturday evenings, weddings, and cafeteria visits.",
    quotes: [
      "\"Kalyana panthalil mathram active!\" — Wedding hall specialist.",
      "You claim you were just looking at the decorations, but we know the truth.",
      "Balanced Kozhi energy — controlled and strategic."
    ],
    signalsSummary: "Moderate smile symmetry with subtle 15° eyebrow curvature shift.",
    advice: "Don't get caught adjusting your hair every time a mirror appears!"
  },
  {
    minScore: 56,
    maxScore: 75,
    title: "Certified Vayanokki 👁️⚡",
    malayalamTitle: "സർട്ടിഫൈഡ് വായിനോക്കി (Pro Charmer)",
    badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/40",
    gradient: "from-rose-500 to-pink-500",
    description: "High-voltage charmer! Your eyes operate in 360-degree panoramic mode. You can spot a nice outfit from 500 meters away through rearview mirrors.",
    quotes: [
      "\"Ellam njan kaanunnund!\" — Full 360-degree radar vision.",
      "Your friends use your eyes as a rear-view mirror at tea stalls.",
      "Kozhi Radar: FULLY ACTIVE 📡"
    ],
    signalsSummary: "Smirk angle at optimal 24° charm incline; high eye spark intensity detected.",
    advice: "Wear sunglasses so people can't trace your 360° radar sweeps!"
  },
  {
    minScore: 76,
    maxScore: 90,
    title: "Ultra Mass Kozhi 🔥",
    malayalamTitle: "അൾട്രാ മാസ്സ് കോഴി (Scene Controlla)",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/40",
    gradient: "from-purple-600 to-rose-500",
    description: "Scene Controlla! When you walk into a room, slow-motion BGM automatically plays in the background. Maximum swagger and irresistible charm.",
    quotes: [
      "\"Ithra Kozhi aakan paadundo?\" — High alert level across Kerala!",
      "You don't eye people; people eye you eyeing them!",
      "Certified Scene Maker since 2018."
    ],
    signalsSummary: "Maximum cheek elevation + high eyebrow confidence coefficient.",
    advice: "Save some charm for the rest of humanity, boss!"
  },
  {
    minScore: 91,
    maxScore: 100,
    title: "Legendary Nattu Kozhi 👑🐔",
    malayalamTitle: "ലെജൻഡറി നാട്ടു കോഴി (The Ultimate Flirt)",
    badgeColor: "bg-amber-400/30 text-amber-300 border-amber-400/60",
    gradient: "from-amber-400 via-rose-500 to-purple-600",
    description: "THE ULTIMATE KERALA KOZHI LEGEND! Even real roosters come to you for flirting tutorials. Your charm breaks server limits!",
    quotes: [
      "\"Kozhikodum Kannurum vare fans!\" — Legend across north to south.",
      "The Kozhi Meter gauge exploded trying to measure your aura!",
      "Maximum Mass + Maximum Charm = Absolute Cinema!"
    ],
    signalsSummary: "Off-the-chart charm metrics. 100% golden ratio Kozhi smile geometry!",
    advice: "Frame this Kozhi certificate immediately!"
  }
];

export function getKozhiTier(score: number): KozhiTier {
  const rounded = Math.max(0, Math.min(100, Math.round(score)));
  return (
    KOZHI_TIERS.find((t) => rounded >= t.minScore && rounded <= t.maxScore) ||
    KOZHI_TIERS[KOZHI_TIERS.length - 1]
  );
}

export const FUNNY_LOADING_STEPS = [
  "Initializing Kozhi Radar v2.0... 📡",
  "Calibrating Vayanokki 360° lens... 👁️",
  "Measuring smile curvature & smirk angle... 😏",
  "Scanning eyebrow elevation index... 🤨",
  "Cross-referencing with Kerala Tea Shop database... ☕",
  "Calculating final Kozhi Score... 🐔"
];

export const SAMPLE_PHOTOS = [
  {
    name: "Happy Charmer",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    desc: "Confident & smiling"
  },
  {
    name: "Cool Dude",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    desc: "Casual & relaxed"
  },
  {
    name: "Serious Analyst",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    desc: "Focused & calm"
  }
];
