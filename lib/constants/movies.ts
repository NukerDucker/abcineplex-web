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
  genres?: string[];
  director?: string;
  starring?: string;
  synopsis?: string;
  imdbRating?: string;
  tomatoScore?: string;
  tomatoAudience?: string;
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

export interface BookingDate {
  day: number;
  month: string;
  dayName: string;
}

export interface SeatRow {
  row: string;
  seats: number[];
}

// ============================================================================
// BOOKING CONFIGURATION
// ============================================================================

export const BOOKING_TIMES = ['14:00', '17:30', '20:00', '22:30'];

export const BOOKING_DATES: BookingDate[] = [
  { day: 26, month: 'JAN', dayName: 'MON' },
  { day: 27, month: 'JAN', dayName: 'TUE' },
  { day: 28, month: 'JAN', dayName: 'WED' },
  { day: 29, month: 'JAN', dayName: 'THU' },
  { day: 30, month: 'JAN', dayName: 'FRI' },
  { day: 31, month: 'JAN', dayName: 'SAT' },
  { day: 1, month: 'FEB', dayName: 'SUN' },
];

export const SEAT_ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const SEAT_COLUMNS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const TICKET_PRICES = {
  STUDENT: 120,
  VOUCHER_DISCOUNT: 40,
};

// ============================================================================
// HERO CAROUSEL CATEGORIES
// ============================================================================

export const AB_CLASSIC_HERO: HeroMovie = {
  id: 1,
  image: 'https://image.tmdb.org/t/p/original/z8lHMxJ8anZnS8iNb3ebw0HQ8mF.jpg',
  title: 'ABClassic : The Virgin Suicides',
};

export const RECOMMENDED_MOVIE_1_HERO: HeroMovie = {
  id: 2,
  image: 'https://image.tmdb.org/t/p/original/kHHVzOGE23kavlvFOxeHaBmrgBJ.jpg',
  title: 'Marty Supreme',
};

export const RECOMMENDED_MOVIE_2_HERO: HeroMovie = {
  id: 3,
  image: 'https://image.tmdb.org/t/p/original/hR2PQpW4vvDET2TooXoePP0wmmh.jpg',
  title: 'Human Resource',
};

export const EVENT_OF_THE_MONTH_HERO: HeroMovie = {
  id: 4,
  image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1200&h=600&fit=crop',
  title: 'Reviews Of The Month',
};

// ============================================================================
// NOW SCREENING MOVIES
// ============================================================================

export const ABClassic: Movie[] = [
  {
    id: 1443,
    title: 'The Virgin Suicide',
    poster: 'https://image.tmdb.org/t/p/original/tlOGlAZgD1eIYCG5xrBozw86gmm.jpg',
    banner: 'https://image.tmdb.org/t/p/original/z8lHMxJ8anZnS8iNb3ebw0HQ8mF.jpg',
    rating: '18+',
    year: '2000',
    duration: '1h 37m',
    audio: 'ENGLISH',
    subtitle: 'THAI',
  }
]

