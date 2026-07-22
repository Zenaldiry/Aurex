/* eslint-disable @next/next/no-img-element */
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGES = [
  '/images/Hero/image.png',
  '/images/Hero/image2.png',
  '/images/Hero/image3.png',
  //   'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=2400',
  //   'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=2400',
  //   'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=2400',
];

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const slides = slideRefs.current.filter(Boolean);
      if (!slides.length) return;

      // 1. Initial entrance animation
      const loadTl = gsap.timeline();
      loadTl.from('.hero-anim', {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.18,
        ease: 'power3.out',
        delay: 0.2,
      });

      // 2. Parallax/Fade on Scroll
      gsap.to(container.current, {
        opacity: 0.2,
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 3. Background Slideshow Timeline
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

        if (img) {
          sliderTl.to(img, {
            scale: 1.08,
            duration: 6,
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

        sliderTl.to(
          nextSlide,
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1.8,
            ease: 'power3.inOut',
          },
          `wipe_${index}`,
        );

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
    <>
      {/* Google Serif Font */}
      <link
        href='https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap'
        rel='stylesheet'
      />

      <section
        ref={container}
        className='relative min-h-[100dvh] w-full flex flex-col justify-end items-center overflow-hidden bg-slate-950 pb-16 md:pb-20'
      >
        {/* BACKGROUND SLIDESHOW */}
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
                alt={`Aurex luxury interior ${index + 1}`}
                className='w-full h-full object-cover transform-gpu'
              />
            </div>
          ))}

          {/* TOP FADED GRADIENT OVERLAY */}
          <div className='absolute inset-x-0 top-0 h-48 z-20 bg-gradient-to-b from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none' />

          {/* BOTTOM FADED GRADIENT OVERLAY */}
          <div className='absolute inset-x-0 bottom-0 h-96 z-20 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none' />
        </div>

        {/* MAIN CONTENT LAYER */}
        <div className='relative z-30 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center'>
          {/* SUBTITLE */}
          <p className='hero-anim text-xs md:text-sm font-light text-slate-200 uppercase tracking-[0.35em] mb-2 md:mb-3 drop-shadow-sm'>
            YOUR FUTURE LIFESTYLE
          </p>

          {/* MAIN TITLE */}
          <h1
            style={{ fontFamily: "'Playfair Display', serif" }}
            className='hero-anim text-4xl sm:text-6xl md:text-7xl font-normal text-[##efffff] tracking-wider mb-5 drop-shadow-md'
          >
            AUREX INTEGRATED
          </h1>

          {/* ACTION LINK */}
          <div className='hero-anim'>
            <Link
              href='/portfolio'
              className='inline-flex items-center gap-2 text-xs md:text-sm font-medium uppercase tracking-[0.25em] text-[#f9d638] hover:text-white transition-colors duration-300 group py-1'
            >
              <span>DISCOVER OUR PROJECTS</span>
              <ChevronRight
                size={16}
                className='text-[#C4A77D] group-hover:text-white group-hover:translate-x-1 transition-all duration-300'
              />
            </Link>
          </div>
        </div>

        {/* BOTTOM ACCENT: VERTICAL SCROLL LINE */}
        <div className='absolute bottom-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center'>
          <div className='w-[2px] h-8 md:h-12 bg-[#f6cd31]' />
        </div>
      </section>
    </>
  );
}
