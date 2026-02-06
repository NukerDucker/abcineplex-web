'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/ui/navbar';
import { BookingMovieInfo } from '@/components/movies/booking-movie-info';
import { DateTimeSelection } from '@/components/movies/date-time-selection';
import { SeatMap } from '@/components/movies/seat-map';
import { TicketSummary } from '@/components/movies/ticket-summary';
import {
  NOW_SCREENING_MOVIES,
  COMING_SOON_MOVIES,
  BOOKING_TIMES,
  BOOKING_DATES,
  SEAT_ROWS,
  SEAT_COLUMNS,
  TICKET_PRICES,
} from '@/lib/constants/movies';
import type { Movie } from '@/lib/constants/movies';
import Image from 'next/image';

type SeatStatus = 'available' | 'reserved' | 'selected';

interface Seat {
  row: string;
  col: number;
  status: SeatStatus;
}

export default function MovieBookingPage() {
  const params = useParams();
  const movieId = Number.parseInt(params.id as string, 10);

  // Find the movie by ID from either now screening or coming soon movies
  const movie: Movie | undefined = useMemo(() => {
    return (
      NOW_SCREENING_MOVIES.find((m) => m.id === movieId) ||
      COMING_SOON_MOVIES.find((m) => m.id === movieId)
    );
  }, [movieId]);

  // Fallback to first movie if not found
  const displayMovie: Movie = movie || NOW_SCREENING_MOVIES[0];

  const [selectedDate, setSelectedDate] = useState(3); // THU
  const [selectedTime, setSelectedTime] = useState('20:00');
  const [seats, setSeats] = useState<Seat[]>(() => {
    // Initialize seats with some random reserved seats
    const initialSeats: Seat[] = [];
    SEAT_ROWS.forEach((row) => {
      SEAT_COLUMNS.forEach((col) => {
        const isReserved = Math.random() > 0.7;
        initialSeats.push({
          row,
          col,
          status: isReserved ? 'reserved' : 'available',
        });
      });
    });
    return initialSeats;
  });

  const [ticketTypes, setTicketTypes] = useState({
    student: 2,
    voucher: 1,
  });

  const toggleSeat = (row: string, col: number) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) => {
        if (seat.row === row && seat.col === col) {
          if (seat.status === 'reserved') return seat;
          return {
            ...seat,
            status: seat.status === 'available' ? 'selected' : 'available',
          };
        }
        return seat;
      })
    );
  };

  const selectedSeats = seats
    .filter((s) => s.status === 'selected')
    .map((s) => `${s.row}${s.col}`);

  const totalTickets = ticketTypes.student + ticketTypes.voucher;
  const totalPrice =
    ticketTypes.student * TICKET_PRICES.STUDENT -
    ticketTypes.voucher * TICKET_PRICES.VOUCHER_DISCOUNT;

  return (
    <div className="min-h-screen bg-[#e8e8e8]">
      <Header />

      {/* Hero Section - Movie Info */}
      <section className="pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-12 items-start">
            {/* Movie Poster */}
            <div className="relative group hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/5 rounded-xl blur-2xl group-hover:blur-xl transition-all duration-500" />
              <div className="relative aspect-[3/4] w-full bg-neutral-300 rounded-xl overflow-hidden border border-neutral-400 shadow-lg">
                <Image
                  src={displayMovie.poster}
                  alt={displayMovie.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Movie Details */}
            <BookingMovieInfo movie={displayMovie} />
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-gradient-to-b from-[#e8e8e8] to-neutral-200">
        <div className="max-w-7xl mx-auto">
          {/* Date & Time Selection */}
          <DateTimeSelection
            dates={BOOKING_DATES}
            times={BOOKING_TIMES}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateChange={setSelectedDate}
            onTimeChange={setSelectedTime}
          />

          {/* Seat Selection & Summary */}
          <div className="grid lg:grid-cols-[1fr,380px] gap-8 items-start">
            {/* Seat Map */}
            <div className="flex justify-center">
              <SeatMap seats={seats} onSeatToggle={toggleSeat} />
            </div>

            {/* Ticket Summary */}
            <TicketSummary
              selectedSeats={selectedSeats}
              selectedDate={BOOKING_DATES[selectedDate]}
              selectedTime={selectedTime}
              studentTickets={ticketTypes.student}
              voucherTickets={ticketTypes.voucher}
              totalPrice={totalPrice}
              onIncreaseStudent={() =>
                setTicketTypes((prev) => ({ ...prev, student: prev.student + 1 }))
              }
              onDecreaseStudent={() =>
                setTicketTypes((prev) =>
                  prev.student > 0 ? { ...prev, student: prev.student - 1 } : prev
                )
              }
              onIncreaseVoucher={() =>
                setTicketTypes((prev) => ({ ...prev, voucher: prev.voucher + 1 }))
              }
              onDecreaseVoucher={() =>
                setTicketTypes((prev) =>
                  prev.voucher > 0 ? { ...prev, voucher: prev.voucher - 1 } : prev
                )
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}