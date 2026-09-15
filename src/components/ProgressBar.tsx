import React from 'react';
import { Tag } from 'lucide-react';

interface ProgressBarProps {
  currentIndex: number; // 0-based
  totalQuestions: number;
  categoryLabel: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentIndex,
  totalQuestions,
  categoryLabel,
}) => {
  const currentNumber = currentIndex + 1;
  const progressPercent = Math.round((currentNumber / totalQuestions) * 100);

  return (
    <div className="w-full mb-6 sm:mb-8">
      {/* Top row: Question counter & category label & percentage */}
      <div className="flex items-center justify-between gap-2 mb-2.5 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="font-extrabold tracking-wide text-white">
            QUESTION {String(currentNumber).padStart(2, '0')}
          </span>
          <span className="text-slate-500 font-medium">OF {totalQuestions}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] sm:text-xs font-medium text-slate-300">
            <Tag className="w-3 h-3 text-indigo-400" />
            <span>{categoryLabel}</span>
          </span>
          <span className="font-bold text-indigo-400 text-xs sm:text-sm tabular-nums">
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Progress track */}
      <div
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Assessment progress"
        className="w-full h-2 bg-slate-900/90 rounded-full overflow-hidden border border-slate-800/80 p-0.5"
      >
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-400 rounded-full transition-all duration-300 ease-out shadow-sm shadow-indigo-500/50"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
