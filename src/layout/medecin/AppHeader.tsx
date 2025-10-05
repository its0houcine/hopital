"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import UserDropdown from "@/components/header/UserDropdown";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Users, Calendar, Activity, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const AppHeader = () => {
  const [sticky, setSticky] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  // Sticky navbar
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);

    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, []);

  // Navigation items
  const navItems = [
    { name: "Accueil", path: "/medecin/dashboard", icon: <Home size={18} /> },
    { name: "Profil", path: "/profile", icon: <User size={18} /> },
  ];

  return (
    <header
      className={`z-50 w-full bg-white shadow-md dark:bg-gray-900 ${
        sticky ? "fixed" : "relative"
      }`}
    >
      <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/medecin/dashboard" className="block flex-shrink-0">
            <img src="/images/logo/logo.svg" alt="Logo" className="h-16" />
          </Link>
        </div>

        {/* Navigation centrale */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? "text-elhassi1 font-medium"
                    : "text-gray-600 hover:text-elhassi1 hover:bg-gray-50"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-elhassi1 rounded-full"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <UserDropdown />
        </div>
      </div>

      {/* Navigation mobile */}
      <AnimatePresence>
        <motion.div
          className="md:hidden flex justify-around items-center border-t border-gray-200 bg-white py-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center justify-center p-2 ${
                  isActive
                    ? "text-elhassi1"
                    : "text-gray-500"
                }`}
              >
                <div className="relative">
                  {item.icon}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-elhassi1 rounded-full"
                      layoutId="mobile-indicator"
                    />
                  )}
                </div>
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </header>
  );
};

export default AppHeader;