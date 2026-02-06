'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { BookingDate } from '@/lib/constants/movies';

interface DateTimeSelectionProps {
  readonly dates: BookingDate[];
  readonly times: string[];
  readonly selectedDate: number;
  readonly selectedTime: string;
  readonly onDateChange: (index: number) => void;
  readonly onTimeChange: (time: string) => void;
}

export function DateTimeSelection({
  dates,
  times,
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: DateTimeSelectionProps) {
  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 border border-neutral-300 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-200 hover:bg-neutral-300 transition flex items-center justify-center border border-neutral-400 flex-shrink-0">
            <ChevronLeft className="h-5 w-5 text-black" />
          </button>
          <h3 className="text-black font-semibold text-base sm:text-lg uppercase tracking-wider">Date</h3>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 justify-start sm:justify-end">
          <h3 className="text-black font-semibold text-base sm:text-lg uppercase tracking-wider">Time</h3>
          <Select value={selectedTime} onValueChange={onTimeChange}>
            <SelectTrigger className="w-[140px] sm:w-[180px] bg-neutral-100 border-neutral-300 text-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {times.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2">
        {dates.map((date, index) => (
          <button
            key={index}
            onClick={() => onDateChange(index)}
            className={`flex-shrink-0 p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all min-w-[70px] sm:min-w-[80px] ${
              selectedDate === index
                ? 'bg-black text-white scale-105 shadow-lg shadow-black/20'
                : 'bg-neutral-100 text-black hover:bg-neutral-200 border border-neutral-300'
            }`}
          >
            <div className="text-xs opacity-70 mb-1">{date.month}</div>
            <div className="text-2xl sm:text-3xl font-bold mb-1">{date.day}</div>
            <div className="text-xs opacity-70">{date.dayName}</div>
          </button>
        ))}
        <button className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-200 hover:bg-neutral-300 transition flex items-center justify-center border border-neutral-400">
          <ChevronRight className="h-5 w-5 text-black" />
        </button>
      </div>
    </div>
  );
}
