import { HeroCarousel } from '@/app/components/HeroCarousel';
import { AboutMe } from '@/app/components/AboutMe';
import { StatsSection } from '@/app/components/StatsSection';
import { Testimonials } from '@/app/components/Testimonials';

export function Home() {

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">

      {/* 1. Hero com Carrossel */}
      <HeroCarousel />

      {/* 2. Seção Sobre o Advogado Principal (Clean e direta) */}
      <AboutMe />

      {/* 3. Números do Escritório (Impacto visual) */}
      <StatsSection />

      {/* 4. Depoimentos (Impacto visual) */}
      <Testimonials />

    </div>
  );
}