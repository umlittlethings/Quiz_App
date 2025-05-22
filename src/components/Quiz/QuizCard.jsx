import React from 'react';
import { Link } from 'react-router-dom';

function QuizCard({ quiz, attempt }) { // Tambahkan prop 'attempt'
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-full md:w-1/2 lg:w-1/3 hover:shadow-xl transition-shadow duration-200 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-blue-700 mb-2">{quiz.title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{quiz.description}</p>
        {attempt && (
          <div className={`mb-3 p-2 rounded-md text-sm ${attempt.status === 'passed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            <p className="font-semibold">Status: {attempt.status}</p>
            <p>Skor: {attempt.score} / {attempt.total}</p>
          </div>
        )}
      </div>
      <Link
        to={`/quiz/${quiz.id}`}
        className="mt-auto inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-center"
      >
        {attempt ? 'View Details / Retry' : 'View Details'}
      </Link>
    </div>
  );
}

export default QuizCard;