import React from 'react';
import { ArrowLeft, ArrowRight, AlertCircle, CheckCircle2, Grid } from 'lucide-react';

interface QuizNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  isAnswered: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  showValidationAlert: boolean;
  onDismissAlert: () => void;
  onOpenOverview: () => void;
}

export const QuizNavigation: React.FC<QuizNavigationProps> = ({
  currentIndex,
  totalQuestions,
  isAnswered,
  onPrevious,
  onNext,
  onSubmit,
  showValidationAlert,
  onDismissAlert,
  onOpenOverview,
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  const handleNextClick = () => {
    if (!isAnswered) {
      // Trigger validation alert
      onNext();
      return;
    }
    if (isLast) {
      onSubmit();
    } else {
      onNext();
    }
  };

  return (
    <div className="w-full mt-6 space-y-4">
      {/* Validation Alert Banner (FR-006 & FR-007) */}
      {showValidationAlert && (
        <div
          role="alert"
          aria-live="polite"
          className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm flex items-center justify-between gap-3 animate-fade-in shadow-lg shadow-amber-500/5"
        >
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Please select an answer to continue.</span>
          </div>
          <button
            onClick={onDismissAlert}
            className="text-xs text-amber-400 hover:text-white underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Buttons Row */}
      <div className="flex items-center justify-between gap-3">
        {/* Previous Button */}
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirst}
          className="btn-secondary px-4 sm:px-6 py-3 text-sm font-semibold flex items-center gap-2 disabled:invisible"
          title={isFirst ? 'No previous question' : 'Go to previous question'}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Center: Overview / Jump modal trigger */}
        <button
          type="button"
          onClick={onOpenOverview}
          className="px-3.5 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium flex items-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          title="View all 25 questions list"
        >
          <Grid className="w-3.5 h-3.5 text-indigo-400" />
          <span>All Questions</span>
        </button>

        {/* Next or Submit Button */}
        <button
          type="button"
          onClick={handleNextClick}
          className="btn-primary px-6 sm:px-8 py-3 text-sm sm:text-base font-bold flex items-center gap-2"
        >
          <span>{isLast ? 'Complete & View Results' : 'Next'}</span>
          {isLast ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};
