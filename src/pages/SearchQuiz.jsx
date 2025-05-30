import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchQuizData } from '../utils/Api'; 
import QuizCard from '../components/Quiz/QuizCard';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchQuiz() {
  const query = useQuery();
  const searchTerm = query.get('q') || '';
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      fetchQuizData()
        .then(quiz => {
          const quizzes = [quiz];
          setFiltered(
            quizzes.filter(q =>
              q.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        })
        .catch(() => setFiltered([]))
        .finally(() => setIsLoading(false));
    }, 2000); 

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">
        Search Results for: <span className="text-blue-600">{searchTerm}</span>
      </h2>
      {isLoading ? (
        <div className="text-center py-10 text-blue-500 font-semibold animate-pulse">
          Loading quizzes...
        </div>
      ) : filtered.length > 0 ? (
        <div className="flex flex-wrap -m-4">
          {filtered.map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No quizzes found.</p>
      )}
    </div>
  );
}

export default SearchQuiz;