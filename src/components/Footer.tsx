'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-slate-900 text-white pt-20 pb-10 px-6 border-t border-slate-800'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16'>
        <div className='md:col-span-2'>
          <span className='text-3xl font-bold tracking-[0.2em] uppercase leading-none'>
            AUR<span className='text-[#D4AF37]'>E</span>X
          </span>
          <p className='text-slate-400 text-sm font-light mt-6 max-w-sm leading-relaxed'>
            Providing turnkey solutions, integrated materials, and flawless
            project delivery for high-end residential and commercial spaces.
          </p>
        </div>

        <div>
          <h4 className='text-xs font-bold tracking-widest uppercase text-[#D4AF37] mb-6'>
            Company
          </h4>
          <div className='flex flex-col gap-4 text-sm font-light text-slate-300'>
            <Link
              href='/services'
              className='hover:text-white transition-colors'
            >
              Services
            </Link>
            <Link
              href='/portfolio'
              className='hover:text-white transition-colors'
            >
              Portfolio
            </Link>
            <Link href='/about' className='hover:text-white transition-colors'>
              About Us
            </Link>
            <Link
              href='/contact'
              className='hover:text-white transition-colors'
            >
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h4 className='text-xs font-bold tracking-widest uppercase text-[#D4AF37] mb-6'>
            Contact
          </h4>
          <div className='flex flex-col gap-4 text-sm font-light text-slate-300'>
            <p>inquiries@aurex.com</p>
            <p>+1 888-876-8666</p>
            <p>Houston, TX 77053</p>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto border-t border-slate-800 pt-8 text-center md:text-left text-xs font-light text-slate-500 tracking-widest uppercase'>
        © {new Date().getFullYear()} Aurex Integrated. All rights reserved.
      </div>
    </footer>
  );
}
