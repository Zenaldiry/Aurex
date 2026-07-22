/* eslint-disable @next/next/no-img-element */
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUs() {
  const container = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const lightGlowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ==========================================
      // 0. ANIMATED BACKGROUND (KEN BURNS & GLOW EFFECT)
      // ==========================================
      // حركة تكبير وتدفق هادئة للصورة تجعلها تبدو كفيديو سينمائي
      gsap.to(bgImageRef.current, {
        scale: 1.15,
        x: '-2%',
        y: '-2%',
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // حركة توهج الإضاءة في الخلفية لخلق إحساس بالإضاءة الحية
      gsap.to(lightGlowRef.current, {
        opacity: 0.6,
        scale: 1.2,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // ==========================================
      // 1. DESKTOP & MOBILE RESPONSIVE SCROLL
      // ==========================================
      const mm = gsap.matchMedia();

      // DESKTOP (Min-width: 768px)
      mm.add('(min-width: 768px)', () => {
        const rightItems = gsap.utils.toArray<HTMLElement>(
          '.right-item',
          container.current,
        );

        if (!rightItems.length) return;

        gsap.set(rightItems, { y: 150, opacity: 0, scale: 0.95 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: '+=3000',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        rightItems.forEach((item, i) => {
          tl.to(item, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
          });

          tl.to(item, { y: 0, duration: 0.8 });

          if (i !== rightItems.length - 1) {
            tl.to(item, {
              y: -150,
              opacity: 0,
              scale: 0.95,
              duration: 1,
              ease: 'power2.in',
            });
          }
        });

        gsap.from('.left-reveal', {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 70%',
            refreshPriority: -1,
          },
        });
      });

      // MOBILE (Max-width: 767px)
      mm.add('(max-width: 767px)', () => {
        gsap.from('.left-reveal', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.left-container',
            start: 'top 80%',
          },
        });

        const rightItems = gsap.utils.toArray<HTMLElement>(
          '.right-item',
          container.current,
        );

        rightItems.forEach((item) => {
          gsap.fromTo(
            item,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
              },
            },
          );
        });
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id='why-choose-us'
      className='relative w-full h-auto md:h-screen bg-slate-950 overflow-hidden flex items-center py-16 md:py-0'
    >
      {/* Dynamic Animated Background Wrapper */}
      <div className='absolute inset-0 w-full h-full overflow-hidden pointer-events-none'>
        {/* Animated Image (Ken Burns Effect) */}
        <img
          ref={bgImageRef}
          src='https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=2000'
          alt='Dark Interior'
          className='w-full h-full object-cover opacity-30 will-change-transform scale-105'
        />

        {/* Dynamic Light Overlay (Moving Glow) */}
        <div
          ref={lightGlowRef}
          className='absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_rgba(125,184,232,0.15)_0%,_transparent_50%)] opacity-30 pointer-events-none mix-blend-screen'
        ></div>

        {/* Dark Vignette Overlay */}
        <div className='absolute inset-0 bg-slate-950/60'></div>
      </div>

      <div className='relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 h-full md:py-24'>
        {/* LEFT SIDE: Static Content */}
        <div className='left-container md:pr-16 md:border-r border-slate-800/50 flex flex-col justify-center h-full'>
          <div className='flex flex-col gap-8 md:gap-12'>
            <h2 className='left-reveal text-3xl md:text-5xl font-bold text-white tracking-wide'>
              Why Choose Aurex?
            </h2>

            <div className='flex flex-col gap-6 md:gap-10'>
              <div className='left-reveal'>
                <p className='text-[0.65rem] tracking-[0.2em] text-slate-400 uppercase mb-1 md:mb-2'>
                  Material & Surface Variations
                </p>
                <p className='text-4xl md:text-6xl font-light text-white'>
                  100+
                </p>
              </div>

              <div className='left-reveal'>
                <p className='text-[0.65rem] tracking-[0.2em] text-slate-400 uppercase mb-1 md:mb-2'>
                  Operational Reach Across States
                </p>
                <p className='text-4xl md:text-6xl font-light text-white'>
                  50+
                </p>
              </div>

              <div className='left-reveal'>
                <p className='text-[0.65rem] tracking-[0.2em] text-slate-400 uppercase mb-1 md:mb-2'>
                  Trusted Industry Partnerships
                </p>
                <p className='text-4xl md:text-6xl font-light text-white'>
                  40+
                </p>
              </div>
            </div>

            <div className='left-reveal mt-2 md:mt-4'>
              <Link
                href='/about'
                className='inline-block bg-[#f1cd3e] text-slate-900 px-6 py-3 md:px-8 text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors'
              >
                About Us →
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Dynamic Items */}
        <div className='md:pl-16 relative w-full h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0'>
          {/* Item 1 */}
          <div className='right-item relative md:absolute left-0 md:left-16 right-0 flex gap-4 md:gap-8 bg-slate-900/40 md:bg-transparent p-6 md:p-0 rounded-xl md:rounded-none border border-slate-800/40 md:border-none backdrop-blur-sm md:backdrop-blur-none'>
            <div className='w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#f1cd3e] flex-shrink-0 mt-1'></div>
            <div>
              <h3 className='text-lg md:text-2xl font-bold text-white mb-2 md:mb-4'>
                Turnkey Integration
              </h3>
              <p className='text-slate-400 font-light leading-relaxed text-xs md:text-base'>
                We focus exclusively on providing a seamless experience from
                material sourcing to final execution. This specialization allows
                us to offer deeper product knowledge, faster fulfillment, and
                consistent availability.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className='right-item relative md:absolute left-0 md:left-16 right-0 flex gap-4 md:gap-8 bg-slate-900/40 md:bg-transparent p-6 md:p-0 rounded-xl md:rounded-none border border-slate-800/40 md:border-none backdrop-blur-sm md:backdrop-blur-none'>
            <div className='w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#f1cd3e] flex-shrink-0 mt-1'></div>
            <div>
              <h3 className='text-lg md:text-2xl font-bold text-white mb-2 md:mb-4'>
                Tailored for the Trade
              </h3>
              <p className='text-slate-400 font-light leading-relaxed text-xs md:text-base'>
                Our materials and services are built for
                professionals—architects, designers, contractors, and
                remodelers—who demand premium quality and reliable delivery for
                their high-end interior projects.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className='right-item relative md:absolute left-0 md:left-16 right-0 flex gap-4 md:gap-8 bg-slate-900/40 md:bg-transparent p-6 md:p-0 rounded-xl md:rounded-none border border-slate-800/40 md:border-none backdrop-blur-sm md:backdrop-blur-none'>
            <div className='w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#f1cd3e] flex-shrink-0 mt-1'></div>
            <div>
              <h3 className='text-lg md:text-2xl font-bold text-white mb-2 md:mb-4'>
                Uncompromising Quality
              </h3>
              <p className='text-slate-400 font-light leading-relaxed text-xs md:text-base'>
                Need help choosing the right finish or architectural detail? Our
                team offers honest recommendations to ensure the best fit—no
                pressure, just expert insights backed by decades of industry
                experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
