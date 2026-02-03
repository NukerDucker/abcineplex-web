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
    poster: 'https://image.tmdb.org/t/p/original/oqATYLYFIbilR9lPqO4zfyPfQeC.jpg',
    banner: 'https://image.tmdb.org/t/p/original/73hRTdIpS2rGz6PWw2fIEpX2ivS.jpg',
    rating: '18+',
    year: '1997',
    duration: '1h 51m',
    audio: 'JAPANESE',
    subtitle: 'THAI, ENGLISH',
  },
  {
    id: 11024,
    title: 'Nobody Knows',
    poster: 'https://image.tmdb.org/t/p/original/71AUYI7mfGra6fG5ZRZWrplXurW.jpg',
    banner: 'https://image.tmdb.org/t/p/original/dTL3unDQ9J3opvmjeSNC8MPUk5V.jpg',
    rating: '15+',
    year: '2004',
    duration: '2h 21m',
    audio: 'JAPANESE',
    subtitle: 'THAI, ENGLISH',
  },
  {
    id: 1331375,
    title: 'Marty Supreme',
    poster: 'https://image.tmdb.org/t/p/original/lYWEXbQgRTR4ZQleSXAgRbxAjvq.jpg',
    banner: 'https://image.tmdb.org/t/p/original/qKWDHofjMHPSEOTLaixkC9ZmjTT.jpg',
    rating: '18+',
    year: '2024',
    duration: '2h 29m',
    audio: 'ENGLISH',
    subtitle: 'THAI',
  },
  {
    id: 423,
    title: 'The Pianist',
    poster: 'https://image.tmdb.org/t/p/original/enFfoFd3TYs6ttTxrBIfmecQPnz.jpg',
    banner: 'https://image.tmdb.org/t/p/original/dVr11o9or7AS8AMPfwjSpEU83iU.jpg',
    rating: '15+',
    year: '2002',
    duration: '2h 30m',
    audio: 'ENGLISH',
    subtitle: 'THAI',
  },
  {
    id: 14160,
    title: 'Tokyo Story',
    poster: 'https://image.tmdb.org/t/p/original/g2YbTYKpY7N2yDSk7BfXZ18I5QV.jpg',
    banner: 'https://image.tmdb.org/t/p/original/zbJcTaWAYJt6W1S5W3dUE8D9KTI.jpg',
    rating: 'PG',
    year: '1953',
    duration: '2h 16m',
    audio: 'JAPANESE',
    subtitle: 'ENGLISH, THAI',
  },
  {
    id: 335984,
    title: 'Blade Runner 2049',
    poster: 'https://image.tmdb.org/t/p/original/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg',
    banner: 'https://image.tmdb.org/t/p/original/ilRyazdMJwN05exqhwK4tMKBYZs.jpg',
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
    poster: 'https://image.tmdb.org/t/p/original/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg',
    banner: 'https://image.tmdb.org/t/p/original/ylkdrn23p3gQcHx7ukIfuy2CkTE.jpg',
    rating: '15+',
    year: '2024',
    duration: '2h 46m',
    audio: 'ENGLISH',
    subtitle: 'THAI',
  },
  {
    id: 533535,
    title: 'Nosferatu',
    poster: 'https://image.tmdb.org/t/p/original/inL6BKEe7IyjEJyHocyKW7QuJlN.jpg',
    banner: 'https://image.tmdb.org/t/p/original/2gAStVyyv9C3BSEKhP0a1aM3Qy9.jpg',
    rating: '18+',
    year: '2024',
    duration: '2h 12m',
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
