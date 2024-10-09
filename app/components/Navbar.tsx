'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Platos principales', href: '/tema/platos-principales' },
  { label: 'Cerdo', href: '/tema/cerdo' },
  { label: 'Papas', href: '/tema/papas' },
  { label: 'Date un gustito', href: '/tema/date-un-gustito' },
  { label: 'La familia', href: '/tema/la-familia' },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="mb-6 overflow-x-auto">
      <ul className="flex flex-nowrap lg:flex-wrap text-sm whitespace-nowrap">
        {navItems.map((item, index) => (
          <li key={index} className="mr-4 mb-2">
            <Link 
              href={item.href}
              className={`text-blue-600 hover:underline ${pathname === item.href ? 'font-bold' : ''}`}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;