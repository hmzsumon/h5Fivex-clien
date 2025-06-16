"use client";

import React, { useState, useEffect } from "react";

interface TaskRecord {
  user: string;
  amount: string;
}

const colors = [
  "text-rose-600",
  "text-blue-600",
  "text-green-600",
  "text-yellow-600",
  "text-purple-600",
  "text-pink-600",
  "text-teal-600",
  "text-orange-600",
  "text-amber-600",
  "text-lime-600",
];

const taskData = [
  { user: "4******2", amount: "$9.91" },
  { user: "8******1", amount: "$15.35" },
  { user: "1******8", amount: "$6.20" },
  { user: "3******6", amount: "$18.70" },
  { user: "5******3", amount: "$22.15" },
  { user: "9******0", amount: "$7.88" },
  { user: "6******4", amount: "$11.99" },
  { user: "2******5", amount: "$14.05" },
  { user: "7******9", amount: "$12.45" },
  { user: "0******7", amount: "$5.60" },
  { user: "4******1", amount: "$9.50" },
  { user: "8******3", amount: "$20.99" },
  { user: "3******2", amount: "$13.20" },
  { user: "6******5", amount: "$17.45" },
  { user: "1******9", amount: "$8.75" },
];

export default function TaskRecordComponent() {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prev) => (prev + 1) % taskData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-teal-100 via-green-200 to-emerald-100   p-4 border border-white/20">
      <h3 className="font-semibold text-gray-800 mb-3 text-center">
        Task Record (Recent Earnings)
      </h3>
      <div className="overflow-hidden h-8 relative">
        <div
          className="absolute inset-0 transition-all duration-500 ease-in-out"
          style={{ transform: `translateY(-${visibleIndex * 2}rem)` }}
        >
          {taskData.map((task, index) => (
            <div key={index} className="h-8 flex items-center justify-center">
              <div
                className={`text-sm px-4 py-1.5 rounded-full font-medium whitespace-nowrap ${
                  colors[index % colors.length]
                } bg-white/80 backdrop-blur-sm shadow-sm`}
              >
                🎉 Congrats {task.user}, earned{" "}
                <span className="font-bold">{task.amount}</span>!
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}