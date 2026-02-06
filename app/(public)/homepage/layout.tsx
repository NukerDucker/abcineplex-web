'use client';

import React from 'react';
import { Header } from '@/components/ui/navbar';
import { HeroCarousel } from '@/components/homepage/hero-carousel';
import { MoviesSection } from '@/components/homepage/movies-section';
import { PromotionalSection } from '@/components/homepage/promotional-section';
import { NOW_SCREENING_MOVIES,
         COMING_SOON_MOVIES,
         PROMO_EVENTS,
         AB_CLASSIC_HERO,
         RECOMMENDED_MOVIE_1_HERO,
         RECOMMENDED_MOVIE_2_HERO,
         EVENT_OF_THE_MONTH_HERO
        } from '@/lib/constants/movies';

interface HomepageLayoutProps {
  children: React.ReactNode;
}

const HomepageLayout: React.FC<HomepageLayoutProps> = ({ children }) => {

  return (
    <div className="min-h-screen  flex flex-col">
      {/* Header */}
      <Header activeNav="home" />

      {/* Hero Carousel */}
      <HeroCarousel
        abClassic={AB_CLASSIC_HERO}
        recommendedMovie1={RECOMMENDED_MOVIE_1_HERO}
        recommendedMovie2={RECOMMENDED_MOVIE_2_HERO}
        eventOfTheMonth={EVENT_OF_THE_MONTH_HERO}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-350 mx-auto px-4 sm:px-6 w-full">
        {/* Movies Section */}
        <MoviesSection
          nowScreening={NOW_SCREENING_MOVIES}
          comingSoon={COMING_SOON_MOVIES}
        />

        {/* Promotional Section */}
        <PromotionalSection events={PROMO_EVENTS} />

        {/* Children Content */}
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-12 mt-12">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-medium mb-4">About</h4>
              <p className="text-sm leading-relaxed">
                Your premium cinema experience with the latest films and events.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Follow Us</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-700 pt-8 flex justify-between items-center">
            <p className="text-xs">&copy; 2025 ABCineplex. All rights reserved.</p>
            <div className="flex gap-6 text-xs">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HomepageLayout;