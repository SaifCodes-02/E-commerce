import React from 'react';
import { motion, useInView } from 'framer-motion';
import { assets } from '../assets/assets';

const Shop=() =>{
  const womenImageRef = React.useRef(null); // Ref for Women's image
  const menImageRef = React.useRef(null); // Ref for Men's image

  const isWomenImageInView = useInView(womenImageRef, { once: true }); // Trigger animation once for Women's image
  const isMenImageInView = useInView(menImageRef, { once: true }); // Trigger animation once for Men's image

  return (
    <div className="flex flex-col lg:flex-row mt-5">
      {/* Women's Section */}
      <motion.div
        ref={womenImageRef}
        initial={{ y: 100, opacity: 0 }} // Start off-screen below and invisible
        animate={isWomenImageInView ? { y: 0, opacity: 1 } : {}} // Slide up and become visible
        transition={{ duration: 1 }}
        className="relative w-full lg:w-1/2"
      >
        <img
          src={assets.womenwatch}
          alt="Women's Watch"
          className="w-full h-[700px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
          <motion.h2
            initial={{ x: '-100%', opacity: 0 }}
            animate={isWomenImageInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="text-3xl font-bold mb-4"
          >
           FALL WOMEN'S COLLECTION
          </motion.h2>
          <motion.button
            initial={{ x: '-100%', opacity: 0 }}
            animate={isWomenImageInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-white text-black px-6 py-2 font-medium uppercase hover:bg-gray-200 transition"
          >
            Shop Now
          </motion.button>
        </div>
      </motion.div>

      {/* Men's Section */}
      <motion.div
        ref={menImageRef}
        initial={{ y: 100, opacity: 0 }} // Start off-screen below and invisible
        animate={isMenImageInView ? { y: 0, opacity: 1 } : {}} // Slide up and become visible
        transition={{ duration: 1 }}
        className="relative w-full lg:w-1/2"
      >
        <img
          src={assets.menjwel}
          alt="Men's Jewelry"
          className="w-full h-[700px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
          <motion.h2
            initial={{ x: '200%', opacity: 0 }}
            animate={isMenImageInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="text-3xl font-bold mb-4"
          >
         FALL MEN COLLECTION
          </motion.h2>
          <motion.button
            initial={{ x: '200%', opacity: 0 }}
            animate={isMenImageInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-white text-black px-6 py-2 font-medium uppercase hover:bg-gray-200 transition"
          >
            Shop Now
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default Shop;
