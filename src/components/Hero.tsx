'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1. Initial Load Animation
      tl.fromTo(
        '.hero-img',
        { scale: 1.2 },
        { scale: 1, duration: 2, ease: 'power4.out' },
      );
      tl.from(
        '.hero-text',
        { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: 'power4.out' },
        '-=1.5',
      );

      // 2. The Bulletproof Scroll Animation
      // Instead of looking for the next section, we just use the window's scroll position.
      // It starts at 0 (top of page) and ends when you scroll down 70% of the screen.
      gsap.to(container.current, {
        scale: 0.95,
        opacity: 0.5,
        filter: 'blur(5px)',
        borderRadius: '20px',
        scrollTrigger: {
          start: 0, // Starts exactly when you begin scrolling
          end: () => window.innerHeight * 0.7, // Ends after scrolling 70vh down
          scrub: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className='relative h-screen w-full flex items-center justify-center bg-slate-900 overflow-hidden origin-top'
    >
      <div className='absolute inset-0 w-full h-full'>
        <video
          autoPlay
          loop
          muted
          playsInline
          className='hero-img absolute inset-0 w-full h-full object-cover'
          src='/videos/heroVideo.mp4'
        />
        <div className='absolute inset-0 bg-slate-900/60'></div>
      </div>

      <div className='relative z-10 text-center px-4 mt-16 w-full max-w-[100vw]'>
        <div className='overflow-hidden pb-2'>
          <h1 className='hero-text text-3xl sm:text-5xl md:text-7xl font-bold tracking-widest uppercase text-white'>
            Turnkey Solutions
          </h1>
        </div>
        <div className='overflow-hidden pb-4'>
          <h1 className='hero-text text-3xl sm:text-5xl md:text-7xl font-bold tracking-widest uppercase text-[#D4AF37]'>
            Strategy.
          </h1>
        </div>
        <p className='hero-text mt-4 text-xs sm:text-sm md:text-lg text-slate-200 max-w-2xl mx-auto font-light tracking-widest uppercase leading-relaxed'>
          Integrated Materials{' '}
          <span className='text-[#D4AF37] mx-1 md:mx-2'>•</span> Execution{' '}
          <span className='text-[#D4AF37] mx-1 md:mx-2'>•</span> Project
          Delivery
        </p>
      </div>
    </section>
  );
}
