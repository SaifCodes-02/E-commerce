import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import Productitem from "../components/Productitem";
import { Shopcontext } from '@/Context/Shopcontext';

const Collection = () => {
    const { category } = useParams();
    const { products } = useContext(Shopcontext)

    // Filter products based on category from URL
    const filteredProducts = products.filter(product => 
        !category || product.category.toLowerCase() === category.toLowerCase()
    );

    return (
        <div className='pt-20 px-2'>
 {/* Line Above Product Section */}
 <div className="w-full h-[2px] bg-gray-300 mt-1 mb-8 px-10"></div>


          <div className='pt-24 text-center pb-28 flex flex-col items-center justify-center'> 
          <h1 className='text-4xl font-bold mb-4 uppercase'>{category}'s clothing</h1>
          <p className=' text-base text-center sm:text-xl mx-auto max-w-5xl '>A fashionable selection of {category}swear - an array of blazers, shirts, T-shirts, coats, jackets, pants and jeans for men with impeccable style.</p>
          </div>
         

     
     <div className='flex flex-col items-center justify-center'> 
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-1 gap-y-5 sm:px-10 px-1' >
        {
          filteredProducts.map((item, index) => (
            <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        }
      </div>
      </div>
        </div>
    );
};

export default Collection;
