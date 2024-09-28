// Loader.js
import React from 'react';
import './loader.css'; // Import the CSS file for styling

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <span className='font-bold absolute text-md text-gray-500 animate-pulse '>
        Jijenge AI
    </span>
    </div>
  );
};

export default Loader;