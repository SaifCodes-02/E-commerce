import { createContext } from "react";
import { products } from "../assets/assets";
import React, { useState, useEffect } from "react";
export const Shopcontext = createContext();

const ShopcontextProvider = (props) => {
    const currency = '$';
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
useEffect(() => {
    console.log(cart);
    
   }, [cart])
   

    const value = {
        products,
        currency,
        deliveryfee,
        cart,addtocart
    };

    return (
        <Shopcontext.Provider value={value}>
            {props.children}
        </Shopcontext.Provider>
    );
};

export default ShopcontextProvider;
