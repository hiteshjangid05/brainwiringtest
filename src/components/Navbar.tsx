import React from 'react';
import { Brain, HelpCircle, Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  onOpenDisclaimer: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  unansweredCount?: number;
  totalQuestions?: number;
  onOpenReview?: () => void;
  showReviewButton?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDisclaimer,
  soundEnabled,
  onToggleSound,
  unansweredCount = 0,
  totalQuestions = 30,
  onOpenReview,
  showReviewButton = false,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-400 p-0.5 shadow-md shadow-indigo-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950/40 rounded-[10px] flex items-center justify-center">
              <Brain className="w-5 h-5 text-indigo-300 animate-pulse-subtle" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white">
                BRAIN WIRING
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Official Test
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Allan &amp; Barbara Pease Assessment
            </p>
          </div>
        </div>

        {/* Right action controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {showReviewButton && onOpenReview && (
            <button
              onClick={onOpenReview}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                unansweredCount > 0
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
              }`}
              title="View all questions"
            >
              <span>Questions:</span>
              <span className="font-semibold">
                {totalQuestions - unansweredCount}/{totalQuestions}
              </span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Disable audio cues' : 'Enable audio cues'}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            title={soundEnabled ? 'Mute sounds' : 'Enable sound cues'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-indigo-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Disclaimer Trigger */}
          <button
            onClick={onOpenDisclaimer}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            title="Read Assessment Disclaimer"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">Disclaimer</span>
          </button>
        </div>
      </div>
    </header>
  );
};
