'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/navbar';
import { useAuth } from '@/context/auth-context';
import { bookingsApi, type BookingDetailResponse } from '@/services/api';
import { Ticket, Calendar, MapPin, Clock, ArrowLeft } from 'lucide-react';

type BookingFilter = 'all' | 'confirmed' | 'pending' | 'cancelled' | 'expired';

export default function BookingHistoryPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const [bookings, setBookings] = useState<BookingDetailResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<BookingFilter>('all');

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated || !user) {
      router.push('/login');
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        const statusFilter = filter === 'all' ? undefined : filter;
        const result = await bookingsApi.getUserBookings(user.id, statusFilter) as { bookings: BookingDetailResponse[]; total_count: number };
        setBookings(result.bookings || []);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
        setError('Failed to load booking history');
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, isAuthenticated, authLoading, filter, router]);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      confirmed: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
      expired: 'bg-neutral-100 text-neutral-600 border-neutral-200',
    };
    return styles[status] || styles.expired;
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  const filters: { label: string; value: BookingFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Pending', value: 'pending' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'Expired', value: 'expired' },
  ];

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#e8e8e8]">
        <Header />
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8e8e8]">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/homepage')}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors border border-neutral-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
              My Bookings
            </h1>
            <p className="text-neutral-500 text-sm mt-1">
              View your booking history and ticket details
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                filter === f.value
                  ? 'bg-black text-white'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:border-black'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl p-8 border border-neutral-200 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => globalThis.location.reload()}
              className="px-6 py-2 bg-black text-white rounded-lg text-sm font-semibold"
            >
              Try Again
            </button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-neutral-200 text-center">
            <Ticket className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">No bookings found</h3>
            <p className="text-neutral-500 mb-6">
              {filter === 'all'
                ? "You haven't made any bookings yet. Browse movies to get started!"
                : `No ${filter} bookings.`}
            </p>
            <button
              onClick={() => router.push('/movies')}
              className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.booking_id}
                className="bg-white rounded-xl p-5 sm:p-6 border border-neutral-200 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  {/* Left: Booking Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold text-black truncate">
                        {booking.movie_title || `Booking #${booking.booking_id}`}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusBadge(
                          booking.booking_status
                        )}`}
                      >
                        {booking.booking_status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-neutral-600">
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span>{formatDate(booking.created_at)}</span>
                      </div>
                      {booking.showtime_start && (
                        <div className="flex items-center gap-2 text-neutral-600">
                          <Clock className="w-4 h-4 shrink-0" />
                          <span>{formatTime(booking.showtime_start)}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-neutral-600">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span>{booking.screen_name}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                      <Ticket className="w-4 h-4 text-neutral-400" />
                      {booking.seats.map((seat) => (
                        <span
                          key={seat}
                          className="px-2 py-1 bg-neutral-100 rounded text-xs font-semibold text-black border border-neutral-200"
                        >
                          {seat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Price */}
                  <div className="text-right shrink-0">
                    <p className="text-2xl font-bold text-black">
                      {booking.total_amount.toLocaleString()} <span className="text-sm font-normal text-neutral-500">Baht</span>
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      ID: #{booking.booking_id}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
