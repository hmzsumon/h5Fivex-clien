import React from "react";
import { CheckCircle } from "lucide-react"; // You can import any icon you like

export default function Benefits() {
  return (
    <section className="min-h-[400px] bg-gradient-to-br from-teal-100 via-green-200 to-lime-100 px-6 py-12  flex flex-col items-center gap-8">
      <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-6 text-center">
        Why Choose Us?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Benefit 1 */}
        <div className="flex flex-col items-center justify-center text-center">
          <CheckCircle className="text-indigo-500 w-16 h-16 mb-4" />
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">Fast Delivery</h3>
          <p className="text-gray-600">
            Get your products delivered quickly and safely. Our fast shipping ensures you get what you need in no time.
          </p>
        </div>

        {/* Benefit 2 */}
        <div className="flex flex-col items-center justify-center text-center">
          <CheckCircle className="text-indigo-500 w-16 h-16 mb-4" />
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">Quality Products</h3>
          <p className="text-gray-600">
            All our products are sourced from the best manufacturers to ensure the highest quality and durability.
          </p>
        </div>

        {/* Benefit 3 */}
        <div className="flex flex-col items-center justify-center text-center">
          <CheckCircle className="text-indigo-500 w-16 h-16 mb-4" />
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">Secure Payment</h3>
          <p className="text-gray-600">
            Our platform provides multiple secure payment methods to give you peace of mind during every transaction.
          </p>
        </div>

        {/* Benefit 4 */}
        <div className="flex flex-col items-center justify-center text-center">
          <CheckCircle className="text-indigo-500 w-16 h-16 mb-4" />
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">24/7 Support</h3>
          <p className="text-gray-600">
            Our customer support team is always available to assist you with any queries or concerns, day or night.
          </p>
        </div>

        {/* Benefit 5 */}
        <div className="flex flex-col items-center justify-center text-center">
          <CheckCircle className="text-indigo-500 w-16 h-16 mb-4" />
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">Worldwide Shipping</h3>
          <p className="text-gray-600">
            We offer international shipping to over 50 countries, ensuring our products reach you wherever you are.
          </p>
        </div>

        {/* Benefit 6 */}
        <div className="flex flex-col items-center justify-center text-center">
          <CheckCircle className="text-indigo-500 w-16 h-16 mb-4" />
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">Easy Returns</h3>
          <p className="text-gray-600">
            If you are not satisfied, we offer hassle-free returns within 30 days to make sure you're happy with your purchase.
          </p>
        </div>
      </div>
    </section>
  );
}
