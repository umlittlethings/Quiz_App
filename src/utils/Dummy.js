const dummyQuizData = [
  {
    id: 'quiz1',
    title: 'General Knowledge Basics',
    description: 'A quick test of your general knowledge. 5 questions.',
    timeLimit: 30 * 60, // 30 minutes in seconds
    questions: [
      {
        question: "What is 2 + 2?",
        correct_answer: "4",
        incorrect_answers: ["3", "5", "6"],
        answers: ["3", "4", "5", "6"],
      },
      {
        question: "What does CPU stand for?",
        correct_answer: "Central Processing Unit",
        incorrect_answers: [
          "Central Process Utility",
          "Computer Personal Unit",
          "Central Processor Unit",
        ],
        answers: [
          "Central Process Utility",
          "Computer Personal Unit",
          "Central Processor Unit",
          "Central Processing Unit",
        ],
      },
      {
        question: "Which language runs in a web browser?",
        correct_answer: "JavaScript",
        incorrect_answers: ["Java", "C", "Python"],
        answers: ["Java", "C", "JavaScript", "Python"],
      },
      {
        question: "What does HTML stand for?",
        correct_answer: "HyperText Markup Language",
        incorrect_answers: [
          "Hyperlink and Text Markup Language",
          "Home Tool Markup Language",
          "Hyperlinking Text Mark Language",
        ],
        answers: [
          "Hyperlink and Text Markup Language",
          "Home Tool Markup Language",
          "Hyperlinking Text Mark Language",
          "HyperText Markup Language",
        ],
      },
      {
        question: "What year was JavaScript created?",
        correct_answer: "1995",
        incorrect_answers: ["1996", "1994", "2000"],
        answers: ["1996", "1994", "2000", "1995"],
      },
    ],
  },
  {
    id: 'quiz2',
    title: 'Tech Concepts',
    description: 'Test your knowledge of basic tech terms. 3 questions.',
    timeLimit: 15 * 60, // 15 minutes
    questions: [
      {
        question: "Which company developed the React library?",
        correct_answer: "Facebook",
        incorrect_answers: ["Google", "Microsoft", "Amazon"],
        answers: ["Facebook", "Google", "Microsoft", "Amazon"],
      },
      {
        question: "What does RAM stand for?",
        correct_answer: "Random Access Memory",
        incorrect_answers: [
          "Read Access Memory",
          "Run Accept Memory",
          "Random Allocate Memory",
        ],
        answers: [
          "Read Access Memory",
          "Run Accept Memory",
          "Random Allocate Memory",
          "Random Access Memory",
        ],
      },
      {
        question: "Which HTML element is used for a line break?",
        correct_answer: "<br>",
        incorrect_answers: ["<break>", "<lb>", "<line>"],
        answers: ["<break>", "<lb>", "<line>", "<br>"],
      },
    ],
  },
];

export const getQuizzes = () => dummyQuizData;

export const getQuizDetails = (quizId) => {
  return dummyQuizData.find(q => q.id === quizId);
};