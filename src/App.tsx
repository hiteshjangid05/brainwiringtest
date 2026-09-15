import React, { useState, useEffect } from 'react';
import { QUESTIONS } from './data/questions';
import { AppStep, Gender } from './types/quiz';
import {
  calculateScore,
  getProfile,
  getUnansweredQuestionIds,
} from './utils/scoring';
import {
  recordRealtimeVisit,
  recordRealtimeCompletion,
  fetchLiveAnalytics,
  getLocalCachedAnalytics,
  AnalyticsData,
} from './utils/analytics';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { GenderSelection } from './components/GenderSelection';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { QuizNavigation } from './components/QuizNavigation';
import { QuestionOverviewModal } from './components/QuestionOverviewModal';
import { ResultPage } from './components/ResultPage';
import { DisclaimerModal } from './components/DisclaimerModal';

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('landing');
  const [gender, setGender] = useState<Gender | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);
  const [showOverview, setShowOverview] = useState<boolean>(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState<boolean>(false);
  const [showValidationAlert, setShowValidationAlert] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [analytics, setAnalytics] = useState<AnalyticsData>(() => getLocalCachedAnalytics());

  // Record real-time visit and sync live analytics on initial mount
  useEffect(() => {
    recordRealtimeVisit().then((data) => {
      setAnalytics(data);
    });

    // Real-time polling every 15 seconds to update live community counts
    const interval = setInterval(() => {
      fetchLiveAnalytics().then((data) => {
        setAnalytics(data);
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Scroll to top on step or question changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, currentQuestionIndex]);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const isCurrentAnswered = !!answers[currentQuestion?.id];
  const unansweredCount = QUESTIONS.length - Object.keys(answers).length;

  // Global keyboard shortcuts for Enter / Navigation
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (currentStep !== 'quiz' || showOverview || showDisclaimer) return;
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' && currentQuestionIndex > 0) {
        e.preventDefault();
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [currentStep, currentQuestionIndex, answers, showOverview, showDisclaimer]);

  const handleSelectOption = (optionId: string) => {
    setShowValidationAlert(false);
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handlePrevious = () => {
    setShowValidationAlert(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isCurrentAnswered) {
      setShowValidationAlert(true);
      return;
    }

    setShowValidationAlert(false);
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    const unansweredIds = getUnansweredQuestionIds(answers, QUESTIONS);
    if (unansweredIds.length > 0) {
      setAttemptedSubmit(true);
      setShowOverview(true);
      return;
    }

    // Complete assessment and increment global completion counter in real-time
    recordRealtimeCompletion().then((data) => {
      setAnalytics(data);
    });
    setCurrentStep('result');
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setGender(null);
    setAttemptedSubmit(false);
    setShowValidationAlert(false);
    setCurrentStep('landing');
  };

  // Compute calculated metrics according to book scoring table
  const effectiveGender = gender || 'male';
  const breakdown = calculateScore(answers, effectiveGender, QUESTIONS);
  const profile = getProfile(breakdown.totalScore);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        onOpenDisclaimer={() => setShowDisclaimer(true)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        unansweredCount={unansweredCount}
        totalQuestions={QUESTIONS.length}
        onOpenReview={() => setShowOverview(true)}
        showReviewButton={currentStep === 'quiz'}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center">
        {currentStep === 'landing' && (
          <LandingPage
            onStart={() => setCurrentStep('gender')}
            onOpenDisclaimer={() => setShowDisclaimer(true)}
            visits={analytics.visits}
            completions={analytics.completions}
            isRealtime={analytics.isRealtime}
          />
        )}

        {currentStep === 'gender' && (
          <GenderSelection
            selectedGender={gender}
            onSelectGender={(selected) => setGender(selected)}
            onContinue={() => setCurrentStep('quiz')}
            onBack={() => setCurrentStep('landing')}
          />
        )}

        {currentStep === 'quiz' && (
          <div className="max-w-2xl mx-auto w-full px-4 py-6 sm:py-10 animate-fade-in flex flex-col">
            {/* Dynamic Progress Bar */}
            <ProgressBar
              currentIndex={currentQuestionIndex}
              totalQuestions={QUESTIONS.length}
              categoryLabel={currentQuestion.categoryLabel}
            />

            {/* Question Card */}
            <QuestionCard
              question={currentQuestion}
              selectedOptionId={answers[currentQuestion.id]}
              onSelectOption={handleSelectOption}
              soundEnabled={soundEnabled}
            />

            {/* Step Navigation Controls */}
            <QuizNavigation
              currentIndex={currentQuestionIndex}
              totalQuestions={QUESTIONS.length}
              isAnswered={isCurrentAnswered}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSubmit={handleSubmit}
              showValidationAlert={showValidationAlert}
              onDismissAlert={() => setShowValidationAlert(false)}
              onOpenOverview={() => setShowOverview(true)}
            />
          </div>
        )}

        {currentStep === 'result' && (
          <ResultPage
            score={breakdown.totalScore}
            breakdown={breakdown}
            profile={profile}
            onRetake={handleRetake}
            onOpenDisclaimer={() => setShowDisclaimer(true)}
          />
        )}
      </main>

      {/* Persistent Footer */}
      <footer className="w-full border-t border-slate-900 bg-slate-950/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Brain-Wiring Test • Based on Allan &amp; Barbara Pease</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowDisclaimer(true)}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy &amp; Disclaimer
            </button>
            <span className="text-slate-700">•</span>
            <span>Anonymous &amp; Cookie-free</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DisclaimerModal
        isOpen={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
      />

      <QuestionOverviewModal
        isOpen={showOverview}
        onClose={() => setShowOverview(false)}
        questions={QUESTIONS}
        answers={answers}
        currentIndex={currentQuestionIndex}
        onSelectQuestion={(idx) => {
          setCurrentQuestionIndex(idx);
          setShowValidationAlert(false);
        }}
        attemptedSubmit={attemptedSubmit}
      />
    </div>
  );
};

export default App;
