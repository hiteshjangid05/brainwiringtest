import React from 'react';
import {
  Clock,
  ShieldCheck,
  ArrowRight,
  Split,
  Layers,
  CheckCircle2,
  Users,
  Award,
  TrendingUp,
  BookOpen,
} from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onOpenDisclaimer: () => void;
  visits: number;
  completions: number;
  isRealtime?: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStart,
  onOpenDisclaimer,
  visits,
  completions,
  isRealtime = true,
}) => {
  const completionRate = Math.min(100, Math.round((completions / Math.max(1, visits)) * 100));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center text-center animate-fade-in">
      {/* Top pill badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-6 shadow-inner">
        <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
        <span>From 'Why Men Don't Listen &amp; Women Can't Read Maps'</span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-2xl leading-[1.15]">
        THE BRAIN-WIRING <br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-pink-300 bg-clip-text text-transparent">
          ASSESSMENT
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
        Discover your cognitive balance across masculine and feminine brain-wiring patterns, spatial ability, logic, and verbal empathy.
      </p>

      {/* Live Visitor & Completion Counter Card (Prominently displayed on Main Page) */}
      <div className="mt-7 w-full max-w-lg glass-panel rounded-2xl p-4 border border-indigo-500/30 shadow-xl shadow-indigo-500/5 bg-slate-900/80">
        <div className="flex items-center justify-between px-1 mb-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Real-Time Global Activity</span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {isRealtime ? '● Live Global Sync' : 'Live Counter'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {/* People Visited */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-indigo-400 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-[11px] font-semibold text-slate-400">Visits</span>
            </div>
            <span className="text-lg sm:text-xl font-extrabold text-white tabular-nums">
              {visits.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">People Visited</span>
          </div>

          {/* Completed Tests */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
              <Award className="w-4 h-4" />
              <span className="text-[11px] font-semibold text-slate-400">Completed</span>
            </div>
            <span className="text-lg sm:text-xl font-extrabold text-emerald-400 tabular-nums">
              {completions.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">Tests Finished</span>
          </div>

          {/* Completion Rate */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-sky-400 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-[11px] font-semibold text-slate-400">Finished</span>
            </div>
            <span className="text-lg sm:text-xl font-extrabold text-sky-300 tabular-nums">
              {completionRate}%
            </span>
            <span className="text-[10px] text-slate-500 font-medium">Completion Rate</span>
          </div>
        </div>
      </div>

      {/* Primary CTA */}
      <div className="w-full max-w-sm mt-7">
        <button
          onClick={onStart}
          className="btn-primary w-full text-base py-4 px-8 text-white font-bold tracking-wide shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/40 group"
        >
          <span>START TEST</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Key Metrics Chips */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 my-6 w-full max-w-lg">
        <div className="glass-panel p-3.5 sm:p-4 rounded-2xl flex flex-col items-center justify-center border-slate-800/80">
          <Layers className="w-5 h-5 text-indigo-400 mb-1.5" />
          <span className="text-base sm:text-lg font-bold text-white">30</span>
          <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Original Questions</span>
        </div>

        <div className="glass-panel p-3.5 sm:p-4 rounded-2xl flex flex-col items-center justify-center border-slate-800/80">
          <Clock className="w-5 h-5 text-sky-400 mb-1.5" />
          <span className="text-base sm:text-lg font-bold text-white">5–7</span>
          <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Minutes</span>
        </div>

        <div className="glass-panel p-3.5 sm:p-4 rounded-2xl flex flex-col items-center justify-center border-slate-800/80">
          <ShieldCheck className="w-5 h-5 text-emerald-400 mb-1.5" />
          <span className="text-base sm:text-lg font-bold text-white">100%</span>
          <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Anonymous</span>
        </div>
      </div>

      {/* Dimensions Preview Banner */}
      <div className="mt-4 w-full max-w-2xl glass-panel rounded-2xl p-5 sm:p-6 text-left border-slate-800/90">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          <Split className="w-4 h-4 text-indigo-400" />
          <span>Measured Spectrum &amp; Typical Ranges</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/60">
            <div className="font-bold text-sm text-sky-300 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              Masculine Brain Wiring (&lt;150 pts)
            </div>
            <p className="text-slate-400 leading-relaxed">
              Spatial orientation, 3D mental rotation, target tracking, linear focus, and task-driven systematic logic. Most males score 0–180.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/60">
            <div className="font-bold text-sm text-pink-300 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-pink-400" />
              Feminine Brain Wiring (&gt;180 pts)
            </div>
            <p className="text-slate-400 leading-relaxed">
              Verbal fluency, interpersonal empathy, multi-channel perception, and relational intuition. Most females score 150–300.
            </p>
          </div>
        </div>

        {/* Overlap Zone Banner */}
        <div className="mt-3 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-emerald-300">Overlap Zone (150–180 pts):</span>
            <span className="text-slate-400 hidden sm:inline">Balanced thinkers who bridge both logic and empathy.</span>
          </div>
          <span className="font-bold text-emerald-400 font-mono text-xs">Shared Range</span>
        </div>

        {/* Feature Checkmarks */}
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> No registration required
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Official book scoring tables
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Instant shareable result
          </span>
        </div>
      </div>

      {/* Brief disclaimer footer on landing */}
      <div className="mt-8 text-xs text-slate-500 max-w-lg leading-relaxed">
        <span>From 'Why Men Don't Listen &amp; Women Can't Read Maps' by Allan &amp; Barbara Pease.</span>{' '}
        <button
          onClick={onOpenDisclaimer}
          className="underline hover:text-slate-300 transition-colors"
        >
          Read full disclaimer
        </button>
      </div>
    </div>
  );
};
