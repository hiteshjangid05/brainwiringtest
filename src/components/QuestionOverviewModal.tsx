import React, { useEffect } from 'react';
import { X, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { Question } from '../types/quiz';

interface QuestionOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  answers: Record<number, string>;
  currentIndex: number;
  onSelectQuestion: (index: number) => void;
  attemptedSubmit?: boolean;
}

export const QuestionOverviewModal: React.FC<QuestionOverviewModalProps> = ({
  isOpen,
  onClose,
  questions,
  answers,
  currentIndex,
  onSelectQuestion,
  attemptedSubmit = false,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="overview-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-xl glass-panel rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-2xl relative animate-slide-up max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 id="overview-modal-title" className="text-lg sm:text-xl font-bold text-white">
              Questions Overview
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {answeredCount} of {questions.length} completed
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close overview"
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FR-007 Unanswered Notice */}
        {unansweredCount > 0 && (
          <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              {attemptedSubmit ? (
                <strong>You have {unansweredCount} unanswered question{unansweredCount > 1 ? 's' : ''}. Please answer all questions to complete the test.</strong>
              ) : (
                <span>You have {unansweredCount} unanswered question{unansweredCount > 1 ? 's' : ''}. Tap any item below to jump directly to it.</span>
              )}
            </span>
          </div>
        )}

        {/* Question Grid */}
        <div className="mt-5 overflow-y-auto pr-1 flex-1 space-y-2">
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-2.5">
            {questions.map((q, idx) => {
              const isAnswered = !!answers[q.id];
              const isCurrent = idx === currentIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    onSelectQuestion(idx);
                    onClose();
                  }}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center relative focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                    isCurrent
                      ? 'border-indigo-400 bg-indigo-600/20 ring-1 ring-indigo-500 text-white font-bold'
                      : isAnswered
                      ? 'border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300'
                      : 'border-slate-800 bg-slate-950/40 hover:bg-slate-900 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-semibold">Q{q.id}</span>
                  <div className="mt-1">
                    {isAnswered ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Answered
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600" /> Unanswered
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" /> Current
            </span>
          </div>

          <button
            onClick={onClose}
            className="btn-secondary py-1.5 px-4 text-xs font-medium"
          >
            Resume Test
          </button>
        </div>
      </div>
    </div>
  );
};
