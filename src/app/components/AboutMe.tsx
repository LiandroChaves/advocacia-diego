import React from 'react';
// import diegoThales from '@/assets/diego-thales.png';
import diegoThales from '@/assets/Diego - Copia.png';
import fundoDG from '@/assets/fundoDG.png';

export function AboutMe() {
    return (
        <section className="relative md:py-12 py-16 overflow-hidden" id='aboutme'>

            {/* --- CAMADA DE FUNDO (Isolada) --- */}
            {/* Agora o grayscale e as misturas afetam SÓ essa div, não o texto */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-300
                /* Mágica do CSS: */
                grayscale /* Tira a cor amarela da foto original */
                bg-background/20 /* Light Mode: Fundo branco 95% opaco (Clean) */
                bg-blend-overlay /* Mistura suave no branco */
                
                /* Dark Mode: */
                dark:bg-background/90 /* Fundo Navy 90% opaco (Escuro) */
                dark:bg-blend-multiply /* Multiplica o Navy com a foto (Fica escuro e sutil) */
                "
                style={{ backgroundImage: `url(${fundoDG})` }}
            />

            {/* --- CONTEÚDO (Fica por cima com z-10) --- */}
            <div className="relative z-10 container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center md:items-end">

                <div className="order-2 md:order-1 text-center md:text-left mb-8 md:mb-0 self-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4 md:mb-6">
                        Diêgo Thales
                    </h2>

                    <p className="text-base md:text-lg leading-relaxed text-foreground/80 text-justify md:text-left">
                        Com <strong className="text-primary font-bold">8 anos</strong> de experiência na advocacia,
                        este profissional consolidou uma carreira marcada por comprometimento, ética e resultados expressivos.
                        Atuando em diversas áreas do <strong className="text-primary font-bold">Direito</strong>,
                        desenvolveu habilidades estratégicas para análise de casos complexos, negociação e defesa dos
                        interesses de seus clientes. Sua trajetória é pautada pela constante atualização jurídica, garantindo{' '}
                        <span className="text-primary font-bold">soluções eficazes e seguras.</span>
                    </p>
                </div>

                <div className="order-1 md:order-2 flex justify-center md:justify-end relative">
                    <img
                        src={diegoThales}
                        alt="Diêgo Thales"
                        className="w-auto h-auto max-h-[350px] md:max-h-[500px] object-contain drop-shadow-lg"
                    />
                </div>

            </div>
        </section>
    );
}