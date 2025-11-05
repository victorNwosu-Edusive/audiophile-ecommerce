import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';


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

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      paymentMethod: 'e-money',
    },
  });

  const paymentMethod = watch('paymentMethod');

  const onSubmit = async (data) => {
    if (cart.length === 0) return;

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
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totals: {
          subtotal,
          shipping,
          vat,
          grandTotal,
        },
      };

      const orderId = await createOrder(orderData);

      // Simulate email sending (for demo purposes)
      console.log('Order confirmation email would be sent to:', data.email);

      clearCart();
      navigate('/order-confirmation', { state: { orderId, orderData } });
    } catch (error) {
      console.error('Order submission failed:', error);
      alert('Order submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <main className="w-full p-12 md:p-32">
        <h1 className="text-[24px] font-bold mb-5">Checkout</h1>
        <p>Your cart is empty. <a href="/" className="text-[#D87D4A]">Go back to shopping</a></p>
      </main>
    );
  }

  return (
    <main className="w-full p-12 md:p-32 bg-[#F1F1F1]">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-5 text-[#666666] hover:text-[#D87D4A]">
        <ChevronLeft size={15} /> Go Back
      </button>
      
      
      
      <form onSubmit={handleSubmit} className=" grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className='bg-white rounded-[8px] col-span-2 p-8'>
          <h1 className="text-[24px] font-bold mb-5">Checkout</h1>
          <h2 className="text-[18px] font-bold mb-5">BILLING DETAILS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-[12px] font-bold mb-2">Name</label>
              <input
                type="text"
                {...register('name')}
                className={`w-full p-3 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-2">Email Address</label>
              <input
                type="email"
                {...register('email')}
                className={`w-full p-3 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-2">Phone Number</label>
              <input
                type="tel"
                {...register('phone')}
                className={`w-full p-3 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && <p id="phone-error" className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <h2 className="text-[18px] font-bold mb-5">SHIPPING INFO</h2>
          <div className="grid grid-cols-1 gap-4 mb-8">
            <div>
              <label className="block text-[12px] font-bold mb-2">Address</label>
              <input
                type="text"
                {...register('address')}
                className={`w-full p-3 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                aria-describedby={errors.address ? 'address-error' : undefined}
              />
              {errors.address && <p id="address-error" className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[12px] font-bold mb-2">ZIP Code</label>
                <input
                  type="text"
                  {...register('zip')}
                  className={`w-full p-3 border rounded ${errors.zip ? 'border-red-500' : 'border-gray-300'}`}
                  aria-describedby={errors.zip ? 'zip-error' : undefined}
                />
                {errors.zip && <p id="zip-error" className="text-red-500 text-xs mt-1">{errors.zip.message}</p>}
              </div>
              <div>
                <label className="block text-[12px] font-bold mb-2">City</label>
                <input
                  type="text"
                  {...register('city')}
                  className={`w-full p-3 border rounded ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                  aria-describedby={errors.city ? 'city-error' : undefined}
                />
                {errors.city && <p id="city-error" className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
              </div>
              <div>
                <label className="block text-[12px] font-bold mb-2">Country</label>
                <input
                  type="text"
                  {...register('country')}
                  className={`w-full p-3 border rounded ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                  aria-describedby={errors.country ? 'country-error' : undefined}
                />
                {errors.country && <p id="country-error" className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
              </div>
            </div>
          </div>

          <h2 className="text-[18px] font-bold mb-5">PAYMENT DETAILS</h2>
          <div className="mb-4">
            <label className="block text-[12px] font-bold mb-2">Payment Method</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="e-money"
                  {...register('paymentMethod')}
                  className="mr-2"
                />
                e-Money
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="cash"
                  {...register('paymentMethod')}
                  className="mr-2"
                />
                Cash on Delivery
              </label>
            </div>
          </div>
          {paymentMethod === 'e-money' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold mb-2">e-Money Number</label>
                <input
                  type="text"
                  {...register('eMoneyNumber')}
                  className={`w-full p-3 border rounded ${errors.eMoneyNumber ? 'border-red-500' : 'border-gray-300'}`}
                  aria-describedby={errors.eMoneyNumber ? 'eMoneyNumber-error' : undefined}
                />
                {errors.eMoneyNumber && <p id="eMoneyNumber-error" className="text-red-500 text-xs mt-1">{errors.eMoneyNumber.message}</p>}
              </div>
              <div>
                <label className="block text-[12px] font-bold mb-2">e-Money PIN</label>
                <input
                  type="text"
                  {...register('eMoneyPin')}
                  className={`w-full p-3 border rounded ${errors.eMoneyPin ? 'border-red-500' : 'border-gray-300'}`}
                  aria-describedby={errors.eMoneyPin ? 'eMoneyPin-error' : undefined}
                />
                {errors.eMoneyPin && <p id="eMoneyPin-error" className="text-red-500 text-xs mt-1">{errors.eMoneyPin.message}</p>}
              </div>
            </div>
          )}
        </div>

        <div className='bg-white rounded-[8px] p-5 h-fit'>
          <h2 className="text-[18px] font-bold mb-5">SUMMARY</h2>
          <div className=" p-5 rounded">
            {cart.map(item => (
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
                <span className="text-[#D87D4A]">${(getTotal() + Math.round(getTotal() * 0.2) + 50).toLocaleString()}</span>
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
    </main>
  );
}

export default Checkout;