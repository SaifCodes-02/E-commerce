import { createContext } from "react";
import { products } from "../assets/assets";
import React, { useState, useEffect } from "react";
export const Shopcontext = createContext();

const ShopcontextProvider = (props) => {
    const currency = 'PKR.';
    const deliveryfee = 50;
const [cart, setcart] = useState({})

const addtocart=async (Itemid,size) => {
    
const cartdata=structuredClone(cart)

if(cartdata[Itemid])
    {
        if(cartdata[Itemid][size])
        {
            cartdata[Itemid][size]+=1;
        }
else
{

    cartdata[Itemid][size]=1;
}
}
else{

    cartdata[Itemid]={};
    cartdata[Itemid][size]=1;
}
setcart(cartdata);

}

const updatecart = (item_id, size, quantity) => {
    // Create a copy of the cart to avoid direct state mutation
    const cartdata = structuredClone(cart);
  
    // Initialize the product entry if it doesn't exist
    if (!cartdata[item_id]) {
      cartdata[item_id] = {};
    }
  
    // If the size exists in the product entry
    if (cartdata[item_id][size]) {
      if (quantity <= 0) {
        // Remove the size entry if quantity is 0 or less
        delete cartdata[item_id][size];
  
        // If the product has no sizes left, remove the product entry
        if (Object.keys(cartdata[item_id]).length === 0) {
          delete cartdata[item_id];
        }
      } else {
        // Update the quantity for the size
        cartdata[item_id][size] = quantity;
      }
    } else {
      // If the size doesn't exist, add it with the new quantity (if quantity > 0)
      if (quantity > 0) {
        cartdata[item_id][size] = quantity;
      }
    }
  
    // Update the cart state
    setcart(cartdata);
  };



const getcartcount=()=>{
    let count=0;
    for(const item in cart)
    {
        for(const size in cart[item])
        {
            count+=cart[item][size];
        }
    }
    return count;


}

   

    const value = {
        products,
        currency,
        deliveryfee,
        cart,addtocart,getcartcount,updatecart
    };

    return (
        <Shopcontext.Provider value={value}>
            {props.children}
        </Shopcontext.Provider>
    );
};

export default ShopcontextProvider;
