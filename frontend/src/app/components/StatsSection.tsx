import React from 'react';
import { useData } from '@/app/context/DataContext';
import statsBackground from '@/assets/escritorio.png';

export function StatsSection() {
    const { stats, statsSetup } = useData();

    const bgImage = statsSetup?.backgroundImageUrl
        ? (
            statsSetup.backgroundImageUrl.startsWith('http') || statsSetup.backgroundImageUrl.startsWith('data:')
                ? statsSetup.backgroundImageUrl
                : statsSetup.backgroundImageUrl.startsWith('/') || statsSetup.backgroundImageUrl.includes('src/assets')
                    ? statsSetup.backgroundImageUrl
                    : `${import.meta.env.VITE_API_URL}${statsSetup.backgroundImageUrl}`
        )
        : statsBackground;

    if (!stats || stats.length === 0) return null;

    return (
        <section
            className="relative w-full flex items-center justify-center
            min-h-[420px] md:min-h-[700px] 
            py-16 
            bg-cover bg-no-repeat
            bg-center md:bg-[center_top]
            bg-blend-overlay 
            bg-background/60 dark:bg-background/60
            transition-all duration-300"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-center text-primary mb-12 md:mb-20 drop-shadow-sm">
                    Nossos números
                </h2>

                <div className={`grid grid-cols-1 md:grid-cols-${Math.min(stats.length, 3)} gap-10 md:gap-16 max-w-5xl mx-auto w-full justify-center`}>
                    {stats.map((stat) => (
                        <div key={stat.id} className="text-center group hover:-translate-y-2 transition-transform duration-300">
                            <h3 className="text-[3.5rem] md:text-[5rem] leading-none font-bold text-primary mb-2">
                                {stat.value}
                            </h3>
                            <p className="text-2xl md:text-3xl font-medium text-primary/90 font-sans">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}