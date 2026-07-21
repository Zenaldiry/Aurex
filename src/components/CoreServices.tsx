/* eslint-disable @next/next/no-img-element */
'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    category: 'PRICING & ESTIMATING',
    title: 'Pricing & Estimating Support',
    description:
      'Clear pricing structures developed for materials, labor, subcontractors, delivery, and project management to protect your profit margin.',
    link: '/services#pricing',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: '02',
    category: 'PROJECT DELIVERY',
    title: 'Project Delivery Process',
    description:
      'A repeatable, streamlined workflow guiding projects from client inquiry and site visits to material selection, proposal, execution, and turnover.',
    link: '/services#delivery',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: '03',
    category: 'FIELD MANAGEMENT',
    title: 'Subcontractor Coordination',
    description:
      'Expert organization of framers, installers, engineers, suppliers, and backup crews tailored specifically to each project’s unique needs.',
    link: '/services#coordination',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: '04',
    category: 'PROPOSALS & SCOPE',
    title: 'Proposal & Scope Development',
    description:
      'Professional proposal templates, transparent service packages, scope outlines, and client-facing presentation tools built for execution.',
    link: '/services#proposals',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: '05',
    category: 'SCALABILITY',
    title: 'Growth & Scale Preparation',
    description:
      'Structuring your operations to test, refine, and seamlessly scale into residential, hospitality, and commercial developments.',
    link: '/services#growth',
    image:
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1600&auto=format&fit=crop',
  },
];

