import { createContext, useState, useEffect } from "react";
import { db } from "../../firebaseConfig";            // ← your existing config
import {
  collection,
  getDocs,
  onSnapshot,   // optional: real-time updates
} from "firebase/firestore";

export const Shopcontext = createContext();

const ShopcontextProvider = ({ children }) => {
  const currency = "PKR.";
  const deliveryfee = 50;

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    const productsCol = collection(db, "products");

    // One-time fetch:
    getDocs(productsCol)
      .then((snapshot) => {
        const prods = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(prods);
      })
      .catch((err) => console.error("Error loading products:", err));

    // ── OR ──
    // Real-time listener (uncomment if you want live updates):
    // const unsubscribe = onSnapshot(productsCol, (snapshot) => {
    //   const prods = snapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //   }));
    //   setProducts(prods);
    // });
    // return () => unsubscribe();
  }, []);

  const addtocart = (itemId, size) => {
    const cartCopy = structuredClone(cart);
    if (!cartCopy[itemId]) cartCopy[itemId] = {};
    cartCopy[itemId][size] = (cartCopy[itemId][size] || 0) + 1;
    setCart(cartCopy);
  };

  const updatecart = (itemId, size, quantity) => {
    const cartCopy = structuredClone(cart);
    if (!cartCopy[itemId]) cartCopy[itemId] = {};

    if (quantity <= 0) {
      delete cartCopy[itemId][size];
      if (Object.keys(cartCopy[itemId]).length === 0) {
        delete cartCopy[itemId];
      }
    } else {
      cartCopy[itemId][size] = quantity;
    }

    setCart(cartCopy);
  };

  const getcartcount = () =>
    Object.values(cart).reduce(
      (sum, sizes) =>
        sum + Object.values(sizes).reduce((a, qty) => a + qty, 0),
      0
    );

  const value = {
    products,
    currency,
    deliveryfee,
    cart,
    addtocart,
    getcartcount,
    updatecart,
  };

  return (
    <Shopcontext.Provider value={value}>
      {children}
    </Shopcontext.Provider>
  );
};

export default ShopcontextProvider;
