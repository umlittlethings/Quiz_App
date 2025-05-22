import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getQuizDetails } from '../utils/Dummy'; // Adjust path as needed

function QuizDetail({ quizAttempts, username }) {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const quiz = getQuizDetails(quizId);
  const attempt = quizAttempts[quizId];

  if (!quiz) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-red-600">Quiz not found!</h2>
        <Link to="/dashboard" className="text-blue-500 hover:underline mt-4 inline-block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const hasPassed = attempt?.status === 'passed';
  const canRetry = !hasPassed; // User can retry if not passed or not attempted

  const handleStartQuiz = () => {
    navigate(`/quiz/${quizId}/attempt`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{quiz.title}</h1>
        <p className="text-gray-600 mb-2"><span className="font-semibold">Description:</span> {quiz.description}</p>
        <p className="text-gray-600 mb-2"><span className="font-semibold">Number of Questions:</span> {quiz.questions.length}</p>
        <p className="text-gray-600 mb-6"><span className="font-semibold">Time Limit:</span> {quiz.timeLimit / 60} minutes</p>

        {attempt && (
          <div className={`mb-6 p-4 rounded-md ${hasPassed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            <h3 className="font-semibold text-lg">Previous Attempt:</h3>
            <p>Status: <span className="font-bold">{attempt.status}</span></p>
            <p>Score: {attempt.score} / {attempt.total}</p>
          </div>
        )}

        {canRetry ? (
          <button
            onClick={handleStartQuiz}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
            disabled={hasPassed} // Technically redundant due to canRetry but good for clarity
          >
            {attempt ? 'Try Again' : 'Start Quiz'}
          </button>
        ) : (
          <p className="text-green-600 font-semibold text-lg text-center py-3 bg-green-50 rounded-md">
            You have already passed this quiz!
          </p>
        )}
         <Link to="/dashboard" className="block text-center text-blue-500 hover:underline mt-6">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default QuizDetail;