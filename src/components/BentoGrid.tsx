'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: 'Custom Home Builds',
    image:
      'https://images.unsplash.com/photo-1613490908578-79c6d32d0127?q=80&w=2070',
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    title: 'Luxury Kitchens',
    image:
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2000',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    title: 'Whole Home Remodels',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    title: 'Exteriors & Additions',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000',
    className: 'md:col-span-3 md:row-span-1 h-64',
  },
];

export default function BentoGrid() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray('.bento-card');

      gsap.from(cards, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className='py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto'
    >
      <div className='mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6'>
        <div>
          <h2 className='text-3xl md:text-6xl font-bold tracking-widest uppercase text-slate-900'>
            Our <span className='text-[#D4AF37]'>Expertise</span>
          </h2>
          <p className='text-slate-600 mt-4 max-w-md text-sm md:text-lg font-light'>
            Elevating American homes with uncompromising craftsmanship and
            visionary architectural design.
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px] md:auto-rows-[300px]'>
        {categories.map((category, index) => (
          <Link
            key={index}
            href='/portfolio'
            className={`bento-card group relative overflow-hidden rounded-2xl bg-slate-900 ${category.className}`}
          >
            <div
              className='absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110'
              style={{ backgroundImage: `url(${category.image})` }}
            />
            {/* Dark gradient overlay so the white text pops */}
            <div className='absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent' />

            <div className='absolute bottom-0 left-0 p-6 md:p-8'>
              <h3 className='text-xl md:text-3xl font-bold text-white uppercase tracking-widest'>
                {category.title}
              </h3>
              <div className='mt-2 md:mt-3 flex items-center text-xs md:text-sm font-bold tracking-widest uppercase text-[#D4AF37] opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0'>
                View Projects <span className='ml-2'>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
