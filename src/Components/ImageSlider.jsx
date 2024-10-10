import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { assets } from '../assets/assets';

const ImageSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const images = [  
    assets.hero_3,
    assets.hero_img1,
    assets.hero_4,
    assets.hero_img, 
  ];

  const sliderRef = useRef(null);

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className='relative w-full h-[60vh] overflow-x-hidden overflow-y-hidden'> {/* Add overflow-x-hidden to prevent horizontal overflow */}
      <Slider ref={sliderRef} {...settings}>
        {images.map((img, index) => (
          <div key={index} className="w-full h-full">
            <img
              src={img}
              alt={`Slider Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
