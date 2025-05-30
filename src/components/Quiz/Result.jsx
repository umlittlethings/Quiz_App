import React from 'react';
import { Link } from 'react-router-dom';

function Result({ score, total, onRestart, isPassed, quizId }) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-2xl rounded-lg text-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Quiz Results</h2>
      <p className={`text-5xl font-bold mb-4 ${isPassed ? 'text-green-500' : 'text-red-500'}`}>
        {score} / {total}
      </p>
      <p className="text-xl text-gray-600 mb-6">({percentage}%)</p>

      {isPassed ? (
        <p className="text-2xl font-semibold text-green-600 mb-8">
          Congratulations! You Passed! 🎉
        </p>
      ) : (
        <p className="text-2xl font-semibold text-red-600 mb-8">
          You did not pass. Keep trying! 
        </p>
      )}

      {!isPassed && (
        <button
          onClick={onRestart}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg mb-4 text-lg transition-colors duration-200"
        >
          Try This Quiz Again
        </button>
      )}
      <Link
        to={`/quiz/${quizId}`}
        className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg mb-4 text-lg transition-colors duration-200"
      >
        View Quiz Details
      </Link>
      <Link
        to="/dashboard"
        className="block w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

export default Result;