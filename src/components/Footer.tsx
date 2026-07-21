'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full bg-[#111822] text-white border-t border-slate-800 relative z-20 font-sans'>
      {/* Main Footer Content */}
      <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12'>
          {/* Column 1: Brand & Tagline */}
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-3'>
              <div className='flex flex-col'>
                <span className='text-2xl md:text-3xl font-bold tracking-[0.25em] text-white uppercase font-serif'>
                  AUREX
                </span>
                <span className='text-[10px] tracking-[0.4em] text-[#7DB8E8] uppercase -mt-1 font-semibold'>
                  INTEGRATED
                </span>
              </div>
            </div>
            <p className='text-xs md:text-sm text-slate-400 tracking-wider uppercase leading-relaxed font-light mt-2'>
              Shaping interior spaces with precision, strategy, and turnkey
              excellence.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className='flex flex-col gap-4'>
            <h3 className='text-lg font-semibold text-white tracking-wide'>
              Navigation
            </h3>
            <ul className='flex flex-col gap-2.5 text-sm text-slate-300 font-light'>
              <li>
                <Link
                  href='/services'
                  className='hover:text-[#7DB8E8] transition-colors duration-200'
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href='/portfolio'
                  className='hover:text-[#7DB8E8] transition-colors duration-200'
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='hover:text-[#7DB8E8] transition-colors duration-200'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/partner'
                  className='hover:text-[#7DB8E8] transition-colors duration-200'
                >
                  Become A Partner
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='hover:text-[#7DB8E8] transition-colors duration-200'
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Locations */}
          <div className='flex flex-col gap-4'>
            <h3 className='text-lg font-semibold text-white tracking-wide'>
              Our Locations
            </h3>
            <div className='flex flex-col gap-4 text-sm text-slate-300 font-light leading-relaxed'>
              <div>
                <p className='font-normal text-slate-200'>Houston HQ</p>
                <p className='text-slate-400'>
                  4620 S Sam Houston Pkwy W Suite 430
                </p>
                <p className='text-slate-400'>Houston, TX 77053</p>
              </div>
              <div>
                <p className='font-normal text-slate-200'>Houston West</p>
                <p className='text-slate-400'>8754 Westpark Dr.,</p>
                <p className='text-slate-400'>Houston TX 77063</p>
              </div>
              <div>
                <p className='font-normal text-slate-200'>San Antonio</p>
                <p className='text-slate-400'>5725 Mobud St.,</p>
                <p className='text-slate-400'>San Antonio, TX 78238</p>
              </div>
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div className='flex flex-col gap-4'>
            <h3 className='text-lg font-semibold text-white tracking-wide'>
              Contact
            </h3>
            <div className='flex flex-col gap-3 text-sm text-slate-300 font-light'>
              <a
                href='mailto:info@aurex.com'
                className='hover:text-[#7DB8E8] transition-colors duration-200'
              >
                info@aurex.com
              </a>
              <a
                href='tel:+18888768666'
                className='hover:text-[#7DB8E8] transition-colors duration-200'
              >
                +1 888-876-8666
              </a>
              <a
                href='tel:+13467546363'
                className='hover:text-[#7DB8E8] transition-colors duration-200'
              >
                +1 346-754-6363
              </a>
              <a
                href='tel:+12105602734'
                className='hover:text-[#7DB8E8] transition-colors duration-200'
              >
                +1 210-560-2734
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className='w-full bg-[#b8c4d1] py-5 px-6 md:px-12 lg:px-24 border-t border-slate-800/60 text-xs text-slate-400 font-light'>
        <div className='max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left'>
          <div>
            Created By{' '}
            <span className='text-slate-900 font-normal'>Aurex Team</span>
          </div>

          <div className='flex items-center gap-6'>
            <Link
              href='/privacy-policy'
              className=' text-slate-900 hover:text-[#7DB8E8] transition-colors duration-200'
            >
              Privacy Policy
            </Link>
            <Link
              href='/terms'
              className='text-slate-900 hover:text-[#7DB8E8] transition-colors duration-200'
            >
              Terms & Conditions
            </Link>
          </div>

          <div className='text-slate-900'>
            All rights Reserved, {currentYear}.
          </div>
        </div>
      </div>
    </footer>
  );
}
