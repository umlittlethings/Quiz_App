import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import Layout from './Layout';
import NotFound from './pages/NotFound';
import QuizDetail from './pages/QuizDetail';
import Quiz from './components/Quiz/Quiz';
import Notification from './pages/Notification';
import Achievements from './pages/Achievement';
import { getQuizzes } from './utils/Dummy'
import Recent from './pages/Recent'
import SearchQuiz from './pages/SearchQuiz';

function AppRoutes({ isLoggedIn, user, onLogin, onRegister, onLogout, quizAttempts, updateQuizAttempt }) {
  const location = useLocation();

  // Variants animasi halaman masuk dan keluar
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.3,
  };

  const allQuizzes = getQuizzes();
  const attemptedQuizIds = Object.keys(quizAttempts || {});
  const recentQuizzes = [];

  allQuizzes.forEach(quiz => {
    if (attemptedQuizIds.includes(quiz.id)) {
      recentQuizzes.push({ ...quiz, attempt: quizAttempts[quiz.id] });
    }
  });


  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} />}>
          <Route
            path="/"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                {isLoggedIn
                  ? <Navigate to="/dashboard" />
                  : <Login onLogin={onLogin} switchToRegister={() => window.location.href = "/register"} />
                }
              </motion.div>
            }
          />
          <Route
            path="/register"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                {isLoggedIn
                  ? <Navigate to="/dashboard" />
                  : <Register onRegister={onRegister} switchToLogin={() => window.location.href = "/"} />
                }
              </motion.div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                {isLoggedIn
                  ? <Dashboard username={user?.username || 'User'} quizAttempts={quizAttempts} />
                  : <Navigate to="/" />
                }
              </motion.div>
            }
          />
          <Route
            path="/quiz/:quizId"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                {isLoggedIn
                  ? <QuizDetail quizAttempts={quizAttempts} username={user?.username} />
                  : <Navigate to="/" />
                }
              </motion.div>
            }
          />
          <Route
            path="/quiz/:quizId/attempt"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                {isLoggedIn
                  ? <Quiz updateQuizAttempt={updateQuizAttempt} quizAttempts={quizAttempts} />
                  : <Navigate to="/" />
                }
              </motion.div>
            }
          />
          <Route
            path="*"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                {isLoggedIn ? <NotFound /> : <Navigate to="/" />}
              </motion.div>
            }
          />
           <Route
            path="/notification"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                {isLoggedIn
                  ? <Notification username={user ? user.username : "User"} />
                  : <Navigate to="/" />
                }
              </motion.div>
            }
          />
          <Route
            path="/achievements"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                {isLoggedIn
                  ? <Achievements />
                  : <Navigate to="/" />
                }
              </motion.div>
            }
          />
          <Route
            path="/quiz-history"
            element={
              <>
     
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                {isLoggedIn
                  ? <Recent recentQuizzes={recentQuizzes} />
                  : <Navigate to="/" />
                }
              </motion.div>
              </>
            }
          />
          <Route path="/search" element={<SearchQuiz />} />
        </Route>
        
      </Routes>
    </AnimatePresence>
  );
}

export default AppRoutes;
