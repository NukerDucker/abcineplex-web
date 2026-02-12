'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import {
  PaymentMethodSelector,
  CardPaymentForm,
  PromptPayForm,
  BookingSummary,
  useCountdown,
  type PaymentMethod,
  type BookingDetails,
} from '@/components/payment';
import { bookingsApi, moviesApi, showtimesApi } from '@/services/api';

export default function BookingPayment() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const bookingId = searchParams.get('booking_id');
  const movieId = searchParams.get('movie_id');
  const showtimeId = searchParams.get('showtime_id');
  const seatsParam = searchParams.get('seats');
  const totalParam = searchParams.get('total');
  const deadlineParam = searchParams.get('deadline');

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvc, setCvc] = useState('');
  const [saveInfo, setSaveInfo] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Booking data state
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentDeadline, setPaymentDeadline] = useState<Date>(
    deadlineParam ? new Date(deadlineParam) : new Date(Date.now() + 5 * 60 * 1000)
  );

  // Countdown hook
  const { formatted: countdown, isExpired } = useCountdown({
    deadline: paymentDeadline,
    onExpire: useCallback(() => {
      alert('Payment time expired. Your reservation has been cancelled.');
      router.push('/');
    }, [router]),
  });

  // Fetch booking details
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        let movieTitle = 'Movie';
        let posterUrl = '';
        let showTime = '';
        let endTime = '';
        let seats: string[] = [];
        let total = 0;

        // If we have a booking_id, fetch from API
        if (bookingId) {
          const booking = await bookingsApi.getBooking(Number(bookingId));

          if (booking.payment_deadline) {
            setPaymentDeadline(new Date(booking.payment_deadline));
          }

          movieTitle = booking.movie_title || 'Movie';
          posterUrl = booking.poster_url || '';
          showTime = booking.showtime_start
            ? new Date(booking.showtime_start).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            : '';
          endTime = booking.showtime_end
            ? new Date(booking.showtime_end).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              })
            : '';
          seats = booking.seats || [];
          total = booking.total_amount || 0;
        } else {
          // Use URL params as fallback (from direct reservation flow)
          if (movieId) {
            try {
              const movie = await moviesApi.getMovieById(Number(movieId));
              movieTitle = movie.title;
              posterUrl = movie.poster_url;
            } catch {
              console.error('Failed to fetch movie');
            }
          }

          if (showtimeId) {
            try {
              const showtime = await showtimesApi.getShowtime(Number(showtimeId));
              const startDate = new Date(showtime.start_time);
              showTime = startDate.toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });
              // Estimate end time (add 2.5 hours)
              const endDate = new Date(startDate.getTime() + 150 * 60 * 1000);
              endTime = endDate.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              });
            } catch {
              console.error('Failed to fetch showtime');
            }
          }

          seats = seatsParam ? seatsParam.split(',') : [];
          total = totalParam ? Number(totalParam) : 0;
        }

        setBookingDetails({
          movieTitle,
          posterUrl,
          cinemaName: 'ABCineplex',
          showTime: showTime || 'N/A',
          endTime: endTime || 'N/A',
          seats,
          subtotal: total,
          discount: 0,
          discountLabel: undefined,
          total,
        });
      } catch (err) {
        console.error('Failed to fetch booking details:', err);
        setError('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId, movieId, showtimeId, seatsParam, totalParam]);

  const handlePayment = async () => {
    if (!bookingId) {
      alert('No booking ID provided');
      return;
    }

    try {
      setIsProcessing(true);

      // Confirm payment via API
      const result = await bookingsApi.confirmPayment({
        booking_id: Number(bookingId),
        payment_intent_id: `demo_${Date.now()}`, // In production, this comes from payment gateway
      });

      if (result.success) {
        alert('Payment successful! Your booking is confirmed.');
        router.push(`/booking/confirmation?booking_id=${bookingId}`);
      } else {
        alert(`Payment failed: ${result.message}`);
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = async () => {
    if (!bookingId) {
      router.push('/');
      return;
    }

    const shouldCancel = confirm('Are you sure you want to cancel this booking?');
    if (!shouldCancel) return;

    try {
      await bookingsApi.cancelBooking(Number(bookingId));
      alert('Booking cancelled.');
      router.push('/');
    } catch (err) {
      console.error('Cancel error:', err);
      router.push('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-lg text-slate-600">Loading booking details...</p>
      </div>
    );
  }

  if (error || !bookingDetails) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">{error || 'Booking not found'}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-black text-white rounded-lg"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">Payment time has expired</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-black text-white rounded-lg"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/bg-cinema.jpg')] bg-cover bg-center flex items-center justify-center p-6 font-sans">
      {/* Blurred Overlay Background */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-md" />

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section: Payment Method */}
        <Card className="border-none shadow-xl bg-white/90">
          <CardContent className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold tracking-tight uppercase">Select Payment Method</h2>
              <button
                onClick={handleCancel}
                className="text-sm text-slate-500 hover:text-red-600 transition-colors"
              >
                Cancel
              </button>
            </div>

            <PaymentMethodSelector
              selectedMethod={paymentMethod}
              onMethodChange={setPaymentMethod}
            />

            {paymentMethod === 'card' ? (
              <CardPaymentForm
                email={email}
                cardNumber={cardNumber}
                expiration={expiration}
                cvc={cvc}
                saveInfo={saveInfo}
                isProcessing={isProcessing}
                onEmailChange={setEmail}
                onCardNumberChange={setCardNumber}
                onExpirationChange={setExpiration}
                onCvcChange={setCvc}
                onSaveInfoChange={setSaveInfo}
                onSubmit={handlePayment}
              />
            ) : (
              <PromptPayForm
                amount={bookingDetails.total}
                isProcessing={isProcessing}
                onConfirm={handlePayment}
              />
            )}
          </CardContent>
        </Card>

        {/* Right Section: Booking Summary */}
        <Card className="border-none shadow-xl bg-white/90">
          <CardContent className="p-8 h-full">
            <BookingSummary booking={bookingDetails} countdown={countdown} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}