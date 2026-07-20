'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.about-header', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.2,
        delay: 0.2,
      });

      gsap.fromTo(
        '.about-img',
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-img-container',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );

      gsap.from('.about-text', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-text-container', start: 'top 85%' },
      });
    },
    { scope: container },
  );

  return (
    <main ref={container} className='bg-slate-50 min-h-screen pt-32 md:pt-40'>
      <div className='max-w-7xl mx-auto px-4 md:px-6 mb-16 md:mb-20 text-center'>
        <h1 className='about-header text-4xl md:text-7xl font-bold text-slate-900 tracking-widest uppercase mb-4'>
          Our <span className='text-[#D4AF37]'>Story.</span>
        </h1>
        <p className='about-header text-slate-600 text-base md:text-xl font-light max-w-2xl mx-auto'>
          Building more than just homes. We build legacies that last
          generations.
        </p>
      </div>

      {/* Parallax Image */}
      <div className='about-img-container w-full h-[40vh] md:h-[60vh] overflow-hidden relative mb-20 md:mb-32'>
        <div
          className='about-img absolute inset-0 w-full h-[130%] bg-cover bg-center -top-[15%]'
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071' )",
          }}
        />
        <div className='absolute inset-0 bg-slate-900/20' />
      </div>

      {/* Story Content */}
      <div className='about-text-container max-w-4xl mx-auto px-4 md:px-6 pb-32'>
        <h2 className='about-text text-2xl md:text-5xl font-bold text-slate-900 mb-6 md:mb-8 leading-tight uppercase tracking-widest'>
          Uncompromising standards.
        </h2>
        <div className='about-text space-y-4 md:space-y-6 text-slate-600 text-base md:text-lg font-light leading-relaxed'>
          <p>
            Founded on the principles of architectural integrity and flawless
            execution, AUREX has grown into one of the nation's premier luxury
            custom home builders and remodeling firms.
          </p>
          <p>
            We believe that your home is your ultimate sanctuary. It should
            reflect your success, your taste, and your lifestyle. That is why we
            partner with the finest architects, designers, and master craftsmen
            to ensure every square inch of your project is executed to
            perfection.
          </p>
          <p>
            From the initial consultation to the final walkthrough, our process
            is entirely transparent. We handle the permits, the logistics, and
            the heavy lifting, allowing you to enjoy the creative journey of
            building your dream space.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
