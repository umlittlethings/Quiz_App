import React, { useState } from 'react';

function Register({ onRegister, switchToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Check if username already exists in localStorage
    const users = JSON.parse(localStorage.getItem('quizAppUsers') || '[]');
    const userExists = users.some(user => user.username === username);
    
    if (userExists) {
      setError('Username already exists');
      return;
    }
    
    // Add new user to users array
    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem('quizAppUsers', JSON.stringify(users));
    
    // Call the registration callback
    onRegister({ username });
    
    // Clear form
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="reg-username">Username</label>
          <input
            type="text"
            id="reg-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="reg-password">Password</label>
          <input
            type="password"
            id="reg-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Choose a password (min. 6 characters)"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />
        </div>
        
        <button type="submit" className="register-button">Register</button>
      </form>
      
      <div className="auth-switch">
        Already have an account? <button className="text-button" onClick={switchToLogin}>Login</button>
      </div>
    </div>
  );
}

export default Register;