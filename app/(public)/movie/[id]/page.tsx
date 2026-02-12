'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/ui/navbar';
import { BookingMovieInfo } from '@/components/movies/booking-movie-info';
import { DateTimeSelection } from '@/components/movies/date-time-selection';
import { SeatMap } from '@/components/movies/seat-map';
import { TicketSummary } from '@/components/movies/ticket-summary';
import { moviesApi, showtimesApi, bookingsApi } from '@/services/api';
import { useAuth } from '@/context/auth-context';

import Image from 'next/image';
import type { Movie } from '@/types/api';

type SeatStatus = 'available' | 'reserved' | 'selected' | 'locked';

interface Seat {
  id: number;  // seat_id from API
  row: string;
  col: number;
  status: SeatStatus;
  price?: number;
}

interface BookingDate {
  day: number;
  month: string;
  dayName: string;
  fullDate?: string;
}

interface Showtime {
  id: number;
  movie_id: number;
  screen_id: number;
  start_time: string;
  base_price: number;
  created_at: string;
}

export default function MovieBookingPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const movieId = Number(params.id);

  // Movie state
  const [movie, setMovie] = useState<Movie | null>(null);
  const [movieLoading, setMovieLoading] = useState(true);
  const [movieError, setMovieError] = useState<string | null>(null);

  // Showtimes state
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);

  // Booking state
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState('');
  const [seats, setSeats] = useState<Seat[]>([]);
  const [isBooking, setIsBooking] = useState(false);
  const [currentShowtimeId, setCurrentShowtimeId] = useState<number | null>(null);



  // Derived state for booking dates/times from showtimes
  const [bookingDates, setBookingDates] = useState<BookingDate[]>([]);
  const [bookingTimes, setBookingTimes] = useState<string[]>([]);

  // Fetch movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setMovieLoading(true);
        setMovieError(null);
        const data = await moviesApi.getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        console.error('Failed to fetch movie:', error);
        setMovieError('Failed to load movie details');
      } finally {
        setMovieLoading(false);
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  // Fetch showtimes and process dates
  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const data = await showtimesApi.getShowtimesByMovie(movieId);
        setShowtimes(data || []);

        // Process dates from showtimes
        if (data && data.length > 0) {
          const uniqueDates = new Set();
          const dates: BookingDate[] = [];
          const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
          const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

          data.forEach((stime) => {
            const date = new Date(stime.start_time);
            const dateStr = date.toDateString();
            if (!uniqueDates.has(dateStr)) {
              uniqueDates.add(dateStr);
              dates.push({
                day: date.getDate(),
                month: monthNames[date.getMonth()],
                dayName: dayNames[date.getDay()],
                fullDate: dateStr // helpful for filtering
              });
            }
          });

          dates.sort((a, b) => new Date(a.fullDate || '').getTime() - new Date(b.fullDate || '').getTime());
          setBookingDates(dates);

          // Select first date by default
          if (dates.length > 0) {
            setSelectedDate(0);
          }
        }
      } catch (error) {
        console.error('Failed to fetch showtimes:', error);
        setShowtimes([]);
      }
    };

    if (movieId) {
      fetchShowtimes();
    }
  }, [movieId]);

  // Update times when date changes
  useEffect(() => {
    if (bookingDates.length > 0 && showtimes.length > 0) {
        const selectedDateObj = bookingDates[selectedDate];
        // Filter showtimes for this date
        const timesForDate = showtimes
            .filter((s) => new Date(s.start_time).toDateString() === selectedDateObj.fullDate)
            .map((s) => {
                const date = new Date(s.start_time);
                return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
            })
            .sort(); // Sort times

        // Remove duplicates if any (though backend should handle distinct start times)
        const uniqueTimes = Array.from(new Set(timesForDate));

        setBookingTimes(uniqueTimes);
        if (uniqueTimes.length > 0) {
            setSelectedTime(uniqueTimes[0]);
        } else {
            setSelectedTime('');
        }
    }
  }, [selectedDate, bookingDates, showtimes]);

  // Find showtime ID and fetch seats when time changes
  useEffect(() => {
    const fetchSeats = async () => {
        if (!selectedTime || bookingDates.length === 0) return;

        const selectedDateObj = bookingDates[selectedDate];

        // Find showtime matching date & time
        const showtime = showtimes.find((s) => {
            const d = new Date(s.start_time);
            const t = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
            return d.toDateString() === selectedDateObj.fullDate && t === selectedTime;
        });

        if (showtime) {
            setCurrentShowtimeId(showtime.id);
            try {
                const seatsData = await showtimesApi.getSeats(showtime.id);
                // Transform API seats to component seats
                // API: { row_letter, seat_number, status, price }
                // Component: { row, col, status }

                // If API returns empty (no seats configured), fallback to mock or handle empty
                if (seatsData && seatsData.length > 0) {
                    const mappedSeats = seatsData.map((s) => ({
                        id: s.seat_id,  // keep seat_id for booking
                        row: s.row_label,
                        col: s.seat_number,
                        status: s.status?.toLowerCase() === 'available' ? 'available' as const : 'reserved' as const,
                        price: s.price
                    }));
                    setSeats(mappedSeats);
                } else {
                    // Fallback to empty or init from scratch if backend hasn't populated seats yet
                    setSeats([]);
                }
            } catch (error) {
                console.error("Failed to fetch seats", error);
            }
        }
    };

    fetchSeats();
  }, [selectedTime, selectedDate, bookingDates, showtimes]);

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

  const handleBooking = async () => {
    if (!currentShowtimeId || selectedSeats.length === 0) return;

    // Require login
    if (!isAuthenticated || !user) {
      alert('Please sign in to book tickets.');
      router.push('/login');
      return;
    }

    try {
      setIsBooking(true);
      const showtime = showtimes.find((s) => s.id === currentShowtimeId);
      const screenId = showtime?.screen_id;

      if (!screenId) {
        alert('Error: Could not determine screen for booking.');
        return;
      }

      // Get seat_ids for selected seats
      const selectedSeatIds = seats
        .filter(s => s.status === 'selected')
        .map(s => s.id);

      // Calculate price per seat from the first selected seat or use default
      const pricePerSeat = seats.find(s => s.status === 'selected')?.price || 15;

      // Step 1: Reserve seats via API (starts 5-min countdown in Supabase)
      const reserveResult = await bookingsApi.reserveSeats({
        user_id: user.id,
        screen_id: screenId,
        seat_ids: selectedSeatIds,
        price_per_seat: pricePerSeat,
      });

      if (!reserveResult.success || !reserveResult.booking_id) {
        alert(`Reservation failed: ${reserveResult.error || 'Some seats are no longer available'}`);
        // Refresh seats so user sees updated availability
        const seatsData = await showtimesApi.getSeats(currentShowtimeId);
        if (seatsData && seatsData.length > 0) {
          setSeats(seatsData.map((s) => ({
            id: s.seat_id,
            row: s.row_label,
            col: s.seat_number,
            status: s.status?.toLowerCase() === 'available' ? 'available' as const : 'reserved' as const,
            price: s.price,
          })));
        }
        return;
      }

      // Step 2: Navigate to payment page with booking info
      const seatLabels = seats
        .filter(s => s.status === 'selected')
        .map(s => `${s.row}${s.col}`)
        .join(',');

      const params = new URLSearchParams({
        booking_id: String(reserveResult.booking_id),
        movie_id: String(movieId),
        showtime_id: String(currentShowtimeId),
        seats: seatLabels,
        total: String(reserveResult.total_amount || seatsTotalPrice),
        deadline: reserveResult.payment_deadline ? new Date(reserveResult.payment_deadline).toISOString() : '',
      });

      router.push(`/payment?${params.toString()}`);
    } catch (error) {
      console.error('Booking failed', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const selectedSeats = seats
    .filter((s) => s.status === 'selected')
    .map((s) => `${s.row}${s.col}`);

  // Calculate total price from selected seats
  const seatsTotalPrice = seats
    .filter((s) => s.status === 'selected')
    .reduce((sum, s) => sum + (s.price || 15), 0);

  if (movieLoading) {
    return (
      <div className="min-h-screen bg-[#e8e8e8]">
        <Header />
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-neutral-600">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (movieError || !movie) {
    return (
      <div className="min-h-screen bg-[#e8e8e8]">
        <Header />
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-red-600">{movieError || 'Movie not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8e8e8]">
      <Header />

      {/* Hero Section - Movie Info */}
      <section className="pt-16 sm:pt-20 lg:pt-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-12 items-start">
            {/* Movie Poster */}
            <div className="relative group hidden lg:block">
              <div className="relative aspect-2/3 w-full bg-neutral-900 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={movie.poster_url}
                  alt={movie.title}
                  fill
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1024px) 0px, 300px"
                  priority
                />
              </div>
            </div>

            {/* Movie Details */}
            <BookingMovieInfo movie={movie} />
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-linear-to-b from-[#e8e8e8] to-neutral-200">
        <div className="max-w-7xl mx-auto">
          {/* Date & Time Selection */}
          <DateTimeSelection
            dates={bookingDates}
            times={bookingTimes}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateChange={setSelectedDate}
            onTimeChange={setSelectedTime}
          />

          {/* Seat Selection & Summary */}
          <div className="flex justify-center gap-8 items-start">
            {/* Ticket Summary - Left */}
            <TicketSummary
              selectedSeats={selectedSeats}
              selectedDate={bookingDates[selectedDate]}
              selectedTime={selectedTime}
              totalPrice={seatsTotalPrice}
              onBook={handleBooking}
              isBooking={isBooking}
            />

            {/* Seat Map - Right */}
            {seats.length > 0 ? (
              <SeatMap seats={seats} onSeatToggle={toggleSeat} />
            ) : (
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-neutral-300">
                <p className="text-neutral-600">Loading seats...</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
