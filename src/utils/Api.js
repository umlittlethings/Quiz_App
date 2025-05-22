export const fetchQuizData = async () => {
  const response = await fetch('https://opentdb.com/api.php?amount=15&category=18&difficulty=easy&type=multiple');
  const data = await response.json();

  if (data.response_code !== 0) {
    throw new Error('Failed to fetch quiz questions');
  }

  const processed = data.results.map(q => ({
    ...q,
    answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
  }));

  return processed;
};
