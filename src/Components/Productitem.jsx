import React, { useContext, useState } from 'react';
import { Shopcontext } from '../Context/Shopcontext';
import { Link } from 'react-router-dom';

const Productitem = ({ id, image, name, price, imgClass = '' }) => {
  const { currency } = useContext(Shopcontext);

  // State to track the currently displayed image
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to handle hover and switch the image
  const handleMouseEnter = () => {
    if (image.length > 1) {
      setCurrentImageIndex(1); // Show the second image on hover
    }
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0); // Revert to the first image on hover out
  };

  return (
    <Link className='text-black cursor-pointer' to={`/product/${id}`}>
      <div 
        className='overflow-hidden' 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={image[currentImageIndex]}
          className={`transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-100 ${imgClass}`} // Adjusted for smooth transition
          alt={name}
        />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>
      {currency} {price}
      </p>
    </Link>
  );
}

export default Productitem;