export const NOW_SCREENING_MOVIES: Movie[] = [
  {
    id: 1319520,
    title: 'HUMAN RESOURCES',
    poster: 'https://image.tmdb.org/t/p/original/j7pZEJQ80v0iya5qFiNw5gxSdFd.jpg',
    banner: 'https://image.tmdb.org/t/p/original/hYNWBC5AiToODy4hNDZ2tN4Bezl.jpg',
    rating: '15+',
    year: '2026',
    duration: '2h 2m',
    audio: 'THAI',
    subtitle: 'ENGLISH',
    genres: ['DRAMA', 'LIFE'],
    director: 'Nawapol Thamrongrattanarit',
    starring: 'Prapamonton Eiamchan, Pinmada Chaisaksoen, Paopetch Charoensook, Chanakan Rattanaudom, Darina Boonchu',
    synopsis: 'Working in HR at a challenging company, Fren interviews young new hires and is secretly one month pregnant, grappling with the decision to have a child in difficult circumstances.',
    imdbRating: '7.5/10',
    tomatoScore: '94%',
    tomatoAudience: '90%',
  },
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
    genres: ['THRILLER', 'MYSTERY'],
    director: 'Kiyoshi Kurosawa',
    starring: 'Koji Yakusho, Tsuyoshi Kusanagi, Chrysanth Mukai',
    synopsis: 'A detective investigating a series of mysterious disappearances discovers a disturbing pattern linked to a television broadcast.',
    imdbRating: '7.2/10',
    tomatoScore: '79%',
    tomatoAudience: '75%',
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
    genres: ['DRAMA', 'FAMILY'],
    director: 'Hirokazu Koreeda',
    starring: 'Yuta Yamazaki, Youki Yamamoto, Hiei Kimura, Momoka Ono',
    synopsis: 'Four siblings are left to fend for themselves after their mother abandons them in Tokyo, struggling to survive and keep their family together.',
    imdbRating: '7.6/10',
    tomatoScore: '88%',
    tomatoAudience: '86%',
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
    genres: ['SPORTS', 'DRAMA'],
    director: 'Joshua Safdie',
    starring: 'Timothée Chalamet, Gwyneth Paltrow, Penn Badgley',
    synopsis: 'A young ping pong champion rises through the ranks while navigating the pressures of fame and personal relationships in the competitive sports world.',
    imdbRating: '7.8/10',
    tomatoScore: '91%',
    tomatoAudience: '87%',
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
    genres: ['DRAMA', 'BIOGRAPHY'],
    director: 'Roman Polanski',
    starring: 'Adrien Brody, Thomas Kretschmann, Frank Finlay',
    synopsis: 'A talented Polish-Jewish pianist fights for survival during the Holocaust, hiding and fleeing Nazi occupation with the help of a compassionate German officer.',
    imdbRating: '8.5/10',
    tomatoScore: '95%',
    tomatoAudience: '92%',
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
    genres: ['DRAMA', 'FAMILY'],
    director: 'Yasujirō Ozu',
    starring: 'Chishu Ryu, Setsuko Hara, So Yamamura',
    synopsis: 'An aging couple travels to Tokyo to visit their children and grandchildren, reflecting on family bonds and the passage of time through gentle encounters.',
    imdbRating: '8.1/10',
    tomatoScore: '100%',
    tomatoAudience: '88%',
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
    genres: ['SCIENCE FICTION', 'THRILLER'],
    director: 'Denis Villeneuve',
    starring: 'Ryan Gosling, Harrison Ford, Ana de Armas',
    synopsis: 'A replicant blade runner discovers a secret that could change the future of humanity and must uncover the truth about the past.',
    imdbRating: '8.0/10',
    tomatoScore: '88%',
    tomatoAudience: '81%',
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
    banner: 'https://image.tmdb.org/t/p/original/ylkdrn23p3gQcHx7ukIfuy2CkC.jpg',
    rating: '15+',
    year: '2024',
    duration: '2h 46m',
    audio: 'ENGLISH',
    subtitle: 'THAI',
    genres: ['SCIENCE FICTION', 'ADVENTURE'],
    director: 'Denis Villeneuve',
    starring: 'Timothée Chalamet, Zendaya, Rebecca Ferguson, Austin Butler',
    synopsis: 'Paul Atreides travels to the dangerous planet Arrakis to settle the conflict between two powerful families and fulfill his destiny in a universe of political intrigue and ancient prophecies.',
    imdbRating: '7.6/10',
    tomatoScore: '82%',
    tomatoAudience: '90%',
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
    genres: ['HORROR', 'GOTHIC'],
    director: 'Robert Eggers',
    starring: 'Nicolas Cage, Lily-Rose Depp, Aaron Taylor-Johnson, Bill Skarsgård',
    synopsis: 'A reimagining of the classic vampire tale where a young woman becomes entangled with a mysterious nobleman harboring a terrifying secret that threatens to consume everything she loves.',
    imdbRating: '7.1/10',
    tomatoScore: '85%',
    tomatoAudience: '78%',
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
