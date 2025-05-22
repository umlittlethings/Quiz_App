import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import Layout from './Layout';
import NotFound from './pages/NotFound';
import QuizDetail from './pages/QuizDetail';
import Quiz from './components/Quiz/Quiz';

function AppRoutes({ isLoggedIn, user, onLogin, onRegister, onLogout, quizAttempts, updateQuizAttempt }) {
  return (
    <Routes>
      <Route element={<Layout isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} />}>
        <Route
          path="/"
          element={
            isLoggedIn
              ? <Navigate to="/dashboard" />
              : <Login onLogin={onLogin} switchToRegister={() => window.location.href = "/register"} />
          }
        />
        <Route
          path="/register"
          element={
            isLoggedIn
              ? <Navigate to="/dashboard" />
              : <Register onRegister={onRegister} switchToLogin={() => window.location.href = "/"} />
          }
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn
              ? <Dashboard username={user?.username || 'User'} quizAttempts={quizAttempts} /> 
              : <Navigate to="/" />
          }
        />
        <Route
          path="/quiz/:quizId"
          element={
            isLoggedIn
              ? <QuizDetail quizAttempts={quizAttempts} username={user?.username} />
              : <Navigate to="/" />
          }
        />
        <Route
          path="/quiz/:quizId/attempt"
          element={
            isLoggedIn
              ? <Quiz updateQuizAttempt={updateQuizAttempt} quizAttempts={quizAttempts} />
              : <Navigate to="/" />
          }
        />
        <Route
          path="*"
          element={isLoggedIn ? <NotFound /> : <Navigate to="/" />}
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;