import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import useQuiz from '../../hooks/UseQuiz'; // Adjust path
import Question from './Question'; // Adjust path
import Result from './Result'; // Adjust path

function Quiz({ updateQuizAttempt, quizAttempts }) {
  const { quizId } = useParams();

  // Prevent re-attempt if already passed
  const attemptDetails = quizAttempts[quizId];
  if (attemptDetails?.status === 'passed') {
    // Optionally, show a message or redirect immediately
    // For now, redirecting to quiz detail which will show the "passed" status
    return <Navigate to={`/quiz/${quizId}`} replace />;
  }

  const {
    quizTitle,
    questions,
    currentQuestionIndex,
    score,
    showResults,
    isLoading,
    error,
    timeLeft,
    handleAnswer,
    restartQuiz, // This restart is for the Result component's "Try Again" for a failed attempt
    isQuizActive
  } = useQuiz(quizId, updateQuizAttempt);

  if (isLoading) return <div className="text-center py-10 text-lg">Loading quiz questions...</div>;
  if (error) return <div className="text-center py-10 text-red-500 text-lg">{error}</div>;
  if (!isQuizActive && !showResults) return <div className="text-center py-10 text-lg">Preparing quiz...</div>;


  if (showResults) {
    const totalQuestions = questions.length;
    const mistakes = totalQuestions - score;
    const isPassed = mistakes <= 2;
    return (
      <Result
        score={score}
        total={totalQuestions}
        onRestart={restartQuiz} // This allows retrying immediately if failed
        isPassed={isPassed}
        quizId={quizId}
      />
    );
  }

  if (!questions || questions.length === 0) {
    return <div className="text-center py-10 text-lg">No questions available for this quiz.</div>;
  }

  const current = questions[currentQuestionIndex];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">{quizTitle}</h1>
      <div className="flex justify-between items-center mb-6">
        <p className="text-lg text-gray-700">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <p className="text-lg font-semibold text-red-500">
          Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </p>
      </div>
      <Question
        question={current.question}
        answers={current.answers} // Already shuffled in useQuiz
        onAnswer={handleAnswer}
      />
    </div>
  );
}

export default Quiz;