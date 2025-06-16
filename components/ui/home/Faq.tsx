'use client';

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is h5Fivex?",
    answer:
      "h5Fivex is a global eCommerce platform where users can open accounts, promote products, and earn profits daily through digital marketing.",
  },
  {
    question: "How much does it cost to join h5Fivex?",
    answer:
      "Joining h5Fivex requires a one-time activation fee of 30 USDT. This gives you full access to the marketing tools, dashboard, and product promotions.",
  },
  {
    question: "How do I earn money from h5Fivex?",
    answer:
      "Once you activate your account, you can market products using your personal links. Each sale you generate earns you commission directly.",
  },
  {
    question: "Do I need to hold any inventory or deliver products?",
    answer:
      "No, h5Fivex handles inventory and delivery. You only focus on promoting products — we do the rest!",
  },
  {
    question: "Is h5Fivex available worldwide?",
    answer:
      "Yes! h5Fivex supports users from over 50 countries. You can market internationally and get paid from anywhere.",
  },
  {
    question: "How do I get paid?",
    answer:
      "Your profit is credited daily to your account. You can withdraw your balance through supported payment methods, including crypto wallets.",
  },
  {
    question: "Can I refer others to earn more?",
    answer:
      "Yes! h5Fivex has a referral system. When your invited user joins and activates, you receive additional earnings.",
  },
  {
    question: "What kind of products can I promote?",
    answer:
      "You’ll get access to trending products in electronics, fashion, digital services, and more. Promotional assets are provided to make marketing easy.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="bg-gradient-to-br from-cyan-100 via-sky-200 to-indigo-100 px-4 py-12  transition-all">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold text-indigo-800 mb-10">
        Frequently Asked Questions
      </h2>
      <div className="max-w-4xl mx-auto space-y-5">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`bg-white/80 backdrop-blur-md px-5 py-4 rounded-2xl shadow-md transition-all duration-300 ${
              openIndex === index ? "shadow-xl" : ""
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="flex justify-between items-center w-full text-left group"
            >
              <span className="text-indigo-700 font-semibold text-base md:text-lg">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-indigo-600 transform transition-transform duration-300 group-hover:scale-110 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <p className="mt-3 text-gray-700 text-sm md:text-base leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
