'use client';

import React from 'react';
import Image from "next/image";

interface MovieCardProps {
  id: number;
  title: string;
  banner: string;
  rating: string;
  year: string;
  duration: string;
  audio: string;
  subtitle: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  banner,
  rating,
  year,
  duration,
  audio,
  subtitle,
}) => {
  const imageSrc = banner || "";

  if (!imageSrc) return null;

  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-sm mb-4 aspect-3/2">
        <Image
          src={imageSrc}
          alt={title}
          width={600}
          height={400}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/0" />
      </div>

      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-medium tracking-wide line-clamp-2 flex-1">
            {title}
          </h3>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className="text-[10px] tracking-wider text-neutral-400 uppercase">
              Rating
            </span>
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 text-[11px] text-neutral-600">
          <div>
            <div className="text-[9px] tracking-wider text-neutral-400 uppercase mb-1">
              Year
            </div>
            <div className="font-medium">{year}</div>
          </div>
          <div>
            <div className="text-[9px] tracking-wider text-neutral-400 uppercase mb-1">
              Duration
            </div>
            <div className="font-medium">{duration}</div>
          </div>
          <div>
            <div className="text-[9px] tracking-wider text-neutral-400 uppercase mb-1">
              Audio
            </div>
            <div className="font-medium">{audio}</div>
          </div>
          <div>
            <div className="text-[9px] tracking-wider text-neutral-400 uppercase mb-1">
              Subtitle
            </div>
            <div className="font-medium">{subtitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
