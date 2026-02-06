'use client';

import Image from 'next/image';
import Link from 'next/link';

interface HomepageMovieCardProps {
  readonly id: number;
  readonly title: string;
  readonly banner: string;
  readonly rating: string;
  readonly year: string;
  readonly duration: string;
  readonly audio: string;
  readonly subtitle: string;
}

export function HomepageMovieCard({
  id,
  title,
  banner,
  rating,
  year,
  duration,
  audio,
  subtitle,
}: HomepageMovieCardProps) {
  const imageSrc = banner || '';

  if (!imageSrc) return null;

  return (
    <Link href={`/movie/${id}`}>
      <div className="group cursor-pointer">
        <div className="relative overflow-hidden rounded-sm mb-4 aspect-video">
          <Image
            src={imageSrc}
            alt={title}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
        </div>

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-medium tracking-wide line-clamp-2 flex-1">
              {title}
            </h3>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-xs tracking-widest text-neutral-400 uppercase">
                Rating
              </span>
              <span className="text-sm font-semibold">{rating}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-neutral-600">
            <div>
              <p className="text-neutral-500 text-xs uppercase">Year</p>
              <p className="font-medium text-neutral-900">{year}</p>
            </div>
            <div>
              <p className="text-neutral-500 text-xs uppercase">Duration</p>
              <p className="font-medium text-neutral-900">{duration}</p>
            </div>
            <div>
              <p className="text-neutral-500 text-xs uppercase">Audio</p>
              <p className="font-medium text-neutral-900">{audio}</p>
            </div>
            <div>
              <p className="text-neutral-500 text-xs uppercase">Subtitle</p>
              <p className="font-medium text-neutral-900">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
