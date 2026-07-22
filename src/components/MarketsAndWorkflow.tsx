'use client';

import { useState } from 'react';
import Link from 'next/link';

const targetMarkets = [
  {
    id: 'hospitality',
    number: '01',
    title: 'Hotels & Hospitality',
    description:
      'High-impact interior solutions engineered for luxury commercial spaces.',
  },
  {
    id: 'developers',
    number: '02',
    title: 'Property Developers',
    description:
      'Scalable wall panel systems designed to maximize unit valuation.',
  },
  {
    id: 'contractors',
    number: '03',
    title: 'General Contractors',
    description:
      'Turnkey material procurement and specialized installation support.',
  },
  {
    id: 'homeowners',
    number: '04',
    title: 'Premium Homeowners',
    description:
      'Bespoke interior transformations for private luxury residences.',
  },
];

const workflowSteps = [
  {
    step: '01',
    title: 'Inquiry & Audit',
    detail: 'Initial consultation and precise site measurement.',
  },
  {
    step: '02',
    title: 'Material Selection',
    detail: 'Curating architectural acoustic and composite panels.',
  },
  {
    step: '03',
    title: 'Transparent Costing',
    detail: 'Detailed itemized pricing for materials and execution.',
  },
  {
    step: '04',
    title: 'Formal Proposal',
    detail: 'Contracting, scope agreements, and timeline finalization.',
  },
  {
    step: '05',
    title: 'Crew Preparation',
    detail: 'Organizing specialized installers and site logistics.',
  },
  {
    step: '06',
    title: 'Precision Build',
    detail: 'On-site installation under strict quality control.',
  },
  {
    step: '07',
    title: 'Final Handover',
    detail: 'Walk-through sign-off and long-term warranty delivery.',
  },
];

export default function MarketsAndWorkflow() {
  const [activeMarket, setActiveMarket] = useState('hospitality');
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className='w-full bg-white text-slate-900 py-24 px-6 md:px-12 lg:px-24'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='max-w-2xl mb-16 md:mb-24'>
          <div className='flex items-center gap-3 mb-4'>
            <span className='w-8 h-[2px] bg-[#7DB8E8] inline-block'></span>
            <span className='text-xs md:text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase'>
              Who We Serve & How We Deliver
            </span>
          </div>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]'>
            Precision execution for every sector.
          </h2>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start'>
          {/* LEFT: Target Markets — Clean Accordion */}
          <div className='lg:col-span-5'>
            <div className='flex flex-col divide-y divide-slate-100 border-t border-b border-slate-100'>
              {targetMarkets.map((market) => {
                const isSelected = activeMarket === market.id;
                return (
                  <button
                    key={market.id}
                    onClick={() => setActiveMarket(market.id)}
                    className='text-left py-6 group transition-all duration-300'
                  >
                    <div className='flex items-baseline gap-5'>
                      <span
                        className={`text-xs font-mono tabular-nums transition-colors duration-300 ${
                          isSelected
                            ? 'text-[#7DB8E8] font-bold'
                            : 'text-slate-400'
                        }`}
                      >
                        {market.number}
                      </span>
                      <div className='flex-1'>
                        <h3
                          className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
                            isSelected
                              ? 'text-slate-900'
                              : 'text-slate-400 group-hover:text-slate-600'
                          }`}
                        >
                          {market.title}
                        </h3>

                        {/* Smooth Accordion Reveal for Description */}
                        <div
                          className={`grid transition-all duration-300 ease-in-out ${
                            isSelected
                              ? 'grid-rows-[1fr] opacity-100 mt-2'
                              : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <p className='overflow-hidden text-sm md:text-base font-light leading-relaxed text-slate-600 pr-4'>
                            {market.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Workflow — Soft Gray Card */}
          <div className='lg:col-span-7 bg-slate-50 p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-100'>
            <div className='flex items-center justify-between mb-10'>
              <span className='text-xs font-bold tracking-[0.2em] text-[#7DB8E8] uppercase'>
                Workflow
              </span>
              <span className='text-xs font-mono text-slate-400 font-medium'>
                {workflowSteps[activeStep].step} — 07
              </span>
            </div>

            {/* Step selector — clean progress bars */}
            <div className='flex items-center gap-2 mb-12'>
              {workflowSteps.map((s, idx) => (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(idx)}
                  aria-label={`Step ${s.step}`}
                  className='group relative flex-1 h-8 flex items-center'
                >
                  <span
                    className={`block w-full h-[3px] rounded-full transition-colors duration-300 ${
                      activeStep === idx
                        ? 'bg-[#7DB8E8]'
                        : 'bg-slate-200 group-hover:bg-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Active step content */}
            <div key={activeStep} className='animate-step-in min-h-[140px]'>
              <h4 className='text-2xl md:text-3xl font-bold text-slate-900 mb-4 tracking-tight'>
                {workflowSteps[activeStep].title}
              </h4>
              <p className='text-slate-600 text-base md:text-lg font-light leading-relaxed max-w-md'>
                {workflowSteps[activeStep].detail}
              </p>
            </div>

            {/* Bottom controls */}
            <div className='flex items-center justify-between border-t border-slate-200 pt-6 mt-8'>
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
                className='text-xs font-bold text-slate-400 hover:text-slate-900 disabled:opacity-30 transition-colors uppercase tracking-widest'
              >
                ← Prev
              </button>

              <Link
                href='/services'
                className='text-xs font-bold text-[#7DB8E8] hover:text-slate-900 tracking-widest uppercase transition-colors'
              >
                Full Scope →
              </Link>

              <button
                disabled={activeStep === workflowSteps.length - 1}
                onClick={() =>
                  setActiveStep((p) =>
                    Math.min(workflowSteps.length - 1, p + 1),
                  )
                }
                className='text-xs font-bold text-slate-900 hover:text-[#7DB8E8] disabled:opacity-30 transition-colors uppercase tracking-widest'
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes step-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-step-in {
          animation: step-in 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
//123
