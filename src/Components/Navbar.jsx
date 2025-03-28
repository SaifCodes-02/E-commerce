import React, { useState,useContext } from 'react';
import { useEffect } from "react";
import { Shopcontext } from "@/Context/Shopcontext";
import { assets } from '../assets/assets';
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Navbar = () => {
    const [visible, setvisible] = useState(false);
    const location = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, [location.pathname]);

      const{getcartcount}=useContext(Shopcontext);
    return (
        <div className='w-full flex items-center justify-around py-3 font-medium fixed z-50 bg-white' >
        
        <Link
        to="/"
        onClick={(e) => {
          if (location.pathname === "/") {
            e.preventDefault(); // Prevent reloading if already on home
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}><img src={assets.logo} alt="Logo" className="w-44 cursor-pointer" /></Link>
            
    <ul className='hidden sm:flex gap-8 text-lg text-black '>
    <li>
    <NavLink 
            to="/" 
            className="flex items-center gap-1 hover:text-gray-600 font-normal"
            onClick={(e) => {
                if (location.pathname === "/") {
                    e.preventDefault(); // Prevent reloading if already on home
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
            }}
        >
            <p className='font-medium'>HOME</p>
            <hr className='w-full h-[1.5px] border-none bg-black' />
        </NavLink>
    </li>
    <li>
        <NavLink 
            to='/collection' 
            className="flex items-center gap-1 hover:text-gray-600"
        >
            <p className='font-medium'>MEN</p>
            <hr className='w-2/4 h-[1.5px] border-none bg-black' />
        </NavLink>
    </li>
    <li>
        <NavLink 
            to='/about' 
            className="flex items-center gap-1 hover:text-gray-600"
        >
            <p className='font-medium'>WOMEN</p>
            <hr className='w-2/4 h-[1.5px] border-none bg-black' />
        </NavLink>
    </li>
    <li>
        <NavLink 
            to='/contact' 
            className="flex items-center gap-1 hover:text-gray-600"
        >
            <p className='font-medium'>KIDS</p>
            <hr className='w-2/4 h-[1.5px] border-none bg-black' />
        </NavLink>
    </li>
</ul>



            <div className='flex items-center gap-4'>
                <img src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
                
                <div className='group relative'>
                    <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-1 w-36 py-3 px-5 bg-gray-200 text-gray-600 rounded-md'>
                            <p className='cursor-pointer hover:font-bold'>My profile</p>
                            <p className='cursor-pointer hover:font-bold'>Orders</p>
                            <p className='cursor-pointer hover:font-bold'>Log out</p>
                        </div>
                    </div>
                </div>
                
                <Link to="/cart" className="relative">
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] text-center leading-4 w-4 bg-black aspect-square rounded-full text-[8px] text-white font-medium'>{getcartcount()}</p>
                </Link>

                <img src={assets.menu_icon} onClick={() => { setvisible(true) }} className='w-5 block sm:hidden cursor-pointer' alt="" />
            </div>

            <div className={`absolute top-0 right-0 overflow-hidden transition-all bg-[#f5f5f5]   ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-800'>
                    <div onClick={() => { setvisible(false) }} className='flex items-center gap-4 py-3 cursor-pointer '>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                    </div>
                    <NavLink onClick={() => { setvisible(false) }} className="py-2 pl-6 border" to="/">Home</NavLink>
                    <NavLink onClick={() => { setvisible(false) }} className="py-2 pl-6 border" to="/collection">Collection</NavLink>
                    <NavLink onClick={() => { setvisible(false) }} className="py-2 pl-6 border" to="/about">About</NavLink>
                    <NavLink onClick={() => { setvisible(false) }} className="py-2 pl-6 border" to="/contact">Contact</NavLink>
                </div>
            </div>
    
        </div>

    );
};

export default Navbar;
