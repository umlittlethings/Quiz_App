import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import useQuiz from '../../hooks/UseQuiz'; 
import Question from './Question'; 
import Result from './Result'; 

function Quiz({ updateQuizAttempt, quizAttempts, allQuizzes }) {
  const { quizId } = useParams();


  const attemptDetails = quizAttempts[quizId];
  if (attemptDetails?.status === 'passed') {
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
    restartQuiz,
    isQuizActive
  } = useQuiz(quizId, allQuizzes, updateQuizAttempt);

  if (isLoading) return <div className="text-center py-10 text-lg">Loading quiz questions...</div>;
  if (error) return <div className="text-center py-10 text-red-500 text-lg">{error}</div>;
  if (!questions || questions.length === 0) {
    return <div className="text-center py-10 text-lg">No questions available for this quiz.</div>;
  }
  if (!isQuizActive && !showResults) return <div className="text-center py-10 text-lg">Preparing quiz...</div>;


  if (showResults) {
    const totalQuestions = questions.length;
    const mistakes = totalQuestions - score;
    const isPassed = mistakes <= 2;
    return (
      <Result
        score={score}
        total={totalQuestions}
        onRestart={restartQuiz} 
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
        answers={current.answers}
        onAnswer={handleAnswer}
      />
    </div>
  );
}

export default Quiz;