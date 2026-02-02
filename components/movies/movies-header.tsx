'use client';

import Link from 'next/link';
import {
  Home,
  Film,
  Bookmark,
  Popcorn,
  Users,
  Gift,
  User
} from 'lucide-react';

interface NavLink {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

export function MoviesHeader() {
  const navLinks: NavLink[] = [
    { icon: <Home className="w-4 h-4" />, label: 'Home', href: '/' },
    { icon: <Film className="w-4 h-4" />, label: 'Movies', href: '/movies', isActive: true },
    { icon: <Bookmark className="w-4 h-4" />, label: 'WATCHLISTS', href: '#' },
    { icon: <Popcorn className="w-4 h-4" />, label: 'SNACKS', href: '#' },
    { icon: <Users className="w-4 h-4" />, label: 'COMMUNITY', href: '#' },
    { icon: <Gift className="w-4 h-4" />, label: 'REWARDS', href: '#' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="max-w-[1600px] mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-neutral-800 transition-colors">
              <Film className="w-6 h-6 text-white" />
            </div>
          </Link>

          {/* Main Navigation */}
          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-2 transition-colors ${
                  link.isActive
                    ? 'text-black font-semibold border-b-2 border-black pb-1'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                {link.icon}
                <span className="text-sm tracking-wide">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* User Profile */}
          <button
            className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-neutral-200 transition-colors"
            aria-label="User profile"
          >
            <User className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
      </div>
    </nav>
  );
}
