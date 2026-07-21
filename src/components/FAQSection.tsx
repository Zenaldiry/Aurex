'use client';

import { useState } from 'react';

const faqs = [
  {
    id: 1,
    question:
      'Where can I find durable and low-maintenance wall panels for my home or business?',
    answer:
      'Aurex Integrated provides high-quality surface and wall panel solutions designed for extreme durability and low maintenance. Perfectly suited for both residential remodels and high-traffic commercial spaces, our materials are resistant to wear, moisture, and daily stress.',
  },
  {
    id: 2,
    question:
      'What sectors and target markets does Aurex Integrated specialize in?',
    answer:
      'We focus on high-repeatability interior spaces including Hospitality & Hotels (lobbies, corridors), Developers (model units, multifamily properties), Offices & Retail (reception walls, brand interiors), and General Contractors seeking turn-key material and installation execution.',
  },
  {
    id: 3,
    question:
      'How does the Aurex Operating Workflow manage project delivery from start to finish?',
    answer:
      'Our structured 7-step process ensures total clarity: 1. Lead Inquiry -> 2. Site Visit & Needs Assessment -> 3. Estimate & Pricing -> 4. Contract Scope & Deposit -> 5. Material Procurement -> 6. Installation & Execution -> 7. Quality Inspection & Turnover.',
  },
  {
    id: 4,
    question:
      'Can Aurex assist with subcontractor coordination and project estimating?',
    answer:
      'Yes! We handle full pricing and estimating structures for materials, labor, and logistics. Additionally, we coordinate installers, framers, and technical crews to guarantee seamless delivery without client management headaches.',
  },
  {
    id: 5,
    question:
      'Who supplies premium interior wall panels and turnkey execution services in Houston?',
    answer:
      'Aurex Integrated operates directly across Houston and surrounding areas in Texas, supplying high-end interior solutions backed by expert design guidance, rapid fulfillment, and specialized installation support.',
  },
];

export default function FAQSection() {
  // القائمة الأولى مفتوحة افتراضياً
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className='w-full bg-[#111822] text-white py-20 px-6 md:px-12 lg:px-24 border-t border-slate-800/80 relative z-20'>
      <div className='max-w-5xl mx-auto'>
        {/* Title Matching Website Theme */}
        <div className='mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-5xl font-bold tracking-tight text-white mb-3'>
            Frequently Asked <span className='text-[#7DB8E8]'>Questions</span>
          </h2>
          <p className='text-slate-400 text-sm md:text-base max-w-2xl'>
            Find clear answers regarding Aurex Integrated services, project
            execution workflow, and material solutions.
          </p>
        </div>

        {/* FAQ List */}
        <div className='flex flex-col gap-4 md:gap-5'>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#7DB8E8]/50 bg-[#1A2634] shadow-lg shadow-[#7DB8E8]/5'
                    : 'border-slate-800 bg-[#16222F]/60 hover:border-slate-700 hover:bg-[#16222F]'
                }`}
              >
                {/* Header / Button */}
                <button
                  type='button'
                  onClick={() => toggleFAQ(index)}
                  className='w-full text-left p-6 md:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none'
                >
                  <span
                    className={`text-base md:text-xl font-medium transition-colors duration-200 ${
                      isOpen ? 'text-[#7DB8E8]' : 'text-slate-100'
                    }`}
                  >
                    {faq.question}
                  </span>

                  {/* Circle Toggle Indicator */}
                  <div
                    className={`w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'border-[#7DB8E8] bg-[#7DB8E8]/10 text-[#7DB8E8] rotate-180'
                        : 'border-slate-700 text-slate-400 bg-slate-800/50'
                    }`}
                  >
                    <svg
                      className='w-4 h-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </div>
                </button>

                {/* Pure CSS CSS-Grid Smooth Height Transition */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className='overflow-hidden px-6 md:px-7 pb-6 md:pb-7'>
                    <div className='border-t border-slate-700/50 pt-4'>
                      <p className='text-slate-300 text-sm md:text-base leading-relaxed font-light'>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
