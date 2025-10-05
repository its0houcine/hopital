"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { GridIcon } from "@/icons";

const AppSidebar = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const pathname = usePathname();

  const navItems = [
    {
      icon: <GridIcon />,
      name: "Dashboard",
      path: "/medecin/dashboard",
    }
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <aside
      className={`fixed top-30 left-0 lg:ml-2 flex flex-col bg-white dark:bg-gray-900 text-gray-900 h-[calc(95vh-6rem)] w-[260px] rounded-2xl shadow-md transition-all duration-300 ease-in-out z-50 
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col items-center gap-8 pt-10">
          <ul className="flex flex-col gap-8 items-center">
            {navItems.map((nav) => (
              <li key={nav.name} className="w-full">
                <Link
                  href={nav.path}
                  className={`menu-item group ${
                    isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                  }`}
                >
                  <span
                    className={`${
                      isActive(nav.path)
                        ? "menu-item-icon-active"
                        : "menu-item-icon-inactive"
                    }`}
                  >
                    {nav.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="menu-item-text">Dashboard</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
