'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ServicesPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.fade-up', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2,
      });
    },
    { scope: container },
  );

  const services = [
    {
      title: 'Integrated Materials',
      desc: 'We source and supply the highest quality architectural materials, from acoustic panels to premium marble sheets, ensuring your project meets the highest standards of luxury.',
      img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000',
    },
    {
      title: 'Flawless Execution',
      desc: 'Our team of master craftsmen and contractors handle every detail of the installation and build process, guaranteeing precision and longevity in every corner.',
      img: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2000',
    },
    {
      title: 'Project Delivery',
      desc: 'From initial blueprints to the final walkthrough, we manage the entire lifecycle of your project, delivering turnkey solutions on time and beyond expectations.',
      img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000',
    },
  ];

  return (
    <main ref={container} className='bg-[#FAF9F6] min-h-screen pt-32 pb-24'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='text-center mb-24 fade-up'>
          <h1 className='text-4xl md:text-5xl font-light text-[#1A1A1A] mb-6'>
            Our Services
          </h1>
          <p className='text-gray-600 max-w-2xl mx-auto font-light leading-relaxed'>
            Comprehensive construction and remodeling solutions tailored for the
            luxury market.
          </p>
        </div>

        <div className='flex flex-col gap-24'>
          {services.map((service, index) => (
            <div
              key={index}
              className={`fade-up flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
            >
              <div className='w-full md:w-1/2 h-[400px]'>
                <img
                  src={service.img}
                  alt={service.title}
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='w-full md:w-1/2 md:px-12'>
                <h2 className='text-2xl font-semibold text-[#1A1A1A] mb-4 tracking-wide uppercase'>
                  {service.title}
                </h2>
                <div className='w-12 h-[1px] bg-[#8C7A5E] mb-6'></div>
                <p className='text-gray-600 font-light leading-relaxed text-lg'>
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
