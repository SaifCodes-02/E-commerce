import React, { useContext, useState, useEffect } from "react";
import { Shopcontext } from "@/Context/Shopcontext";
import { useParams } from "react-router-dom";
import ImageMagnifier from "@/Components/ImageMagnifier";
import Related from "@/Components/Related";
import { Alert } from "@/Components/Alert";
import { CircleCheck, AlertTriangle } from "lucide-react";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addtocart } = useContext(Shopcontext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState(null);
  const [size, setSize] = useState(null);
  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    setProductData(product || null);
    setImage(product?.image?.[0] || null); // Set first image as default
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!size) {
      setAlert({ type: "error", message: "Please select a size before adding to cart!" });
      setTimeout(() => {
        setAlert({ type: "", message: "" });
      }, 2000); // Error alert disappears after 3 seconds
      return;
    }

    addtocart(productData._id, size);
    setAlert({ type: "success", message: "Added to cart successfully!" });
    setSize(null);

    setTimeout(() => {
      setAlert({ type: "", message: "" });
    }, 2000);
  };

  if (!productData) return <div>Loading...</div>;

  return (
    <div className="pt-20 px-4 lg:px-20">
      {/* Alert Section */}
      {alert.message && (
        <Alert
          layout="row"
          icon={
            alert.type === "success" ? (
              <CircleCheck className="text-emerald-500" size={16} strokeWidth={2} />
            ) : (
              <AlertTriangle className="text-red-500" size={16} strokeWidth={2} />
            )
          }
          className={`fixed top-5 right-5 z-50 shadow-md p-3 border ${
            alert.type === "success" ? "bg-green-100 border-emerald-500" : "bg-red-100 border-red-500"
          }`}
        >
          <p className="text-sm">{alert.message}</p>
        </Alert>
      )}

      {/* Line Above Product Section */}
      <div className="w-full h-[2px] bg-gray-300 mt-4 mb-8"></div>

      {/* Main Container */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Section - Product Images */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-2">
          {/* Thumbnail Images */}
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

          {/* Main Image */}
          <div className="w-full max-w-md mx-auto">
            <ImageMagnifier src={image} width={400} height={480} />
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{productData.name}</h1>
          <div className="flex items-center space-x-1 mt-2">
            <span className="text-yellow-500 text-lg">★★★★☆</span>
            <span className="text-gray-500">({productData.reviews} reviews)</span>
          </div>
          <p className="text-gray-600 mt-4">{productData.description}</p>
          <p className="text-2xl font-bold text-black mt-2">{currency}{productData.price}</p>

          {/* Size Selection */}
          <div className="mt-3">
            <h3 className="text-lg font-medium">Select Size</h3>
            <div className="flex space-x-3 mt-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border rounded-lg hover:bg-black hover:text-white transition ${
                    item === size ? "bg-black text-white" : ""
                  }`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleAddToCart} className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
            ADD TO CART
          </button>

          <div className="w-full h-[2px] bg-gray-300 mt-4 mb-8"></div>

          <div className="mt-4 text-gray-500 text-sm">
            <p>100% Original product.</p>
            <p>Cash on delivery available.</p>
            <p>Easy return and exchange within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Tab Section */}
      <div className="w-full mx-auto py-10">
        <div className="border-b border-gray-300">
          <button className="px-4 py-2 text-sm font-bold border-b-2 border-black text-black">
            Description
          </button>
        </div>
        <div className="border border-gray-300 p-4 mt-2 text-gray-700 text-sm">
          <p>This e-commerce platform showcases a clothing brand that balances style and affordability.</p>
          <br />
          <p><i>(Built as part of my developer portfolio, this site highlights my expertise in web development and e-commerce solutions.)</i></p>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <Related category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  );
};

export default Product;
