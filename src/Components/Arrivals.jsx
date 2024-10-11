import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../Context/Shopcontext'
import Title from './Title';
import Productitem from './Productitem';

const Arrivals = () => {

  const { products } = useContext(Shopcontext);
  const [latestproduct, setlatestproduct] = useState([]);

  useEffect(() => {
    setlatestproduct(products.slice(0, 10));
  }, [products]);

  return (
    <div className='py-7'>
      <div className='text-center py-5 text-4xl md:text-5xl'>
        <Title text1={"NEW"} text2={"ARRIVALS"} />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-5 px-10  mx-auto'>
        {
          latestproduct.map((item, index) => (
            <Productitem key={index} id={item.id} image={item.image} name={item.name} price={item.price} />
          ))
        }
      </div>
    </div>
  )
}

export default Arrivals;
