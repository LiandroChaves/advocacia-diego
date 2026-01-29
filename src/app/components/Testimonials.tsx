import React from 'react';
import { Star, Quote } from 'lucide-react';

// Mock de dados (poderia vir do seu DataContext também, se quisesse)
const reviews = [
    {
        id: 1,
        name: "Carlos Eduardo",
        role: "Empresário",
        content: "A equipe foi sensacional. Conseguiram reverter uma causa trabalhista que parecia perdida. Agradeço demais a dedicação do Dr. Diêgo e sua equipe.",
        avatar: "CE"
    },
    {
        id: 2,
        name: "Fernanda Lima",
        role: "Direito de Família",
        content: "Extremamente atenciosos e éticos. Me senti acolhida num momento muito difícil do meu divórcio. Recomendo de olhos fechados pela transparência.",
        avatar: "FL"
    },
    {
        id: 3,
        name: "Roberto Mendes",
        role: "Consultoria Contratual",
        content: "Profissionalismo ímpar. A análise contratual evitou um prejuízo enorme para minha empresa. Vale cada centavo investido na assessoria.",
        avatar: "RM"
    }
];

export function Testimonials() {
    return (
        // Fundo Azul Navy FIXO (#0f172a) em ambos os temas para dar contraste e elegância
        <section className="py-24 px-4 bg-muted/50 relative overflow-hidden">

            {/* Elemento decorativo de fundo (Sutil) */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#c5a059] rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#c5a059] rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">

                {/* Cabeçalho */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                        O que dizem nossos clientes
                    </h2>
                    <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
                    <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
                        A satisfação e a confiança de quem já teve seus direitos defendidos por nós.
                    </p>
                </div>

                {/* Grid de Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            // bg-card garante Branco no Light e Azul Escuro no Dark
                            className="bg-card text-card-foreground p-8 rounded-2xl shadow-xl border border-white/5 relative group hover:-translate-y-2 transition-transform duration-300"
                        >
                            {/* Ícone de Aspas Dourado */}
                            <Quote className="absolute top-6 right-6 h-12 w-12 text-[#c5a059]/20 group-hover:text-[#c5a059]/40 transition-colors" />

                            {/* Estrelas */}
                            <div className="flex gap-1 mb-6">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="h-5 w-5 fill-[#c5a059] text-[#c5a059]" />
                                ))}
                            </div>

                            {/* Texto do Depoimento */}
                            <p className="text-muted-foreground mb-8 leading-relaxed italic relative z-10">
                                "{review.content}"
                            </p>

                            {/* Autor */}
                            <div className="flex items-center gap-4 mt-auto">
                                {/* Avatar (Iniciais) */}
                                <div className="h-12 w-12 rounded-full bg-[#0f172a] flex items-center justify-center text-[#c5a059] font-bold border-2 border-[#c5a059]">
                                    {review.avatar}
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground">{review.name}</h4>
                                    <p className="text-sm text-[#c5a059] font-medium">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}