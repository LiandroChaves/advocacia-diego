import { useState, useEffect } from 'react';
import { ChevronDown, Scale } from 'lucide-react';
import { useData } from '../context/DataContext';
import logoBranca from '@/assets/logobranca.png';

export function HeroCarousel() {
    const { name, banners } = useData();
    const [currentSlide, setCurrentSlide] = useState(0);

    const activeBanners = banners.filter(b => b.active);

    useEffect(() => {
        if (activeBanners.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % activeBanners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [activeBanners.length]);

    const scrollToAbout = () => {
        // Ajustei para 'aboutme' que é o ID que vi no seu componente AboutMe
        document.getElementById('aboutme')?.scrollIntoView({ behavior: 'smooth' });
    };

    if (activeBanners.length === 0) return null;

    return (
        <section className="relative h-[500px] md:h-[750px] w-full overflow-hidden flex items-center justify-center">
            {/* Background Slides */}
            {activeBanners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={
                            banner.imageUrl.startsWith('http') || banner.imageUrl.startsWith('data:')
                                ? banner.imageUrl
                                : banner.imageUrl.startsWith('/') || banner.imageUrl.includes('src/assets')
                                    ? banner.imageUrl
                                    : `${import.meta.env.VITE_API_URL}${banner.imageUrl}`
                        }
                        alt={banner.title || `Slide ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
                </div>
            ))}

            {/* Conteúdo Centralizado e deslocado para a direita no Desktop */}
            <div className="relative z-10 container mx-auto px-4 max-w-7xl text-white flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24">

                {/* Logo - Mantida no tamanho de impacto */}
                <div className="flex-shrink-0">
                    <img
                        src={logoBranca}
                        alt="Logo"
                        className="h-40 w-40 md:h-72 md:w-72 object-contain drop-shadow-2xl"
                    />
                </div>

                {/* Bloco de Texto - Delimitado pela largura da descrição */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 
        max-w-md">

                    {/* Título um pouco menor (4xl) para caber melhor no bloco */}
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md leading-tight">
                        {activeBanners[currentSlide]?.title || name}
                    </h1>

                    <p className="text-base md:text-lg opacity-90 mb-8 drop-shadow-sm leading-relaxed">
                        {activeBanners[currentSlide]?.description || 'Defendendo seus direitos com ética e comprometimento'}
                    </p>

                    <button
                        onClick={scrollToAbout}
                        className="inline-flex items-center gap-2 bg-white text-primary px-10 py-4 rounded-lg hover:bg-white/90 transition-all transform hover:scale-105 font-bold text-lg shadow-xl dark:bg-white dark:text-black w-fit"
                    >
                        Conheça nosso trabalho
                        <ChevronDown className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
