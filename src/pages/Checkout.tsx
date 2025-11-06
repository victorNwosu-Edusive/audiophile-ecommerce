import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import emailjs from '@emailjs/browser';
import ScrollToTop from '../components/scrolltotop';
import shape from '../assets/images/Shape.svg' 

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^[0-9+\-\s()]+$/, 'Invalid phone number').required('Phone is required'),
  address: yup.string().required('Address is required'),
  zip: yup.string().required('ZIP code is required'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  paymentMethod: yup.string().required(),
  eMoneyNumber: yup.string().when('paymentMethod', {
    is: 'e-money',
    then: (schema) => schema.required('e-Money number is required'),
  }),
  eMoneyPin: yup.string().when('paymentMethod', {
    is: 'e-money',
    then: (schema) => schema.required('e-Money PIN is required'),
  }),
});

function Checkout() {
  const { cart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const createOrder = useMutation(api.orders.createOrder);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { paymentMethod: 'e-money' },
  });

  const paymentMethod = watch('paymentMethod');

  // ✅ Updated onSubmit
  const onSubmit = async (data) => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsSubmitting(true);

    try {
      const subtotal = getTotal();
      const shipping = 50;
      const vat = Math.round(subtotal * 0.2);
      const grandTotal = subtotal + vat + shipping;

      const orderData = {
  customer: {
    name: data.name,
    email: data.email,
    phone: data.phone,
  },
  shipping: {
    address: data.address,
    zip: data.zip,
    city: data.city,
    country: data.country,
  },
 items: cart.map((item) => ({
  id: String(item.id),
  name: item.name,
  price: item.price,
  quantity: item.quantity,
  modelname: item.modelname, 
  image: item.image,
})),
  totals: {
    subtotal,
    shipping: 50,
    vat: vat,
    grandTotal: grandTotal,
  },
};

      // 🧩 Step 1: Create order in Convex
      const orderId = await createOrder(orderData);

      // 🧩 Step 2: Send confirmation email via EmailJS
      console.log("EmailJS Data:", {
  to_email: data.email,
  customer_name: data.name,
  order_id: orderId,
  order_items: cart.map((item) => `${item.name} (x${item.quantity}) - $${item.price}`).join('\n'),
  shipping_address: `${data.address}, ${data.city}, ${data.country}`,
  total: `$${grandTotal.toLocaleString()}`,
  support_email: 'support@yourecommercesite.com',
  view_order_link: `https://yourwebsite.com/orders/${orderId}`,
});
      
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: data.email,
          customer_name: data.name,
          phone: data.phone,
          order_id: orderId,
          order_items: cart
            .map((item) => `${item.name} (x${item.quantity}) - $${item.price}`)
            .join('\n'),
          shipping_address: `${data.address}, ${data.city}, ${data.country}`,
          subtotal: `$${subtotal.toLocaleString()}`,
          shipping: `$${shipping.toLocaleString()}`,
          vat: `$${vat.toLocaleString()}`,
          total: `$${grandTotal.toLocaleString()}`,
          support_email: 'support@yourecommercesite.com',
          view_order_link: `https://yourwebsite.com/orders/${orderId}`,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // 🧩 Step 3: Show Thank You modal
      clearCart();
      setOrderData(orderData);
      setShowModal(true);
    } catch (error) {
  console.error('EmailJS or Convex Error:', error);
  alert(`Something went wrong: ${error.text || error.message}`);
} finally {
      setIsSubmitting(false);
    }
  };

  return (

<>
<ScrollToTop />
    <main className="w-full p-9 pt-32 md:p-32 bg-[#F1F1F1]">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-5 text-[#666666] hover:text-[#D87D4A]"
      >
        <ChevronLeft size={15} /> Go Back
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SIDE */}
        <div className="bg-white rounded-[8px] lg:col-span-2 p-8">
          <h1 className="text-[24px] font-bold mb-5">Checkout</h1>

          {/* Billing Details */}
          <h2 className="text-[18px] font-bold mb-5 text-[#D87D4A]">BILLING DETAILS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-[12px] font-bold mb-2">Name</label>
              <input
                type="text"
                {...register('name')}
                className={`w-full p-3 border rounded focus:border-[#D87D4A] outline-none duration-200 caret-[#D87D4A] ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-2">Email Address</label>
              <input
                type="email"
                {...register('email')}
                className={`w-full p-3 border rounded focus:border-[#D87D4A] outline-none duration-200 caret-[#D87D4A] ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-2">Phone Number</label>
              <input
                type="tel"
                {...register('phone')}
                className={`w-full p-3 border rounded focus:border-[#D87D4A] outline-none duration-200 caret-[#D87D4A] ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Shipping Info */}
          <h2 className="text-[18px] font-bold mb-5 text-[#D87D4A]">SHIPPING INFO</h2>
          <div className="grid grid-cols-1 gap-4 mb-8">
            <div>
              <label className="block text-[12px] font-bold mb-2">Address</label>
              <input
                type="text"
                {...register('address')}
                className={`w-full p-3 border rounded focus:border-[#D87D4A] outline-none duration-200 caret-[#D87D4A] ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[12px] font-bold mb-2">ZIP Code</label>
                <input
                  type="text"
                  {...register('zip')}
                  className={`w-full p-3 border rounded focus:border-[#D87D4A] outline-none duration-200 caret-[#D87D4A] ${
                    errors.zip ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip.message}</p>}
              </div>
              <div>
                <label className="block text-[12px] font-bold mb-2">City</label>
                <input
                  type="text"
                  {...register('city')}
                  className={`w-full p-3 border rounded focus:border-[#D87D4A] outline-none duration-200 caret-[#D87D4A] ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
              </div>
              <div>
                <label className="block text-[12px] font-bold mb-2">Country</label>
                <input
                  type="text"
                  {...register('country')}
                  className={`w-full p-3 border rounded focus:border-[#D87D4A] outline-none duration-200 caret-[#D87D4A] ${
                    errors.country ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <h2 className="text-[18px] font-bold mb-5 text-[#D87D4A]">PAYMENT DETAILS</h2>
          <div className="mb-4">
            <label className="block text-[12px] font-bold mb-2">Payment Method</label>
            <div className="grid md:grid-cols-2 gap-4">
              <div> </div>
              <div className="flex flex-col gap-4">
              <label className="flex items-center p-3 rounded-[8px] border-gray-300 border cursor-pointer hover:border-[#D87D4A] focus:border-[#D87D4A]">
                <input type="radio" value="e-money" {...register('paymentMethod')} className="mr-2 accent-[#D87D4A]" /> e-Money
              </label>
              <label className="flex items-center p-3 rounded-[8px] border-gray-300 border cursor-pointer hover:border-[#D87D4A] focus:border-[#D87D4A]">
                <input type="radio" value="cash" {...register('paymentMethod')} className="mr-2 accent-[#D87D4A]" /> Cash on
                Delivery
              </label>
              </div>
            </div>
          </div>

          {paymentMethod === 'e-money' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold mb-2">e-Money Number</label>
                <input
                  type="text"
                  {...register('eMoneyNumber')}
                  className={`w-full p-3 border rounded focus:border-[#D87D4A] outline-none duration-200 caret-[#D87D4A] ${
                    errors.eMoneyNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.eMoneyNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.eMoneyNumber.message}</p>
                )}
              </div>
              <div>
                <label className="block text-[12px] font-bold mb-2">e-Money PIN</label>
                <input
                  type="text"
                  {...register('eMoneyPin')}
                  className={`w-full p-3 border rounded focus:border-[#D87D4A] outline-none duration-200 caret-[#D87D4A] ${
                    errors.eMoneyPin ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.eMoneyPin && (
                  <p className="text-red-500 text-xs mt-1">{errors.eMoneyPin.message}</p>
                )}
              </div>
            </div>
          )}
          {paymentMethod === 'cash' && (
            <div className="flex gap-4">
              <img src={shape} className='col-span-1' alt="" />
              <p className='text-[#666666] text-[13px] col-span-4'>The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.</p>
            </div>
          )}
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className="bg-white rounded-[8px] w-full p-5 h-fit">
          <h2 className="text-[18px] font-bold mb-5">SUMMARY</h2>
          <div className="p-5 rounded">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded" />
                  <div>
                    <p className="font-bold">{item.modelname}</p>
                    <p className="text-[#666666] font-bold">${item.price}</p>
                  </div>
                </div>
                <p className="font-bold">x{item.quantity}</p>
              </div>
            ))}

            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>TOTAL</span>
                <span className="font-bold">${getTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>SHIPPING</span>
                <span className="font-bold">$50</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>VAT (INCLUDED)</span>
                <span className="font-bold">${Math.round(getTotal() * 0.2)}</span>
              </div>
              <div className="flex justify-between text-[18px] font-bold">
                <span>GRAND TOTAL</span>
                <span className="text-[#D87D4A]">
                  ${(getTotal() + Math.round(getTotal() * 0.2) + 50).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#D87D4A] text-white py-3 mt-5 font-bold hover:bg-[#FBAF85] duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'PROCESSING...' : 'CONTINUE & PAY'}
          </button>
        </div>
      </form>

      {/* ✅ Thank You Modal */}
      {showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-[8px] m-auto p-8">
      {/* Checkmark icon */}
      <div className="w-16 h-16 bg-[#D87D4A] rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Heading */}
      <h2 className="text-[28px] leading-tight font-bold mb-3">
        THANK YOU <br /> FOR YOUR ORDER
      </h2>
      <p className="text-[#777] mb-8">You will receive an email confirmation shortly.</p>

      {/* Order summary box */}
      <div className="flex flex-col md:flex-row overflow-hidden rounded-[8px] mb-8">
        {/* Left side - item summary */}
        <div className="bg-[#F1F1F1] flex-1 p-5">
          {orderData?.items?.slice(0, 1).map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded" />
                <div>
                  <p className="font-bold text-[14px]">{item.modelname}</p>
                  <p className="text-[#777] text-sm font-semibold">${item.price}</p>
                </div>
              </div>
              <p className="text-[#777] font-bold text-sm">x{item.quantity}</p>
            </div>
          ))}
          {orderData?.items?.length > 1 && (
            <p className="text-center text-[#777] text-sm border-t pt-3">
              and {orderData.items.length - 1} other item(s)
            </p>
          )}
        </div>

        {/* Right side - total */}
        <div className="bg-black text-white flex flex-col justify-end px-6 py-5 md:w-1/2">
          <p className="text-[#999] uppercase text-sm">Grand Total</p>
          <p className="text-[20px] font-bold mt-1">
            ${orderData?.totals?.grandTotal.toLocaleString()}
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => {
          setShowModal(false);
          navigate('/');
        }}
        className="w-full bg-[#D87D4A] hover:bg-[#FBAF85] text-white py-3 font-bold rounded-[8px] duration-200"
      >
        BACK TO HOME
      </button>
    </div>
  </div>
)}
    </main>
    </>
  );
}

export default Checkout;
