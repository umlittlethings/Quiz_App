import React from 'react';
import { FaMedal } from 'react-icons/fa';

function Achievement() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md text-center">
      <FaMedal className="text-5xl text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold text-gray-700 mb-2">No Achievements Yet</h2>
      <p className="text-gray-500">
        Keep completing quizzes to earn achievements and track your progress!
      </p>
    </div>
  );
}

export default Achievement;
