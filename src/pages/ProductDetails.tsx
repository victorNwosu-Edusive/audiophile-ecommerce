import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import headphoneuser from '../assets/images/Bitmap(4).png';
import headphone from '../assets/images/image-removebg-preview(41)(1).png'
import speaker from '../assets/images/image-removebg-preview(38)(1).png'
import bigspeaker from '../assets/images/image-removebg-preview(38)(2).png'
import earphone from '../assets/images/image-removebg-preview(42).png' 
import earphoner from '../assets/images/Bitmap(3).png'
import headphoneone from '../assets/images/image-removebg-preview(47)(1).png'  
import headphonewhite from '../assets/images/image-removebg-preview(48)(1).png'  
import ScrollToTop from '../components/scrolltotop';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  // Get 3 random products excluding current product
  const getRandomProducts = () => {
    const filtered = products.filter(p => p.id !== product.id);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const randomProducts = getRandomProducts();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
    <ScrollToTop />
    <main className="w-full">
      <section className="pt-32 md:pt-32 p-9 md:p-9 lg:p-32 pb-0 md:pb-0 lg:pb-0">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-5 cursor-pointer text-[#666666] hover:text-[#D87D4A]">
          <ChevronLeft size={15} /> Go Back
        </button>
      </section>

      <section className="p-9 md:p-9 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-[#F1F1F1] rounded-[8px] p-20 flex items-center justify-center">
            <img src={product.image} alt={product.name} className="max-w-full h-auto" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[#D87D4A] tracking-[10px] text-[14px] mb-5">NEW PRODUCT</p>
            <h1 className="text-[36px] md:text-[50px] font-bold text-black leading-14 mb-5">{product.name}</h1>
            <p className="text-[15px] text-[#666666] mb-10 font-[500]">{product.description}</p>
            <p className="text-[18px] font-bold text-black mb-5">${product.price.toLocaleString()}</p>
            <div className="flex gap-4">
              <div className="flex items-center bg-[#F1F1F1] px-4 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-500 hover:text-[#D87D4A] duration-200 cursor-pointer font-bold text-xl px-2"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-500 hover:text-[#D87D4A] duration-200 cursor-pointer font-bold text-xl px-2"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-[#D87D4A] cursor-pointer px-7 py-3 text-white text-[13px] font-bold hover:bg-[#FBAF85] duration-200 tracking-[1px]"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="p-9 md:p-9 lg:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32 lg:gap-10">
          <div>
            <h2 className="text-[24px] font-bold mb-5">FEATURES</h2>
            <p className="text-[#666666] mb-5">{product.features[0]}</p>
            <p className="text-[#666666]">{product.features[1]}</p>
          </div>
          <div>
            <h2 className="text-[24px] font-bold mb-5">IN THE BOX</h2>
            <ul>
              {product.includes.map((item, index) => (
                <li key={index} className="flex gap-5 mb-2">
                  <span className="text-[#D87D4A] font-bold">{item.quantity}x</span>
                  <span className="text-[#666666]">{item.item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery section */}
      <section className="p-12 md:p-32">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    <div className="grid grid-rows-2 gap-5">
      <img src={product.gallery[0]} alt="" className="rounded-[8px]" />
      <img src={product.gallery[1]} alt="" className="rounded-[8px]" />
    </div>
    <img
      src={product.gallery[2]}
      alt=""
      className="rounded-[8px] md:h-full object-cover"
    />
  </div>
</section>

      {/* You may also like section */}
      <section className="p-12 md:p-32">
        <h2 className="text-[24px] font-bold text-center mb-10">YOU MAY ALSO LIKE</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {randomProducts.map(product => (
            <div key={product.id} className="text-center">
              <div className="bg-[#F1F1F1] rounded-[8px] p-8 mb-5 flex items-center justify-center">
                <img src={product.image} alt={product.name} className="max-w-full h-32 object-contain" />
              </div>
              <h3 className="text-[18px] font-bold mb-5">{product.name}</h3>
              <Link
                to={`/product/${product.id}`}
                className="bg-[#D87D4A] text-white py-3 px-6 font-bold hover:bg-[#FBAF85] duration-200 inline-block"
              >
                SEE PRODUCT
              </Link>
            </div>
          ))}
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

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-[#D87D4A] text-white px-4 py-2 rounded-lg shadow-lg z-50">
          Item added to cart!
        </div>
      )}
    </main>
    </>
  );
}

export default ProductDetails;