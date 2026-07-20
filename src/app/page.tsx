import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BentoGrid from '@/components/BentoGrid';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className='bg-slate-900 relative'>
      {/* 
        FIXED: Changed from 'sticky' to 'fixed top-0 left-0 z-0'. 
        This pins the video to the background and completely removes the empty blue gap! 
      */}
      <div className='fixed top-0 left-0 h-screen w-full overflow-hidden z-0'>
        <Hero />
      </div>

      {/* 
        FIXED: mt-[100vh] ensures this section starts exactly at the bottom of your screen.
        As soon as you scroll, it slides up smoothly over the fixed video.
      */}
      <div
        id='light-wrapper'
        className='relative z-10 bg-slate-50 mt-[100vh] rounded-t-[40px] shadow-[0_-30px_70px_rgba(0,0,0,0.3)]'
      >
        <BentoGrid />
        <Footer />
      </div>
    </main>
  );
}
