'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ContactPage() {
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

  return (
    <main ref={container} className='bg-white min-h-screen pt-32 pb-24'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='text-center mb-20 fade-up'>
          <h1 className='text-4xl md:text-5xl font-light text-[#1A1A1A] mb-4'>
            Contact Us
          </h1>
          <div className='w-16 h-[1px] bg-[#8C7A5E] mx-auto mb-6'></div>
          <p className='text-gray-600 font-light'>
            Reach out to discuss your next project.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
          {/* Contact Info */}
          <div className='fade-up bg-[#FAF9F6] p-10 md:p-16'>
            <h3 className='text-2xl font-light text-[#1A1A1A] mb-10'>
              Get in Touch
            </h3>

            <div className='space-y-8'>
              <div>
                <h4 className='text-xs font-bold tracking-widest uppercase text-[#8C7A5E] mb-2'>
                  Address
                </h4>
                <p className='text-gray-600 font-light leading-relaxed'>
                  4620 S Sam Houston Pkwy W Suite 430 Houston, TX 77053
                </p>
              </div>

              <div>
                <h4 className='text-xs font-bold tracking-widest uppercase text-[#8C7A5E] mb-2'>
                  Email
                </h4>
                <p className='text-gray-600 font-light'>inquiries@aurex.com</p>
              </div>

              <div>
                <h4 className='text-xs font-bold tracking-widest uppercase text-[#8C7A5E] mb-2'>
                  Phone
                </h4>
                <p className='text-gray-600 font-light'>+1 888-876-8666</p>
              </div>
            </div>
          </div>

          {/* Simple Form */}
          <div className='fade-up py-6'>
            <form className='flex flex-col gap-8'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='flex flex-col gap-2'>
                  <label className='text-xs font-bold tracking-widest uppercase text-gray-500'>
                    First Name
                  </label>
                  <input
                    type='text'
                    className='border-b border-gray-300 py-2 focus:outline-none focus:border-[#8C7A5E] bg-transparent transition-colors'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='text-xs font-bold tracking-widest uppercase text-gray-500'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    className='border-b border-gray-300 py-2 focus:outline-none focus:border-[#8C7A5E] bg-transparent transition-colors'
                  />
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-xs font-bold tracking-widest uppercase text-gray-500'>
                  Email Address
                </label>
                <input
                  type='email'
                  className='border-b border-gray-300 py-2 focus:outline-none focus:border-[#8C7A5E] bg-transparent transition-colors'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-xs font-bold tracking-widest uppercase text-gray-500'>
                  Project Details
                </label>
                <textarea
                  rows={4}
                  className='border-b border-gray-300 py-2 focus:outline-none focus:border-[#8C7A5E] bg-transparent transition-colors resize-none'
                ></textarea>
              </div>

              <button
                type='button'
                className='bg-[#1A1A1A] text-white py-4 px-8 text-xs font-bold tracking-widest uppercase hover:bg-[#8C7A5E] transition-colors self-start mt-4'
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
