import React from 'react';
import Hero from '../Components/Hero';
import Specs from '../Components/Specs';
import Arrivals from '../Components/Arrivals';
import HighlightsSlider from '../Components/HighlightsSlider';

import Footer from '../Components/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Shop from '../Components/Shop';


const Home = () => {
  return (
    <div>
      <div>
        <Hero />
      </div>
      <div>
        <Specs />
      </div>
      <div>
        <Arrivals />
      </div>
      
      <HighlightsSlider />

      <div className='mb-3'><Shop/> </div>
<Footer/>
     {/* Use the ShopNow component */}
    </div>
  );
};

export default Home;
