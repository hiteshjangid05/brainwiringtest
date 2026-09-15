export interface ShareResultOptions {
  score: number;
  profileTitle: string;
}

export interface ShareOutcome {
  success: boolean;
  method: 'web_share' | 'clipboard' | 'failed';
  message: string;
}

export async function shareResult(options: ShareResultOptions): Promise<ShareOutcome> {
  const shareText = `My Brain-Wiring Test score is ${options.score} points.\nProfile: ${options.profileTitle}.\nDiscover your masculine vs. feminine brain wiring tendencies!`;
  const shareUrl = window.location.href;

  // 1. Attempt Native Web Share API if supported
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'My Brain Wiring Test Result',
        text: shareText,
        url: shareUrl,
      });
      return {
        success: true,
        method: 'web_share',
        message: 'Shared successfully!',
      };
    } catch (err: unknown) {
      // If user aborted/cancelled the native share sheet, don't fallback to clipboard error
      if (err instanceof Error && err.name === 'AbortError') {
        return {
          success: false,
          method: 'web_share',
          message: 'Share cancelled.',
        };
      }
      // Otherwise fallback to clipboard
    }
  }

  // 2. Clipboard fallback
  try {
    const fullClipboardText = `${shareText}\n${shareUrl}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(fullClipboardText);
    } else {
      // Legacy textarea fallback
      const textArea = document.createElement('textarea');
      textArea.value = fullClipboardText;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    return {
      success: true,
      method: 'clipboard',
      message: 'Result copied to clipboard!',
    };
  } catch {
    return {
      success: false,
      method: 'failed',
      message: 'Unable to share automatically. Please copy the URL manually.',
    };
  }
}
