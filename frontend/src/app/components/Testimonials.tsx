import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useData } from '@/app/context/DataContext';

export function Testimonials() {
    const { testimonials } = useData();

    // Se não tiver depoimentos, não exibe a seção
    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section className="py-24 px-4 bg-muted/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#c5a059] rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#c5a059] rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                        O que dizem nossos clientes
                    </h2>
                    <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
                    <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
                        A satisfação e a confiança de quem já teve seus direitos defendidos por nós.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((review) => (
                        <div
                            key={review.id}
                            className="bg-card text-card-foreground p-8 rounded-2xl shadow-xl border border-white/5 relative group hover:-translate-y-2 transition-transform duration-300"
                        >
                            <Quote className="absolute top-6 right-6 h-12 w-12 text-[#c5a059]/20 group-hover:text-[#c5a059]/40 transition-colors" />

                            <div className="flex gap-1 mb-6">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="h-5 w-5 fill-[#c5a059] text-[#c5a059]" />
                                ))}
                            </div>

                            <p className="text-muted-foreground mb-8 leading-relaxed italic relative z-10">
                                "{review.content}"
                            </p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className="h-12 w-12 rounded-full bg-[#0f172a] flex items-center justify-center text-[#c5a059] font-bold border-2 border-[#c5a059] overflow-hidden">
                                    {review.avatar?.includes('/') || review.avatar?.includes('http') ? (
                                        <img
                                            src={
                                                review.avatar?.startsWith('http') || review.avatar?.startsWith('data:')
                                                    ? review.avatar
                                                    : review.avatar?.startsWith('/') || review.avatar?.includes('src/assets')
                                                        ? review.avatar
                                                        : `${import.meta.env.VITE_API_URL}${review.avatar}`
                                            }
                                            alt={review.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span>{review.avatar || review.name.substring(0, 2).toUpperCase()}</span>
                                    )}
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