export type QuestionCategory =
  | 'spatial_navigation'
  | 'multitasking_focus'
  | 'communication_empathy'
  | 'verbal_sensory'
  | 'logic_intuition'
  | 'social_relationships'
  | 'motor_rhythm';

export interface Option {
  id: 'a' | 'b' | 'c';
  text: string;
}

export interface Question {
  id: number;
  category: QuestionCategory;
  categoryLabel: string;
  text: string;
  scenarioContext?: string;
  options: Option[];
}

export type Gender = 'male' | 'female';

export type ProfileClassification =
  | 'strongly_masculine'
  | 'masculine'
  | 'balanced_crossover'
  | 'feminine'
  | 'strongly_feminine';

export interface Profile {
  id: ProfileClassification;
  title: string;
  subtitle: string;
  minScore: number;
  maxScore: number;
  summary: string;
  detailedInterpretation: string;
  strongestTendencies: string[];
  balancedAreas: string[];
  growthPointers: string[];
}

export interface ScoreBreakdown {
  countA: number;
  countB: number;
  countC: number;
  pointsA: number;
  pointsB: number;
  pointsC: number;
  unansweredPoints: number;
  totalScore: number;
  gender: Gender;
}

export type AppStep = 'landing' | 'gender' | 'quiz' | 'result';

export interface QuizState {
  currentStep: AppStep;
  gender: Gender | null;
  currentQuestionIndex: number; // 0 to 29
  answers: Record<number, string>; // questionId -> optionId ('a' | 'b' | 'c')
  completed: boolean;
  score: number | null;
}
