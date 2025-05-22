import React, { useState, useEffect } from 'react';

function SimpleQuiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchQuizData = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=15&category=18&difficulty=easy&type=multiple');
      const data = await response.json();
      
      if (data.response_code !== 0) {
        throw new Error('Failed to fetch quiz questions');
      }

      // Process questions to include all answers in a randomized array
      const processedQuestions = data.results.map(question => {
        const answers = [
          ...question.incorrect_answers,
          question.correct_answer
        ].sort(() => Math.random() - 0.5);

        return {
          ...question,
          answers,
        };
      });

      setQuestions(processedQuestions);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load quiz questions. Please try again.');
      setIsLoading(false);
    }
  };

  // Kasih delay 2 detik sebelum fetch
  const timer = setTimeout(() => {
    fetchQuizData();
  }, 2000);

  // Clear timeout kalau komponen unmount
  return () => clearTimeout(timer);
}, []);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }
    
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
  };

  if (isLoading) {
    return <div>Loading quiz questions...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (showResults) {
    return (
      <div>
        <h2>Quiz Results</h2>
        <p>Your Score: {score} out of {questions.length}</p>
        <button onClick={restartQuiz}>Try Again</button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2>Quiz</h2>
      <div>
        <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
        <h3 dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
        <div>
          {currentQuestion.answers.map((answer, index) => (
            <button key={index} onClick={() => handleAnswer(answer)}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SimpleQuiz;