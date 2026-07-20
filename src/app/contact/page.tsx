'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Page Header Animation (Loads instantly)
      gsap.from('.page-header', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.2,
      });

      // 2. AMAZING 3D MAP SCROLL
      // The map tilts and scales up exactly as you scroll
      gsap.fromTo(
        '.map-box',
        { rotateX: 15, y: 50, opacity: 0, scale: 0.9 },
        {
          rotateX: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.location-section',
            start: 'top 90%',
            end: 'top 40%',
            scrub: 1, // Smoothly ties the 3D effect to your scroll wheel
          },
        },
      );

      // 3. THE DRAWING TIMELINE
      // The vertical line draws itself downwards as you scroll
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-section',
            start: 'top 75%',
            end: 'bottom 75%',
            scrub: true,
          },
        },
      );

      // 4. SPRING-LOADED ICONS
      // The icons spin and pop in exactly when you scroll past them
      const items = gsap.utils.toArray('.info-item');
      items.forEach((item: any) => {
        const icon = item.querySelector('.icon-box');
        const text = item.querySelector('.text-content');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse', // Reverses if you scroll back up!
          },
        });

        tl.from(icon, {
          scale: 0,
          rotation: -180,
          duration: 0.6,
          ease: 'back.out(2)',
        }).from(
          text,
          { x: 30, opacity: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.4',
        );
      });

      // 5. Futuristic Form (Slides up from bottom)
      gsap.from('.form-section', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.form-section', start: 'top 85%' },
      });
    },
    { scope: container },
  );

  return (
    <main
      ref={container}
      className='bg-slate-50 min-h-screen pt-32 md:pt-40 overflow-hidden'
    >
      {/* PAGE HEADER */}
      <div className='max-w-7xl mx-auto px-4 md:px-6 mb-16 md:mb-24 text-center'>
        <div className='inline-flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase text-slate-900 mb-6 page-header'>
          <div className='w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse'></div>
          Status: Accepting New Projects
        </div>
        <h1 className='page-header text-4xl md:text-7xl font-bold text-slate-900 tracking-widest uppercase mb-4'>
          Initiate <span className='text-[#D4AF37]'>Vision.</span>
        </h1>
      </div>

      {/* SECTION 1: LOCATION & TIMELINE */}
      <div className='location-section max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32'>
        {/* Left Side: Text & 3D Map */}
        {/* Added perspective: 1000px to make the 3D rotateX effect work */}
        <div className='flex flex-col' style={{ perspective: '1000px' }}>
          <div className='page-header'>
            <p className='text-[#D4AF37] font-bold tracking-[0.2em] uppercase text-xs mb-4'>
              Related: Request Information
            </p>
            <h2 className='text-4xl md:text-5xl font-light text-slate-900 mb-6 tracking-wide'>
              Visit Our Office
            </h2>
            <p className='text-slate-600 text-base md:text-lg font-light leading-relaxed mb-10'>
              We're always happy to connect in person. If you're nearby or
              planning a visit, stop by our office to explore materials, ask
              questions, or just say hello.
            </p>
          </div>

          {/* Google Map Embed */}
          <div className='map-box w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-xl border border-slate-200 origin-bottom'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3467.481816503523!2d-95.5515544!3d29.6476193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640e67142272459%3A0x15f111818228185!2s4620%20S%20Sam%20Houston%20Pkwy%20W%20%23430%2C%20Houston%2C%20TX%2077053!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus'
              width='100%'
              height='100%'
              style={{
                border: 0,
                filter: 'grayscale(100% ) contrast(1.1) opacity(0.9)',
              }}
              allowFullScreen={false}
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </div>

        {/* Right Side: The Timeline */}
        <div className='timeline-section relative pt-4 md:pt-12'>
          {/* The Vertical Line (origin-top allows it to draw downwards) */}
          <div className='timeline-line absolute left-[19px] top-6 bottom-0 w-[2px] bg-slate-300 origin-top'></div>

          <div className='flex flex-col gap-12'>
            {/* Timeline Item 1: Address */}
            <div className='info-item relative pl-16'>
              <div className='icon-box absolute left-0 top-0 w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-[#D4AF37] shadow-lg z-10'>
                <ArrowRight size={18} />
              </div>
              <div className='text-content'>
                <h3 className='text-xl font-bold text-slate-900 mb-4 tracking-wide'>
                  Address
                </h3>
                <div className='text-slate-600 font-light space-y-4 text-sm md:text-base'>
                  <p>4620 S Sam Houston Pkwy W Suite 430 Houston, TX 77053</p>
                  <p>8754 Westpark Dr., Houston, TX 77063</p>
                  <p>5725 Mobud St., San Antonio, TX 78238</p>
                </div>
              </div>
            </div>

            {/* Timeline Item 2: Email */}
            <div className='info-item relative pl-16'>
              <div className='icon-box absolute left-0 top-0 w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-[#D4AF37] shadow-lg z-10'>
                <ArrowRight size={18} />
              </div>
              <div className='text-content'>
                <h3 className='text-xl font-bold text-slate-900 mb-4 tracking-wide'>
                  Email
                </h3>
                <p className='text-slate-600 font-light text-sm md:text-base hover:text-[#D4AF37] transition-colors cursor-pointer'>
                  inquiries@aurexintegrated.com
                </p>
              </div>
            </div>

            {/* Timeline Item 3: Phone */}
            <div className='info-item relative pl-16'>
              <div className='icon-box absolute left-0 top-0 w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-[#D4AF37] shadow-lg z-10'>
                <ArrowRight size={18} />
              </div>
              <div className='text-content'>
                <h3 className='text-xl font-bold text-slate-900 mb-4 tracking-wide'>
                  Phone Number
                </h3>
                <div className='text-slate-600 font-light space-y-3 text-sm md:text-base'>
                  <p className='hover:text-[#D4AF37] transition-colors cursor-pointer'>
                    +1 888-876-8666
                  </p>
                  <p className='hover:text-[#D4AF37] transition-colors cursor-pointer'>
                    +1 346-754-6363
                  </p>
                  <p className='hover:text-[#D4AF37] transition-colors cursor-pointer'>
                    +1 210-560-2734
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline Item 4: Hours */}
            <div className='info-item relative pl-16'>
              <div className='icon-box absolute left-0 top-0 w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-[#D4AF37] shadow-lg z-10'>
                <ArrowRight size={18} />
              </div>
              <div className='text-content'>
                <h3 className='text-xl font-bold text-slate-900 mb-4 tracking-wide'>
                  Hours
                </h3>
                <p className='text-slate-600 font-light text-sm md:text-base'>
                  Monday-Friday | 9:00 am - 5:00 pm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: THE FUTURISTIC FORM */}
      <div className='form-section max-w-5xl mx-auto px-4 md:px-6 pb-32'>
        <div className='bg-white p-8 md:p-16 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-slate-900 tracking-widest uppercase mb-4'>
              Digital <span className='text-[#D4AF37]'>Inquiry</span>
            </h2>
            <p className='text-slate-500 font-light'>
              Submit your project details for a private consultation.
            </p>
          </div>

          <form className='flex flex-col gap-10 md:gap-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12'>
              <div className='relative z-0 w-full group'>
                <input
                  type='text'
                  name='firstName'
                  id='firstName'
                  className='block py-4 px-0 w-full text-lg text-slate-900 bg-transparent border-0 border-b border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#D4AF37] peer transition-colors duration-500'
                  placeholder=' '
                  required
                />
                <label
                  htmlFor='firstName'
                  className='absolute text-sm font-bold tracking-widest uppercase text-slate-400 duration-500 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:text-[#D4AF37]'
                >
                  First Name
                </label>
              </div>

              <div className='relative z-0 w-full group'>
                <input
                  type='text'
                  name='lastName'
                  id='lastName'
                  className='block py-4 px-0 w-full text-lg text-slate-900 bg-transparent border-0 border-b border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#D4AF37] peer transition-colors duration-500'
                  placeholder=' '
                  required
                />
                <label
                  htmlFor='lastName'
                  className='absolute text-sm font-bold tracking-widest uppercase text-slate-400 duration-500 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:text-[#D4AF37]'
                >
                  Last Name
                </label>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12'>
              <div className='relative z-0 w-full group'>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='block py-4 px-0 w-full text-lg text-slate-900 bg-transparent border-0 border-b border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#D4AF37] peer transition-colors duration-500'
                  placeholder=' '
                  required
                />
                <label
                  htmlFor='email'
                  className='absolute text-sm font-bold tracking-widest uppercase text-slate-400 duration-500 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:text-[#D4AF37]'
                >
                  Email Address
                </label>
              </div>

              <div className='relative z-0 w-full group'>
                <input
                  type='tel'
                  name='phone'
                  id='phone'
                  className='block py-4 px-0 w-full text-lg text-slate-900 bg-transparent border-0 border-b border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#D4AF37] peer transition-colors duration-500'
                  placeholder=' '
                />
                <label
                  htmlFor='phone'
                  className='absolute text-sm font-bold tracking-widest uppercase text-slate-400 duration-500 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:text-[#D4AF37]'
                >
                  Phone Number
                </label>
              </div>
            </div>

            <div className='relative z-0 w-full group mt-4'>
              <textarea
                name='details'
                id='details'
                rows={4}
                className='block py-4 px-0 w-full text-lg text-slate-900 bg-transparent border-0 border-b border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#D4AF37] peer transition-colors duration-500 resize-none'
                placeholder=' '
                required
              ></textarea>
              <label
                htmlFor='details'
                className='absolute text-sm font-bold tracking-widest uppercase text-slate-400 duration-500 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:text-[#D4AF37]'
              >
                Project Details & Vision
              </label>
            </div>

            <div className='mt-8'>
              <button
                type='button'
                className='group relative w-full flex justify-center items-center py-6 px-8 bg-slate-900 text-white overflow-hidden rounded-2xl transition-all duration-500'
              >
                <div className='absolute inset-0 w-full h-full bg-[#D4AF37] translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-out'></div>
                <span className='relative z-10 font-bold tracking-[0.2em] uppercase text-sm group-hover:text-slate-900 transition-colors duration-500 flex items-center gap-4'>
                  Submit Inquiry
                  <ArrowRight className='w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-500' />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
