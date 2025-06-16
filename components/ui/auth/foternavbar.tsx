"use client";

import React from "react";
import { 
  FaHome, 
  FaTasks, 
  FaUsers, 
  FaWallet, 
  FaUser 
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AuthFooter() {
  const pathname = usePathname();

  const navItems = [
    { 
      icon: <FaHome />, 
      label: "Home", 
      path: "/dashboard",
      color: "from-blue-400 to-blue-600",
      inactiveColor: "text-blue-400"
    },
    { 
      icon: <FaTasks />, 
      label: "Tasks", 
      path: "/tasks",
      color: "from-emerald-400 to-emerald-600",
      inactiveColor: "text-emerald-400"
    },
    { 
      icon: <FaUsers />, 
      label: "Team", 
      path: "/team",
      color: "from-purple-400 to-pink-500",
      inactiveColor: "text-purple-400",
      special: true
    },
    { 
      icon: <FaWallet />, 
      label: "Asset", 
      path: "/asset",
      color: "from-amber-400 to-amber-600",
      inactiveColor: "text-amber-400"
    },
    { 
      icon: <FaUser />, 
      label: "Me", 
      path: "/profile",
      color: "from-rose-400 to-rose-600",
      inactiveColor: "text-rose-400"
    },
  ];

  return (
    <>
      {/* Spacer div to prevent content from being hidden behind fixed footer */}
      <div className="h-20"></div>
      
      {/* Fixed footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-br from-teal-100 via-green-300 to-emerald-200 border-t border-gray-200/50 dark:border-gray-700/50 z-50">
        <div className="flex justify-around items-end px-1 pt-3 pb-4 max-w-md mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="flex flex-col items-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center ${item.special ? "-mt-6" : ""}`}
              >
                <div className={`
                  relative flex items-center justify-center
                  ${item.special ? "h-14 w-14 text-2xl" : "h-10 w-10 text-xl"}
                  rounded-full mb-1
                  ${pathname === item.path 
                    ? `bg-gradient-to-br ${item.color} text-white shadow-lg`
                    : `bg-white/80 dark:bg-gray-800/80 ${item.inactiveColor} shadow-md backdrop-blur-sm`}
                  transition-all duration-300
                `}>
                  {item.icon}
                  {pathname === item.path && (
                    <motion.div 
                      layoutId="activeDot"
                      className="absolute -bottom-1 w-2 h-2 rounded-full bg-white border-2 border-gray-200 dark:border-gray-700"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </div>
                <span className={`
                  text-xs font-medium
                  ${pathname === item.path 
                    ? "text-gray-900 dark:text-white font-semibold" 
                    : "text-gray-600 dark:text-gray-400"}
                  transition-colors duration-200
                `}>
                  {item.label}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </footer>
    </>
  );
}