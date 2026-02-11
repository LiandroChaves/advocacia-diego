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
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    if (activeBanners.length === 0) return null;

    return (
        <section className="relative h-[400px] md:h-[750px] w-full overflow-hidden flex items-center justify-center">
            {/* Background Slides */}
            {activeBanners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {/* Imagem de fundo */}
                    <img
                        src={
                            // 1. Se for uma URL completa (http) ou Base64 (data:), usa direto
                            banner.imageUrl.startsWith('http') || banner.imageUrl.startsWith('data:')
                                ? banner.imageUrl
                                : // 2. Se a string começar com "/" ou "src", é o fallback do Vite/React
                                // (Imports de imagem no Vite geralmente viram algo como "/src/assets/...")
                                banner.imageUrl.startsWith('/') || banner.imageUrl.includes('src/assets')
                                    ? banner.imageUrl
                                    : // 3. Se não for nenhum dos acima, aí sim tenta buscar na API
                                    `${import.meta.env.VITE_API_URL}${banner.imageUrl}`
                        }
                        alt={banner.title || `Slide ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Overlay escuro (Gradiente) pra garantir leitura do texto */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
                </div>
            ))}

            {/* Conteúdo da Hero (Texto e Botão) - Fica por cima de tudo com z-10 */}
            <div className="relative z-10 container mx-auto text-center px-4 max-w-4xl text-white -translate-y-6 md:-translate-y-36">
                <img src={logoBranca} alt="Logo" className="h-30 w-30 mx-auto mb-6 text-white" />

                <h1 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md">
                    {activeBanners[currentSlide]?.title || name}
                </h1>

                <p className="text-md md:text-lg opacity-90 mb-8 drop-shadow-sm">
                    {activeBanners[currentSlide]?.description || 'Defendendo seus direitos com ética e comprometimento'}
                </p>

                <button
                    onClick={scrollToAbout}
                    className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg hover:bg-white/90 transition-colors font-medium text-lg shadow-lg dark:bg-white dark:text-black"
                >
                    Conheça nosso trabalho
                    <ChevronDown className="h-5 w-5" />
                </button>
            </div>
        </section>
    );
}
