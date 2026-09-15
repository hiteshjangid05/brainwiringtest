import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Scale,
  Brain,
  Calculator,
  Info,
  Lightbulb,
} from 'lucide-react';
import { Profile, ScoreBreakdown } from '../types/quiz';
import { ScoreSpectrum } from './ScoreSpectrum';
import { ShareButton } from './ShareButton';
import { MAIN_DISCLAIMER_TEXT, TEST_INFO } from '../data/profiles';

interface ResultPageProps {
  score: number;
  breakdown: ScoreBreakdown;
  profile: Profile;
  onRetake: () => void;
  onOpenDisclaimer: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({
  score,
  breakdown,
  profile,
  onRetake,
  onOpenDisclaimer,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Trigger confetti and count-up animation on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#10b981', '#f472b6', '#6366f1'],
      });
    } catch {
      // Canvas unsupported fallback
    }

    const duration = 1000; // ms
    const steps = 30;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const currentVal = Math.round(score * (1 - (1 - progress) * (1 - progress)));
      setAnimatedScore(currentVal);

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedScore(score);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  const aMultiplier = breakdown.gender === 'female' ? 15 : 10;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 animate-fade-in space-y-8">
      {/* Top Header Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800/90 shadow-2xl text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Test Completed</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-medium">
            <span>Scoring Table:</span>
            <span className="text-slate-200 capitalize font-semibold">{breakdown.gender} Table</span>
          </div>
        </div>

        {/* Score Number Display */}
        <div className="flex flex-col items-center justify-center mb-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-1">
            Total Brain-Wiring Points
          </span>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-6xl sm:text-7xl font-extrabold tracking-tight text-white tabular-nums">
              {animatedScore}
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-slate-500">POINTS</span>
          </div>
          <span className="text-xs text-slate-400 mt-1 font-medium">
            {TEST_INFO.bookSource}
          </span>
        </div>

        {/* Profile Title */}
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight uppercase text-white mt-4 mb-2">
          {profile.title}
        </h1>

        <p className="text-sm sm:text-base text-indigo-300 font-medium max-w-xl mx-auto mb-6">
          {profile.subtitle}
        </p>

        {/* Visual Spectrum Slider */}
        <ScoreSpectrum score={score} profileTitle={profile.title} />

        {/* Actions Row */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-center gap-3">
          <ShareButton score={score} profileTitle={profile.title} />
          <button
            type="button"
            onClick={onRetake}
            className="btn-secondary w-full sm:w-auto py-3.5 px-6 font-bold flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>TAKE TEST AGAIN</span>
          </button>
        </div>
      </div>

      {/* Book Exact Calculation Breakdown Table */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/90 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-indigo-400" />
            <span>Official Scoring Table Breakdown</span>
          </div>
          <span className="text-xs text-indigo-300 font-semibold capitalize">
            {breakdown.gender} Scoring Formula
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* A's */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-xs font-semibold text-slate-400 block mb-1">
              Response A's (Feminine-oriented)
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-mono text-slate-300">
                {breakdown.countA} × {aMultiplier} pts
              </span>
              <span className="text-lg font-bold text-pink-400">
                +{breakdown.pointsA}
              </span>
            </div>
          </div>

          {/* B's */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-xs font-semibold text-slate-400 block mb-1">
              Response B's (Neutral / Crossover)
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-mono text-slate-300">
                {breakdown.countB} × 5 pts
              </span>
              <span className="text-lg font-bold text-emerald-400">
                +{breakdown.pointsB}
              </span>
            </div>
          </div>

          {/* C's */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-xs font-semibold text-slate-400 block mb-1">
              Response C's (Masculine-oriented)
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-mono text-slate-300">
                {breakdown.countC} × (-5) pts
              </span>
              <span className="text-lg font-bold text-sky-400">
                {breakdown.pointsC}
              </span>
            </div>
          </div>
        </div>

        {breakdown.unansweredPoints > 0 && (
          <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Blank / Unanswered Questions (+5 pts each):</span>
            <span className="font-mono text-slate-200">+{breakdown.unansweredPoints} pts</span>
          </div>
        )}

        <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 flex items-center justify-between text-xs sm:text-sm">
          <span className="text-slate-300 font-medium">
            Total Points Calculation:
          </span>
          <span className="text-base font-extrabold text-white font-mono">
            {breakdown.pointsA} + {breakdown.pointsB} + ({breakdown.pointsC}) {breakdown.unansweredPoints > 0 ? `+ ${breakdown.unansweredPoints}` : ''} = {breakdown.totalScore} pts
          </span>
        </div>
      </div>

      {/* Summary & Interpretation Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/90 shadow-xl space-y-6">
        <div>
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
            <Brain className="w-4 h-4" />
            <span>Profile Summary</span>
          </div>
          <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
            {profile.summary}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800/80">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Detailed Cognitive Analysis
          </h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {profile.detailedInterpretation}
          </p>
        </div>
      </div>

      {/* Tendencies & Balanced Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strongest Tendencies */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800/90 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
              <CheckCircle2 className="w-4 h-4" />
              <span>Core Strengths &amp; Tendencies</span>
            </div>
            <ul className="space-y-3">
              {profile.strongestTendencies.map((tendency, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
                  <span>{tendency}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Balanced Areas */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800/90 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 mb-4">
              <Scale className="w-4 h-4" />
              <span>Complementary Perspectives</span>
            </div>
            <ul className="space-y-3">
              {profile.balancedAreas.map((area, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-2" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {profile.growthPointers.length > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Growth Exploration</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {profile.growthPointers[0]}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Book Reference & Disclaimer Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3.5 text-xs text-slate-400 leading-relaxed">
        <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-slate-300 mb-1">Assessment Source &amp; Purpose</p>
          <p>{MAIN_DISCLAIMER_TEXT}</p>
          <div className="mt-2 flex gap-3">
            <button
              onClick={onOpenDisclaimer}
              className="text-indigo-400 hover:text-indigo-300 underline font-medium"
            >
              Read complete disclaimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
