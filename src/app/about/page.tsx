'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function AboutPage() {
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

  return (
    <main ref={container} className='bg-[#FAF9F6] min-h-screen pt-32 pb-24'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
          <div className='fade-up w-full h-[600px]'>
            <img
              src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000'
              alt='About Aurex'
              className='w-full h-full object-cover'
            />
          </div>

          <div className='fade-up max-w-lg'>
            <h4 className='text-xs font-bold tracking-widest uppercase text-[#8C7A5E] mb-4'>
              Our Story
            </h4>
            <h1 className='text-4xl font-light text-[#1A1A1A] mb-8 leading-tight'>
              Building excellence through integrated solutions.
            </h1>
            <div className='space-y-6 text-gray-600 font-light leading-relaxed text-lg'>
              <p>
                Aurex was founded on a simple principle: the construction and
                remodeling process should be as elegant and seamless as the
                final product itself.
              </p>
              <p>
                By integrating premium material sourcing with master-level
                execution, we eliminate the friction typically associated with
                high-end builds. We act as your single point of contact,
                ensuring that your vision is translated perfectly into reality.
              </p>
              <p>
                Whether it is a custom home build, a luxury kitchen remodel, or
                commercial acoustic paneling, our commitment to uncompromising
                quality remains the same.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
