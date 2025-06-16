import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "John Doe",
    position: "CEO, Tech Company",
    feedback:
      "Bitnex transformed our eCommerce experience. The growth is phenomenal, and the user interface is intuitive and sleek. I highly recommend it!",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Jane Smith",
    position: "Marketing Director, Fashion Co.",
    feedback:
      "The ease of use and customization options on Bitnex make it the best platform I’ve used. The real-time data and user engagement are unbeatable.",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Alex Johnson",
    position: "Founder, StartUp Hub",
    feedback:
      "Bitnex is a game-changer! Our sales have increased by over 40%, and the user feedback has been overwhelmingly positive.",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

export default function Testimonials() {
  return (
    <section className="min-h-[300px] bg-gradient-to-br from-cyan-100 via-sky-200 to-indigo-100 px-4 py-6 sm:py-8 flex flex-col items-center hover:shadow-2xl transition-all duration-300 ease-in-out">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold text-indigo-800 mb-6">
        What Our Clients Say
      </h2>

      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-3xl shadow-xl flex flex-col items-center w-full sm:w-72 md:w-64 lg:w-80 transition-transform transform hover:scale-105 hover:shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-500 via-indigo-600 to-indigo-700 opacity-50 rounded-3xl z-0"></div>

            <div className="flex items-center space-x-4 mb-6 z-10 relative">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg transform transition-transform duration-300 hover:scale-110"
              />
              <div className="text-left">
                <h3 className="text-2xl font-semibold text-indigo-700">{testimonial.name}</h3>
                <p className="text-sm text-gray-500">{testimonial.position}</p>
              </div>
            </div>

            <p className="text-gray-700 text-center text-lg italic mb-6 z-10 relative">
              "{testimonial.feedback}"
            </p>

            <div className="flex justify-center space-x-1 text-yellow-400 mb-4 z-10 relative">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="w-5 h-5" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
