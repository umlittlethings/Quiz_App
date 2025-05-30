import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [quizAttempts, setQuizAttempts] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem('quizAppUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('quizAppUser', JSON.stringify(userData));
  };

  const handleRegister = (userData) => {
    handleLogin(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('quizAppUser');
    setQuizAttempts({}); 
  };

  const updateQuizAttempt = (quizId, attemptData) => {
    setQuizAttempts(prevAttempts => ({
      ...prevAttempts,
      [quizId]: attemptData,
    }));
  };

  return (
    <Router>
      <AppRoutes
        isLoggedIn={isLoggedIn}
        user={user}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
        quizAttempts={quizAttempts}
        updateQuizAttempt={updateQuizAttempt}
      />
    </Router>
  );
}

export default App;