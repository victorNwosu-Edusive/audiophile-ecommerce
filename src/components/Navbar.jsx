import logo from '../assets/images/audiophile.png'
import '../App.css'
import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom' 
import { ShoppingCart } from 'lucide-react'
import Footer from './Footer'

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
      };


  return (
    <>
        <header className='px-12 md:px-12 lg:px-32 absolute w-full z-50'>
        <nav className='w-full bg-transparent flex justify-between p-7 px-0 items-center border-b-[1px] border-solid border-[#ffffff4d]'>
       
       <div className="lg:hidden"  onClick={toggleMenu}>
          <button className="text-white focus:outline-none relative scale-x-[-1] w-6 h-6 cursor-pointer">
            <span
              className={`block absolute w-6 h-0.5 bg-white transition-transform duration-300 ${
                isOpen ? 'rotate-45' : '-translate-y-1.5'
              }`}
            ></span>
            <span
              className={`block absolute w-6 h-0.5 bg-white transition-opacity duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span
              className={`block absolute w-6 h-0.5 bg-white transition-transform duration-300 ${
                isOpen ? '-rotate-45' : 'translate-y-1.5'
              }`}
            ></span>
          </button>
        </div>
        
        <div>
        <a href=""><img src={logo} alt="" /></a>
        </div>

        <div className='hidden md:hidden lg:block'>
          <ul className="flex gap-x-8 decoration-none text-white">
            <li><NavLink to="/" className='font-bold text-[13px] tracking-widest hover:text-[#d87d4a] duration-200'>HOME</NavLink></li>
            <li><NavLink to="/headphones" className='font-bold text-[13px] tracking-widest hover:text-[#d87d4a] duration-200'>HEADPHONES</NavLink></li>
            <li><NavLink to="/speakers" className='font-bold text-[13px] tracking-widest hover:text-[#d87d4a] duration-200'>SPEAKERS</NavLink></li>
            <li><NavLink to="/earphones" className='font-bold text-[13px] tracking-widest hover:text-[#d87d4a] duration-200'>EARPHONES</NavLink></li>
          </ul>
        </div>
       
       <div>
        <a href=""><ShoppingCart color='white'/></a>
       </div>
       </nav>
        </header>

         <Outlet />
         <Footer />
    </>

  )
}

export default Navbar
