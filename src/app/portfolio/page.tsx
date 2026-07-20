'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'The Aspen Estate',
    category: 'Custom Build',
    desc: 'A breathtaking 12,000 sq ft modern mountain retreat featuring floor-to-ceiling glass.',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075',
  },
  {
    title: 'Beverly Hills Kitchen',
    category: 'Luxury Remodel',
    desc: 'A complete reimagining of a classic Hollywood kitchen with imported Italian marble.',
    img: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2000',
  },
  {
    title: 'Modernist Retreat',
    category: 'Whole Home Renovation',
    desc: 'Transforming a mid-century property into a contemporary masterpiece.',
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000',
  },
];

export default function PortfolioPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.portfolio-header', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.2,
      });

      const projectElements = gsap.utils.toArray('.project-container');
      projectElements.forEach((project: any) => {
        const image = project.querySelector('.project-img');
        const textElements = project.querySelectorAll('.text-element');

        gsap.fromTo(
          image,
          { yPercent: -10, scale: 1.05 },
          {
            yPercent: 10,
            scale: 1.05,
            ease: 'none',
            scrollTrigger: {
              trigger: project,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
        gsap.fromTo(
          textElements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: project,
              start: 'top 75%',
              end: 'bottom 25%',
              toggleActions: 'play reverse play reverse',
            },
          },
        );
      });
    },
    { scope: container },
  );

  return (
    <main
      ref={container}
      className='bg-slate-50 min-h-screen pt-32 md:pt-40 overflow-hidden'
    >
      <div className='max-w-7xl mx-auto px-4 md:px-6 mb-16 md:mb-24 text-center'>
        <h1 className='portfolio-header text-4xl md:text-7xl font-bold text-slate-900 tracking-widest uppercase mb-4'>
          Selected <span className='text-[#D4AF37]'>Works.</span>
        </h1>
        <p className='portfolio-header text-slate-600 text-base md:text-xl font-light max-w-2xl mx-auto'>
          A digital gallery showcasing our commitment to uncompromising
          craftsmanship.
        </p>
      </div>

      <div className='flex flex-col w-full'>
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              className='project-container relative w-full h-[70vh] md:h-[85vh] overflow-hidden group'
            >
              <div
                className='project-img absolute inset-0 w-full h-full bg-cover bg-center'
                style={{ backgroundImage: `url(${project.img})` }}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90' />

              <div className='absolute inset-0 max-w-7xl mx-auto px-4 md:px-6 w-full h-full flex items-end pb-12 md:pb-24'>
                <div
                  className={`w-full md:w-1/2 flex flex-col ${isEven ? 'items-start text-left' : 'md:ml-auto md:items-end md:text-right items-start text-left'}`}
                >
                  <p className='text-element text-[#D4AF37] tracking-[0.2em] uppercase text-xs md:text-sm font-bold mb-2 md:mb-4'>
                    {project.category}
                  </p>
                  <h2 className='text-element text-3xl md:text-6xl font-bold text-white mb-4 leading-tight'>
                    {project.title}
                  </h2>
                  <p className='text-element text-slate-200 font-light text-sm md:text-lg mb-6 md:mb-10'>
                    {project.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </main>
  );
}
