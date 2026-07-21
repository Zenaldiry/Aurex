'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function PortfolioPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.fade-up', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2,
      });
    },
    { scope: container },
  );

  const projects = [
    {
      title: 'The Aspen Estate',
      category: 'Custom Build',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075',
    },
    {
      title: 'Beverly Hills Kitchen',
      category: 'Luxury Remodel',
      img: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2000',
    },
    {
      title: 'Modernist Retreat',
      category: 'Renovation',
      img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000',
    },
    {
      title: 'Coastal Sanctuary',
      category: 'Exterior',
      img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000',
    },
  ];

  return (
    <main ref={container} className='bg-white min-h-screen pt-32 pb-24'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='mb-16 fade-up'>
          <h1 className='text-4xl md:text-5xl font-light text-[#1A1A1A] mb-4'>
            Selected Works
          </h1>
          <div className='w-16 h-[1px] bg-[#8C7A5E]'></div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          {projects.map((project, index) => (
            <div key={index} className='fade-up group cursor-pointer'>
              <div className='w-full h-[500px] overflow-hidden mb-6 bg-gray-100'>
                <img
                  src={project.img}
                  alt={project.title}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                />
              </div>
              <p className='text-xs font-bold tracking-widest uppercase text-[#8C7A5E] mb-2'>
                {project.category}
              </p>
              <h2 className='text-2xl font-light text-[#1A1A1A]'>
                {project.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
