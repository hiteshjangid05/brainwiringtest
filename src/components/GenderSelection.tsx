import React from 'react';
import { Gender } from '../types/quiz';
import { User, ArrowRight, ArrowLeft, Info, Check } from 'lucide-react';

interface GenderSelectionProps {
  selectedGender: Gender | null;
  onSelectGender: (gender: Gender) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const GenderSelection: React.FC<GenderSelectionProps> = ({
  selectedGender,
  onSelectGender,
  onContinue,
  onBack,
}) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 sm:py-14 animate-fade-in">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Introduction</span>
      </button>

      <div className="glass-panel rounded-3xl p-6 sm:p-9 border border-slate-800/90 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-500/20">
            <User className="w-3.5 h-3.5" />
            <span>Official Scoring Selection</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Select Your Gender
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Used to apply the corresponding scoring table from Allan &amp; Barbara Pease's assessment.
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6" role="radiogroup" aria-label="Select gender">
          {/* Female Option */}
          <button
            type="button"
            role="radio"
            aria-checked={selectedGender === 'female'}
            onClick={() => onSelectGender('female')}
            className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between relative group ${
              selectedGender === 'female'
                ? 'bg-pink-950/30 border-pink-500 shadow-lg shadow-pink-500/10 ring-2 ring-pink-500/50'
                : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-base font-bold text-white group-hover:text-pink-200 transition-colors">
                Female
              </span>
              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                  selectedGender === 'female'
                    ? 'border-pink-500 bg-pink-600 text-white'
                    : 'border-slate-700 bg-slate-900 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Female scoring table: <br />
              <span className="text-slate-300 font-mono font-semibold">A = 15, B = 5, C = -5 pts</span>
            </p>
          </button>

          {/* Male Option */}
          <button
            type="button"
            role="radio"
            aria-checked={selectedGender === 'male'}
            onClick={() => onSelectGender('male')}
            className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between relative group ${
              selectedGender === 'male'
                ? 'bg-sky-950/30 border-sky-500 shadow-lg shadow-sky-500/10 ring-2 ring-sky-500/50'
                : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-base font-bold text-white group-hover:text-sky-200 transition-colors">
                Male
              </span>
              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                  selectedGender === 'male'
                    ? 'border-sky-500 bg-sky-600 text-white'
                    : 'border-slate-700 bg-slate-900 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Male scoring table: <br />
              <span className="text-slate-300 font-mono font-semibold">A = 10, B = 5, C = -5 pts</span>
            </p>
          </button>
        </div>

        {/* Info Box */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3 mb-8 text-xs text-slate-300 leading-relaxed">
          <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-slate-200 mb-0.5">Scoring Reference Note</p>
            <p className="text-slate-400">
              Both tables score identical questions with calibrated hormonal/developmental baselines formulated in the original book. Unanswered questions award 5 points.
            </p>
          </div>
        </div>

        {/* Continue CTA */}
        <button
          onClick={onContinue}
          disabled={!selectedGender}
          className="btn-primary w-full text-base py-3.5 font-bold tracking-wide"
        >
          <span>Begin Assessment</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
