import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Front-End Task',
  description: 'Front-End Take-Home Assignment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
