import React from 'react'
import QuizCard from '../components/Quiz/QuizCard'

function Recent({ recentQuizzes = [] }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-5 border-b-2 border-blue-500 pb-2">
        Recent Quizzes
      </h2>
      {recentQuizzes.length > 0 ? (
        <div className="flex flex-wrap -m-4">
          {recentQuizzes.map(quizItem => (
            <QuizCard key={quizItem.id} quiz={quizItem} attempt={quizItem.attempt} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No recent quizzes found.</p>
      )}
    </div>
  )
}

export default Recent