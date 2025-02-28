import React, { useContext, useState, useEffect } from "react";
import { Shopcontext } from "@/Context/Shopcontext";
import { useParams } from "react-router-dom";
import ImageMagnifier from "@/Components/ImageMagnifier";
import Related from "@/Components/Related";


const Product = () => {
  const { productId } = useParams();
  const { products,currency } = useContext(Shopcontext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState(null);
const [size, setsize] = useState(null)
const [activeTab, setActiveTab] = useState("description");
  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    setProductData(product || null);
    setImage(product?.image?.[0] || null); // Set first image as default
  }, [productId, products]);

  if (!productData) return <div>Loading...</div>;

  return (
    <div className="pt-20 px-4 lg:px-20">
      {/* Line above the product section */}
      <div className="w-full h-[2px] bg-gray-300 mt-4 mb-8"></div>

      {/* Main Container - Flexbox Layout */}
      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Left Section - Product Images */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-2">
          
          {/* Thumbnail Images - Scrollable */}
          <div className="flex items-center sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2 h-32 sm:h-auto">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product ${index + 1}`}
                className="w-28 h-28 object-cover cursor-pointer hover:border-black"
                onClick={() => setImage(img)}
              />
            ))}
          </div>

          {/* Main Image Display with Zoom Effect */}
          <div className="w-full max-w-md mx-auto">
            
            <ImageMagnifier src={image} width={400} height={480}/>
          </div>

        </div>

        {/* Right Section - Product Details */}
        <div className="flex-1">
          {/* Product Title */}
          <h1 className="text-2xl font-semibold">{productData.name}</h1>
          
          {/* Ratings */}
          <div className="flex items-center space-x-1 mt-2">
            <span className="text-yellow-500 text-lg">★★★★☆</span>
            <span className="text-gray-500">({productData.reviews} reviews)</span>
          </div>

         
          {/* Description */}
          <p className="text-gray-600 mt-4">{productData.description}</p>


           {/* Price */}
           <p className="text-2xl font-bold text-black mt-2">{currency}{productData.price}</p>


          {/* Size Selection */}
          <div className="mt-3">
            <h3 className="text-lg font-medium">Select Size</h3>
            <div className="flex space-x-3 mt-2">
              {productData.sizes.map((item,index) => (
               <button
               key={index}
               className={`px-4 py-2 border rounded-lg hover:bg-black hover:text-white transition ${
                 item === size ? 'bg-black text-white' : '' }`}
               onClick={() => setsize(item)}
             >
               {item}
             </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
            ADD TO CART
          </button>
{/* line */}
          <div className="w-full h-[2px] bg-gray-300 mt-4 mb-8"></div>

          {/* Extra Information */}
          <div className="mt-4 text-gray-500 text-sm">
            <p> 100% Original product.</p>
            <p> Cash on delivery available.</p>
            <p> Easy return and exchange within 7 days.</p>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto py-10">
  {/* Tab */}
  <div className="border-b border-gray-300">
    <button
      className="px-4 py-2 text-sm font-bold border-b-2 border-black text-black"
    >
      Description
    </button>
  </div>

  {/* Tab Content */}
  <div className="border border-gray-300 p-4 mt-2 text-gray-700 text-sm">
    <p>
    This e-commerce platform showcases a clothing brand that balances style and affordability—neither too premium nor too cheap. With a sleek design, seamless navigation, and detailed product pages, it ensures a smooth shopping experience. Customers can explore a diverse collection with size and color options tailored for every occasion.    </p>
    <br />
    <p>
    <i> (Built as part of my developer portfolio, this site highlights my expertise in web development and e-commerce solutions.)  </i> </p>
  </div>
</div>


{/* Related Product Section */}

<div className="">

<Related category={productData.category} subCategory={productData.subCategory}/>


</div>


    </div>
  );
};

export default Product;
