'use client';

import React from 'react';
import {
  Home,
  Film,
  Bookmark,
  Popcorn,
  Users,
  Gift,
  User,
} from 'lucide-react';

interface HeaderProps {
  activeNav?: string;
}

const Header: React.FC<HeaderProps> = ({ activeNav = 'home' }) => {
  const navItems = [
    { id: 'homepage', label: 'Home', icon: Home },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'watchlists', label: 'Watchlists', icon: Bookmark },
    { id: 'snacks', label: 'Snacks', icon: Popcorn },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'rewards', label: 'Rewards', icon: Gift },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-350 mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer">
              <Film className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex items-center gap-8 no-underline! decoration-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <a
                    style={{ textDecoration: 'none' }}
                  key={item.id}
                  href={`/${item.id}`}
                  className={`flex items-center gap-2 transition-colors no-underline! decoration-none ${
                    isActive
                      ? 'text-black'
                      : 'text-neutral-500 hover:text-black'
                  } `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm tracking-wide font-medium no-underline! decoration-none">{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* User Profile */}
          <button className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-neutral-200 transition-colors">
            <User className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
