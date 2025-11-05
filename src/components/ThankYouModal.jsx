import React from "react";

const ThankYouModal = ({ order, onClose }) => {
  if (!order) return null;

  const { customer, shipping, items, totals } = order;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
            alt="check"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold mb-1 text-gray-800">
            Thank You, {customer.name}!
          </h2>
          <p className="text-gray-600">Your order has been placed successfully.</p>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-100 mt-6 rounded-lg p-4">
          <h3 className="font-semibold mb-3 text-gray-700">Order Summary</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto border-b border-gray-300 pb-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-sm text-gray-700"
              >
                <span>
                  {item.name} <span className="text-gray-500">x{item.quantity}</span>
                </span>
                <span>₦{item.price.toLocaleString()}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-3 text-sm text-gray-700 space-y-1">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₦{totals.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>₦{totals.shipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT (20%):</span>
              <span>₦{totals.vat.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 border-t border-gray-300 pt-2">
              <span>Total:</span>
              <span>₦{totals.grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Shipping Details */}
        <div className="mt-5 text-sm text-gray-600">
          <h3 className="font-semibold mb-2 text-gray-700">Shipping To</h3>
          <p>{shipping.address}</p>
          <p>
            {shipping.city}, {shipping.country}
          </p>
          <p>Zip Code: {shipping.zip}</p>
        </div>

        {/* Footer Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="bg-[#D87D4A] hover:bg-[#c36a38] text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Back to Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouModal;
