"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { LogOut, Settings, User, Shield } from "lucide-react";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleLogout = async () => {
    closeDropdown();
    // La fonction logout gère maintenant l'animation et la redirection
    await logout();
  };

  const handleProfileClick = () => {
    // Fermer le dropdown
    closeDropdown();

    // Ajouter un effet visuel pour indiquer que le clic a fonctionné
    const profileLink = document.querySelector('.profile-link');
    if (profileLink) {
      profileLink.classList.add('clicked');
      setTimeout(() => {
        profileLink.classList.remove('clicked');
      }, 300);
    }
  };

  // Déterminer le badge de rôle
  const getRoleBadge = () => {
    if (user?.role === 'super_admin') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
          <Shield className="w-3 h-3 mr-1" />
          Super Administrateur
        </span>
      );
    } else if (user?.role === 'admin') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          <User className="w-3 h-3 mr-1" />
          Secrétariat
        </span>
      );
    } else if (user?.role === 'medecin') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <User className="w-3 h-3 mr-1" />
          Médecin
        </span>
      );
    }
    return null;
  };

  return (
    <div className="relative">
      <motion.button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dark:text-gray-400 dropdown-toggle"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] p-0.5">
          {user?.photo ? (
            <Image
              width={44}
              height={44}
              src={user.photo}
              alt={`${user.prenom} ${user.nom}`}
              className="rounded-full"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[var(--color-elhassi1)] font-bold">
              {user?.prenom?.[0]}{user?.nom?.[0]}
            </div>
          )}
        </span>

        <span className="block mr-1 font-medium text-theme-sm">
          {user?.prenom && user?.nom ? `${user.prenom} ${user.nom}` : 'Utilisateur'}
        </span>

        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark backdrop-blur-sm"
      >
        <div className="p-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="overflow-hidden rounded-full h-12 w-12 bg-gradient-to-r from-[var(--color-elhassi1)] to-[var(--color-elhassi3)] p-0.5">
              {user?.photo ? (
                <Image
                  width={48}
                  height={48}
                  src={user.photo}
                  alt={`${user.prenom} ${user.nom}`}
                  className="rounded-full"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[var(--color-elhassi1)] font-bold">
                  {user?.prenom?.[0]}{user?.nom?.[0]}
                </div>
              )}
            </div>
            <div>
              <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-300">
                {user?.prenom} {user?.nom}
              </span>
              <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
                {user?.email}
              </span>
              <div className="mt-1">
                {getRoleBadge()}
              </div>
            </div>
          </div>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <DropdownItem
              className="profile-link flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg transition-colors"
              href="/profile"
              onItemClick={handleProfileClick}
            >
              <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span>Mon profil</span>
            </DropdownItem>
          </li>
        </ul>

        <div className="pt-3">
          <DropdownItem
            className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors w-full"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </DropdownItem>
        </div>


      </Dropdown>
    </div>
  );
}
