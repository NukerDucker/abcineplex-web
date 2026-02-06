'use client';

import { useState } from 'react';
import { COMING_SOON_MOVIES, NOW_SCREENING_MOVIES, type Movie } from '@/lib/constants/movies';
import { Header } from '@/components/ui/navbar';
import { TabNavigation } from '@/components/movies/tab-navigation';
import { MoviesGrid } from '@/components/movies/movies-grid';

export default function MoviesPage() {
  const [activeTab, setActiveTab] = useState<'now' | 'soon'>('soon');

  const currentMovies = activeTab === 'soon' ? COMING_SOON_MOVIES : NOW_SCREENING_MOVIES;

  return (
    <div className="min-h-screen bg-[#e8e8e8]">
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <MoviesGrid movies={currentMovies} />
    </div>
  );
}
