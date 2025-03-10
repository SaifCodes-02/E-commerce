import React, { useState, useEffect, useContext } from "react";
import { Shopcontext } from "@/Context/Shopcontext";
import { FaTrash, FaHeart, FaEdit } from "react-icons/fa"; // Icons
import { useNavigate } from 'react-router-dom'; // Correct import

const Cart = () => {
  const { products, cart, currency, updatecart } = useContext(Shopcontext);
  const [cartdata, setcartdata] = useState([]);
  const navigate = useNavigate(); // Use the hook to get the navigate function

  useEffect(() => {
    const tempdata = [];
    for (const item in cart) {
      for (const size in cart[item]) {
        const product = products.find((product) => product._id === item);
        if (product) {
          tempdata.push({
            product,
            size,
            quantity: cart[item][size],
          });
        }
      }
    }
    setcartdata(tempdata);
  }, [cart, products]);

  const handleincrement = (product_id, size) => {
    const currentcount = cart[product_id][size] || 0;
    updatecart(product_id, size, currentcount + 1);
  };

  const handledecrement = (product_id, size) => {
    const currentcount = cart[product_id][size] || 0;
    if (currentcount > 1) {
      updatecart(product_id, size, currentcount - 1);
    }
  };

  const subtotal = cartdata.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="pt-20 max-w-7xl mx-auto px-4">
      {/* Line Above Cart Section */}
      <div className="w-full h-[2px] bg-gray-300 mt-2 mb-8"></div>
      <h2 className="text-3xl font-bold text-center mb-6 bg-gray-100 w-full">SHOPPING CART</h2>

      {/* Desktop View */}
      <div className="hidden sm:block">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-center">Quantity</th>
              <th className="p-3 text-center">Price</th>
              <th className="p-3 text-center">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartdata.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-3 flex items-center gap-4">
                  <img src={item.product.image[0]} alt={item.product.name} className="w-30 h-20 object-contain rounded-sm" />
                  <div>
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm font-medium">Size: {item.size.toUpperCase()}</p>
                    <div className="text-center text-gray-600 flex items-center gap-2 pt-2">
                      <span><FaTrash className="cursor-pointer hover:text-red-500" /></span>
                      <span><FaHeart className="cursor-pointer hover:text-pink-500" /></span>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => handledecrement(item.product._id, item.size)} className="bg-black text-white px-2 py-1 rounded-full">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleincrement(item.product._id, item.size)} className="bg-black text-white px-2 py-1 rounded-full">+</button>
                  </div>
                </td>
                <td className="p-3 text-center">{currency} {item.product.price.toLocaleString()}</td>
                <td className="p-3 text-center">{currency} {(item.product.price * item.quantity).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="block sm:hidden">
        {cartdata.map((item, index) => (
          <div key={index} className="border-b py-4">
            <div className="flex flex-col gap-4">
              <img src={item.product.image[0]} alt={item.product.name} className="w-28 h-28 object-cover rounded-md" />
              <div>
                <h3 className="font-semibold text-lg">{item.product.name}</h3>
                <p className="text-gray-600 text-sm">Size: {item.size.toUpperCase()}</p>
                <p className="text-green-600 text-sm">In Stock</p>
                <p className="font-semibold">{currency} {item.product.price.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button className="bg-black text-white px-2 py-1 rounded-full">-</button>
                  <span>{item.quantity}</span>
                  <button className="bg-black text-white px-2 py-1 rounded-full">+</button>
                </div>
                <p className="font-semibold mt-2">{currency} {(item.product.price * item.quantity).toLocaleString()}</p>
                <div className="flex gap-2 mt-2 text-gray-600">
                  <FaTrash className="cursor-pointer hover:text-red-500" />
                  <FaHeart className="cursor-pointer hover:text-pink-500" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Note & Checkout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-20 gap-4 mb-20">
        <div className="w-full sm:w-1/2">
          <label className="font-semibold">Add Order Note</label>
          <textarea className="w-full border p-2 mt-2 rounded-md" placeholder="How can we help you?"></textarea>
        </div>
        <div className="text-center sm:text-left w-full sm:w-1/3">
          <p className="text-lg font-semibold text-gray-600">Subtotal: <span className="text-red-500">{currency} {subtotal.toLocaleString()}</span></p>
          <button onClick={() => navigate('/place-order')} className="bg-black text-white px-6 py-2 rounded-md mt-2 hover:bg-gray-800 w-full">CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;