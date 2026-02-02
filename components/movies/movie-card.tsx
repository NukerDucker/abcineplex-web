'use client';

import type { Movie } from '@/lib/constants/movies';

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  // Handle missing poster
  if (!movie.poster) {
    return null;
  }

  return (
    <div
      className="group cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      {/* Movie Poster */}
      <div className="relative overflow-hidden rounded-lg mb-4 aspect-[2/3] bg-neutral-900">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Movie Info */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-bold tracking-wide leading-tight whitespace-pre-line flex-1">
          {movie.title}
        </h3>
        <div className="text-right text-xs font-medium text-neutral-600 whitespace-pre-line leading-tight">
          {movie.year}
        </div>
      </div>
    </div>
  );
}
