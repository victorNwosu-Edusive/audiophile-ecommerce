import { ChevronRight } from 'lucide-react'
import '../App.css'
import hero from '../assets/images/Bitmap.png'
import headphone from '../assets/images/image-removebg-preview(41)(1).png'
import speaker from '../assets/images/image-removebg-preview(38)(1).png'
import bigspeaker from '../assets/images/image-removebg-preview(38)(2).png'
import earphone from '../assets/images/image-removebg-preview(42).png' 
import earphoner from '../assets/images/Bitmap(3).png' 
import headphoneuser from '../assets/images/Bitmap(4).png' 

function Home() {

  return (
    <>
      <main className=' w-full'>
      <section className='hidden md:hidden bg-[#101010]  grid-cols-1 md:grid-cols-1 lg:grid-cols-4  lg:grid gap-2 '>
        <div className='pt-60 lg:pl-32 p-12 md:pt-48 md:p-32  pb-40 col-span-2 flex flex-col items-center justify-center lg:block'>
            <p className='text-[#F1F1F1] tracking-[10px] text-[14px] mb-5'>NEW PRODUCTS</p>
            <h1 className='text-[36px] md:text-[50px] lg:text-[50px] font-bold text-white leading-14 mb-5'>XX99 MARK II <br /> HEADPHONES</h1>
            <p className='text-[15px] text-[#F1F1F1] text-center md:text-center lg:text-left mb-10 font-[500]'>Experience natural, lifelike audio and exceptional<br className='md:block lg:hidden' /> build quality made for the passionate music <br className='md:block lg:hidden' /> enthusiast.</p>
            <button className='bg-[#D87D4A] px-7 py-3 text-white text-[13px] font-bold hover:bg-[#FBAF85] duration-200 tracking-[1px] cursor-pointer'>SEE PRODUCT</button>
        </div>
        <div className='hidden md:hidden lg:block col-span-2 relative overflow-hidden' >
            <img src={hero} className='flex ' alt="" />
        </div>
      </section>

      <section className='block md:block lg:hidden bg-[url("/src/assets/images/Bitmap.png")] bg-[#101010] bg-center bg-no-repeat grid-cols-1 md:grid-cols-1 lg:grid-cols-5  grid gap-2 '>
        <div className='pt-60 lg:pl-32 p-12 md:pt-48 md:p-32  pb-40 col-span-2 flex flex-col items-center justify-center lg:block'>
            <p className='text-[#F1F1F1] tracking-[10px] text-[14px] mb-5'>NEW PRODUCTS</p>
            <h1 className='text-[36px] md:text-[50px] lg:text-[50px] font-bold text-white leading-10 md:leading-14 mb-5'>XX99 MARK II <br /> HEADPHONES</h1>
            <p className='text-[15px] text-[#F1F1F1] text-center md:text-center lg:text-left mb-10 font-[500]'>Experience natural, lifelike audio and exceptional<br className='md:block lg:hidden' /> build quality made for the passionate music <br className='md:block lg:hidden' /> enthusiast.</p>
            <button className='bg-[#D87D4A] px-7 py-3 text-white text-[13px] font-bold hover:bg-[#FBAF85] duration-200 tracking-[1px] cursor-pointer'>SEE PRODUCT</button>
        </div>
        <div className='hidden md:hidden lg:block col-span-3 relative overflow-hidden' >
            <img src={hero} className='flex ' alt="" />
        </div>
      </section>

      <section className='pt-32 md:pt-32 p-12 md:p-12 lg:p-32 lg:pt-40'>
        <div className='*:bg-[#F1F1F1] *:p-5 *:rounded-[8px] gap-20 md:gap-5 lg:gap-7 grid-cols-1 md:grid-cols-3   grid lg:grid-cols-3 '>
            <div className='relative flex flex-col items-center'>
            <img className=' h-[146px] z-50 w-auto -m-20' src={headphone} alt="" />
            <span className='h-4 w-28 bg-neutral-500 rounded-full blur-md mt-[77px] mb-5'></span>
             <h1 className='font-bold text-[18px] tracking-[1.29px] mb-3'>HEADPHONES</h1>
            <a href='/headphones' className='cursor-pointer hover:text-[#D87D4A] hover:gap-2 duration-200 text-[13px] font-[700] tracking-[1px] text-neutral-500 flex items-center gap-1'>SHOP <ChevronRight size={15} className='text-[#D87D4A]' /> </a>
            </div>

             <div className='relative flex flex-col items-center'>
            <img className=' h-[146px] z-50 w-auto -m-20' src={speaker} alt="" />
            <span className='h-4 w-28 bg-neutral-500 rounded-full blur-md mt-[77px] mb-5'></span>
             <h1 className='font-bold text-[18px] tracking-[1.29px] mb-3'>SPEAKERS</h1>
            <a href='/speakers' className='cursor-pointer hover:text-[#D87D4A] hover:gap-2 duration-200 text-[13px] font-[700] tracking-[1px] text-neutral-500 flex items-center gap-1'>SHOP <ChevronRight size={15} className='text-[#D87D4A]' /> </a>
            </div>

            <div className='relative flex flex-col items-center'>
            <img className=' h-[146px] z-50 w-auto -m-20' src={earphone} alt="" />
            <span className='h-4 w-28 bg-neutral-500 rounded-full blur-md mt-[77px] mb-5'></span>
             <h1 className='font-bold text-[18px] tracking-[1.29px] mb-3'>EARPHONES</h1>
            <a href='/earphones' className='cursor-pointer hover:text-[#D87D4A] hover:gap-2 duration-200 text-[13px] font-[700] tracking-[1px] text-neutral-500 flex items-center gap-1'>SHOP <ChevronRight size={15} className='text-[#D87D4A]' /> </a>
            </div>

        </div>

      </section>

        <section className='py-10 px-12 md:px-12 lg:px-32 grid grid-rows-1 gap-10'>
            <div className='bg-[rgb(216,125,74)] rounded-[8px] overflow-hidden p-10 md:p-10  lg:p-0 grid-cols-1 md:grid-cols-1 gap-10 md:gap-10 lg:gap-0  lg:grid lg:grid-cols-4 relative md:flex flex flex-col justify-center items-center md:justify-center md:items-center md:flex-col '>
                <div className='col-span-2 flex flex-row justify-center right-0 relative'>
                <img src={bigspeaker} className='lg:h-[439px] md:h-[237px] h-[207px] flex lg:ml-auto w-auto z-40' alt="" />
                <span className='absolute h-20 w-20 rounded-full border-[1px] -bottom-20 lg:left-[84px] border-white/25 p-[160px] lg:p-[223px]'></span>
                <span className='absolute h-20 w-20 rounded-full border-[1px] -bottom-[106px] lg:left-[56px] border-white/25 p-[186px] lg:p-[250px]'></span>
                <span className='absolute h-20 w-20 rounded-full border-[1px] -bottom-[230px] lg:-left-[78px] border-white/25 p-[390px] lg:p-[390px]'></span>
                </div>

                <div className='col-span-2 lg:m-auto lg:px-28 md:flex md:flex-col lg:block flex flex-col items-center justify-center   '>
                    <h1 className='text-[50px] font-bold text-white leading-14 text-center lg:text-left mb-5'>ZX9 <br /> SPEAKER</h1>
                    <p className='text-[15px] text-[#F1F1F1] text-center lg:text-left mb-10 font-[500]'>Upgrade to premium speakers that are <br className='md:block lg:hidden' />phenomenally built to deliver truly remarkable <br className='md:block lg:hidden' /> sound.</p>
                    <button className='bg-black px-7 relative py-3 z-50 text-white text-[13px] font-bold hover:bg-[#4C4C4C] duration-200 tracking-[1px] cursor-pointer'>SEE PRODUCT</button>
                </div>

            </div>

           <div className='bg-[url("/src/assets/images/speakerbg.png")] bg-cover bg-center rounded-[8px] p-12 lg:p-20'>
                <h3 className='text-[28px] text-[#000000] mb-5 font-bold'>ZX7 SPEAKER</h3>
                <button className='bg-transparent border-[1px] border-black px-7 relative py-3 z-50 text-black text-[13px] font-bold hover:bg-[#000000] hover:text-white duration-200 tracking-[1px] cursor-pointer'>SEE PRODUCT</button>
            </div>

            <div className='grid md:grid-cols-2 gap-10'>
                <div className='rounded-[8px] overflow-hidden'>
                    <img src={earphoner} className='w-fit h-full object-cover' alt="" />
                </div>

                <div className='bg-[#F1F1F1] rounded-[8px] p-20'>
                <h3 className='text-[28px] text-[#000000] mb-5 font-bold'>YX1 EARPHONES</h3>
                <button className='bg-transparent border-[1px] border-black px-7 relative py-3 z-50 text-black text-[13px] font-bold hover:bg-[#000000] hover:text-white duration-200 tracking-[1px] cursor-pointer'>SEE PRODUCT</button>
                </div>

            </div>

        </section>

        <section className='p-12 py-32 md:py-32 lg:p-32 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20'>
            <div className='lg:pt-20 order-2 lg:order-1'>
                <h3 className='text-[36px] font-bold leading-12 '>BRINGING YOU THE <br /> <span className='text-[#D87D4A]'>BEST</span> AUDIO GEAR</h3>
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

export default Home
