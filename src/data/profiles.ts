import { Profile } from '../types/quiz';

export const PROFILES: Profile[] = [
  {
    id: 'strongly_masculine',
    title: 'Strongly Masculine Brain Wiring',
    subtitle: 'Extreme spatial, mechanical & systemic analytical focus',
    minScore: -150,
    maxScore: -1,
    summary:
      'Your responses place you in the strongly masculine brain-wiring range. You demonstrate high spatial orientation, mechanical logic, and single-minded task discipline.',
    detailedInterpretation:
      'People with this score profile operate with intense logical rigor, structural visualization, and direct problem solving. You naturally excel at mental rotation, reading maps, technical diagnosis, and navigating by absolute coordinates. In social or communicative interactions, you prefer unambiguous facts, data, and concise problem resolution rather than prolonged emotional processing.',
    strongestTendencies: [
      'Effortless 3D mental mapping, coordinate orientation, and reverse parking',
      'Direct, concise communication focused on immediate solutions and facts',
      'High single-task concentration with minimal distraction from background chatter',
      'Independent troubleshooting of mechanical, technical, or logical problems',
    ],
    balancedAreas: [
      'Deep technical mastery that pairs well with clear written documentation',
      'Objective, unemotional decision-making in high-pressure logistical scenarios',
    ],
    growthPointers: [
      'Allow extra time for validating others’ emotional feelings before proposing rational fixes.',
      'Practice tuning into subtle vocal tones and non-verbal body language during sensitive talks.',
    ],
  },
  {
    id: 'masculine',
    title: 'Predominantly Masculine Brain Wiring',
    subtitle: 'Logical, analytical & spatial focus (Typical Male Range: 0–180)',
    minScore: 0,
    maxScore: 149,
    summary:
      'Your score falls in the predominantly masculine brain-wiring spectrum (the standard range for most males is between 0 and 180). Your thought patterns lean toward logic, spatial reasoning, and disciplined focus.',
    detailedInterpretation:
      'Brains wired for masculine thinking excel at spatial tasks, navigation, target orientation, and organizing information into distinct compartments. The closer your score is to 0, the stronger this tendency is. You tend to be disciplined, goal-driven, and pragmatic. When faced with dilemmas, your instinct is to dissect the situation into practical components and find actionable solutions rather than discussing feelings at length.',
    strongestTendencies: [
      'Strong spatial reasoning, map reading, and directional intuition',
      'Systematic problem-solving focused on root causes and practical outcomes',
      'Comfort with data, statistics, and structured linear planning',
      'Clear, unembellished verbal explanations and task orientation',
    ],
    balancedAreas: [
      'Effective balance between independent deep analysis and functional team collaboration',
      'Appreciation for straightforward communication without hidden undertones',
    ],
    growthPointers: [
      'Remember that active listening and emotional solidarity are often more valued than immediate advice.',
      'Experiment with multi-tasking and contextual conversational nuance in social settings.',
    ],
  },
  {
    id: 'balanced_crossover',
    title: 'Balanced / Crossover Brain Wiring',
    subtitle: 'The Shared Overlap Zone (150–180 Points)',
    minScore: 150,
    maxScore: 180,
    summary:
      'Your score falls within the crossover zone between 150 and 180 points. This reveals a balanced brain wiring that effortlessly bridges masculine logic and feminine intuition.',
    detailedInterpretation:
      'People scoring in this overlap range exhibit tremendous cognitive flexibility. You do not display a rigid bias toward either extreme masculine or feminine processing. You can think logically and visualize spatial problems while simultaneously remaining sensitive to interpersonal empathy, emotional cues, and verbal nuances. This balanced wiring makes individuals outstanding communicators, team leaders, and natural mediators between men and women.',
    strongestTendencies: [
      'Bilingual cognitive agility: translating technical logic into empathetic language',
      'Comfort with both spatial navigation and communicative relationship building',
      'Ability to see both sides of an issue without getting locked into one perspective',
      'Natural diplomacy, mediation, and intuitive understanding of group dynamics',
    ],
    balancedAreas: [
      'Equally at home with analytical frameworks and rich personal narratives',
      'Flexible focus: capable of both deep single-task focus and fluid multitasking',
    ],
    growthPointers: [
      'Harness your unique ability to bridge communication gaps in multidisciplinary teams.',
      'Be decisive when situations require choosing between strict analytical logic and interpersonal harmony.',
    ],
  },
  {
    id: 'feminine',
    title: 'Predominantly Feminine Brain Wiring',
    subtitle: 'Verbal fluency, empathy & multi-tracked awareness (Typical Female Range: 150–300)',
    minScore: 181,
    maxScore: 300,
    summary:
      'Your score falls into the predominantly feminine brain-wiring range (typical for most females between 150 and 300). You demonstrate rich verbal fluency, acute social empathy, and multi-tracked sensory perception.',
    detailedInterpretation:
      'Brains wired for feminine thinking feature strong cross-hemisphere integration. You naturally register subtle changes in vocal inflection, facial expressions, and body language. You thrive in environments involving collaboration, communication, and interpersonal harmony. You can seamlessly track multiple conversational threads, cook while on the phone, and remember people’s faces and emotional stories vividly.',
    strongestTendencies: [
      'High verbal agility, rich vocabulary, and expressive communication',
      'Acute social radar: detecting unexpressed emotions, tensions, and unspoken feelings',
      'Multi-tracked attention: fluidly managing multiple ongoing streams of information',
      'Associative memory centered on relationships, shared experiences, and faces',
    ],
    balancedAreas: [
      'Natural talent for building trust, consensus, and harmonious team environments',
      'Intuitive decision-making that synthesizes gut feelings with available context',
    ],
    growthPointers: [
      'When reviewing technical maps or blueprints, take a moment to orient without rushing.',
      'In high-conflict debates, leaning into structured data can help persuade analytical colleagues.',
    ],
  },
  {
    id: 'strongly_feminine',
    title: 'Strongly Feminine Brain Wiring',
    subtitle: 'Exceptional verbal expression, empathy & intuitive perception (> 300 Points)',
    minScore: 301,
    maxScore: 450,
    summary:
      'Your score is above 300 points, indicating an exceptionally pronounced feminine brain-wiring profile. You possess extraordinary emotional intuition, interpersonal resonance, and communicative power.',
    detailedInterpretation:
      'Individuals scoring above 300 points possess profound empathy and social intelligence. You easily pick up on micro-expressions, subtle relationship dynamics, and vocal nuances that others miss entirely. Your approach to life is deeply relational, prioritizing community, harmony, and mutual support. You express thoughts with vivid language and are a gifted listener, counselor, and collaborator.',
    strongestTendencies: [
      'Profound emotional intuition and rapid detection of social undercurrents',
      'Empathetic listening and natural ability to comfort and counsel others',
      'Fluid linguistic agility, storytelling, and poetic or expressive writing',
      'Comprehensive multi-channel perception of room atmosphere and human dynamics',
    ],
    balancedAreas: [
      'Exceptional relationship-building skills that create deep, lasting bonds',
      'Holistic worldview that values long-term happiness and collective harmony',
    ],
    growthPointers: [
      'Protect your emotional energy by setting clear personal boundaries with demanding people.',
      'Practice step-by-step mechanical isolation when troubleshooting technical or spatial challenges.',
    ],
  },
];

export const TEST_INFO = {
  title: 'The Brain-Wiring Test',
  bookSource: "From 'Why Men Don't Listen & Women Can't Read Maps' by Allan & Barbara Pease",
  scoringRules: {
    male: "Males: A = 10 pts, B = 5 pts, C = -5 pts",
    female: "Females: A = 15 pts, B = 5 pts, C = -5 pts",
    unanswered: "Blank / Unanswered = 5 pts",
  },
  maleTypicalRange: '0 – 180 points',
  femaleTypicalRange: '150 – 300 points',
  overlapZone: '150 – 180 points (Balanced / Crossover)',
};

export const MAIN_DISCLAIMER_TEXT =
  "This assessment implements the Brain-Wiring Test from 'Why Men Don't Listen & Women Can't Read Maps' by Allan & Barbara Pease. It is designed for self-reflection and relationship insight. It reflects general behavioral and cognitive tendencies, and should not be used as a medical, psychological, or clinical diagnostic tool.";
