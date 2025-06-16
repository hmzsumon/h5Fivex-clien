'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Users, Globe2 } from "lucide-react";

export default function UserGrowth() {
  const router = useRouter(); // Initialize useRouter for navigation
  const [userCount, setUserCount] = useState(5000);
  const [countdown, setCountdown] = useState(5);
  const [joinedFrom, setJoinedFrom] = useState("");

  const countries = ["🇺🇸 USA", "🇮🇳 India", "🇧🇷 Brazil", "🇬🇧 UK", "🇫🇷 France", "🇨🇦 Canada", "🇯🇵 Japan"];
  const avatars = [
    "https://i.pravatar.cc/40?img=1",
    "https://i.pravatar.cc/40?img=2",
    "https://i.pravatar.cc/40?img=3",
    "https://i.pravatar.cc/40?img=4",
    "https://i.pravatar.cc/40?img=5",
  ];

  useEffect(() => {
    const storedCount = localStorage.getItem("bitnex_user_count");
    if (storedCount) setUserCount(Number(storedCount));

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          const added = Math.random() > 0.7 ? 2 : 1;
          const newCount = userCount + added;
          setUserCount(newCount);
          localStorage.setItem("bitnex_user_count", newCount.toString());
          setJoinedFrom(countries[Math.floor(Math.random() * countries.length)]);
          return Math.floor(Math.random() * 10) + 5; // 5–15 sec
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [userCount]);

  const growth = Math.floor(((userCount - 5000) / 5000) * 100);
  const progressWidth = Math.min(100, (userCount % 10000) / 100);

  const handleJoinNowClick = () => {
    router.push("/login"); // Navigate to the login page
  };

  return (
    <section className="min-h-[70px] bg-gradient-to-br from-cyan-100 via-sky-200 to-indigo-100 flex flex-col md:flex-row items-center justify-between px-6 py-8 md:py-12 shadow-md">
      {/* Left Info Block */}
      <div className="flex-1 text-center md:text-left space-y-4">
        <div className="flex items-center justify-center md:justify-start space-x-3">
          <Users className="text-indigo-700 w-8 h-8 transition-all duration-300 transform hover:scale-110" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-800 text-shadow-md leading-tight transition-all duration-300 ease-in-out hover:text-indigo-600">
            {userCount.toLocaleString()} <span className="text-base text-gray-600">Users</span>
          </h2>
        </div>

        {joinedFrom && (
          <p className="text-sm text-gray-600 animate-fade-in">
            👋 New user just joined from <span className="font-medium">{joinedFrom}</span>
          </p>
        )}

        <p className="text-sm text-gray-700">
          🌐 Growing across <strong>50+ countries</strong> — in real-time.
        </p>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-700"
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>

        <p className="text-sm text-green-600 font-medium mt-1">
          📈 +{growth}% user growth
        </p>

        <blockquote className="text-xs italic text-gray-500 mt-2">
          "I joined Bitnex when we were 6k — now it’s booming!"
        </blockquote>

        {/* Avatars */}
        <div className="flex mt-4 space-x-2 justify-center md:justify-start">
          {avatars.map((avatar, idx) => (
            <img
              key={idx}
              src={avatar}
              className="w-10 h-10 rounded-full border-2 border-white shadow-md hover:scale-105 transition-all"
              alt="User avatar"
            />
          ))}
        </div>
      </div>

      {/* Right CTA */}
      <div className="flex flex-col items-center space-y-3 mt-6 md:mt-0">
        <Globe2 className="text-sky-600 w-10 h-10 transition-all duration-300 transform hover:scale-110" />
        <div className="text-indigo-700 font-semibold text-center text-sm">
          Be part of the global Bitnex eCommerce revolution.
        </div>
        <button
          onClick={handleJoinNowClick}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all animate-pulse"
        >
          Join Now
        </button>
        <p className="text-xs text-gray-500 text-center">It’s free to get started.</p>
      </div>
    </section>
  );
}
