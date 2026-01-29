import { useState, useEffect } from 'react';
import { ChevronDown, Scale } from 'lucide-react';

// Importe suas imagens aqui ou use caminhos públicos
import pag1 from '@/assets/view-3d-justice-scales.jpg'; // Ajuste o caminho se precisar
import pag2 from '@/assets/photorealistic-lawyer-environment.jpg'; // Ajuste o caminho se precisar
import pag3 from '@/assets/gavel-scales-justice-law-books.jpg'; // Ajuste o caminho se precisar

const slides = [
    pag1,
    pag2,
    pag3
];

export function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative h-[400px] md:h-[750px] w-full overflow-hidden flex items-center justify-center">
            {/* Background Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {/* Imagem de fundo */}
                    <img
                        src={slide}
                        alt={`Slide ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover object-top md:object-center"
                    />

                    {/* Overlay escuro (Gradiente) pra garantir leitura do texto */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
                </div>
            ))}

            {/* Conteúdo da Hero (Texto e Botão) - Fica por cima de tudo com z-10 */}
            <div className="relative z-10 container mx-auto text-center px-4 max-w-4xl text-white -translate-y-6 md:-translate-y-36">
                <Scale className="h-20 w-20 mx-auto mb-6 text-white" />

                <h1 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-md">
                    Advocacia Diêgo Thales de Sousa Moura
                </h1>

                <p className="text-md md:text-lg opacity-90 mb-8 drop-shadow-sm">
                    Defendendo seus direitos com ética e comprometimento
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