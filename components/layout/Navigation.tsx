"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps {
  mobile?: boolean;
}

export default function Navigation({ mobile = false }: NavigationProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/packages", label: "Packages" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact Us" },
  ];

  const baseClasses = mobile
    ? "flex flex-col space-y-2 px-4"
    : "flex items-center space-x-8";

  const getLinkClasses = (href: string) => {
    const isActive =
      href === "/" ? pathname === "/" : pathname.startsWith(href);

    const activeClasses = isActive
      ? "text-brand-purple font-semibold"
      : "text-gray-700";

    if (mobile) {
      return `${activeClasses} hover:text-brand-purple transition-colors font-medium py-2`;
    }
    return `${activeClasses} hover:text-brand-purple transition-colors font-medium`;
  };

  return (
    <ul className={baseClasses}>
      {navItems.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className={getLinkClasses(item.href)}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
