import React from 'react';
import QuizCard from '../components/Quiz/QuizCard';
import { getQuizzes } from '../utils/Dummy';

function Dashboard({ username, quizAttempts = {} }) { 
  const allQuizzes = getQuizzes();
  const attemptedQuizIds = Object.keys(quizAttempts);

  const recentQuizzes = [];
  const availableQuizzes = [];

  allQuizzes.forEach(quiz => {
    if (attemptedQuizIds.includes(quiz.id)) {
      recentQuizzes.push({ ...quiz, attempt: quizAttempts[quiz.id] });
    } else {
      availableQuizzes.push(quiz);
    }
  });

  return (
    <div className="dashboard-container container mx-auto px-4 py-6">

      {recentQuizzes.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-5 border-b-2 border-blue-500 pb-2">
            Recent Quizzes
          </h2>
          <div className="flex flex-wrap -m-4">
            {recentQuizzes.map(quizItem => (
              <QuizCard key={quizItem.id} quiz={quizItem} attempt={quizItem.attempt} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-5 border-b-2 border-gray-300 pb-2">
          {recentQuizzes.length > 0 ? 'Other Available Quizzes' : 'Available Quizzes'}
        </h2>
        {availableQuizzes.length > 0 ? (
          <div className="flex flex-wrap -m-4">
            {availableQuizzes.map(quiz => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        ) : (
          // This case will only be hit if all quizzes have been attempted
          // or if there are no quizzes at all.
          recentQuizzes.length > 0 && availableQuizzes.length === 0 ? (
            <p className="text-gray-500">No other quizzes available at the moment.</p>
          ) : (
             <p className="text-gray-500">No quizzes available at the moment.</p>
          )

        )}
      </section>
       { allQuizzes.length === 0 && (
         <p className="text-gray-500 mt-6">There are no quizzes loaded in the system.</p>
       )}
    </div>
  );
}

export default Dashboard;