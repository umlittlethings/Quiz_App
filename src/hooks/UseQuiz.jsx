import { useState, useEffect, useCallback } from 'react';
import { getQuizDetails } from '../utils/Dummy'; // Adjust path

const useQuiz = (quizId, updateQuizAttempt) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0); // Initialized in useEffect
  const [quizActive, setQuizActive] = useState(false);

  // Load quiz data
  useEffect(() => {
    setIsLoading(true);
    const quizData = getQuizDetails(quizId);
    if (quizData) {
      setQuizTitle(quizData.title);
      // Shuffle answers for each question
      const processedQuestions = quizData.questions.map(q => ({
        ...q,
        answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
      }));
      setQuestions(processedQuestions);
      setTimeLeft(quizData.timeLimit);
      setQuizActive(true); // Start the timer once questions are loaded
    } else {
      setError('Quiz not found.');
    }
    setIsLoading(false);
    return () => setQuizActive(false); // Stop timer if component unmounts
  }, [quizId]);

  // Timer logic
  useEffect(() => {
    if (!quizActive || showResults || timeLeft <= 0) {
      if (quizActive && timeLeft <= 0 && !showResults) { // Time ran out
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
    const totalQuestions = questions.length;
    const mistakes = totalQuestions - score;
    const passed = mistakes <= 2;
    updateQuizAttempt(quizId, {
      score,
      total: totalQuestions,
      status: passed ? 'passed' : 'failed',
    });
  }, [quizId, questions.length, score, updateQuizAttempt]);

  // Effect to auto-submit if time runs out and results aren't shown yet
   useEffect(() => {
    if (quizActive && timeLeft <= 0 && !showResults) {
      finishQuiz();
    }
  }, [quizActive, timeLeft, showResults, finishQuiz]);


  const handleAnswer = useCallback((answer) => {
    if (showResults) return;

    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  }, [currentQuestionIndex, questions, showResults, finishQuiz]);

  const restartQuiz = () => {
    // This restart is for a "failed" attempt during the same session before navigating away.
    // The actual ability to restart is controlled by QuizDetail page based on persisted App state.
    const quizData = getQuizDetails(quizId);
     if (quizData) {
      const processedQuestions = quizData.questions.map(q => ({
        ...q,
        answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
      }));
      setQuestions(processedQuestions);
      setTimeLeft(quizData.timeLimit);
    }
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setQuizActive(true);
  };

  return {
    quizTitle,
    questions,
    currentQuestionIndex,
    score,
    showResults,
    isLoading,
    error,
    timeLeft,
    handleAnswer,
    restartQuiz, // This will be used by Result component
    isQuizActive: quizActive, // to differentiate between loading and quiz not started
  };
};

export default useQuiz;