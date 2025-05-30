import React from 'react';
import QuizCard from '../components/Quiz/QuizCard';

function Dashboard({ username, allQuizzes = [], recentQuizzes = [], availableQuizzes = [] }) {
  return (
    <div className="dashboard-container container mx-auto px-4 py-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row items-center justify-between mb-10">
        <div className="flex items-center gap-6">
          <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="User" className="w-24 h-24 rounded-xl object-cover" />
          <div>
            <h1 className="text-2xl font-bold text-blue-700">{username}</h1>
            <p className="text-gray-500 text-sm">Lvl 1</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full w-[5%]"></div>
            </div>
          </div>
        </div>
        <div className="flex gap-6 mt-6 md:mt-0">
          <StatItem icon="📘" label="Quiz Answered" value={recentQuizzes.length} />
        </div>
      </div>

      {recentQuizzes.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-5 border-b-2 border-blue-500 pb-2">Recent Quizzes</h2>
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
          <p className="text-gray-500">No quizzes available at the moment.</p>
        )}
      </section>
    </div>
  );
}

function StatItem({ icon, label, value }) {
  return (
    <div className="bg-gray-100 px-4 py-3 rounded-lg text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-lg font-bold">{value}</div>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

export default Dashboard;