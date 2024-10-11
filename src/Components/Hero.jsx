// Hero.jsx
import React from 'react';
import ImageSlider from './ImageSlider'; // Adjust the path as needed

const Hero = () => {
  return (
    <div className='w-full py-18 '>
      <ImageSlider />
      {/* Optional: Add content over the slider if needed */}
      <div className="absolute inset-0 flex items-center justify-center">
       
      </div>
    </div>
  );
};

export default Hero;
