import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'; // Optional: Add icons

const Home = ({ welcomeText = 'Welcome to Task Assigner', typingSpeed = 100 }) => {
  const [text, setText] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= welcomeText.length) {
        setText(welcomeText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setShowButtons(true);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [welcomeText, typingSpeed]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="text-center space-y-8 p-8">
        {/* Heading */}
        <h1
          className={`text-6xl md:text-7xl font-extrabold text-gray-800 transition-all duration-500 ease-out ${
            text ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {text}
          <span className="animate-pulse ml-1">|</span>
        </h1>

        {/* Buttons */}
        <div
          className={`flex flex-col space-y-4 items-center transition-all duration-500 ease-out ${
            showButtons ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-5'
          }`}
        >
          {/* Login Button */}
          <button
            onClick={() => navigate('/login')}
            aria-label="Login"
            className="w-48 px-8 py-3 text-lg font-semibold text-red-600 bg-white border-2 border-red-600 rounded-md shadow-md hover:shadow-xl hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            <FaSignInAlt className="inline-block mr-2" /> Login
          </button>

          {/* Register Button */}
          <button
            onClick={() => navigate('/register')}
            aria-label="Register"
            className="w-48 px-8 py-3 text-lg font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-md shadow-md hover:shadow-xl hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <FaUserPlus className="inline-block mr-2" /> Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
