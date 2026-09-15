import { Gender, Profile, ScoreBreakdown, Question } from '../types/quiz';
import { PROFILES } from '../data/profiles';

/**
 * Calculates score according to Allan & Barbara Pease's book table:
 * For Males:
 *   A: 10 points
 *   B: 5 points
 *   C: -5 points
 * For Females:
 *   A: 15 points
 *   B: 5 points
 *   C: -5 points
 * Unanswered / blank: 5 points each
 */
export function calculateScore(
  answers: Record<number, string>,
  gender: Gender,
  questions: Question[]
): ScoreBreakdown {
  let countA = 0;
  let countB = 0;
  let countC = 0;
  let unansweredCount = 0;

  for (const q of questions) {
    const ans = answers[q.id]?.toLowerCase();
    if (ans === 'a') {
      countA++;
    } else if (ans === 'b') {
      countB++;
    } else if (ans === 'c') {
      countC++;
    } else {
      unansweredCount++;
    }
  }

  const aMultiplier = gender === 'female' ? 15 : 10;
  const bMultiplier = 5;
  const cMultiplier = -5;
  const unansweredMultiplier = 5;

  const pointsA = countA * aMultiplier;
  const pointsB = countB * bMultiplier;
  const pointsC = countC * cMultiplier;
  const unansweredPoints = unansweredCount * unansweredMultiplier;

  const totalScore = pointsA + pointsB + pointsC + unansweredPoints;

  return {
    countA,
    countB,
    countC,
    pointsA,
    pointsB,
    pointsC,
    unansweredPoints,
    totalScore,
    gender,
  };
}

/**
 * Maps a total score to one of the 5 profile tiers from the book.
 * < 0: Strongly Masculine
 * 0 – 149: Predominantly Masculine
 * 150 – 180: Balanced / Crossover
 * 181 – 300: Predominantly Feminine
 * > 300: Strongly Feminine
 */
export function getProfile(score: number): Profile {
  const profile = PROFILES.find((p) => score >= p.minScore && score <= p.maxScore);
  if (profile) return profile;

  if (score < 0) {
    return PROFILES[0]; // strongly_masculine
  }
  return PROFILES[PROFILES.length - 1]; // strongly_feminine
}

/**
 * Returns list of question IDs that have not been answered.
 */
export function getUnansweredQuestionIds(
  answers: Record<number, string>,
  questions: Question[]
): number[] {
  return questions.filter((q) => !answers[q.id]).map((q) => q.id);
}
