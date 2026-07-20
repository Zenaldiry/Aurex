'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Integrated Materials',
    desc: "Sourcing the world's finest materials. From Italian marble to custom-milled hardwoods, we ensure every element meets our uncompromising standards.",
    img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000',
  },
  {
    title: 'Execution',
    desc: 'Flawless craftsmanship. Our master builders and artisans execute complex architectural designs with millimeter precision.',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071',
  },
  {
    title: 'Project Delivery',
    desc: 'On time, on budget, beyond expectations. A seamless handover process ensuring your turnkey solution is ready for life.',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075',
  },
  {
    title: 'Turnkey Solutions',
    desc: 'From the first blueprint to the final piece of furniture. You turn the key, and your legacy begins.',
    img: 'https://images.unsplash.com/photo-1613490908578-79c6d32d0127?q=80&w=2070',
  },
];

export default function ServicesPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.srv-header', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.2,
      });

      const cards = gsap.utils.toArray('.service-card');
      cards.forEach((card: any) => {
        const img = card.querySelector('.service-img');

        // Card slides up
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
        });

        // Image parallax inside the card
        gsap.fromTo(
          img,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
    },
    { scope: container },
  );

  return (
    <main ref={container} className='bg-slate-50 min-h-screen pt-32 md:pt-40'>
      <div className='max-w-7xl mx-auto px-4 md:px-6 mb-20 text-center'>
        <h1 className='srv-header text-4xl md:text-7xl font-bold text-slate-900 tracking-widest uppercase mb-4 md:mb-6'>
          The <span className='text-[#D4AF37]'>Aurex</span> Method
        </h1>
        <p className='srv-header text-slate-600 text-base md:text-xl max-w-2xl mx-auto font-light'>
          A comprehensive approach to luxury construction and remodeling.
        </p>
      </div>

      <div className='max-w-6xl mx-auto px-4 md:px-6 pb-32 flex flex-col gap-12 md:gap-24'>
        {services.map((service, index) => (
          <div
            key={index}
            className='service-card relative w-full rounded-3xl overflow-hidden shadow-2xl group'
          >
            {/* Image Container */}
            <div className='relative w-full h-[50vh] md:h-[70vh] overflow-hidden bg-slate-900'>
              <div
                className='service-img absolute inset-0 w-full h-[130%] -top-[15%] bg-cover bg-center'
                style={{ backgroundImage: `url(${service.img})` }}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90' />
            </div>

            {/* Text Content over Image */}
            <div className='absolute inset-0 flex flex-col justify-end p-6 md:p-12'>
              <p className='text-[#D4AF37] font-bold tracking-[0.3em] uppercase mb-2 md:mb-4 text-xs md:text-sm'>
                Phase 0{index + 1}
              </p>
              <h2 className='text-3xl md:text-6xl font-bold text-white uppercase tracking-tighter mb-4'>
                {service.title}
              </h2>
              <p className='text-slate-200 text-sm md:text-xl font-light leading-relaxed max-w-3xl'>
                {service.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </main>
  );
}
