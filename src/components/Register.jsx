import React, { useState, useEffect } from 'react';
import AuthInput from './AuthInput'; 

function Register({ onRegister, switchToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('All fields are required');
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

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const users = JSON.parse(localStorage.getItem('quizAppUsers') || '[]');
      const userExists = users.some(user => user.username === username);

      if (userExists) {
        throw new Error('Username already exists');
      }

      const newUser = { username, password };
      users.push(newUser);
      localStorage.setItem('quizAppUsers', JSON.stringify(users));

      onRegister({ username });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white font-poppins">
      <div
        className={`fixed top-5 right-5 bg-red-100 text-red-700 px-5 py-3 rounded-lg shadow-md font-semibold max-w-xs z-50 transition-transform duration-300
        ${error ? 'translate-x-0' : 'translate-x-[150%]'}`}
      >
        {error}
      </div>
      <div className="relative hidden w-1/2 overflow-hidden lg:block">

        <img
          className="h-full w-full object-cover blur-sm scale-105"
          src="image/assets/authAsset/left-image.svg"
          alt="Abstract background"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center p-12 px-20 text-center">
          <q className="text-lg text-white leading-relaxed text-justify px-30">
            Those people who develop the ability to continuously acquire new and better forms of knowledge that they can apply to their work and to their lives will be the movers and shakers in our society for the indefinite future.
          </q>
          <h1 className='pt-7 text-white font-semibold'>— Brian Tracy</h1>
        </div>
      </div>


      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="absolute top-0 left-192 p-8 z-10">
            <img className="w-40 mb-8" src="/image/Logos/main-logo-two.svg" alt="Logo Perusahaan" />
          </div>
          
          <h2 className="text-main font-extrabold text-3xl pb-2 pt-20">Create Your Account</h2>
          <p className="text-gray-500 mb-8">Let's get you started with a new account.</p>
          
          <form onSubmit={handleSubmit}>
            <AuthInput
              id="reg-username"
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a unique username"
            />
            <AuthInput
              id="reg-password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
            />
            <AuthInput
              id="confirm-password"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
            />

            <button
              type="submit"
              className="w-full bg-main text-white text-lg font-semibold rounded-2xl px-6 py-4 mt-2 flex justify-center items-center
                         hover:bg-[#00147D] transition duration-300 cursor-pointer 
                         disabled:bg-main/70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-4 border-white/50 border-solid border-t-white rounded-full animate-spin mr-3"></div>
                  <span>Registering...</span>
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          
          <div className="text-center pt-6">
            <span className="text-gray-600">Already have an account? </span>
            <button 
              className="text-main font-semibold hover:text-[#00147D] transition duration-300" 
              onClick={switchToLogin}
            >
              Login here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;