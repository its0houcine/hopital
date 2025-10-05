import type React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface DropdownItemProps {
  tag?: "a" | "button";
  href?: string;
  onClick?: () => void;
  onItemClick?: () => void;
  baseClassName?: string;
  className?: string;
  children: React.ReactNode;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  tag = "button",
  href,
  onClick,
  onItemClick,
  baseClassName = "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  className = "",
  children,
}) => {
  const router = useRouter();
  const combinedClasses = `${baseClassName} ${className}`.trim();

  const handleClick = (event: React.MouseEvent) => {
    // Exécuter les callbacks
    if (onClick) onClick();
    if (onItemClick) onItemClick();

    // Si c'est un lien, naviguer vers la destination
    if (href) {
      event.preventDefault();
      setTimeout(() => {
        router.push(href);
      }, 100); // Petit délai pour permettre à onItemClick de s'exécuter d'abord
    }
  };

  if (href) {
    return (
      <a href="#" className={combinedClasses} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={handleClick} className={combinedClasses}>
      {children}
    </button>
  );
};
