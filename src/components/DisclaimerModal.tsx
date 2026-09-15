import React, { useEffect, useRef } from 'react';
import { X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { MAIN_DISCLAIMER_TEXT } from '../data/profiles';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg glass-panel rounded-2xl p-6 sm:p-7 relative border border-slate-700/80 shadow-2xl animate-slide-up"
      >
        <button
          onClick={onClose}
          aria-label="Close disclaimer dialog"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h2 id="disclaimer-title" className="text-xl font-bold text-white">
            Assessment Disclaimer
          </h2>
        </div>

        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-200">
            {MAIN_DISCLAIMER_TEXT}
          </p>

          <div className="space-y-2.5 pt-2">
            <h3 className="text-xs uppercase font-semibold tracking-wider text-slate-400">
              Important Principles
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Self-Reflection Only:</strong> This test explores self-reported communication and problem-solving preferences.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Not a Diagnostic Tool:</strong> It is not a clinical, psychological, medical, or IQ assessment.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>100% Private:</strong> All questions and scores are evaluated locally in your browser. No personal data is stored on remote servers.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary w-full sm:w-auto text-sm py-2.5 px-5"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
