export interface MenuItem {
  id: string;
  name: string;
  nameKh: string;
  description: string;
  descriptionKh: string;
  price: string;
  image: string;
  category: string;
  categoryKh: string;
  isPopular?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  nameKh: string;
  description: string;
  descriptionKh: string;
  address: string;
  addressKh: string;
  landmark: string;
  landmarkKh: string;
  phone: string;
  facebookUrl?: string;
  telegramUrl?: string;
  lat: number;
  lng: number;
  photos: string[];
  menuItems: MenuItem[];
  categories: string[];
  openingHours: { day: string; open: string; close: string }[];
  isOpenNow: boolean;
  priceRange: string;
  avgPriceUsd: string;
  isFavorite: boolean;
}

export type BookingStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'noshow';

export interface Booking {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantPhoto: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
  status: BookingStatus;
  tableNumber?: string;
  customerName: string;
  customerEmail: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  titleKh: string;
  message: string;
  messageKh: string;
  type: 'confirmation' | 'update' | 'cancellation' | 'reminder';
  read: boolean;
  createdAt: string;
  bookingId?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  photo?: string;
  language: 'en' | 'km';
}
