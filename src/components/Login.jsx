import React, { useState } from 'react';

function Login({ onLogin, switchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    
    const users = JSON.parse(localStorage.getItem('quizAppUsers') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
      setError('Invalid username or password');
      return;
    }
    
    onLogin({ username });
    
    setUsername('');
    setPassword('');
    setError('');
  };

  return (
    <div className="login-container">
      <h2>Login to Quiz App</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        
        <button type="submit" className="login-button">Login</button>
      </form>
      
      <div className="auth-switch">
        Don't have an account? <button className="text-button" onClick={switchToRegister}>Register</button>
      </div>
    </div>
  );
}

export default Login;