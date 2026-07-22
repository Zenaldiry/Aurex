'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  X,
  ArrowRight,
  Layers,
  Gem,
  Grid,
  Info,
  BookOpen,
  Handshake,
  Mail,
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { name: 'Home', path: '/', icon: Grid },
    { name: 'Services', path: '/services', icon: Layers },
    { name: 'Portfolio', path: '/portfolio', icon: Gem },
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Blog', path: '/blog', icon: BookOpen },
    { name: 'Become a Partner', path: '/partner', icon: Handshake },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    tl.current = gsap
      .timeline({ paused: true })
      .set(menuRef.current, { display: 'flex' })
      .fromTo(
        menuRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power4.inOut' },
      )
      .fromTo(
        '.mobile-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.4',
      )
      .fromTo(
        '.mobile-link',
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: 'power3.out' },
        '-=0.5',
      );
  }, []);

  const handleNavigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (pathname === path) {
      toggleMenu();
      return;
    }
    if (tl.current && isOpen) {
      tl.current.reverse().then(() => {
        setIsOpen(false);
        router.push(path);
      });
    } else {
      router.push(path);
    }
  };

  const toggleMenu = () => {
    if (isOpen) {
      tl.current?.reverse().then(() => setIsOpen(false));
    } else {
      setIsOpen(true);
      tl.current?.play();
    }
  };

  return (
    <>
      <header className='absolute top-0 left-0 w-full z-40 flex h-16 md:h-22'>
        {/* LEFT: White Logo Block with subtle shadow */}
        <div className='w-36 md:w-72 h-full bg-[#001c33]/0 flex items-center justify-center z-40 relative shadow-[4px_0_24px_rgba(0,0,0,0.03)]'>
          <Link
            href='/'
            className='flex flex-col items-center group'
            onClick={() => isOpen && toggleMenu()}
          >
            {/* Logo Image - replace src with your logo path (e.g. /logo.png in public/) */}
            <Image
              src='/images/logor.png'
              alt='Aurex Integrated'
              width={160}
              height={48}
              priority
              className='h-10 w-30 md:h-12 md:w-auto object-contain'
            />
          </Link>
        </div>

        {/* MIDDLE: Split Navigation, More Transparent Lighter Blue */}
        <div className='flex-1 flex flex-col h-full relative z-40'>
          {/* Top Utility Bar: Lighter, Transparent Blue, White Text */}
          <div className='hidden md:flex w-full h-10 bg-sky-200/0 items-center justify-end px-8 gap-8 text-[0.65rem] font-medium tracking-[0.2em] text-white uppercase'>
            <a
              href='mailto:info@aurex.com'
              className='hover:text-[#C4A77D] transition-colors duration-300'
            >
              info@aurex.com
            </a>
            <a
              href='tel:+18888768666'
              className='hover:text-[#C4A77D] transition-colors duration-300'
            >
              +1 888-876-8666
            </a>
            <Link
              href='/contact'
              className='hover:text-[#C4A77D] transition-colors duration-300'
            >
              Request Information
            </Link>
          </div>

          {/* Bottom Main Nav: Dark Blue Background from Image 0, Gold Accents */}
          <div className='flex-1 w-full bg-[#001c33]/0 flex items-center justify-between px-6 md:px-10'>
            <nav className='hidden md:flex items-center gap-8'>
              {links.slice(1, 4).map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 ${
                    pathname === link.path
                      ? 'text-[#C4A77D]' // Gold for active link
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className='md:hidden flex-1'></div>

            {/* Main Nav Buttons with Gold Border/Hover */}
            <div className='hidden md:flex items-center gap-4'>
              <Link
                href='/partner'
                className='px-6 py-2.5 border border-[#C4A77D]/60 text-white text-[0.65rem] font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-white hover:text-slate-900 transition-all duration-300'
              >
                Become a Partner
              </Link>
              <Link
                href='/contact'
                className='px-6 py-2.5 bg-white/10 backdrop-blur-sm text-white text-[0.65rem] font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-[#C4A77D] hover:text-slate-900 transition-all duration-300'
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT PLACEHOLDER */}
        <div className='w-20 md:w-28 h-full shrink-0 bg-transparent'></div>
      </header>

      {/* FIXED BURGER / CLOSE BUTTON */}
      <button
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className={`fixed right-0 top-0 z-50 flex flex-col items-center justify-center transition-all duration-500 ease-in-out hover:text-[#C4A77D]
          ${
            isScrolled
              ? 'bg-white text-slate-900 h-16 w-16 md:h-20 md:w-20 shadow-[0_8px_30px_rgba(0,0,0,0.08)]'
              : 'bg-transparent text-[#fbd739] h-16 w-20 md:h-22 md:w-28 shadow-none'
          }
        `}
      >
        {isOpen ? (
          <X
            size={isScrolled ? 22 : 28}
            strokeWidth={1.2}
            className='transition-all duration-500'
          />
        ) : (
          <Menu
            size={isScrolled ? 22 : 28}
            strokeWidth={1.2}
            className='transition-all duration-500'
          />
        )}
        <span
          className={`font-semibold tracking-[0.25em] uppercase mt-1 hidden md:block transition-all duration-500 ${
            isScrolled ? 'text-[0.45rem]' : 'text-[0.5rem]'
          }`}
        >
          {isOpen ? 'Close' : 'Menu'}
        </span>
      </button>

      {/* FULLSCREEN LUXURY MENU - More transparent lighter background, gold details */}
      <div
        ref={menuRef}
        className='fixed inset-0 z-40 hidden w-full h-full bg-slate-950/60 backdrop-blur-lg flex-col md:flex-row overflow-y-auto overscroll-contain'
      >
        {/* LEFT / CENTER: Glass Contact Info Card - Using gold for highlights */}
        <div className='w-full md:w-[55%] lg:w-[60%] min-h-max md:min-h-full flex items-center justify-center p-6 md:p-12 pt-28 md:pt-12'>
          <div className='mobile-card w-full max-w-lg bg-slate-900/80 backdrop-blur-2xl border border-slate-700/60 rounded-2xl p-8 md:p-12 text-white shadow-2xl text-center flex flex-col items-center my-auto'>
            <span className='text-[0.65rem] font-bold tracking-[0.35em] uppercase text-[#C4A77D] mb-6'>
              CONTACT
            </span>

            <a
              href='mailto:info@aurex.com'
              className='text-lg md:text-2xl font-light tracking-widest text-white hover:text-[#C4A77D] transition-colors mb-6'
            >
              info@aurex.com
            </a>

            <div className='space-y-2 text-xs md:text-sm font-light tracking-wider text-slate-300 mb-8 leading-relaxed'>
              <p>4620 S Sam Houston Pkwy W Suite 430</p>
              <p>Houston, TX 77053</p>
              <p className='pt-2 text-slate-400'>
                8754 Westpark Dr., Houston TX 77063
              </p>
            </div>

            <div className='w-16 h-[1px] bg-slate-700/80 mb-8'></div>

            <div className='space-y-3 mb-8 w-full max-w-xs'>
              <a
                href='tel:+18888768666'
                className='flex items-center justify-center gap-2 text-base md:text-lg font-medium tracking-widest text-white hover:text-[#C4A77D] transition-colors'
              >
                +1 888-876-8666
                <ArrowRight size={16} className='text-[#C4A77D]' />
              </a>
              <p className='text-xs font-light tracking-wider text-slate-400'>
                +1 346-754-6363
              </p>
            </div>

            <button
              onClick={(e) => handleNavigate(e, '/contact')}
              className='w-full py-4 bg-[#C4A77D] text-slate-900 text-xs font-bold tracking-[0.25em] uppercase rounded-lg hover:bg-white transition-all duration-300 shadow-xl'
            >
              Request Info
            </button>
          </div>
        </div>

        {/* RIGHT: Clean Minimalist Navigation Links Bar - Gold icons and active color */}
        <div className='w-full md:w-[45%] lg:w-[40%] min-h-max md:min-h-full bg-white flex flex-col justify-center px-6 md:px-14 py-12 md:py-16 shadow-2xl'>
          <div className='space-y-3 max-w-md w-full mx-auto'>
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.path;
              return (
                <button
                  key={link.name}
                  onClick={(e) => handleNavigate(e, link.path)}
                  className='mobile-link w-full flex items-center gap-5 p-3.5 rounded-xl group text-left transition-all duration-300 hover:bg-slate-50'
                >
                  <div className='w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#C4A77D] group-hover:text-white transition-colors duration-300 shrink-0'>
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <span
                    className={`text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
                      isActive
                        ? 'text-[#C4A77D]' // Gold for active mobile link
                        : 'text-slate-800 group-hover:text-slate-950'
                    }`}
                  >
                    {link.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
//45
