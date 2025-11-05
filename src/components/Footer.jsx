import logo from '../assets/images/audiophile.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../App.css'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare'
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { NavLink } from 'react-router-dom'

function Footer() {

  return (
    <>
        <footer className='bg-[#101010] p-12 lg:px-32 absolute w-full z-20'>
        <div className='w-full bg-transparent flex flex-col md:flex-col lg:flex-row justify-between p-10 px-0 lg:items-center md:items-start items-center md:gap-5 lg:gap-0 gap-5 ]'>
        <div>
        <NavLink to="/"><img src={logo} alt="" /></NavLink>
        </div>
        <div>
          <ul className="flex flex-col md:flex-row lg:flex-row items-center gap-x-8 gap-y-4 decoration-none text-white">
            <li><NavLink to='/' className='font-bold text-[13px] tracking-widest hover:text-[#d87d4a] duration-200'>HOME</NavLink></li>
            <li><NavLink to="/headphones" className='font-bold text-[13px] tracking-widest hover:text-[#d87d4a] duration-200'>HEADPHONES</NavLink></li>
            <li><NavLink to="/speakers" className='font-bold text-[13px] tracking-widest hover:text-[#d87d4a] duration-200'>SPEAKERS</NavLink></li>
            <li><NavLink to="/earphones" className='font-bold text-[13px] tracking-widest hover:text-[#d87d4a] duration-200'>EARPHONES</NavLink></li>
          </ul>
        </div>
        </div>

        <div className='lg:grid lg:grid-cols-2 flex flex-col gap-20 pb-10 items-center lg:items-start'>
            <div>
                <p className='text-[15px] text-[#7D7D7D] mt-5 leading-7 text-center md:text-left lg:text-left'>Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted 
                    to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.</p>
            </div>

            <div className='lg:block md:hidden hidden flex gap-3 justify-end ml-auto mt-auto *:cursor-pointer *:hover:text-[#D87D4A] duration-200 *:duration-200'>
                <FontAwesomeIcon className='text-[#FFFFFF] text-[27px]' icon={faFacebookSquare} />
                <FontAwesomeIcon className='text-[#FFFFFF] text-[27px]' icon={faTwitter} />
                <FontAwesomeIcon className='text-[#FFFFFF] text-[27px]' icon={faInstagram} />

            </div>
        </div>

        <div className='flex justify-between items-center flex-col gap-4 md:flex-row '>
        <p className='text-[15px] text-[#7D7D7D] mt-5 leading-7 font-bold text-center md:text-left lg:text-left mb-7'>Copyright 2021. All Rights Reserved</p>
       
        <div className='lg:hidden md:block block flex gap-3 *:cursor-pointer *:hover:text-[#D87D4A] duration-200 *:duration-200'>
                <FontAwesomeIcon className='text-[#FFFFFF] text-[27px]' icon={faFacebookSquare} />
                <FontAwesomeIcon className='text-[#FFFFFF] text-[27px]' icon={faTwitter} />
                <FontAwesomeIcon className='text-[#FFFFFF] text-[27px]' icon={faInstagram} />

            </div>
        </div>

       </footer>
    </>
  )
}

export default Footer
