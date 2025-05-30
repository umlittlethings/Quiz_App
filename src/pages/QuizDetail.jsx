import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function QuizDetail({ quizAttempts, allQuizzes }) {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const quiz = allQuizzes.find(q => q.id === quizId);
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
  const canRetry = !hasPassed;

  const handleStartQuiz = () => {
    navigate(`/quiz/${quizId}/attempt`);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">{quiz.title}</h2>
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-xl overflow-hidden">

        <div className="lg:w-2/3 p-6">
          <div className="rounded-lg overflow-hidden mb-4">
            <video
              src={'/video/placeholder.mp4'}
              controls
              className="w-full rounded-lg"
            />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">{quiz.title}</h3>
          <hr className="mb-4" />
          <p className="text-gray-700 text-sm mb-2">{quiz.description || "No description available."}</p>
          <p className="text-gray-700 text-sm">
            To start, click the "Start" button. When finished, click the "Submit" button.
          </p>
        </div>

        <div className="lg:w-1/3 p-6 bg-gray-50 border-l">
          <div className="space-y-3 text-sm text-gray-700">
            <p><span className="font-bold">Date:</span> {quiz.date || 'A long time ago'}</p>
            <p><span className="font-bold">Dificulty</span> {quiz.difficulty || 'N/A'}</p>
            <p><span className="font-bold">Time Limit:</span> {quiz.timeLimit ? quiz.timeLimit / 60 : '2'} Mins</p>
            <p><span className="font-bold">Attempts:</span> {hasPassed ? 'Used' : 'Twice'}</p>
            <p><span className="font-bold">Pass Points:</span> {quiz.passScore || '80 Points'}</p>
          </div>

          {attempt && (
            <div
              className={`mt-4 p-3 rounded-md text-sm ${
                hasPassed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              <p><strong>Status:</strong> {attempt.status}</p>
              <p><strong>Score:</strong> {attempt.score} / {attempt.total}</p>
            </div>
          )}

          {canRetry ? (
            <button
              onClick={handleStartQuiz}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold text-center"
            >
              {attempt ? 'Retry Quiz' : 'Start Quiz'}
            </button>
          ) : (
            <p className="mt-6 text-green-600 font-semibold text-center">
              You have already passed this quiz!
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link to="/dashboard" className="text-blue-500 hover:underline">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default QuizDetail;