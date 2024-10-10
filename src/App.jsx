import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Collection from './Pages/Collection';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Login from './Pages/Login';

// Make sure to import Orders from its correct file path
import Orders from './Pages/Orders'; // Change this line to point to the correct Orders component
import PlaceOrder from './Pages/PlaceOrder';
import Contact from './Pages/Contact';
import Navbar from './Components/Navbar';


const App = () => {
  return (
    <div >
    <div className='w-full'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/product' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </div>
    </div>
  );
};

export default App;
