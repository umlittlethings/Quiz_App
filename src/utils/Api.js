export const fetchQuizData = async () => {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=5&category=18&difficulty=hard&type=multiple`
  );
  const data = await response.json();

  if (data.response_code !== 0) {
    throw new Error('Failed to fetch quiz questions');
  }

  const processed = data.results.map(q => ({
    ...q,
    answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
  }));

  return {
    id: '0', 
    title: 'Comp-Sci Trivia',
    date: new Date().toISOString(),
    description: 'Kuis tentang ilmu komputer tingkat sulit.',
    difficulty: data.results[0]?.difficulty,
    attempts: '2',
    questions: processed,
    image: 'image/Quiz/img-quiz.svg',
    timeLimit: 120, 
  };
};