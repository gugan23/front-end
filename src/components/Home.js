import React from 'react';
import { Link } from 'react-router-dom';
import TypingEffect from 'react-typing-effect';

const Home = () => {
  return (
    <div className="text-center mt-5">
      <h1>
        <TypingEffect
          text={['Welcome to Task Assigner']}
          speed={50}
          eraseDelay={1000}
        />
      </h1>
      <div className="mt-4">
        <Link to="/login" className="btn btn-primary mr-2">Login</Link>
        <Link to="/register" className="btn btn-secondary">New User? Register</Link>
      </div>
    </div>
  );
};

export default Home;
