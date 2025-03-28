import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { assets } from "../assets/assets";

const ImageSlider = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const images = [assets.hero_3, assets.hero_img1, assets.hero_4, assets.hero_img];
  const mobile = [assets.mb, assets.mb_1, assets.mb_2,assets.mb_3]; // Add multiple mobile images

  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-16">
      <div className="relative w-full overflow-hidden">
        <Slider ref={sliderRef} {...settings}>
          {(isMobile ? mobile : images).map((img, index) => (
            <div key={index} className="w-full">
              <img
                src={img}
                alt={`Slider Image ${index + 1}`}
                className="w-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageSlider;
