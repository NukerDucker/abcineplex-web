'use client';

import React from 'react';
import { SEAT_ROWS, SEAT_COLUMNS, type BookingDate } from '@/lib/constants/movies';

type SeatStatus = 'available' | 'reserved' | 'selected';

interface Seat {
  row: string;
  col: number;
  status: SeatStatus;
}

interface SeatMapProps {
  readonly seats: Seat[];
  readonly onSeatToggle: (row: string, col: number) => void;
}

export function SeatMap({ seats, onSeatToggle }: SeatMapProps) {
  const getSeat = (row: string, col: number) => {
    return seats.find((s) => s.row === row && s.col === col);
  };

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 border border-neutral-300">
      {/* Screen */}
      <div className="mb-8 sm:mb-12">
        <div className="w-full h-2 bg-gradient-to-r from-transparent via-black to-transparent rounded-full mb-2" />
        <div className="text-center text-black text-sm font-semibold tracking-widest">
          SCREEN
        </div>
      </div>

      {/* Seats Grid */}
      <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
        {SEAT_ROWS.map((row) => (
          <div key={row} className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-6 sm:w-8 text-black font-semibold text-center text-xs sm:text-sm">{row}</div>
            <div className="flex-1 flex justify-center gap-1.5 sm:gap-2">
              {SEAT_COLUMNS.slice(0, 5).map((col) => {
                const seat = getSeat(row, col);
                return (
                  <button
                    key={col}
                    onClick={() => onSeatToggle(row, col)}
                    disabled={seat?.status === 'reserved'}
                    className={`w-7 h-7 sm:w-10 sm:h-10 rounded-lg border-2 transition-all ${
                      seat?.status === 'reserved'
                        ? 'bg-neutral-300 border-neutral-400 cursor-not-allowed'
                        : seat?.status === 'selected'
                        ? 'bg-black border-black scale-110 shadow-lg shadow-black/30'
                        : 'bg-neutral-100 border-neutral-300 hover:border-black hover:scale-105'
                    }`}
                  />
                );
              })}
              <div className="w-4 sm:w-8" />
              {SEAT_COLUMNS.slice(5).map((col) => {
                const seat = getSeat(row, col);
                return (
                  <button
                    key={col}
                    onClick={() => onSeatToggle(row, col)}
                    disabled={seat?.status === 'reserved'}
                    className={`w-7 h-7 sm:w-10 sm:h-10 rounded-lg border-2 transition-all ${
                      seat?.status === 'reserved'
                        ? 'bg-neutral-300 border-neutral-400 cursor-not-allowed'
                        : seat?.status === 'selected'
                        ? 'bg-black border-black scale-110 shadow-lg shadow-black/30'
                        : 'bg-neutral-100 border-neutral-300 hover:border-black hover:scale-105'
                    }`}
                  />
                );
              })}
            </div>
            <div className="w-6 sm:w-8 text-black font-semibold text-center text-xs sm:text-sm">{row}</div>
          </div>
        ))}
      </div>

      {/* Seat Numbers */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8">
        <div className="w-6 sm:w-8" />
        <div className="flex-1 flex justify-center gap-1.5 sm:gap-2">
          {SEAT_COLUMNS.slice(0, 5).map((col) => (
            <div key={col} className="w-7 sm:w-10 text-center text-neutral-600 text-xs sm:text-sm font-medium">
              {col}
            </div>
          ))}
          <div className="w-4 sm:w-8" />
          {SEAT_COLUMNS.slice(5).map((col) => (
            <div key={col} className="w-7 sm:w-10 text-center text-neutral-600 text-xs sm:text-sm font-medium">
              {col}
            </div>
          ))}
        </div>
        <div className="w-6 sm:w-8" />
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 sm:gap-8 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-neutral-300 rounded-lg border-2 border-neutral-400" />
          <span className="text-black text-xs sm:text-sm font-medium">RESERVED</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-neutral-100 rounded-lg border-2 border-neutral-300" />
          <span className="text-black text-xs sm:text-sm font-medium">AVAILABLE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-lg border-2 border-black" />
          <span className="text-black text-xs sm:text-sm font-medium">SELECTED</span>
        </div>
      </div>
    </div>
  );
}
