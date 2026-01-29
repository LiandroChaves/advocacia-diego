import React from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export function Contact() {
    return (
        <section id="contact" className="py-20 px-4 bg-muted/30">
            <div className="container mx-auto max-w-6xl">

                {/* Cabeçalho */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Entre em Contato
                    </h2>
                    {/* Linha Dourada */}
                    <div className="h-1 w-20 bg-[#c5a059] mx-auto rounded-full" />
                    <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
                        Agende sua consulta ou tire suas dúvidas. Estamos prontos para te ouvir.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">

                    {/* Lado Esquerdo: Infos + Mapa */}
                    <div className="space-y-8">

                        {/* Cards de Informação */}
                        <div className="space-y-6">

                            {/* Endereço */}
                            <div className="flex items-start gap-4">
                                {/* Fundo Navy suave com Ícone Dourado */}
                                <div className="p-3 bg-primary/10 rounded-lg text-[#c5a059]">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground text-lg">Endereço</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        R. Camilo Brasiliense, 363<br />
                                        Sala 02 - Centro<br />
                                        Limoeiro do Norte - CE, 62930-000
                                    </p>
                                </div>
                            </div>

                            {/* Telefone */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg text-[#c5a059]">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground text-lg">Telefone</h3>
                                    <p className="text-muted-foreground">
                                        (88) 9 9237-5232
                                    </p>
                                    <p className="text-muted-foreground text-sm opacity-80">
                                        Segunda a Sexta, das 8h às 18h
                                    </p>
                                </div>
                            </div>

                            {/* E-mail */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg text-[#c5a059]">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground text-lg">E-mail</h3>
                                    <p className="text-muted-foreground break-all">
                                        advogadodiegothales@gmail.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Minimapa Quadrado Perfeito */}
                        <div className="w-full aspect-square bg-card rounded-xl overflow-hidden border border-border shadow-sm relative group">
                            {/* Overlay cinza que some no hover */}
                            <div className="absolute inset-0 bg-[#0f172a]/10 pointer-events-none group-hover:bg-transparent transition-colors duration-300 z-10 mix-blend-saturation" />

                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2362.789689762383!2d-38.10080851597865!3d-5.148257091602762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7bbd106b3ce54ab%3A0x5607209385aa4e90!2sR.%20Camilo%20Brasiliense%2C%20363%20-%2002%20-%20Jo%C3%A3o%20XXIII%2C%20Limoeiro%20do%20Norte%20-%20CE%2C%2062930-000!5e0!3m2!1spt-BR!2sbr!4v1769632351536!5m2!1spt-BR!2sbr"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                className="group-hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                        </div>

                    </div>

                    {/* Lado Direito: Formulário */}
                    <div className="bg-card p-8 rounded-2xl shadow-lg border border-border/50">
                        <h3 className="text-2xl font-bold text-foreground mb-6">Envie uma mensagem</h3>

                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Nome</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 rounded-lg bg-muted border border-border focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] outline-none transition-all"
                                        placeholder="Seu nome completo"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Telefone</label>
                                    <input
                                        type="tel"
                                        className="w-full p-3 rounded-lg bg-muted border border-border focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] outline-none transition-all"
                                        placeholder="(00) 00000-0000"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">E-mail</label>
                                <input
                                    type="email"
                                    className="w-full p-3 rounded-lg bg-muted border border-border focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] outline-none transition-all"
                                    placeholder="seu@email.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Assunto</label>
                                <select className="w-full p-3 rounded-lg bg-muted border border-border focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] outline-none transition-all text-muted-foreground">
                                    <option>Selecione o assunto</option>
                                    <option>Direito Civil</option>
                                    <option>Direito Trabalhista</option>
                                    <option>Direito de Família</option>
                                    <option>Outros</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Mensagem</label>
                                <textarea
                                    rows={4}
                                    className="w-full p-3 rounded-lg bg-muted border border-border focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] outline-none transition-all resize-none"
                                    placeholder="Descreva brevemente seu caso..."
                                />
                            </div>

                            <button
                                type="button"
                                // Botão Azul Navy (#0f172a) com texto branco
                                className="w-full py-4 bg-primary text-muted font-bold rounded-lg hover:bg-foreground/90 hover:-translate-y-1 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                            >
                                Enviar Mensagem
                                <Send className="h-4 w-4" />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}