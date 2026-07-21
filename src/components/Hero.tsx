/* eslint-disable @next/next/no-img-element */
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGES = [
  'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=2400',
  'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=2400',
  'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=2400',
  'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=2400',
  'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=2400',
];

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const slides = slideRefs.current.filter(Boolean);
      if (!slides.length) return;

      // 1. ANIMATION UPON INITIAL LOAD
      const loadTl = gsap.timeline();
      loadTl.from('.hero-line', {
        scaleY: 0,
        duration: 1.2,
        ease: 'expo.out',
        transformOrigin: 'top',
        delay: 0.2,
      });
      loadTl.from(
        '.hero-text',
        {
          y: 30,
          opacity: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: 'expo.out',
        },
        '-=0.9',
      );

      // 2. SCROLL ANIMATION
      gsap.to(container.current, {
        scale: 0.98,
        opacity: 0.75,
        filter: 'blur(3px)',
        borderRadius: '20px',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: () => window.innerHeight * 0.8,
          scrub: true,
        },
      });

      gsap.set(slides, {
        clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
        zIndex: 1,
      });

      gsap.set(slides[0], {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        zIndex: 2,
      });

      const sliderTl = gsap.timeline({ repeat: -1 });

      slides.forEach((slide, index) => {
        const nextIndex = (index + 1) % slides.length;
        const nextSlide = slides[nextIndex];
        const img = slide?.querySelector('img');
        const nextImg = nextSlide?.querySelector('img');

        if (img) {
          sliderTl.to(img, {
            scale: 1.08,
            duration: 4,
            ease: 'none',
          });
        }

        sliderTl.addLabel(`wipe_${index}`);

        sliderTl.set(
          nextSlide,
          {
            zIndex: 3,
            clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
          },
          `wipe_${index}`,
        );

        if (nextImg) {
          sliderTl.set(nextImg, { scale: 1.15 }, `wipe_${index}`);
        }

        sliderTl.to(
          nextSlide,
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1.6,
            ease: 'power3.inOut',
          },
          `wipe_${index}`,
        );

        if (nextImg) {
          sliderTl.to(
            nextImg,
            {
              scale: 1,
              duration: 1.6,
              ease: 'power3.inOut',
            },
            `wipe_${index}`,
          );
        }

        sliderTl.set(slide, {
          zIndex: 1,
          clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
        });
        if (img) {
          sliderTl.set(img, { scale: 1 });
        }
        sliderTl.set(nextSlide, { zIndex: 2 });
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className='relative min-h-[100dvh] w-full flex items-center overflow-hidden origin-top bg-slate-950'
    >
      {/* BACKGROUND SLIDESHOW & OVERLAYS */}
      <div className='absolute inset-0 w-full h-full overflow-hidden'>
        {HERO_IMAGES.map((src, index) => (
          <div
            key={index}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            className='absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path]'
          >
            <img
              src={src}
              alt={`Aurex interior ${index + 1}`}
              className='w-full h-full object-cover transform-gpu'
            />
          </div>
        ))}

        {/* Dark Overlays for Text Readability */}
        {/* <div className='absolute inset-0 z-20 bg-gradient-to-t via-slate-950/70 from-slate-950 md:bg-gradient-to-r md:from-slate-950 md:via-slate-950/60 md:to-transparent pointer-events-none' /> */}
        <div className='absolute inset-0 z-20 bg-slate-950/40 pointer-events-none' />
      </div>

      {/* MAIN CONTENT LAYER */}
      <div className='relative z-30 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 pt-28 pb-36 md:py-24 flex items-center'>
        <div className='flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8 max-w-3xl w-full'>
          <div className='hero-line w-12 sm:w-[1px] h-[1px] sm:h-auto bg-[#7DB8E8] self-start sm:self-stretch my-1 sm:my-3 shrink-0' />

          <div className='w-full'>
            <h1 className='hero-text text-3xl sm:text-5xl font-semibold md:text-5xl  text-white leading-[1.15] mb-4 sm:mb-6 tracking-wide'>
              Turnkey Solutions{' '}
              <span className='block font-semibold text-[#7DB8E8] mt-1 sm:mt-0'>
                Strategy.
              </span>
            </h1>

            <p className='hero-text text-white text-sm sm:text-base md:text-lg font-light leading-relaxed mb-8 sm:mb-10 max-w-xl'>
              Partner directly with Aurex, your integrated provider of premium
              materials, expert execution, and full-scope project delivery. From
              concept to completion, we deliver refined results nationwide.
            </p>

            {/* <div className='hero-text flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto'>
              <Link
                href='/portfolio'
                className='inline-flex justify-center items-center bg-[#7DB8E8] text-slate-950 px-8 py-3.5 sm:py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white transition-colors duration-300 rounded-sm shadow-lg text-center'
              >
                Explore Our Work
              </Link>
              <Link
                href='/contact'
                className='inline-flex justify-center items-center border border-white/30 backdrop-blur-sm text-white px-8 py-3.5 sm:py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:border-[#7DB8E8] hover:text-[#7DB8E8] hover:bg-black/20 transition-all duration-300 rounded-sm text-center'
              >
                Contact Us
              </Link>
            </div> */}
          </div>
        </div>
      </div>

      {/* BOTTOM STRIP LAYER */}
      <div className='absolute bottom-0 left-0 w-full z-30 border-t border-white/10 bg-slate-950/5 backdrop-blur-md'>
        <div className='max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-3.5 sm:py-4 flex items-center justify-between gap-4 text-white text-[0.65rem] sm:text-[0.7rem] tracking-widest uppercase font-medium'>
          <div className='flex items-center gap-4 sm:gap-8 md:gap-12 overflow-x-auto no-scrollbar py-1 text-slate-300'>
            <span className='whitespace-nowrap opacity-90'>Materials</span>
            <span className='text-slate-600'>•</span>
            <span className='whitespace-nowrap opacity-90'>Execution</span>
            <span className='text-slate-600'>•</span>
            <span className='whitespace-nowrap opacity-90'>
              Project Delivery
            </span>
          </div>

          <Link
            href='/contact'
            className='shrink-0 bg-[#7DB8E8] text-slate-950 px-4 sm:px-5 py-2 sm:py-2.5 text-[0.65rem] font-bold hover:bg-white transition-colors duration-300 rounded-sm flex items-center gap-1.5'
          >
            Contact <span className='hidden sm:inline'>Us</span> →
          </Link>
        </div>
      </div>
    </section>
  );
}
