import logo from '../assets/images/audiophile.png'
import '../App.css'
import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom' 
import { ShoppingCart } from 'lucide-react'
import Footer from './Footer'
import headphone from '../assets/images/image-removebg-preview(41)(1).png'
import speaker from '../assets/images/image-removebg-preview(38)(1).png'
import earphone from '../assets/images/image-removebg-preview(42).png' 
import { ChevronRight } from 'lucide-react'

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
        <header className='bg-black lg:bg-transparent px-9 md:px-12 lg:px-32 absolute w-full z-50'>
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

        {/* Dimmed background overlay */}
        <div className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`} onClick={() => setIsOpen(false)}></div>

        <div id="mobile" className={`${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        } md:hidden absolute duration-300 ease-out w-full z-40 p-5 pt-48 bg-white rounded-[8px] transition-all`}>
            <div className='*:bg-[#F1F1F1] *:p-5 *:rounded-[8px] gap-20 md:gap-5 lg:gap-7 grid-cols-1 md:grid-cols-3   grid lg:grid-cols-3 '>
            <NavLink to="/headphones" onClick={closeMenu} className='cursor-pointer relative flex flex-col items-center'>
            <img className=' h-[146px] z-30 w-auto -m-20' src={headphone} alt="" />
            <span className='h-4 w-28 bg-neutral-500 rounded-full blur-md mt-[77px] mb-5'></span>
             <h1 className='font-bold text-[18px] tracking-[1.29px] mb-3'>HEADPHONES</h1>
            <a href='/headphones' className='cursor-pointer hover:text-[#D87D4A] hover:gap-2 duration-200 text-[13px] font-[700] tracking-[1px] text-neutral-500 flex items-center gap-1'>SHOP <ChevronRight size={15} className='text-[#D87D4A]' /> </a>
            </NavLink>

             <NavLink to="/speakers" onClick={closeMenu} className='cursor-pointer relative flex flex-col items-center'>
            <img className=' h-[146px] z-30 w-auto -m-20' src={speaker} alt="" />
            <span className='h-4 w-28 bg-neutral-500 rounded-full blur-md mt-[77px] mb-5'></span>
             <h1 className='font-bold text-[18px] tracking-[1.29px] mb-3'>SPEAKERS</h1>
            <a href='/speakers' className='cursor-pointer hover:text-[#D87D4A] hover:gap-2 duration-200 text-[13px] font-[700] tracking-[1px] text-neutral-500 flex items-center gap-1'>SHOP <ChevronRight size={15} className='text-[#D87D4A]' /> </a>
            </NavLink>

            <NavLink to="/earphones" onClick={closeMenu} className='cursor-pointer relative flex flex-col items-center'>
            <img className=' h-[146px] z-30 w-auto -m-20' src={earphone} alt="" />
            <span className='h-4 w-28 bg-neutral-500 rounded-full blur-md mt-[77px] mb-5'></span>
             <h1 className='font-bold text-[18px] tracking-[1.29px] mb-3'>EARPHONES</h1>
            <a href='/earphones' className='cursor-pointer hover:text-[#D87D4A] hover:gap-2 duration-200 text-[13px] font-[700] tracking-[1px] text-neutral-500 flex items-center gap-1'>SHOP <ChevronRight size={15} className='text-[#D87D4A]' /> </a>
            </NavLink>

        </div>
        </div>

         <Outlet />
         <Footer />
    </>

  )
}

export default Navbar
