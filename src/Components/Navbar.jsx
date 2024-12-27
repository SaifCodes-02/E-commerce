import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const [visible, setvisible] = useState(false);

    return (
        <div className='w-full flex items-center justify-around py-3 font-medium fixed z-50 bg-white' >
        
           <Link to={'/'}> <img src={assets.logo} className='w-44 cursor-pointer' alt="" /></Link>
            
            <ul className='hidden sm:flex gap-6 text-base text-gray-700'>
                <li>
                    <NavLink to='/' className={({ isActive }) => `flex items-center gap-1 ${isActive ? 'text-black' : ''}`}>
                        <p className='font-semibold'>Home</p>
                        <hr className='w-2/4 h-[1.5px] border-none bg-black' />
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/collection' className={({ isActive }) => `flex items-center gap-1 ${isActive ? 'text-black' : ''}`}>
                        <p className='font-semibold'>Collection</p>
                        <hr className='w-2/4 h-[1.5px] border-none bg-black' />
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/about' className={({ isActive }) => `flex items-center gap-1 ${isActive ? 'text-black' : ''}`}>
                        <p className='font-semibold'>About</p>
                        <hr className='w-2/4 h-[1.5px] border-none bg-black' />
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/contact' className={({ isActive }) => `flex items-center gap-1 ${isActive ? 'text-black' : ''}`}>
                        <p className='font-semibold'>Contact</p>
                        <hr className='w-2/4 h-[1.5px] border-none bg-black' />
                    </NavLink>
                </li>
            </ul>

            <div className='flex items-center gap-4'>
                <img src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
                
                <div className='group relative'>
                    <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-1 w-36 py-3 px-5 bg-blue-700 text-white rounded-md'>
                            <p className='cursor-pointer hover:font-bold'>My profile</p>
                            <p className='cursor-pointer hover:font-bold'>Orders</p>
                            <p className='cursor-pointer hover:font-bold'>Log out</p>
                        </div>
                    </div>
                </div>
                
                <Link to="/cart" className="relative">
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] text-center leading-4 w-4 bg-black aspect-square rounded-full text-[8px] text-white font-medium'>2</p>
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
