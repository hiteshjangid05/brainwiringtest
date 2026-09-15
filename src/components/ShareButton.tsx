import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { shareResult } from '../utils/sharing';

interface ShareButtonProps {
  score: number;
  profileTitle: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  score,
  profileTitle,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const outcome = await shareResult({ score, profileTitle });
    if (outcome.success) {
      setCopied(true);
      setToastMessage(outcome.method === 'web_share' ? 'Shared successfully!' : 'Result copied!');
      setTimeout(() => {
        setCopied(false);
        setToastMessage(null);
      }, 3000);
    } else {
      setToastMessage(outcome.message);
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  return (
    <div className="relative inline-block w-full sm:w-auto">
      <button
        type="button"
        onClick={handleShare}
        className="btn-primary w-full sm:w-auto py-3.5 px-6 font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-600/30"
      >
        {copied ? (
          <Check className="w-5 h-5 text-emerald-300" />
        ) : (
          <Share2 className="w-5 h-5" />
        )}
        <span>{copied ? 'Result Copied!' : 'SHARE MY RESULT'}</span>
      </button>

      {/* Floating feedback toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs shadow-xl animate-fade-in flex items-center gap-1.5 z-20"
        >
          <Check className="w-3.5 h-3.5" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
