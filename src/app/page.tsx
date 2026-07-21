/* eslint-disable @next/next/no-img-element */
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

import Hero from '@/components/Hero';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const gridItems = gsap.utils.toArray('.grid-item') as HTMLElement[];

      gridItems.forEach((item) => {
        gsap.from(item, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
        });
      });
    },
    { scope: container },
  );

  const categories = [
    {
      title: 'Custom Builds',
      desc: 'Ground-up architectural construction.',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075',
    },
    {
      title: 'Luxury Remodeling',
      desc: 'Complete interior transformations.',
      img: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2000',
    },
    {
      title: 'Premium Materials',
      desc: 'Sourcing the finest global finishes.',
      img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000',
    },
    {
      title: 'Acoustic Solutions',
      desc: 'High-end sound dampening panels.',
      img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000',
    },
  ];

  return (
    <main ref={container} className='bg-slate-50 min-h-screen'>
      <Hero />

      <section className='py-24 px-6 max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-light text-slate-900 uppercase tracking-widest mb-4'>
            Our Expertise
          </h2>
          <div className='w-16 h-[2px] bg-[#7DB8E8] mx-auto'></div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16'>
          {categories.map((cat, i) => (
            <Link href='/services' key={i} className='grid-item group block'>
              <div className='w-full h-[300px] md:h-[450px] overflow-hidden bg-slate-200 mb-6 relative'>
                <img
                  src={cat.img}
                  alt={cat.title}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out'
                />
                <div className='absolute inset-0 bg-[#7DB8E8]/0 group-hover:bg-[#7DB8E8]/20 transition-colors duration-500'></div>
              </div>

              <div className='flex justify-between items-end'>
                <div>
                  <h3 className='text-xl font-bold text-slate-900 tracking-widest uppercase mb-2 group-hover:text-[#7DB8E8] transition-colors'>
                    {cat.title}
                  </h3>
                  <p className='text-slate-500 font-light text-sm'>
                    {cat.desc}
                  </p>
                </div>
                <div className='w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 group-hover:border-[#7DB8E8] group-hover:text-[#7DB8E8] transition-colors'>
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
