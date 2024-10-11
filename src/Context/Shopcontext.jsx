import { createContext } from "react";
import { products } from "../assets/assets";

export const Shopcontext = createContext();

const ShopcontextProvider = (props) => {
    const currency = '$';
    const deliveryfee = 50;

    const value = {
        products,
        currency,
        deliveryfee,
    };

    return (
        <Shopcontext.Provider value={value}>
            {props.children}
        </Shopcontext.Provider>
    );
};

export default ShopcontextProvider;
