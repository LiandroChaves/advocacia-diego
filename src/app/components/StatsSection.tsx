import React from 'react';
import escritorio from '@/assets/escritorio.png'; // Confere o caminho da imagem

export function StatsSection() {
    return (
        <section
            className="relative w-full flex items-center justify-center
        /* Altura Responsiva: 420px no mobile, 700px no PC */
        min-h-[420px] md:min-h-[700px] 
        py-16 
        /* Configurações de Fundo */
        bg-cover bg-no-repeat
        bg-center md:bg-[center_top] /* Centraliza no mobile, topo no PC (pra ver o teto do escritório) */
        bg-blend-overlay 
        bg-background/60 dark:bg-background/60 /* Adapta a película pro tema claro/escuro */
        transition-colors duration-300"
            style={{ backgroundImage: `url(${escritorio})` }}
        >
            <div className="container mx-auto px-4">

                {/* Título da Seção (adicionei estilo pra ficar padronizado) */}
                <h2 className="text-3xl md:text-5xl font-bold text-center text-primary mb-12 md:mb-20 drop-shadow-sm">
                    Nossos números
                </h2>

                {/* Grid dos Números */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-4xl mx-auto w-full">

                    {/* Card 1: Clientes */}
                    <div className="text-center group hover:-translate-y-2 transition-transform duration-300">
                        <h3 className="text-[3.5rem] md:text-[5rem] leading-none font-bold text-primary mb-2">
                            +300
                        </h3>
                        <p className="text-2xl md:text-3xl font-medium text-primary/90 font-sans">
                            Clientes
                        </p>
                    </div>

                    {/* Card 2: Contratos */}
                    <div className="text-center group hover:-translate-y-2 transition-transform duration-300">
                        <h3 className="text-[3.5rem] md:text-[5rem] leading-none font-bold text-primary mb-2">
                            +200
                        </h3>
                        <p className="text-2xl md:text-3xl font-medium text-primary/90 font-sans">
                            Contratos
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}