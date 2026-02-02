// ============================================================================
// INTERFACES
// ============================================================================

export interface Movie {
  id: number;
  title: string;
  poster: string;
  banner: string;
  rating: string;
  year: string;
  duration: string;
  audio: string;
  subtitle: string;
}

export interface HeroMovie {
  id: number;
  image: string;
  title: string;
}

export interface PromoEvent {
  id: number;
  image: string;
  title: string;
}

// ============================================================================
// HERO CAROUSEL MOVIES
// ============================================================================

export const HERO_MOVIES: HeroMovie[] = [
  {
    id: 1,
    image: 'https://image.tmdb.org/t/p/original/z8lHMxJ8anZnS8iNb3ebw0HQ8mF.jpg',
    title: 'ABClassic : The Virgin Suicides',
  },
  {
    id: 2,
    image: 'https://image.tmdb.org/t/p/original/kHHVzOGE23kavlvFOxeHaBmrgBJ.jpg',
    title: 'Marty Supreme',
  },
  {
    id: 3,
    image: 'https://image.tmdb.org/t/p/original/hR2PQpW4vvDET2TooXoePP0wmmh.jpg',
    title: 'Human Resource',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1200&h=600&fit=crop',
    title: 'Reviews Of The Month',
  },
];

// ============================================================================
// NOW SCREENING MOVIES
// ============================================================================

export const NOW_SCREENING_MOVIES: Movie[] = [
  {
    id: 439,
    title: 'Cure',
    poster: 'https://image.tmdb.org/t/p/w500/73hRTdIpS2rGz6PWw2fIEpX2ivS.jpg',
    banner: 'https://image.tmdb.org/t/p/original/m99F7N5U9C9MBy9K9KSTF0tN3cl.jpg',
    rating: '18+',
    year: '1997',
    duration: '1h 51m',
    audio: 'JAPANESE',
    subtitle: 'THAI, ENGLISH',
  },
  {
    id: 11024,
    title: 'Nobody Knows',
    poster: 'https://image.tmdb.org/t/p/w500/dTL3unDQ9J3opvmjeSNC8MPUk5V.jpg',
    banner: 'https://image.tmdb.org/t/p/original/jXU371306YqQ8R8N9UByoT37WkE.jpg',
    rating: '15+',
    year: '2004',
    duration: '2h 21m',
    audio: 'JAPANESE',
    subtitle: 'THAI, ENGLISH',
  },
  {
    id: 1331375,
    title: 'Marty Supreme',
    poster: 'https://image.tmdb.org/t/p/w500/kHHVzOGE23kavlvFOxeHaBmrgBJ.jpg',
    banner: 'https://image.tmdb.org/t/p/original/6mIn7S978m8SIn4NCO69VvY60t5.jpg',
    rating: '18+',
    year: '2024',
    duration: '2h 29m',
    audio: 'ENGLISH',
    subtitle: 'THAI',
  },
  {
    id: 423,
    title: 'The Pianist',
    poster: 'https://image.tmdb.org/t/p/w500/dVr11o9or7AS8AMPfwjSpEU83iU.jpg',
    banner: 'https://image.tmdb.org/t/p/original/6S6Sbs907Sfc9Ar7Y0m679Yih6p.jpg',
    rating: '15+',
    year: '2002',
    duration: '2h 30m',
    audio: 'ENGLISH',
    subtitle: 'THAI',
  },
  {
    id: 14160,
    title: 'Tokyo Story',
    poster: 'https://image.tmdb.org/t/p/w500/zbJcTaWAYJt6W1S5W3dUE8D9KTI.jpg',
    banner: 'https://image.tmdb.org/t/p/original/9Y4D2y7Y7C9P3Vn8fOIdm7v7Bv4.jpg',
    rating: 'PG',
    year: '1953',
    duration: '2h 16m',
    audio: 'JAPANESE',
    subtitle: 'ENGLISH, THAI',
  },
  {
    id: 335984,
    title: 'Blade Runner 2049',
    poster: 'https://image.tmdb.org/t/p/w500/ilRyazdMJwN05exqhwK4tMKBYZs.jpg',
    banner: 'https://image.tmdb.org/t/p/original/876clm7Lcl76Yf6STZ9i98qUvpx.jpg',
    rating: '15+',
    year: '2017',
    duration: '2h 44m',
    audio: 'ENGLISH',
    subtitle: 'THAI',
  },
];

// ============================================================================
// COMING SOON MOVIES
// ============================================================================

export const COMING_SOON_MOVIES: Movie[] = [
  {
    id: 693134,
    title: 'Dune: Part Two',
    poster: 'https://image.tmdb.org/t/p/w500/8uS6B7G7o9u5vIkfN6pS7pWpsfO.jpg',
    banner: 'https://image.tmdb.org/t/p/original/xOMo8NETRpbqH6fszsiK9IuYI0s.jpg',
    rating: '15+',
    year: '2024',
    duration: '2h 46m',
    audio: 'ENGLISH',
    subtitle: 'THAI',
  },
  {
    id: 533535,
    title: 'Nosferatu',
    poster: 'https://image.tmdb.org/t/p/w500/5qbs6R6XU679Xz9X78mXf0fX7Y.jpg',
    banner: 'https://image.tmdb.org/t/p/original/9msY8Yp9O9zWqf6mXU6O6Y8q8.jpg',
    rating: '18+',
    year: '2024',
    duration: '2h 12m',
    audio: 'ENGLISH',
    subtitle: 'THAI',
  },
  {
    id: 802219,
    title: 'Captain America: Brave New World',
    poster: 'https://image.tmdb.org/t/p/w500/z63OubJ9R46K6i9O78mXf0fX7Y.jpg',
    banner: 'https://image.tmdb.org/t/p/original/6S6Sbs907Sfc9Ar7Y0m679Yih6p.jpg',
    rating: '13+',
    year: '2025',
    duration: 'TBA',
    audio: 'ENGLISH',
    subtitle: 'THAI',
  },
  {
    id: 374720,
    title: 'Superman: Legacy',
    poster: 'https://image.tmdb.org/t/p/w500/tCb1kWAi78MxvPRMLrnDK8oB8KG.jpg',
    banner: 'https://image.tmdb.org/t/p/original/a6gUj7YFb0P3iwrBvDAgnJ8z0nz.jpg',
    rating: '13+',
    year: '2025',
    duration: 'TBA',
    audio: 'ENGLISH',
    subtitle: 'THAI',
  },
  {
    id: 845781,
    title: 'Thunderbolts*',
    poster: 'https://image.tmdb.org/t/p/w500/aA2Z9ns2H0dK5JmC1rkMm8CcmPh.jpg',
    banner: 'https://image.tmdb.org/t/p/original/9Y4D2y7Y7C9P3Vn8fOIdm7v7Bv4.jpg',
    rating: '15+',
    year: '2025',
    duration: 'TBA',
    audio: 'ENGLISH',
    subtitle: 'THAI',
  },
];

// ============================================================================
// PROMOTIONAL EVENTS
// ============================================================================

export const PROMO_EVENTS: PromoEvent[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&h=400&fit=crop',
    title: 'Special Screening',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=400&fit=crop',
    title: 'Film Festival',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1485163819542-13adeb5e0068?w=600&h=400&fit=crop',
    title: 'Member Night',
  },
];
