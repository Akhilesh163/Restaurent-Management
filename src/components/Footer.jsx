import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
  <div className="my-16 px-4 h-[20vh] flex flex-col gap-15" id='app-download'> {/* margin top and bottom */}
      <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-800 mb-10">
        For Better Experience Download <br />
        <span className="text-red-500">My App</span>
      </h1>

      <div className="flex justify-center items-center space-x-8">
        <img
          src={assets.play}
          alt="Download on Play Store"
          className="w-40 hover:scale-105 transition-transform duration-300"
        />
        <img
          src={assets.apple}
          alt="Download on App Store"
          className="w-40 hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default Footer;
