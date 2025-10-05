"use client";
import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons/index";


type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: <UserCircleIcon />,
    name: "Patients",
    path: "/patients",
  },
  {
    icon: <UserCircleIcon />,
    name: "Médecins",
    path: "/medecins",
  },
  {
    icon: <PieChartIcon />,
    name: "Statistiques",
    path: "/stat",
  },
  {
    icon: <BoxCubeIcon />,
    name: "Administration",
    path: "/administration",
  },
];
const settingsItem: NavItem = {
  icon: <PlugInIcon />,
  name: "Paramètres",
  path: "/parametres",
};




const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const { isSuperAdmin } = useAuth();
  const pathname = usePathname();

  // Filtrer les éléments de navigation en fonction du rôle
  const filteredNavItems = navItems.filter(item => {
    // Seuls les super admins peuvent voir certaines pages
    if ((item.path === '/administration') && !isSuperAdmin) {
      return false;
    }
    return true;
  });

  const renderMenuItems = (navItems: NavItem[]) => (
    <ul className="flex flex-col gap-8 items-center">
      {navItems.map((nav, index) => (
        <motion.li
          key={nav.name}
          className="w-full"
          variants={itemVariants}
          whileHover={{ x: 3 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {nav.subItems ? (
            <motion.button
              onClick={() => handleSubmenuToggle(index)}
              className={`menu-item group ${
                openSubmenu?.index === index ? "menu-item-active" : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className={`${
                  openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
                whileHover={{ scale: 1.1 }}
                animate={{ rotate: openSubmenu?.index === index ? [0, -10, 0] : 0 }}
                transition={{ duration: 0.3 }}
              >
                {nav.icon}
              </motion.span>
              <AnimatePresence>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <motion.span
                    className="menu-item-text"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {nav.name}
                  </motion.span>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <motion.div
                    initial={{ opacity: 0, rotate: 0 }}
                    animate={{
                      opacity: 1,
                      rotate: openSubmenu?.index === index ? 180 : 0,
                      color: openSubmenu?.index === index ? "var(--color-brand-500)" : "currentColor"
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-auto"
                  >
                    <ChevronDownIcon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ) : (
            nav.path && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={nav.path}
                  prefetch={true}
                  className={`menu-item group ${
                    isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                  }`}
                >
                  <motion.span
                    className={`${
                      isActive(nav.path)
                        ? "menu-item-icon-active"
                        : "menu-item-icon-inactive"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    animate={{
                      rotate: isActive(nav.path) ? [0, -5, 5, 0] : 0,
                      transition: { duration: 0.5, repeat: isActive(nav.path) ? 0 : 0 }
                    }}
                  >
                    {nav.icon}
                  </motion.span>
                  <AnimatePresence>
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <motion.span
                        className="menu-item-text"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {nav.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            )
          )}
        </motion.li>
      ))}
    </ul>
  );


  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main";
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    let submenuMatched = false;
    navItems.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu({
              type: "main",
              index,
            });
            submenuMatched = true;
          }
        });
      }
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (prevOpenSubmenu && prevOpenSubmenu.index === index) {
        return null;
      }
      return { type: "main", index };
    });
  };


  // Animation variants
  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    },
    exit: {
      x: -300,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <motion.aside
      className={`fixed top-30 left-0 lg:ml-2 flex flex-col bg-white dark:bg-gray-900 text-gray-900 h-[calc(95vh-6rem)] w-[260px] rounded-2xl shadow-md z-50
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      style={{
        transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1.0), width 0.3s cubic-bezier(0.25, 0.1, 0.25, 1.0)'
      }}
    >
      {/* Toute la partie scrollable */}
      <motion.div
        className="flex flex-1 flex-col justify-between overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        variants={itemVariants}
      >
        {/* PARTIE HAUTE */}
        <motion.div
          className="flex flex-col items-center gap-8 pt-10"
          variants={itemVariants}
        >
          {renderMenuItems(filteredNavItems)}
        </motion.div>

        {/* PARTIE BASSE */}
        <motion.div
          className="pb-6 border-gray-200 w-full pt-6 flex justify-center"
          variants={itemVariants}
        >
          {renderMenuItems([settingsItem])}
        </motion.div>
      </motion.div>
    </motion.aside>
  );


};

// Memoize the component to prevent unnecessary re-renders
export default memo(AppSidebar);
