// Logo.jsx

import React from 'react';
import logo from './logo.png'

const Logo = () => {
  return (
    <div className="flex items-center">
      <img src={logo} alt="Company Logo" className="w-10 h-10 mr-2" />
      <span className="text-md font-bold">Write your blog</span>
    </div>
  );
};

export default Logo;
