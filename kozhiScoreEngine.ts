import { FaceSignals } from './faceDetector';
import { getKozhiTier, KozhiTier } from '../data/kozhiTitles';

export interface KozhiAnalysisResult {
  score: number;
  tier: KozhiTier;
  signals: FaceSignals;
  funnyQuote: string;
  timestamp: string;
  checksum: string;
}

export function calculateKozhiScore(signals: FaceSignals, imageSourceId?: string): KozhiAnalysisResult {
  // Extract facial signal influence (scaled between 0 - 100)
  const smileFactor = (signals.smileWidth || 50) * 0.35;
  const browFactor = (signals.eyebrowRaise || 50) * 0.25;
  const eyeFactor = (signals.eyeOpenness || 50) * 0.20;
  const angleFactor = (signals.faceAngle || 40) * 0.10;

  // Add random flavor seed (10%)
  const seedString = imageSourceId || `${Date.now()}-${signals.smileWidth}-${signals.eyebrowRaise}`;
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = (hash << 5) - hash + seedString.charCodeAt(i);
    hash |= 0;
  }
  const randomSeed = (Math.abs(hash) % 25); // 0 to 24

  // Calculated score
  const rawScore = smileFactor + browFactor + eyeFactor + angleFactor + randomSeed;
  const score = Math.min(100, Math.max(5, Math.round(rawScore)));

  // Get matching tier
  const tier = getKozhiTier(score);

  // Pick a random funny quote from the tier
  const quoteIndex = Math.abs(hash) % tier.quotes.length;
  const funnyQuote = tier.quotes[quoteIndex];

  // Generate short verification checksum for fun
  const checksum = `KZ-${Math.abs(hash).toString(36).toUpperCase().slice(0, 6)}`;

  return {
    score,
    tier,
    signals,
    funnyQuote,
    timestamp: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }),
    checksum
  };
}
