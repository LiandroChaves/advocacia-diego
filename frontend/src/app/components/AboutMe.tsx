import React, { useState } from 'react';
import diegoThales from '@/assets/diego-copia.png';
import fundoDG from '@/assets/fundoDG.png';
import { useData } from '@/app/context/DataContext';

export function AboutMe() {
    const { about } = useData();
    const [isExpanded, setIsExpanded] = useState(false);

    const characterLimit = 500;
    const description = about.description;
    const isLongText = description.length > characterLimit;

    const displayText = (isLongText && !isExpanded)
        ? `${description.substring(0, characterLimit)}...`
        : description;
    const handleToggle = () => {
        if (isExpanded) {
            document.getElementById('aboutme')?.scrollIntoView({ behavior: 'smooth' });
        }
        setIsExpanded(!isExpanded);
    };

    return (
        <section className="relative md:py-12 py-16 overflow-hidden min-h-fit" id='aboutme'>

            {/* --- CAMADA DE FUNDO --- */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-300 grayscale bg-background/20 bg-blend-overlay dark:bg-background/90 dark:bg-blend-multiply"
                style={{ backgroundImage: `url(${fundoDG})` }}
            />

            {/* --- CONTEÚDO --- */}
            <div className="relative z-10 container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center h-full">

                {/* Bloco de Texto - Ajustado para centralizar no mobile */}
                <div className="order-2 md:order-1 mb-8 flex flex-col items-center md:items-start max-w-md mx-auto md:mx-0">
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4 md:mb-6 text-center md:text-left">
                        {about.title || 'Diêgo Thales'}
                    </h2>

                    <div className="relative w-full">
                        <p className="text-base md:text-lg leading-relaxed text-foreground/80 text-justify transition-all duration-500">
                            {displayText}
                        </p>

                        {isLongText && (
                            <button
                                onClick={handleToggle}
                                className="mt-4 text-primary font-bold hover:underline block mx-auto md:mx-0"
                            >
                                {isExpanded ? 'Ler menos ▲' : 'Ler mais ▼'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Bloco da Imagem */}
                <div className="order-1 md:order-2 flex justify-center items-center relative self-center">
                    <img
                        src={about.imageUrl ? (about.imageUrl.startsWith('http') ? about.imageUrl : `${import.meta.env.VITE_API_URL}${about.imageUrl}`) : diegoThales}
                        alt={about.title || "Diêgo Thales"}
                        className="w-auto h-auto max-h-[350px] md:max-h-[550px] object-contain drop-shadow-lg"
                    />
                </div>

            </div>
        </section>
    );
}