'use client';

import React from 'react';
import { Play, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Movie } from '@/lib/constants/movies';

interface BookingMovieInfoProps {
  readonly movie: Movie;
}

export function BookingMovieInfo({ movie }: BookingMovieInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-4 tracking-tight">
          {movie.title} ({movie.year})
        </h1>
        <div className="flex items-center gap-2 flex-wrap">
          {movie.genres?.map((genre) => (
            <span
              key={genre}
              className="px-3 py-1.5 bg-neutral-100 text-black text-xs sm:text-sm font-medium rounded-full border border-neutral-300"
            >
              {genre}
            </span>
          ))}
          {movie.imdbRating && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 rounded-full border border-yellow-300">
              <span className="text-xs font-bold text-yellow-700">IMDb</span>
              <span className="text-black font-semibold text-sm">{movie.imdbRating}</span>
            </div>
          )}
          {movie.tomatoScore && (
            <div className="px-3 py-1.5 bg-red-100 rounded-full border border-red-300">
              <span className="text-black font-semibold text-sm">🍅 {movie.tomatoScore}</span>
            </div>
          )}
          {movie.tomatoAudience && (
            <div className="px-3 py-1.5 bg-orange-100 rounded-full border border-orange-300">
              <span className="text-black font-semibold text-sm">🍿 {movie.tomatoAudience}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="p-3 sm:p-4 bg-neutral-100 rounded-lg sm:rounded-xl border border-neutral-300">
          <div className="text-xs text-neutral-600 mb-1 uppercase tracking-wider font-semibold">Duration</div>
          <div className="text-black font-semibold text-sm sm:text-base">{movie.duration}</div>
        </div>
        <div className="p-3 sm:p-4 bg-neutral-100 rounded-lg sm:rounded-xl border border-neutral-300">
          <div className="text-xs text-neutral-600 mb-1 uppercase tracking-wider font-semibold">Rating</div>
          <div className="text-black font-semibold text-sm sm:text-base">{movie.rating}</div>
        </div>
      </div>

      {movie.director && (
        <div>
          <h3 className="text-xs text-neutral-600 mb-2 uppercase tracking-wider font-semibold">Director</h3>
          <p className="text-black font-medium text-sm">{movie.director}</p>
        </div>
      )}

      {movie.starring && (
        <div>
          <h3 className="text-xs text-neutral-600 mb-2 uppercase tracking-wider font-semibold">Starring</h3>
          <p className="text-black font-medium text-sm">{movie.starring}</p>
        </div>
      )}

      {movie.synopsis && (
        <div>
          <h3 className="text-xs text-neutral-600 mb-2 uppercase tracking-wider font-semibold">Synopsis</h3>
          <p className="text-neutral-700 leading-relaxed text-sm">{movie.synopsis}</p>
        </div>
      )}

      <div className="flex gap-3 sm:gap-4 pt-4">
        <Button className="flex-1 bg-black hover:bg-neutral-800 text-white font-semibold py-5 sm:py-6 rounded-lg sm:rounded-xl transition-all hover:scale-105">
          <Play className="mr-2 h-5 w-5 fill-current" />
          <span className="hidden sm:inline">WATCH TRAILER</span>
          <span className="sm:hidden">TRAILER</span>
        </Button>
        <Button
          variant="outline"
          className="flex-1 border-neutral-300 text-black hover:bg-neutral-100 py-5 sm:py-6 rounded-lg sm:rounded-xl transition-all hover:scale-105"
        >
          <Plus className="mr-2 h-5 w-5" />
          <span className="hidden sm:inline">WATCHLIST</span>
          <span className="sm:hidden">LIST</span>
        </Button>
      </div>
    </div>
  );
}
