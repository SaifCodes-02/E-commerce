import React from 'react'
import Hero from '../Components/Hero'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Specs from '../Components/Specs';
import Arrivals from '../Components/Arrivals';
import HighlightsSlider from '../Components/HighlightsSlider';



const Home = () => {
  return (
    <div>
   <div ><Hero/></div>
   <div><Specs/></div>
 <div><Arrivals/></div>
   <HighlightsSlider/>
    </div>
  )
}

export default Home
