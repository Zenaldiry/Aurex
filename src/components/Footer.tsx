'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
        },
      });

      // 1. Animate the main CTA text
      tl.from('.footer-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
      });

      // 2. Animate the grid columns
      tl.from(
        '.footer-col',
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.6',
      );

      // 3. The massive logo reveal from the bottom
      tl.from(
        '.footer-brand',
        { y: '100%', duration: 1.5, ease: 'expo.out' },
        '-=0.4',
      );
    },
    { scope: container },
  );

  return (
    <footer
      ref={container}
      className='bg-slate-950 pt-24 md:pt-32 pb-8 px-6 md:px-12 rounded-t-[40px] border-t border-slate-800 overflow-hidden'
    >
      {/* TOP SECTION: The Call to Action */}
      <div className='max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 md:mb-32 gap-10'>
        <h2 className='footer-title text-4xl md:text-7xl font-light tracking-wide text-white max-w-3xl leading-tight'>
          Have a visionary project in mind?
          <span className='font-bold text-[#D4AF37]'>
            Let's build your legacy.
          </span>
        </h2>
        <Link
          href='/contact'
          className='footer-title group relative inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 bg-[#D4AF37] border border-[#D4AF37] rounded-full overflow-hidden transition-all duration-500'
        >
          <div className='absolute inset-0 w-full h-full bg-[#D4AF37] translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-out'></div>
          <span className='relative z-10 text-[#D4AF37] group-hover:text-slate-950 font-bold tracking-widest uppercase text-xs md:text-sm transition-colors duration-500 flex items-center gap-3'>
            Start the Conversation
            <svg
              className='w-4 h-4 transform group-hover:translate-x-1 transition-transform'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M14 5l7 7m0 0l-7 7m7-7H3'
              ></path>
            </svg>
          </span>
        </Link>
      </div>

      {/* MIDDLE SECTION: The Editorial Grid */}
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-slate-800/60 pt-16 mb-20 md:mb-32'>
        {/* Column 1: Contact */}
        <div className='footer-col flex flex-col gap-6'>
          <h4 className='text-white font-bold tracking-[0.2em] uppercase text-xs'>
            Headquarters
          </h4>
          <div className='text-slate-400 font-light text-sm leading-relaxed'>
            <p>100 Luxury Avenue, Suite 400</p>
            <p>Beverly Hills, CA 90210</p>
          </div>
          <div className='text-slate-400 font-light text-sm'>
            <p className='hover:text-[#D4AF37] transition-colors cursor-pointer'>
              +1 (800) 555-AUREX
            </p>
            <p className='hover:text-[#D4AF37] transition-colors cursor-pointer'>
              inquiries@aurex.com
            </p>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className='footer-col flex flex-col gap-4'>
          <h4 className='text-white font-bold tracking-[0.2em] uppercase text-xs mb-2'>
            Explore
          </h4>
          {['Home', 'Services', 'Portfolio', 'About Us', 'Contact'].map(
            (item) => (
              <Link
                key={item}
                href='#'
                className='text-slate-400 font-light text-sm hover:text-[#D4AF37] hover:translate-x-2 transition-all duration-300 w-fit'
              >
                {item}
              </Link>
            ),
          )}
        </div>

        {/* Column 3: Socials */}
        <div className='footer-col flex flex-col gap-4'>
          <h4 className='text-white font-bold tracking-[0.2em] uppercase text-xs mb-2'>
            Connect
          </h4>
          {['Instagram', 'LinkedIn', 'Houzz', 'Architectural Digest'].map(
            (item) => (
              <Link
                key={item}
                href='#'
                className='text-slate-400 font-light text-sm hover:text-[#D4AF37] hover:translate-x-2 transition-all duration-300 w-fit'
              >
                {item}
              </Link>
            ),
          )}
        </div>

        {/* Column 4: Newsletter */}
        <div className='footer-col flex flex-col gap-6'>
          <h4 className='text-white font-bold tracking-[0.2em] uppercase text-xs'>
            Private Newsletter
          </h4>
          <p className='text-slate-400 font-light text-sm'>
            Insights on luxury real estate, architecture, and exclusive project
            reveals.
          </p>
          <form className='relative w-full mt-2'>
            <input
              type='email'
              placeholder='Email Address'
              className='w-full bg-transparent border-b border-slate-700 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#D4AF37] transition-colors'
            />
            <button
              type='button'
              className='absolute right-0 top-2 text-slate-400 hover:text-[#D4AF37] transition-colors'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M14 5l7 7m0 0l-7 7m7-7H3'
                ></path>
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* BOTTOM SECTION: The Massive Brand Reveal */}
      <div className='w-full border-t border-slate-800/60 pt-12 flex flex-col items-center overflow-hidden'>
        <div className='overflow-hidden w-full flex justify-center'>
          <h1 className='footer-brand text-[14vw] leading-none font-bold tracking-[0.15em] text-white text-center uppercase'>
            AUR<span className='text-[#D4AF37]'>E</span>X
          </h1>
        </div>
        <div className='overflow-hidden'>
          <p className='footer-brand text-[#D4AF37] tracking-[0.5em] md:tracking-[1em] uppercase text-xs md:text-sm mt-4 md:mt-6'>
            Integrated
          </p>
        </div>

        <div className='w-full flex flex-col md:flex-row justify-between items-center mt-16 md:mt-24 text-slate-600 text-xs uppercase tracking-widest gap-4'>
          <p>© {new Date().getFullYear()} Aurex Integrated.</p>
          <div className='flex gap-6'>
            <Link href='#' className='hover:text-[#D4AF37] transition-colors'>
              Privacy Policy
            </Link>
            <Link href='#' className='hover:text-[#D4AF37] transition-colors'>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
