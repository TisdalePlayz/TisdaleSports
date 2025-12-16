'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  ClockIcon,
  ChartBarIcon,
  TrophyIcon,
  CogIcon,
  XMarkIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Live', href: '/live', icon: ClockIcon },
  { name: 'Props', href: '/props', icon: ChartBarIcon },
  { name: 'EDGE', href: '/edge', icon: TrophyIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

export function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-system-secondary border-r border-system-quaternary z-40">
        <div className="p-6">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold">TisdaleSports</h1>
            <p className="text-sm text-system-secondary">Advanced Sports Analytics</p>
          </div>

          {/* Navigation Items */}
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-primary-500 text-white'
                      : 'hover:bg-system-tertiary text-system-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <header className="fixed top-0 left-0 right-0 bg-system-background border-b border-system-quaternary z-50">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-xl font-bold">TisdaleSports</h1>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-system-tertiary"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </header>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-system-background border-t border-system-quaternary z-40">
          <div className="flex items-center justify-around py-2">
            {navItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                    active
                      ? 'text-primary-500'
                      : 'text-system-secondary hover:text-system-foreground'
                  }`}
                >
                  <Icon className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}