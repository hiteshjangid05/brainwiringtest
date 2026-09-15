import React, { useEffect } from 'react';
import { Question } from '../types/quiz';
import { Check } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  selectedOptionId: string | undefined;
  onSelectOption: (optionId: string) => void;
  soundEnabled?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOptionId,
  onSelectOption,
  soundEnabled = true,
}) => {
  // Optional audio chime using Web Audio API (no external asset download needed!)
  const playClickAudio = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch {
      // Audio context might be restricted before interaction; ignore
    }
  };

  const handleSelect = (optionId: string) => {
    playClickAudio();
    onSelectOption(optionId);
  };

  // Keyboard shortcut listener: keys 1 to 4 for direct option selection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input/textarea (none in quiz, but good practice)
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= question.options.length) {
        e.preventDefault();
        const targetOption = question.options[num - 1];
        if (targetOption) {
          handleSelect(targetOption.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question, soundEnabled]);

  return (
    <div className="w-full">
      {/* Question Card Container */}
      <div className="glass-panel rounded-3xl p-5 sm:p-8 border-slate-800/90 shadow-2xl relative overflow-hidden transition-all">
        {/* Scenario Sub-context if present */}
        {question.scenarioContext && (
          <div className="text-xs uppercase font-bold tracking-wider text-indigo-400/90 mb-2">
            {question.scenarioContext}
          </div>
        )}

        {/* Question Text */}
        <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight mb-6 sm:mb-8">
          {question.text}
        </h2>

        {/* Answer Options Radio Group */}
        <div
          role="radiogroup"
          aria-label={`Options for question ${question.id}`}
          className="space-y-3 sm:space-y-3.5"
        >
          {question.options.map((option, idx) => {
            const isSelected = selectedOptionId === option.id;
            const letterLabel = String.fromCharCode(65 + idx); // 'A', 'B', 'C', 'D'

            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => handleSelect(option.id)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 sm:gap-4 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                  isSelected
                    ? 'bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500/60'
                    : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {/* Letter pill badge */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-sm shadow-indigo-600/40'
                      : 'bg-slate-900 border-slate-800 text-slate-400 group-hover:border-slate-700 group-hover:text-slate-200'
                  }`}
                >
                  {letterLabel}
                </div>

                {/* Option Text */}
                <div className="flex-1 pr-2 pt-0.5">
                  <p
                    className={`text-sm sm:text-base leading-relaxed transition-colors ${
                      isSelected
                        ? 'text-white font-medium'
                        : 'text-slate-300 group-hover:text-slate-100'
                    }`}
                  >
                    {option.text}
                  </p>
                </div>

                {/* Radio selection check circle */}
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all mt-1 ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-600 text-white scale-100'
                      : 'border-slate-700 bg-slate-900 text-transparent opacity-40 group-hover:opacity-75'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Keyboard hint */}
        <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
          <span className="hidden sm:inline">
            Tip: You can press numeric keys <span className="text-slate-400 font-mono font-semibold">1–{question.options.length}</span> on your keyboard to select an answer.
          </span>
          <span className="text-slate-400 font-medium ml-auto">
            {selectedOptionId ? '✓ Answer registered' : 'Select an option to continue'}
          </span>
        </div>
      </div>
    </div>
  );
};
