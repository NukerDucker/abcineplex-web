'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Home,
  Film,
  Bookmark,
  Popcorn,
  Users,
  Gift,
  User,
  LogOut,
  LogIn,
  UserPlus,
} from 'lucide-react';

interface HeaderProps {
  readonly activeNav?: string;
}

export function Header({ activeNav = 'home' }: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navItems = [
    { id: 'homepage', label: 'Home', icon: Home },
    { id: 'movies', label: 'Movies', icon: Film },
    // { id: 'watchlists', label: 'Watchlists', icon: Bookmark },
    { id: 'snacks', label: 'Snacks', icon: Popcorn },
    { id: 'community', label: 'Community', icon: Users },
    // { id: 'rewards', label: 'Rewards', icon: Gift },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignIn = () => {
    // Navigate to login page
    window.location.href = '/login';
  };

  const handleRegister = () => {
    // Navigate to register page
    window.location.href = '/register';
  };

  const handleSignOut = () => {
    // TODO: Call logout API
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    // TODO: Redirect to homepage
    window.location.href = '/homepage';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-350 mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            {/* <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer">
              <Film className="w-6 h-6 text-white" />
            </div> */}
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
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-neutral-200 transition-colors"
            >
              <User className="w-5 h-5 text-neutral-600" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 z-50">
                {isLoggedIn ? (
                  // Logged In State - Only Sign Out
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-neutral-50 transition-colors text-neutral-700 hover:text-black border-b border-neutral-100 last:border-b-0"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                ) : (
                  // Logged Out State - Sign In and Register
                  <>
                    <button
                      onClick={handleSignIn}
                      className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-neutral-50 transition-colors text-neutral-700 hover:text-black border-b border-neutral-100"
                    >
                      <LogIn className="w-4 h-4" />
                      <span className="text-sm font-medium">Sign In</span>
                    </button>
                    <button
                      onClick={handleRegister}
                      className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-neutral-50 transition-colors text-neutral-700 hover:text-black"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span className="text-sm font-medium">Register</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
