import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../App.css'
import hero from '../assets/images/Bitmap.png'
import headphone from '../assets/images/image-removebg-preview(41)(1).png'
import speaker from '../assets/images/image-removebg-preview(38)(1).png'
import bigspeaker from '../assets/images/image-removebg-preview(38)(2).png'
import earphone from '../assets/images/image-removebg-preview(42).png' 
import earphoner from '../assets/images/Bitmap(3).png'
import headphoneone from '../assets/images/image-removebg-preview(47)(1).png'  
import headphonewhite from '../assets/images/image-removebg-preview(48)(1).png'  
import speakerblack from '../assets/images/image-removebg-preview(49)(1).png'  
import headphoneuser from '../assets/images/Bitmap(4).png' 
import ScrollToTop from '../components/scrolltotop'

function Speakers() {

  return (
    <>
    <ScrollToTop />
      <main className=' w-full'>
      <section className='bg-[#000000] pt-48 lg:pt-48 lg:px-32 p-16 md:p-16 flex items-center justify-center'>
            <h2 className='text-[28px] lg:text-[40px] font-bold text-white tracking-[1.43px] mb-5'>SPEAKERS</h2>
            
      </section>

       <section className=' md:pt-32 p-12 md:p-12 lg:p-32'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:items-center gap-10'>
            <div className='p-20 bg-[#F1F1F1] rounded-[8px]' >
                <img src={bigspeaker} alt="" />
                 <span className='h-9 w-28 bg-neutral-500 rounded-full blur-md mt-[77px] mb-5'></span>
            </div>
            <div className='flex md:block lg:block flex-col justify-center items-center lg:items-left'>
                 <p className='text-[#D87D4A] tracking-[10px] text-[14px] mb-5'>NEW PRODUCTS</p>
            <h1 className='text-[36px] md:text-[50px] lg:text-[50px] font-bold text-black text-center md:text-left lg:text-left leading-10  lg:leading-14 mb-5'>ZX9 <br /> SPEAKER</h1>
            <p className='text-[15px] text-[#666666] text-center md:text-left lg:text-left mb-10 font-[500]'>Upgrade your sound system with the all new ZX9 active speaker. 
                It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.</p>
            <Link to="/product/3" className='bg-[#D87D4A] px-7 py-3 text-white text-[13px] font-bold hover:bg-[#FBAF85] duration-200 tracking-[1px] inline-block'>SEE PRODUCT</Link>
            </div>

        </div>


        <div className='grid grid-cols-1 md:grid-cols-2 pt-32 lg:grid-cols-2 lg:items-center gap-10'>
           <div className='flex md:block lg:block flex-col justify-center items-center lg:items-left order-2 lg:order-1'>
            <h1 className='text-[36px] md:text-[50px] lg:text-[50px] font-bold text-black text-center md:text-left lg:text-left leading-10  lg:leading-14 mb-5'>ZX7 <br /> SPEAKERS</h1>
            <p className='text-[15px] text-[#666666] text-center md:text-left lg:text-left mb-10 font-[500]'>Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile 
                components that represents the top of the line powered speakers for home or studio use.</p>
            <Link to="/product/7" className='bg-[#D87D4A] px-7 py-3 text-white text-[13px] font-bold hover:bg-[#FBAF85] duration-200 tracking-[1px] inline-block'>SEE PRODUCT</Link>
            </div>

             <div className='p-20 bg-[#F1F1F1] rounded-[8px] order-1 lg:order-2' >
                <img src={speakerblack} alt="" />
                 <span className='h-9 w-28 bg-neutral-500 rounded-full blur-md mt-[77px] mb-5'></span>
            </div>

        </div>

      </section>


      <section className='pt-32 md:pt-32 p-12 md:p-12 lg:p-32 lg:pt-40'>
        <div className='*:bg-[#F1F1F1] *:p-5 *:rounded-[8px] gap-20 md:gap-5 lg:gap-7 grid-cols-1 md:grid-cols-3   grid lg:grid-cols-3 '>
            <div className='relative flex flex-col items-center'>
            <img className=' h-[146px] z-50 w-auto -m-20' src={headphone} alt="" />
            <span className='h-4 w-28 bg-neutral-500 rounded-full blur-md mt-[77px] mb-5'></span>
             <h1 className='font-bold text-[18px] tracking-[1.29px] mb-3'>HEADPHONES</h1>
            <button className='cursor-pointer hover:text-[#D87D4A] hover:gap-2 duration-200 text-[13px] font-[700] tracking-[1px] text-neutral-500 flex items-center gap-1'>SHOP <ChevronRight size={15} className='text-[#D87D4A]' /> </button>
            </div>

             <div className='relative flex flex-col items-center'>
            <img className=' h-[146px] z-50 w-auto -m-20' src={speaker} alt="" />
            <span className='h-4 w-28 bg-neutral-500 rounded-full blur-md mt-[77px] mb-5'></span>
             <h1 className='font-bold text-[18px] tracking-[1.29px] mb-3'>SPEAKERS</h1>
            <button className='cursor-pointer hover:text-[#D87D4A] hover:gap-2 duration-200 text-[13px] font-[700] tracking-[1px] text-neutral-500 flex items-center gap-1'>SHOP <ChevronRight size={15} className='text-[#D87D4A]' /> </button>
            </div>

            <div className='relative flex flex-col items-center'>
            <img className=' h-[146px] z-50 w-auto -m-20' src={earphone} alt="" />
            <span className='h-4 w-28 bg-neutral-500 rounded-full blur-md mt-[77px] mb-5'></span>
             <h1 className='font-bold text-[18px] tracking-[1.29px] mb-3'>EARPHONES</h1>
            <button className='cursor-pointer hover:text-[#D87D4A] hover:gap-2 duration-200 text-[13px] font-[700] tracking-[1px] text-neutral-500 flex items-center gap-1'>SHOP <ChevronRight size={15} className='text-[#D87D4A]' /> </button>
            </div>

        </div>

      </section>

        
        <section className='p-9 py-12 md:py-32 lg:p-32 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20'>
                    <div className='lg:pt-20 order-2 lg:order-1'>
                        <h3 className='text-[28px] md:text-[36px] font-bold leading-9 '>BRINGING YOU THE <br className='lg:block md:block hidden' /> <span className='text-[#D87D4A]'>BEST</span> AUDIO GEAR</h3>
                        <p className='text-[15px] text-[#7D7D7D] mt-5 leading-7'>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
                    </div>
        
                    <div className='rounded-[8px] relative overflow-hidden lg:h-[500px] md:h-[300px] h-[300px] order-1 lg:order-2'>
                        <img src={headphoneuser} className=' h-[700px] w-full object-cover md:object-top-left lg:object-center '  alt="" />
                    </div>
        
                </section>
      </main>
    </>
  )
}

export default Speakers
