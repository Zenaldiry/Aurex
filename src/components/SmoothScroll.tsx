'use client';

import { ReactLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<any>(null);

  // This effect listens for route changes and forces the scroll to the top
  useEffect(() => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}
    >
      {children}
    </ReactLenis>
  );
}
