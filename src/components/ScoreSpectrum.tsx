import React from 'react';

interface ScoreSpectrumProps {
  score: number;
  profileTitle: string;
}

export const ScoreSpectrum: React.FC<ScoreSpectrumProps> = ({
  score,
  profileTitle,
}) => {
  // Map score from -50..350 scale to 0..100% position on the track
  // -50 -> 0%, 150 -> 50%, 350 -> 100%
  // range is 400 points
  const rawPercentage = ((score - -50) / 400) * 100;
  const markerPercent = Math.max(3, Math.min(97, rawPercentage));

  return (
    <div
      role="region"
      aria-label={`Brain-wiring score: ${score} points, classification: ${profileTitle}`}
      className="w-full my-6 sm:my-8"
    >
      {/* Top Labels */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
        <div className="flex items-center gap-2 text-sky-400">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-sm shadow-sky-500/50" />
          <span>Masculine Wiring (&lt;150)</span>
        </div>
        <div className="text-emerald-400 hidden sm:block">
          <span>Overlap Zone (150–180)</span>
        </div>
        <div className="flex items-center gap-2 text-pink-400">
          <span>Feminine Wiring (&gt;180)</span>
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-sm shadow-pink-500/50" />
        </div>
      </div>

      {/* Track & Indicator */}
      <div className="relative pt-6 pb-2">
        {/* Gradient track */}
        <div className="h-4 w-full rounded-full overflow-hidden bg-slate-900 border border-slate-700/80 relative flex shadow-inner">
          <div
            className="w-full h-full"
            style={{
              background:
                'linear-gradient(to right, #0284c7 0%, #38bdf8 35%, #10b981 50%, #f472b6 75%, #ec4899 100%)',
            }}
          />
        </div>

        {/* Highlighted Crossover Zone (150 to 180 points) */}
        {/* 150 is ((150 - (-50))/400) = 50%, 180 is ((180 - (-50))/400) = 57.5% */}
        <div
          className="absolute top-6 h-4 border-x-2 border-emerald-300 bg-emerald-400/20 pointer-events-none"
          style={{ left: '50%', width: '7.5%' }}
          title="Balanced Crossover Zone (150–180 pts)"
        />

        {/* Animated User Marker Pin */}
        <div
          className="absolute top-0 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-1000 ease-out"
          style={{ left: `${markerPercent}%` }}
        >
          {/* Badge tooltip above pin */}
          <div className="px-2.5 py-1 rounded-lg bg-white text-slate-950 font-black text-xs sm:text-sm shadow-xl flex items-center gap-1 border border-indigo-200 animate-bounce">
            <span>{score}</span>
            <span className="text-[10px] text-slate-500 font-bold">PTS</span>
          </div>

          {/* Pin pointer triangle */}
          <div className="w-0 h-0 border-x-4 border-x-transparent border-t-6 border-t-white" />

          {/* Indicator dot on the bar */}
          <div className="w-4 h-4 rounded-full bg-white border-2 border-indigo-600 shadow-md shadow-black/80 mt-1" />
        </div>
      </div>

      {/* Scale tick marks */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
        <span>-50</span>
        <span className="text-sky-400 font-semibold">0</span>
        <span className="text-emerald-400 font-bold">150</span>
        <span className="text-emerald-400 font-bold">180</span>
        <span className="text-pink-400 font-semibold">300</span>
        <span>350+</span>
      </div>

      {/* Normative comparison boxes */}
      <div className="mt-4 grid grid-cols-2 gap-3 text-left text-xs">
        <div className="p-2.5 rounded-xl bg-sky-950/30 border border-sky-800/40">
          <span className="text-[11px] font-bold text-sky-300 block">Most Males: 0 – 180 pts</span>
          <span className="text-[10px] text-slate-400">Predominantly logical, spatial &amp; task-oriented thinking</span>
        </div>
        <div className="p-2.5 rounded-xl bg-pink-950/30 border border-pink-800/40">
          <span className="text-[11px] font-bold text-pink-300 block">Most Females: 150 – 300 pts</span>
          <span className="text-[10px] text-slate-400">Predominantly empathetic, verbal &amp; multi-tracked thinking</span>
        </div>
      </div>
    </div>
  );
};
