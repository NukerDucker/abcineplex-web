'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import type { BookingDate } from '@/lib/constants/movies';

interface TicketSummaryProps {
  readonly selectedSeats: string[];
  readonly selectedDate: BookingDate;
  readonly selectedTime: string;
  readonly studentTickets: number;
  readonly voucherTickets: number;
  readonly totalPrice: number;
  readonly onIncreaseStudent: () => void;
  readonly onDecreaseStudent: () => void;
  readonly onIncreaseVoucher: () => void;
  readonly onDecreaseVoucher: () => void;
}

export function TicketSummary({
  selectedSeats,
  selectedDate,
  selectedTime,
  studentTickets,
  voucherTickets,
  totalPrice,
  onIncreaseStudent,
  onDecreaseStudent,
  onIncreaseVoucher,
  onDecreaseVoucher,
}: TicketSummaryProps) {
  const totalTickets = studentTickets + voucherTickets;
  const studentPrice = 160;
  const voucherDiscount = 40;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white rounded-xl p-4 sm:p-6 border border-neutral-300">
        <h3 className="text-black font-semibold text-base sm:text-lg mb-4 uppercase tracking-wider">
          Select Your Seats
        </h3>
        <div className="flex gap-2 mb-6 flex-wrap">
          {selectedSeats.map((seat) => (
            <button key={seat} className="px-3 sm:px-4 py-2 bg-black text-white font-semibold rounded-lg text-xs sm:text-sm">
              {seat}
            </button>
          ))}
        </div>

        <div className="space-y-3 mb-6 pb-6 border-b border-neutral-300">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-neutral-600">DATE & TIME</span>
            <span className="text-black font-medium">
              {selectedDate.day} {selectedDate.month} 2026 {selectedTime}
            </span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-neutral-600">END TIME</span>
            <span className="text-black font-medium">22:30 PM</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-neutral-600">TICKETS</span>
            <span className="text-black font-medium">{totalTickets} ×{studentPrice}=${totalTickets * studentPrice}</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-neutral-600">TOTAL</span>
            <span className="text-black font-medium">${totalTickets * studentPrice}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2 sm:gap-3">
            <div className="flex-1">
              <button className="w-full py-2 px-3 bg-neutral-100 text-black rounded-lg text-xs sm:text-sm font-medium border border-neutral-300 hover:bg-neutral-200">
                STUDENT : {studentTickets}
              </button>
            </div>
            <div className="flex-1">
              <button className="w-full py-2 px-3 bg-neutral-100 text-black rounded-lg text-xs sm:text-sm font-medium border border-neutral-300 hover:bg-neutral-200">
                VOUCHER : {voucherTickets}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral-100 rounded-xl p-4 sm:p-6 border border-neutral-300">
        <div className="space-y-2 mb-4 text-xs sm:text-sm">
          <div className="flex justify-between text-black">
            <span>TICKETS: {selectedSeats.join(', ')}</span>
            <span>{totalTickets}</span>
          </div>
          <div className="flex justify-between text-black">
            <span>DISCOUNT (STUDENT)</span>
            <span>-${voucherDiscount} ×{voucherTickets}=-${voucherDiscount * voucherTickets}</span>
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-neutral-300 mb-6">
          <span className="text-black font-semibold text-base sm:text-lg">TOTAL PRICE</span>
          <span className="text-black font-bold text-xl sm:text-2xl">${totalPrice}</span>
        </div>
        <Button className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-5 sm:py-6 rounded-lg sm:rounded-xl text-sm sm:text-base transition-all hover:scale-105">
          PAY NOW
        </Button>
      </div>
    </div>
  );
}
