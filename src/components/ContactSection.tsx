/* eslint-disable @next/next/no-img-element */
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const container = useRef<HTMLElement>(null);
  const mapCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        gsap.fromTo(
          mapCardRef.current,
          {
            rotateX: 15, // Softened the 3D effect for a simpler, cleaner look
            rotateY: -10,
            z: -50,
            opacity: 0,
            scale: 0.95,
          },
          {
            rotateX: 0,
            rotateY: 0,
            z: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container.current,
              start: 'top 75%',
            },
          },
        );

        const rightItems = gsap.utils.toArray<HTMLElement>(
          '.contact-item',
          container.current,
        );

        gsap.fromTo(
          rightItems,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container.current,
              start: 'top 65%',
            },
          },
        );

        gsap.fromTo(
          '.timeline-line',
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: container.current,
              start: 'top 65%',
            },
          },
        );
      });

      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(
          mapCardRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: mapCardRef.current,
              start: 'top 85%',
            },
          },
        );

        const rightItems = gsap.utils.toArray<HTMLElement>(
          '.contact-item',
          container.current,
        );

        rightItems.forEach((item) => {
          gsap.fromTo(
            item,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapCardRef.current || window.innerWidth < 768) return;
    const rect = mapCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(mapCardRef.current, {
      rotateY: x / 30, // Softened the hover tilt
      rotateX: -y / 30,
      duration: 0.4,
      ease: 'power1.out',
    });
  };

  const handleMouseLeave = () => {
    if (!mapCardRef.current || window.innerWidth < 768) return;
    gsap.to(mapCardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={container}
      // Changed to bg-slate-50 for a softer, lighter, premium feel
      className='w-full bg-slate-50 text-slate-900 py-20 px-6 md:px-12 lg:px-24 overflow-hidden'
    >
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start'>
        {/* LEFT COLUMN: Text & 3D Interactive Map */}
        <div className='lg:col-span-6 flex flex-col justify-between h-full'>
          <div>
            <div className='flex items-center gap-3 mb-4'>
              <span className='w-8 h-[2px] bg-[#7DB8E8] inline-block'></span>
              <span className='text-xs md:text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase'>
                Contact
              </span>
            </div>
            <h2 className='text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6'>
              Get in Touch with Aurex
            </h2>
            <p className='text-slate-600 text-sm md:text-base leading-relaxed mb-6 font-light'>
              Have a project vision or need to discuss your material
              requirements? Partner directly with{' '}
              <strong className='text-slate-900 font-semibold'>Aurex</strong>,
              your trusted manufacturer and wall panel supplier for premium
              interior solutions.
            </p>
            <p className='text-slate-600 text-sm md:text-base leading-relaxed mb-10 font-light'>
              We're here to provide expert guidance, high-quality materials, and
              dependable logistics for your next residential, commercial, or
              hospitality project.
            </p>
          </div>

          {/* 3D Interactive Map Card Container */}
          <div className='[perspective:1000px] w-full mt-4'>
            <div
              ref={mapCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              // Added a white "frame" padding (p-2) around the map for a cleaner look
              className='relative w-full h-72 md:h-80 rounded-[2rem] p-2 overflow-hidden shadow-lg border border-slate-200/60 bg-white transition-shadow duration-500 hover:shadow-2xl cursor-pointer origin-center transform-gpu'
            >
              <iframe
                title='Aurex Location Map'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110783.33230894082!2d-95.485125!3d29.6821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16924f3319d%3A0xc3cf33842c16ebc5!2sHouston%2C%20TX!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus'
                className='w-full h-full rounded-[1.5rem] border-0 grayscale-[0.8] opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 pointer-events-auto'
                loading='lazy'
              ></iframe>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Contact Details Timeline */}
        <div className='lg:col-span-6 relative pl-4 md:pl-8 lg:pl-12 pt-4'>
          {/* Vertical Timeline Line */}
          <div className='timeline-line absolute left-8 md:left-12 lg:left-[4.5rem] top-8 bottom-8 w-[2px] bg-slate-200 origin-top pointer-events-none'></div>

          <div className='flex flex-col gap-10 relative z-10'>
            {/* Address */}
            <div className='contact-item flex items-start gap-6 group'>
              {/* Lighter, cleaner icon styling */}
              <div className='w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-slate-200 text-[#7DB8E8] flex items-center justify-center flex-shrink-0 group-hover:bg-[#7DB8E8] group-hover:border-[#7DB8E8] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md'>
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
              </div>
              <div className='pt-1'>
                <h3 className='text-lg font-bold text-slate-900 mb-2'>
                  Address
                </h3>
                <div className='space-y-2 text-slate-500 text-sm md:text-base leading-snug font-light'>
                  <p>4620 S Sam Houston Pkwy W Suite 430 Houston, TX 77053</p>
                  <p>8754 Westpark Dr., Houston TX 77063</p>
                  <p>5725 Mobud St., San Antonio, TX 78238</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className='contact-item flex items-start gap-6 group'>
              <div className='w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-slate-200 text-[#7DB8E8] flex items-center justify-center flex-shrink-0 group-hover:bg-[#7DB8E8] group-hover:border-[#7DB8E8] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md'>
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
              </div>
              <div className='pt-1'>
                <h3 className='text-lg font-bold text-slate-900 mb-2'>Email</h3>
                <a
                  href='mailto:info@aurex.us'
                  className='text-slate-500 hover:text-[#7DB8E8] text-sm md:text-base transition-colors font-light'
                >
                  info@aurex.us
                </a>
              </div>
            </div>

            {/* Phone Number */}
            <div className='contact-item flex items-start gap-6 group'>
              <div className='w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-slate-200 text-[#7DB8E8] flex items-center justify-center flex-shrink-0 group-hover:bg-[#7DB8E8] group-hover:border-[#7DB8E8] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md'>
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                  />
                </svg>
              </div>
              <div className='pt-1'>
                <h3 className='text-lg font-bold text-slate-900 mb-2'>
                  Phone Number
                </h3>
                <div className='space-y-1 text-slate-500 text-sm md:text-base font-light'>
                  <p>+1 888-876-8666</p>
                  <p>+1 346-754-6363</p>
                  <p>+1 210-560-2734</p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className='contact-item flex items-start gap-6 group'>
              <div className='w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-slate-200 text-[#7DB8E8] flex items-center justify-center flex-shrink-0 group-hover:bg-[#7DB8E8] group-hover:border-[#7DB8E8] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md'>
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <div className='pt-1'>
                <h3 className='text-lg font-bold text-slate-900 mb-2'>Hours</h3>
                <p className='text-slate-500 text-sm md:text-base font-light'>
                  Monday–Friday | 9–5 pm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
