'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLenis } from 'lenis/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();

  // SMART COLOR LOGIC: Check if we are on a light page and haven't scrolled yet
  const isLightHeader = pathname !== '/';
  const isDarkText = isLightHeader && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    // Check initial scroll position on load
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(
    () => {
      // Only play the drop-down animation if we are on the Home page to prevent glitches
      if (pathname === '/') {
        gsap.fromTo(
          navRef.current,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.2 },
        );
      }

      tl.current = gsap
        .timeline({ paused: true })
        .set(menuRef.current, { display: 'flex' })
        .fromTo(
          menuRef.current,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'expo.inOut' },
        )
        .fromTo(
          '.menu-link-text',
          { y: '120%', rotate: 3 },
          {
            y: '0%',
            rotate: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: 'power4.out',
          },
          '-=0.4',
        )
        .fromTo(
          '.menu-footer-item',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out' },
          '-=0.4',
        );
    },
    { scope: containerRef },
  );

  const handleNavigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (pathname === path) {
      toggleMenu();
      return;
    }
    if (tl.current) {
      tl.current.reverse().then(() => {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
        lenis?.start();
        router.push(path);
      });
    }
  };

  const toggleMenu = () => {
    if (isMobileMenuOpen) {
      tl.current?.reverse().then(() => {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
        lenis?.start();
      });
    } else {
      setIsMobileMenuOpen(true);
      document.body.style.overflow = 'hidden';
      lenis?.stop();
      tl.current?.play();
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div ref={containerRef}>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-40 flex justify-center transition-all duration-500 ease-in-out px-4 md:px-6 ${
          isScrolled ? 'pt-4' : 'pt-0'
        }`}
      >
        <div
          className={`flex items-center justify-between w-full transition-all duration-500 ease-in-out ${
            isScrolled
              ? 'max-w-5xl bg-slate-900/90 backdrop-blur-lg border border-slate-700/50 shadow-2xl rounded-full h-16 px-6'
              : 'max-w-7xl bg-transparent h-24 px-0 border-b border-slate-800/50'
          }`}
        >
          {/* LOGO - Dynamically changes color */}
          <Link
            href='/'
            className='flex flex-col items-start relative z-50 group'
          >
            <span
              className={`text-xl md:text-2xl font-bold tracking-[0.2em] uppercase leading-none group-hover:text-[#D4AF37] transition-colors duration-300 ${
                isDarkText ? 'text-slate-900' : 'text-white'
              }`}
            >
              AUR<span className='text-[#D4AF37] transition-colors'>E</span>X
            </span>
          </Link>

          {/* DESKTOP LINKS - Dynamically changes color */}
          <nav className='hidden md:flex items-center gap-8'>
            {navLinks.slice(1, 4).map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-xs font-bold uppercase tracking-[0.15em] hover:text-[#D4AF37] transition-colors duration-300 ${
                  isDarkText ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className='flex items-center gap-4 md:gap-6 relative z-50'>
            {/* CTA BUTTON - Hover state adapts to background */}
            <Link
              href='/contact'
              className={`hidden md:flex items-center justify-center text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                isScrolled
                  ? 'text-[#D4AF37] hover:text-white'
                  : `bg-[#D4AF37] text-slate-900 px-6 py-2.5 rounded-full ${isDarkText ? 'hover:bg-slate-900 hover:text-white' : 'hover:bg-white'}`
              }`}
            >
              Get a Quote
            </Link>

            {/* BURGER ICON - Lines dynamically change color */}
            <button
              onClick={toggleMenu}
              className='w-10 h-10 flex flex-col items-center justify-center gap-[6px] group'
            >
              <span
                className={`block h-[2px] transition-all duration-300 ease-out ${
                  isMobileMenuOpen
                    ? 'bg-white w-6 rotate-45 translate-y-[8px]'
                    : `${isDarkText ? 'bg-slate-900' : 'bg-white'} w-8 group-hover:w-6`
                }`}
              ></span>
              <span
                className={`block h-[2px] transition-all duration-300 ease-out ${
                  isMobileMenuOpen
                    ? 'opacity-0 bg-white w-6'
                    : `${isDarkText ? 'bg-slate-900' : 'bg-white'} w-6 group-hover:w-8`
                }`}
              ></span>
              <span
                className={`block h-[2px] transition-all duration-300 ease-out ${
                  isMobileMenuOpen
                    ? 'bg-white w-6 -rotate-45 -translate-y-[8px]'
                    : `${isDarkText ? 'bg-slate-900' : 'bg-white'} w-4 group-hover:w-6`
                }`}
              ></span>
            </button>
          </div>
        </div>
      </header>

      {/* FULLSCREEN MENU */}
      <div
        ref={menuRef}
        data-lenis-prevent='true'
        className='fixed inset-0 z-30 hidden flex-col bg-slate-950 h-[100dvh] w-full px-6 md:px-16 pt-32 pb-12 overflow-y-auto overflow-x-hidden'
      >
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[#D4AF37]/5 blur-[150px] rounded-full pointer-events-none'></div>

        <div className='flex flex-col gap-2 md:gap-4 mt-auto mb-auto relative z-10'>
          {navLinks.map((link, index) => (
            <div key={link.name} className='overflow-hidden py-1 md:py-2'>
              <button
                onClick={(e) => handleNavigate(e, link.path)}
                className='menu-link-text flex items-baseline gap-4 md:gap-8 group text-left'
              >
                <span className='text-[#D4AF37] text-sm md:text-xl font-bold tracking-widest mb-4 md:mb-8 opacity-50 group-hover:opacity-100 transition-opacity'>
                  0{index + 1}
                </span>
                <span className='text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] font-bold tracking-tighter text-white uppercase group-hover:text-[#D4AF37] transition-colors duration-500 leading-none'>
                  {link.name}
                </span>
              </button>
            </div>
          ))}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-800 pt-8 mt-12 relative z-10 shrink-0'>
          <div className='menu-footer-item flex flex-col gap-2'>
            <h4 className='text-xs font-bold tracking-[0.2em] uppercase text-slate-500'>
              Inquiries
            </h4>
            <a
              href='mailto:inquiries@aurex.com'
              className='text-sm md:text-base text-white hover:text-[#D4AF37] transition-colors'
            >
              inquiries@aurex.com
            </a>
          </div>
          <div className='menu-footer-item flex flex-col gap-2'>
            <h4 className='text-xs font-bold tracking-[0.2em] uppercase text-slate-500'>
              Direct Line
            </h4>
            <a
              href='tel:+18888768666'
              className='text-sm md:text-base text-white hover:text-[#D4AF37] transition-colors'
            >
              +1 888-876-8666
            </a>
          </div>
          <div className='menu-footer-item flex flex-col gap-2 md:items-end'>
            <h4 className='text-xs font-bold tracking-[0.2em] uppercase text-slate-500'>
              Socials
            </h4>
            <div className='flex gap-4'>
              <a
                href='#'
                className='text-sm md:text-base text-white hover:text-[#D4AF37] transition-colors'
              >
                Instagram
              </a>
              <a
                href='#'
                className='text-sm md:text-base text-white hover:text-[#D4AF37] transition-colors'
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
