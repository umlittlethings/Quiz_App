# React Quiz Application

A web-based quiz application built with React. Users can register, log in, take quizzes on various topics, and see their results. The application features a timer for quizzes and a pass/fail system.

## Overview

This project is a dynamic quiz platform where users can test their knowledge. It includes user authentication, a dashboard to view available and recently attempted quizzes, and a detailed quiz-taking interface with timed questions. The application currently uses a local dummy dataset for quiz questions and answers, with plans to integrate the Open Trivia Database (OpenTDB) API for a wider variety of dynamic quiz content.

## Features

- **User Authentication**: Secure registration and login system.
- **Dashboard**:
  - Displays a list of available quizzes.
  - Shows a "Recent Quizzes" section for quizzes the user has attempted in the current session.
- **Quiz Taking**:
  - Detailed view for each quiz before starting.
  - Timed quiz sessions (e.g., 30 minutes per quiz, configurable per quiz).
  - Multiple-choice questions.
- **Results & Scoring**:
  - Immediate feedback on quiz completion.
  - Pass/Fail status based on the number of incorrect answers (e.g., a maximum of 2 mistakes to pass).
  - Users can retry quizzes they haven't passed.
  - Once a quiz is passed, it cannot be retaken in the same session.
- **Session-based State**: Quiz attempt status (passed, failed, scores) is maintained for the current browser session and resets upon page refresh or logout, as no database is used for this persistence.
- **Responsive Design**: Basic responsive layout for usability across different screen sizes.

## Current Data Source

Currently, the application uses a predefined set of dummy questions and quiz data stored locally within the `src/utils/Dummy.js` file. This allows for rapid development and testing of the application's features without relying on an external API.

Each quiz in the dummy data includes:

- An ID
- A title
- A description
- A time limit
- A list of questions, each with:
  - The question text
  - A correct answer
  - A list of incorrect answers
  - A combined list of all possible answers

## Future Plans: OpenTDB API Integration

The next major step for this project is to integrate the [Open Trivia Database (OpenTDB) API](https://opentdb.com/). This will allow the application to:

- Fetch a wide variety of quiz categories and questions dynamically.
- Offer users a much larger and more diverse set of quizzes.
- Potentially allow users to select quiz categories, difficulty levels, and number of questions.

The `src/utils/Api.js` file (currently not utilized by `useQuiz.jsx` which defaults to dummy data) is intended to house the logic for fetching data from external APIs like OpenTDB. The `useQuiz.jsx` hook is designed with a placeholder for asynchronous data fetching, which currently simulates a delay before loading dummy data.

## Prerequisites

- Node.js (v14.x or later recommended)
- npm (v6.x or later) or yarn

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

## Running the Application

1.  **Start the development server:**
    Using npm:
    ```bash
    npm start
    ```
    Or using yarn:
    ```bash
    yarn start
    ```
2.  Open your browser and navigate to `http://localhost:3000` (or the port specified in your console).

## Folder Structure (Simplified)

├── public/
├── src/
│ ├── components/
│ │ ├── Quiz/
│ │ │ ├── Question.jsx
│ │ │ ├── Quiz.jsx
│ │ │ └── Result.jsx
│ │ ├── Login.jsx
│ │ ├── QuizCard.jsx
│ │ └── Register.jsx
│ ├── hooks/
│ │ └── UseQuiz.jsx
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── NotFound.jsx
│ │ └── QuizDetail.jsx
│ ├── utils/
│ │ ├── Api.js # Intended for API calls (future use)
│ │ └── Dummy.js # Current source of quiz data
│ ├── App.jsx
│ ├── AppRoutes.jsx
│ ├── Layout.jsx
│ └── index.js
├── .gitignore
├── package.json
└── README.md

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **React Router DOM**: For client-side routing.
- **JavaScript (ES6+)**: Core programming language.
- **HTML5 & CSS3**: Structure and styling.
  - **(Tailwind CSS)**: (If you are using it or plan to) A utility-first CSS framework for rapid UI development. _Mention if applicable based on your `Layout.jsx` and other component styling._
- **localStorage**: Used for persisting user login sessions across browser refreshes.
- **React Hooks**: (e.g., `useState`, `useEffect`, `useCallback`) for state management and side effects in functional components.

---
