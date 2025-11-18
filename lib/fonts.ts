import localFont from 'next/font/local';
import { Roboto } from 'next/font/google';

export const sFProDisplayMedium = localFont({
  src: '../assets/fonts/sf-pro-display/SF-Pro-Display-Medium.woff2',
  weight: '600',
});

export const sFProTextSemibold = localFont({
  src: '../assets/fonts/sf-pro-display/SF-Pro-Text-Semibold.woff2',
  weight: '600',
});

export const sFProTextRegular = localFont({
  src: '../assets/fonts/sf-pro-display/SF-Pro-Text-Regular.woff2',
  weight: '400',
});

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});
