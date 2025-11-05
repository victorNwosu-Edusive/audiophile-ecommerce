import { useLocation, Link } from 'react-router-dom';
import { products } from '../data/products';
import ScrollToTop from '../components/scrolltotop';

function OrderConfirmation() {
  const location = useLocation();
  const { orderId, orderData } = location.state || {};

  // Get 3 random products for "You may also like" section
  const getRandomProducts = () => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const randomProducts = getRandomProducts();

  if (!orderData) {
    return (
      <main className="w-full p-12 md:p-32">
        <h1 className="text-[24px] font-bold mb-5">Order Confirmation</h1>
        <p>No order data found. <Link to="/" className="text-[#D87D4A]">Go back to home</Link></p>
      </main>
    );
  }

  return (
    <>
    <ScrollToTop />
    <main className="w-full p-12 md:p-32">
      <div className="text-center mb-10">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h1 className="text-[24px] font-bold mb-5">THANK YOU FOR YOUR ORDER</h1>
        <p className="text-[#666666]">You will receive an email confirmation shortly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-[#F1F1F1] p-5 rounded">
          <h2 className="text-[18px] font-bold mb-5">ORDER SUMMARY</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <img src={orderData.items[0]?.image} alt={orderData.items[0]?.name} className="w-16 h-16 rounded" />
              <div>
                <p className="font-bold">{orderData.items[0]?.name}</p>
                <p className="text-[#666666]">${orderData.items[0]?.price}</p>
              </div>
            </div>
            <p className="font-bold">x{orderData.items[0]?.quantity}</p>
          </div>
          {orderData.items.length > 1 && (
            <p className="text-[#666666] text-center">and {orderData.items.length - 1} other item(s)</p>
          )}
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>GRAND TOTAL</span>
              <span className="font-bold text-[#D87D4A]">${orderData.totals.grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#F1F1F1] p-5 rounded">
          <h2 className="text-[18px] font-bold mb-5">SHIPPING DETAILS</h2>
          <p><strong>Name:</strong> {orderData.customer.name}</p>
          <p><strong>Email:</strong> {orderData.customer.email}</p>
          <p><strong>Phone:</strong> {orderData.customer.phone}</p>
          <p><strong>Address:</strong> {orderData.shipping.address}, {orderData.shipping.city}, {orderData.shipping.zip}, {orderData.shipping.country}</p>
          <p><strong>Order ID:</strong> {orderId}</p>
        </div>
      </div>

      <div className="text-center mt-10">
        <Link to="/" className="bg-[#D87D4A] text-white py-3 px-6 font-bold hover:bg-[#FBAF85] duration-200">
          BACK TO HOME
        </Link>
      </div>

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
    </main>
    </>
  );
}

export default OrderConfirmation;