export default function CoreServices() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.services-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });

      const mm = gsap.matchMedia();

      mm.add('(max-width: 767px)', (context) => {
        const selector = context.selector as (sel: string) => HTMLElement[];
        const cards = selector('.mobile-scroll-card');

        cards.forEach((card) => {
          const title = card.querySelector<HTMLElement>('.mobile-main-title');
          const description =
            card.querySelector<HTMLElement>('.card-description');
          const actionBtn = card.querySelector<HTMLElement>('.card-action');

          if (!title || !description || !actionBtn) return;

          // SET EVERYTHING UNDER THE BOTTOM EDGE
          gsap.set(title, { y: 120, force3D: true });
          gsap.set(description, { y: 140, autoAlpha: 0, force3D: true });
          gsap.set(actionBtn, { y: 160, autoAlpha: 0, force3D: true });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: card,
                start: 'bottom bottom',
                end: 'bottom top',
                toggleActions: 'play reverse play reverse',
                invalidateOnRefresh: true,
              },
              defaults: {
                ease: 'power2.inOut',
                duration: 0.6,
                overwrite: 'auto',
                force3D: true,
              },
            })
            .to(title, { y: -70 }, 0)
            .to(description, { y: 0, autoAlpha: 1 }, 0.05)
            .to(actionBtn, { y: 0, autoAlpha: 1 }, 0.12);
        });

        return () => {};
      });

      mm.add('(min-width: 768px)', (context) => {
        const selector = context.selector as (sel: string) => HTMLElement[];
        const cards = selector('.mobile-scroll-card');
        const cleanupFns: Array<() => void> = [];

        cards.forEach((card) => {
          const title = card.querySelector<HTMLElement>('.mobile-main-title');
          const description =
            card.querySelector<HTMLElement>('.card-description');
          const actionBtn = card.querySelector<HTMLElement>('.card-action');

          if (!title || !description || !actionBtn) return;

          // SET EVERYTHING UNDER THE BOTTOM EDGE
          gsap.set(title, { y: 120, force3D: true });
          gsap.set(description, { y: 140, autoAlpha: 0, force3D: true });
          gsap.set(actionBtn, { y: 160, autoAlpha: 0, force3D: true });

          const tl = gsap.timeline({
            paused: true,
            defaults: {
              ease: 'power2.inOut',
              duration: 0.5,
              overwrite: 'auto',
              force3D: true,
            },
          });

          tl.to(title, { y: -90 }, 0)
            .to(description, { y: 0, autoAlpha: 1 }, 0.05)
            .to(actionBtn, { y: 0, autoAlpha: 1 }, 0.12);

          const onEnter = () => tl.play();
          const onLeave = () => tl.reverse();

          card.addEventListener('mouseenter', onEnter);
          card.addEventListener('mouseleave', onLeave);

          cleanupFns.push(() => {
            card.removeEventListener('mouseenter', onEnter);
            card.removeEventListener('mouseleave', onLeave);
            tl.kill();
          });
        });

        return () => cleanupFns.forEach((fn) => fn());
      });

      const bgEls = Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>(
          'div[style*="background-image"]',
        ) ?? [],
      );

      let loadedCount = 0;
      if (bgEls.length > 0) {
        bgEls.forEach((el) => {
          const match = el.style.backgroundImage.match(
            /url\(["']?(.*?)["']?\)/,
          );
          const src = match?.[1];
          if (!src) {
            loadedCount += 1;
            return;
          }
          const img = new window.Image();
          img.src = src;
          img.onload = () => {
            loadedCount += 1;
            if (loadedCount === bgEls.length) ScrollTrigger.refresh();
          };
          img.onerror = () => {
            loadedCount += 1;
            if (loadedCount === bgEls.length) ScrollTrigger.refresh();
          };
        });
      }
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className='w-full bg-white text-slate-900 py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 relative z-10'
    >
      <div className='max-w-7xl mx-auto'>
        <div className='services-header mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8'>
          <div>
            <div className='flex items-center gap-3 mb-2'>
              <span className='w-8 h-[2px] bg-[#111822] inline-block'></span>
              <span className='text-xs md:text-sm font-semibold tracking-[0.2em] text-[#111822] uppercase'>
                Core Services
              </span>
            </div>
            <h2 className='text-3xl md:text-5xl font-bold tracking-tight text-[#111822]'>
              Structured Support Solutions
            </h2>
          </div>
          <p className='text-slate-600 text-sm md:text-base max-w-md font-normal leading-relaxed'>
            Direct contributions to structure, profit protection, and execution
            control across all Aurex project scopes.
          </p>
        </div>

        <div className='flex flex-col gap-6 md:gap-10'>
          {services.map((service) => (
            <div
              key={service.id}
              className='mobile-scroll-card group relative w-full h-[460px] overflow-hidden border border-slate-200 bg-[#111822] shadow-md transition-shadow duration-500 hover:shadow-2xl'
            >
              {/* Background Image */}
              <div
                className='absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out md:group-hover:scale-105'
                style={{ backgroundImage: `url(${service.image})` }}
              />

              {/* Dark Gradient Overlays */}
              <div className='absolute inset-0 bg-gradient-to-r from-[#0B1118]/20 via-[#0B1118]/20 to-transparent md:w-[75%]' />
              <div className='absolute inset-0 bg-[#0B1118]/65' />

              {/* Category & ID Tag — pinned to top, fully independent of bottom block */}
              <div className='absolute top-0 left-0 right-0 p-6 sm:p-8 md:p-12 z-10 flex items-center justify-between border-b border-slate-700/50 pb-3 md:border-none md:pb-0'>
                <span className='text-xs md:text-sm font-semibold tracking-[0.25em] text-[#7DB8E8] uppercase'>
                  {service.category}
                </span>
                <span className='text-slate-400 font-mono text-sm md:text-base font-semibold'>
                  {service.id}
                </span>
              </div>

              {/* Bottom block — literally pinned to bottom:0, padding creates the offset from the edge.
                  Title is the ONLY element visible here at rest; description/button are invisible
                  until the animation reveals them, and they occupy the same bottom-left space. */}
              <div className='absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 z-10 max-w-2xl'>
                <h3 className='mobile-main-title text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-snug m-0'>
                  {service.title}
                </h3>

                <p className='card-description text-slate-300 text-sm md:text-base font-light leading-relaxed pt-3'>
                  {service.description}
                </p>

                <div className='card-action pt-5 md:pt-8'>
                  <Link
                    href={service.link}
                    className='inline-flex items-center gap-4 group/btn'
                  >
                    <div className='w-11 h-11 md:w-12 md:h-12 rounded-full bg-white text-slate-950 flex items-center justify-center transition-all duration-300 group-hover/btn:bg-[#7DB8E8] group-hover/btn:text-white group-hover/btn:scale-110 shadow-md'>
                      <svg
                        className='w-5 h-5 transform transition-transform duration-300 group-hover/btn:translate-x-0.5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2.5'
                          d='M14 5l7 7m0 0l-7 7m7-7H3'
                        />
                      </svg>
                    </div>

                    <span className='text-sm sm:text-base font-semibold text-white tracking-wide transition-colors duration-300 group-hover/btn:text-[#7DB8E8]'>
                      {service.title}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
//sssss
