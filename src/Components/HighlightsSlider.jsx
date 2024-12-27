import React, { useContext } from 'react';
import Slider from 'react-slick';
import Title from './Title';
import { Shopcontext } from '../Context/Shopcontext';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Productitem from './Productitem';

const HighlightsSlider = () => {
  const { products, currency } = useContext(Shopcontext);

  // Filter to show only bestseller products
  const bestsellerProducts = products.filter(product => product.bestseller);

  // Slider settings for react-slick
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Default for larger screens
    autoplay: true, // Enable autoplay
  autoplaySpeed: 3000, // Slide every 3 seconds
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280, // Large screen
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024, // Medium screen
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Small screen
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Extra small screen
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="relative py-8 overflow-hidden">
      <div className="text-center py-5 text-4xl md:text-5xl">
        <Title text2={"TRENDING"} text1={"NOW"} />
      </div>

      <Slider {...settings} className="slider mx-auto px-4 md:px-10 space-x-2">
        {bestsellerProducts.map((item, index) => (
          <div key={index} className="mx-auto">
            <Productitem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              imgClass="w-full max-w-xs md:max-w-sm lg:max-w-md px-1 " // Responsive sizing
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Custom Next Arrow component
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer bg-gray-300 text-white rounded-full p-2 z-10"
      onClick={onClick}
    >
      <FaChevronRight />
    </div>
  );
};

// Custom Prev Arrow component
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 transform -translate-y-1/2 left-2 cursor-pointer bg-gray-300 text-white rounded-full p-2 z-10"
      onClick={onClick}
    >
      <FaChevronLeft />
    </div>
  );
};

export default HighlightsSlider;
