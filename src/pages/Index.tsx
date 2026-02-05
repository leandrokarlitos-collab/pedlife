import React, { useEffect } from 'react';
import { Nav } from '@/components/landing/Nav';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Audience } from '@/components/landing/Audience';
import { Benefits } from '@/components/landing/Benefits';
import { Testimonials } from '@/components/landing/Testimonials';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';
import { WaveBackground } from '@/components/ui/WaveBackground';

export default function Index() {
  // Força light mode na landing page
  useEffect(() => {
    // Remove a classe dark do HTML se existir
    document.documentElement.classList.remove('dark');
    // Define o tema no localStorage como light
    localStorage.setItem('theme', 'light');
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden">
      {/* Background animado com DNA helix - igual à plataforma */}
      <WaveBackground />

      {/* Blobs decorativos animados */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-300/20 rounded-full blur-[120px] animate-blob-spin" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[100px] animate-blob-spin" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-300/15 rounded-full blur-[80px] animate-blob-spin" style={{ animationDelay: '4s' }} />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 w-full">
        <Nav />
        <main>
          <Hero />
          <Features />
          <Audience />
          <Benefits />
          <Testimonials />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
