'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  poster: string;
  rating: string;
  year: string;
  duration: string;
  audio: string;
  subtitle: string;
}

interface MoviesSectionProps {
  nowScreening: Movie[];
  comingSoon: Movie[];
}

const MoviesSection: React.FC<MoviesSectionProps> = ({
  nowScreening,
  comingSoon,
}) => {
  const [activeTab, setActiveTab] = useState<'now' | 'soon'>('now');
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  const displayMovies = activeTab === 'now' ? nowScreening : comingSoon;

  // Triple the movies for smooth infinite scroll
  const infiniteMovies = [...displayMovies, ...displayMovies, ...displayMovies];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Start at the middle set of movies
    const initialScroll = container.scrollWidth / 3;
    container.scrollLeft = initialScroll;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const sectionWidth = scrollWidth / 3;

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        // If we're in the first section, jump to the second section (middle)
        if (scrollLeft < sectionWidth * 0.5) {
          isScrollingRef.current = true;
          container.scrollLeft = scrollLeft + sectionWidth;
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 50);
        }
        // If we're in the third section, jump to the second section (middle)
        else if (scrollLeft > sectionWidth * 2.5) {
          isScrollingRef.current = true;
          container.scrollLeft = scrollLeft - sectionWidth;
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 50);
        }
      }, 150);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [displayMovies]);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 380; // Adjusted for smoother scrolling (slightly more than one card)
      const newPosition =
        direction === 'left'
          ? containerRef.current.scrollLeft - scrollAmount
          : containerRef.current.scrollLeft + scrollAmount;

      containerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleTabChange = (tab: 'now' | 'soon') => {
    setActiveTab(tab);
    // Reset scroll position to middle section after tab change
    setTimeout(() => {
      if (containerRef.current) {
        const initialScroll = containerRef.current.scrollWidth / 3;
        containerRef.current.scrollLeft = initialScroll;
      }
    }, 0);
  };

  return (
    <section className="mb-20">
      {/* Section Header */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.2em] text-neutral-400 uppercase mb-4">
          Films
        </p>
        <div className="flex gap-8 border-b border-neutral-200">
          <button
            onClick={() => handleTabChange('now')}
            className={`pb-4 text-2xl font-light tracking-tight transition-colors relative ${
              activeTab === 'now'
                ? 'text-black border-b-2 border-black -mb-[2px]'
                : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            Now Screening
          </button>
          <button
            onClick={() => handleTabChange('soon')}
            className={`pb-4 text-2xl font-light tracking-tight transition-colors relative ${
              activeTab === 'soon'
                ? 'text-black border-b-2 border-black -mb-[2px]'
                : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            Coming Soon
          </button>
        </div>
      </div>

      {/* Movies Grid with Scroll */}
      <div className="relative group overflow-hidden">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-10 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-50 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 duration-200"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-neutral-900" />
        </button>

        {/* Movies Container */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide"
          style={{
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {infiniteMovies.map((movie, index) => (
            <div
              key={`${movie.id}-${index}`}
              className="shrink-0"
              style={{ width: '33.333%', minWidth: '350px' }}
            >
              <MovieCard {...movie} />
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-10 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-50 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 duration-200"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-neutral-900" />
        </button>
      </div>

      {/* Hidden styles for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default MoviesSection;