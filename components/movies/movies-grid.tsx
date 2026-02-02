'use client';

import type { Movie } from '@/lib/constants/movies';
import { MovieCard } from './movie-card';

interface MoviesGridProps {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

export function MoviesGrid({ movies, onMovieClick }: MoviesGridProps) {
  return (
    <div className="max-w-[1600px] mx-auto px-8 py-12">
      <div className="grid grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => onMovieClick?.(movie)}
          />
        ))}
      </div>
    </div>
  );
}
