import Image from 'next/image';
import Link from 'next/link';
import { Roboto } from 'next/font/google';
import text from '@/lib/text-en.json';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function HomePage() {
  return (
    <main className='min-h-screen max-w-7xl w-[90%] md:w-[70%] lg:w-[90%] mx-auto lg:flex lg:gap-3'>
      <div
        className='relative lg:w-[90%] lg:flex-1 lg:order-2'
        style={{ aspectRatio: '1 / 1' }}
      >
        <Image
          src='/images/Illustration.svg'
          alt={`${text.imagesAndIcons.illustration}`}
          fill
          className='object-contain'
        />
      </div>
      <div className='lg:flex lg:flex-1 flex-col items-start justify-center'>
        <h1
          className={`${roboto.className} text-center lg:text-left font-bold text-[28px] md:text-[46px] xl:text-[64px] leading-[100%] lg:leading-20 tracking-[0%] text-grey-900`}
        >
          {text.homepage.headline}
          <span className='hidden sm:inline'>.</span>
        </h1>

        <div>
          <Link
            href='/quiz/weight-loss'
            className={`${roboto.className} w-full lg:w-[261px] h-12 lg:h-12 flex items-center justify-center rounded-lg text-center font-bold text-white leading-6 tracking-[0%] bg-purple-a-700 mt-5 shadow-[0_16px_32px_0_rgba(170,0,255,0.24)]`}
          >
            {text.homepage.ctaButton}
          </Link>
        </div>
      </div>
    </main>
  );
}
