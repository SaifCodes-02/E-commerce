import React from 'react';
import { assets } from '../assets/assets'; // Make sure to update the assets path accordingly

const Specs = () => {
  return (
    <div className='py-2'>
      <div className='grid grid-cols-2  md:grid-cols-4 gap-4'>
        
        {/* Free Delivery */}
        <div className='flex items-center justify-center gap-2 p-4 '>
          <img src={assets.delivery_icon} className='w-12' alt="Delivery Icon" />
          <div>
            <p className='font-bold'>Free Delivery</p>
            <p className='text-sm text-gray-700'>For all orders over $99</p>
          </div>
        </div>

        {/* 30 Days Return */}
        <div className='flex items-center justify-center gap-2 p-4 '>
          <img src={assets.exchange_icon} className='w-12' alt="Return Icon" />
          <div>
            <p className='font-bold'>30 Days Return</p>
            <p className='text-sm text-gray-700'>If goods have problems</p>
          </div>
        </div>

        {/* Secure Payment */}
        <div className='flex items-center justify-center gap-2 p-4 '>
          <img src={assets.pay_icon} className='w-12' alt="Payment Icon" />
          <div>
            <p className='font-bold'>Secure Payment</p>
            <p className='text-sm text-gray-700'>100% secure payment</p>
          </div>
        </div>

        {/* 24/7 Support */}
        <div className='flex items-center justify-center gap-2 p-4 '>
          <img src={assets.support_img} className='w-12' alt="Support Icon" />
          <div>
            <p className='font-bold'>24/7 Support</p>
            <p className='text-sm text-gray-700'>Dedicated support</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Specs;
