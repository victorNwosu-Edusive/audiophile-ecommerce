import logo from '../assets/images/audiophile.png'
import '../App.css'
import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, Minus, Plus, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import Footer from './Footer'
import headphone from '../assets/images/image-removebg-preview(41)(1).png'
import speaker from '../assets/images/image-removebg-preview(38)(1).png'
import earphone from '../assets/images/image-removebg-preview(42).png'
import { ChevronRight } from 'lucide-react'

// Cart Item Component
const CartItem = ({ item, updateQuantity }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-4">
        {/* Placeholder image/icon for the product */}
        <div className="w-16 h-16 bg-[#F1F1F1] p-3 rounded-lg flex items-center justify-center overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/64x64/E5E7EB/4B5563?text=🎧"; }}
          />
        </div>
        <div>
          <h4 className="text-[15px] font-bold text-black">{item.modelname}</h4>
          <p className="text-[13px] text-gray-500 font-bold">${item.price.toLocaleString()}</p>
        </div>
      </div>

      {/* Quantity Controls (Matching the image style) */}
      <div className="flex items-center h-8 bg-[#F1F1F1] text-xs font-semibold">
        <button
          className="w-6 h-full text-gray-500 hover:text-orange-500 transition-colors flex items-center justify-center"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          aria-label={`Decrease quantity of ${item.name}`}
        >
          <Minus size={12} />
        </button>
        <span className="px-2 text-gray-700 w-6 text-center">{item.quantity}</span>
        <button
          className="w-6 h-full text-gray-500 hover:text-orange-500 transition-colors flex items-center justify-center"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          aria-label={`Increase quantity of ${item.name}`}
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
};

// Cart Modal Component
const CartModal = ({ isVisible, toggleCart }) => {
  const { cart, updateQuantity, clearCart, getTotal } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  if (!isVisible) return null;

  // Modal positioning and styling:
  // - Fixed position with full screen for mobile/tablet (up to lg)
  // - Absolute position right-aligned for desktop (lg:absolute)
  const modalClasses = `
    fixed inset-0 z-40 flex lg:block
    lg:inset-auto lg:top-28 lg:right-32 lg:w-full lg:max-w-md lg:h-auto
    justify-center items-center p-4
  `;

  // Content card styling:
  // - Centered content for small screens
  // - Shadow and rounded corners
  const contentClasses = `
    w-full max-w-sm bg-white rounded-lg shadow-2xl p-6
    lg:float-right
    transform transition-all duration-300 ease-in-out
    ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
  `;

  return (
    <>
      {/* Dimmed background */}
      <div className={`fixed inset-0 bg-black/50 z-39 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={toggleCart}></div>
      <div className={modalClasses} onClick={toggleCart}>
        {/* Stop propagation so clicking inside the modal doesn't close it */}
        <div className={contentClasses} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold uppercase tracking-wider">
            Cart ({cart.length})
          </h3>
          <button
            onClick={clearCart}
            className="text-xs text-gray-500 underline transition-colors cursor-pointer"
          >
            Remove all
          </button>
        </div>

        {/* Cart Items List */}
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Your cart is empty.</p>
          ) : (
            cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
              />
            ))
          )}
        </div>

        {/* Total and Checkout */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <p className="uppercase text-gray-500 text-sm">Total</p>
            <p className="text-xl font-bold">${getTotal().toLocaleString()}</p>
          </div>

          <button
            className="w-full bg-[#D87D4A] hover:bg-[#FBAF85] text-white uppercase text-[13px] font-bold py-3 transition-colors duration-200 cursor-pointer"
            disabled={cart.length === 0}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

function Navbar() {
    const { getItemCount } = useCart();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
      };

    const toggleCart = () => setIsCartVisible(!isCartVisible);

  const isProductOrCheckoutPage = location.pathname.startsWith('/product') || location.pathname === '/checkout';

  return (
    <>
        <header className={`${isProductOrCheckoutPage ? 'bg-black' : 'bg-black lg:bg-transparent'} px-9 md:px-12 lg:px-32 absolute w-full z-50`}>
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
        <NavLink to="/"><img src={logo} alt="" /></NavLink>
        </div>

        <div className='hidden md:hidden lg:block'>
          <ul className="flex gap-x-8 decoration-none text-white">
            <li><NavLink to="/" className='font-bold text-[13px] tracking-widest hover:text-[#d87d4a] duration-200'>HOME</NavLink></li>
            <li><NavLink to="/headphones" className='font-bold text-[13px] tracking-widest hover:text-[#d87d4a] duration-200'>HEADPHONES</NavLink></li>
            <li><NavLink to="/speakers" className='font-bold text-[13px] tracking-widest hover:text-[#d87d4a] duration-200'>SPEAKERS</NavLink></li>
            <li><NavLink to="/earphones" className='font-bold text-[13px] tracking-widest hover:text-[#d87d4a] duration-200'>EARPHONES</NavLink></li>
          </ul>
        </div>
       
       <div className="relative cursor-pointer" onClick={toggleCart}>
        <ShoppingCart color='white'/>
        {getItemCount() > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#D87D4A] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {getItemCount()}
          </span>
        )}
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
         <CartModal isVisible={isCartVisible} toggleCart={toggleCart} />
    </>

  )
}

export default Navbar
