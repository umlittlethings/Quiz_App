import React from 'react';
import { Link } from 'react-router-dom';

function QuizCard({ quiz, attempt }) {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg m-4 w-full md:w-1/2 lg:w-1/3 group">

      <div
        className="h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${quiz.image || 'https://placehold.co/600x400'})` }}
      ></div>


      <div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-60 transition duration-300 flex flex-col justify-between p-4">
        <div>
      
          <div className="flex items-center gap-2 mb-2 text-sm text-main opacity-90">
            <span className="bg-white bg-opacity-20 px-2 py-1 rounded">
              {quiz.timeLimit / 60 || 'N/A'} min
            </span>
            <span className="bg-white bg-opacity-20 px-2 py-1 rounded capitalize">
              {quiz.difficulty || 'unknown'}
            </span>
          </div>

          <h3 className="text-white text-xl font-semibold mb-1">{quiz.title}</h3>
          <p className="text-gray-200 text-sm mb-3">{quiz.description}</p>

          {attempt && (
            <div className={`mb-2 p-2 rounded-md text-sm w-fit ${
              attempt.status === 'passed'
                ? 'bg-green-600 bg-opacity-80 text-white'
                : 'bg-red-600 bg-opacity-80 text-white'
            }`}>
              <p className="font-semibold">Status: {attempt.status}</p>
              <p>Skor: {attempt.score} / {attempt.total}</p>
            </div>
          )}
        </div>

        <Link
          to={`/quiz/${quiz.id}`}
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md text-center self-start"
        >
          {attempt ? 'View Details / Retry' : 'View Details'}
        </Link>
      </div>
    </div>
  );
}

export default QuizCard;
