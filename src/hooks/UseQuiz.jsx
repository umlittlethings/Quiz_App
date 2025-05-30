import { useState, useEffect, useCallback } from 'react';

const useQuiz = (quizId, allQuizzes, updateQuizAttempt) => {
  const quiz = allQuizzes.find(q => q.id === quizId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(quiz?.timeLimit || 120); 
  const [quizActive, setQuizActive] = useState(false);

  useEffect(() => {
    if (!quiz) {
      setError('Quiz not found.');
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(quiz.timeLimit || 120); 
    setQuizActive(true);
    setError(null);
  }, [quizId, quiz]);


  useEffect(() => {
    if (!quizActive || showResults || timeLeft <= 0) {
      if (quizActive && timeLeft <= 0 && !showResults) {
        setShowResults(true);
      }
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [quizActive, timeLeft, showResults]);

  const finishQuiz = useCallback(() => {
    setQuizActive(false);
    setShowResults(true);
    const totalQuestions = quiz?.questions?.length || 0;
    const mistakes = totalQuestions - score;
    const passed = mistakes <= 2;
    updateQuizAttempt(quizId, {
      score,
      total: totalQuestions,
      status: passed ? 'passed' : 'failed',
    });
  }, [quizId, quiz, score, updateQuizAttempt]);

  useEffect(() => {
    if (quizActive && timeLeft <= 0 && !showResults) {
      finishQuiz();
    }
  }, [quizActive, timeLeft, showResults, finishQuiz]);

  const handleAnswer = useCallback((answer) => {
    if (showResults || !quiz) return;
    if (answer === quiz.questions[currentQuestionIndex].correct_answer) {
      setScore((prev) => prev + 1);
    }
    if (currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  }, [currentQuestionIndex, quiz, showResults, finishQuiz]);

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setTimeLeft(quiz?.timeLimit || 120); 
    setQuizActive(true);
  };

  return {
    quizTitle: quiz?.title || '',
    questions: quiz?.questions || [],
    currentQuestionIndex,
    score,
    showResults,
    isLoading,
    error,
    timeLeft,
    handleAnswer,
    restartQuiz,
    isQuizActive: quizActive,
  };
};

export default useQuiz;