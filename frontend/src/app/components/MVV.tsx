import { useData } from "../context/DataContext";
import { Target, Eye, Award, CheckCircle2 } from 'lucide-react';

export function MVV() {
    const { about, name } = useData();

    // Texto "Encher Linguiça" Profissional (Marketing Jurídico)
    // Se quiser, depois você move isso pro seu DataContext, mas deixei aqui pra facilitar.
    const richContent = {
        history: "Fundado sob a premissa de que a advocacia deve ser exercida com rigor técnico e humanidade, nosso escritório consolidou-se, ao longo de 8 anos, como uma referência na defesa de direitos fundamentais e patrimoniais. Nossa trajetória é marcada pela busca incessante por soluções jurídicas inovadoras que não apenas resolvem conflitos, mas que antecipam cenários e protegem o legado de nossos clientes.",
        methodology: "Adotamos uma metodologia 'Boutique Full-Service', onde cada caso é tratado como um projeto único. Combinamos a personalização do atendimento artesanal com a eficiência das mais modernas tecnologias jurídicas. Acreditamos que a excelência não é um ato isolado, mas um hábito construído diariamente através do estudo aprofundado, da ética inegociável e da transparência absoluta em cada etapa processual."
    };

    return (
        <section id="about" className="py-20 px-4 bg-muted/30">
            <div className="container mx-auto max-w-6xl">

                {/* --- 1. INTRODUÇÃO INSTITUCIONAL --- */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                        {about.title}
                    </h2>
                    {/* Detalhe Dourado */}
                    <div className="h-1 w-20 bg-[#c5a059] mx-auto rounded-full mb-8" />

                    {/* Texto Expandido (A "Linguiça" Premium) */}
                    <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed text-justify md:text-center">
                        <p>
                            {about.description} {richContent.history}
                        </p>
                        <p>
                            {richContent.methodology}
                        </p>
                    </div>
                </div>

                {/* --- 2. GRID MVV (MISSÃO, VISÃO, VALORES) --- */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">

                    {/* Card Missão */}
                    <div className="bg-card border border-border/60 rounded-xl p-8 shadow-sm hover:shadow-xl hover:border-[#c5a059]/50 transition-all duration-500 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#0f172a]/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="p-3 rounded-lg bg-primary/5 group-hover:bg-secondary transition-colors duration-300">
                                <Target className="h-6 w-6 text-primary group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary">Missão</h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed pl-4 border-l-2 border-[#c5a059]/30 group-hover:border-[#c5a059] transition-colors">
                            {/* Texto expandido para Missão */}
                            {about.mission} Mais do que advogar, buscamos ser agentes de transformação, garantindo que a justiça seja acessível, célere e, acima de tudo, efetiva para a preservação da dignidade e do patrimônio de nossos constituintes.
                        </p>
                    </div>

                    {/* Card Visão */}
                    <div className="bg-card border border-border/60 rounded-xl p-8 shadow-sm hover:shadow-xl hover:border-[#c5a059]/50 transition-all duration-500 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#0f172a]/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="p-3 rounded-lg bg-primary/5 group-hover:bg-secondary transition-colors duration-300">
                                <Eye className="h-6 w-6 text-primary group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary">Visão</h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed pl-4 border-l-2 border-[#c5a059]/30 group-hover:border-[#c5a059] transition-colors">
                            {/* Texto expandido para Visão */}
                            {about.vision} Almejamos ser reconhecidos não apenas pelo êxito em demandas complexas, mas pela capacidade de inovar no direito, estabelecendo novos padrões de qualidade técnica e atendimento humanizado em todo o território nacional.
                        </p>
                    </div>

                    {/* Card Valores */}
                    <div className="bg-card border border-border/60 rounded-xl p-8 shadow-sm hover:shadow-xl hover:border-[#c5a059]/50 transition-all duration-500 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#0f172a]/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="p-3 rounded-lg bg-primary/5 group-hover:bg-secondary transition-colors duration-300">
                                <Award className="h-6 w-6 text-primary group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary">Valores</h3>
                        </div>
                        <ul className="space-y-4">
                            {about.values.map((value, index) => (
                                <li key={index} className="flex items-start gap-3 text-muted-foreground group/item">
                                    {/* Ícone de check dourado */}
                                    <CheckCircle2 className="h-5 w-5 text-[#c5a059] flex-shrink-0 mt-0.5 group-hover/item:text-[#0f172a] transition-colors" />
                                    <span className="font-medium group-hover/item:text-[#0f172a] transition-colors">{value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* --- 3. SEÇÃO EXTRA: DIFERENCIAIS (Pra fechar o pacote) --- */}
                <div className="grid md:grid-cols-2 gap-8 items-center bg-[#0f172a] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
                    {/* Elemento decorativo de fundo */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a059] rounded-full blur-[100px] opacity-20 pointer-events-none" />

                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            Por que escolher a <span className="text-[#c5a059]">{name}</span>?
                        </h3>
                        <p className="text-white/80 leading-relaxed mb-6">
                            Em um cenário jurídico cada vez mais complexo e dinâmico, a tradição não basta. É preciso aliar experiência com agilidade estratégica. Nosso escritório oferece uma estrutura completa para blindar seus interesses.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 relative z-10">
                        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/5">
                            <h4 className="text-[#c5a059] font-bold text-lg mb-1">8 Anos</h4>
                            <p className="text-xs text-white/70">De atuação ininterrupta e excelência.</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/5">
                            <h4 className="text-[#c5a059] font-bold text-lg mb-1">+300</h4>
                            <p className="text-xs text-white/70">Clientes atendidos com satisfação.</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/5">
                            <h4 className="text-[#c5a059] font-bold text-lg mb-1">Full Service</h4>
                            <p className="text-xs text-white/70">Atuação multidisciplinar integrada.</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/5">
                            <h4 className="text-[#c5a059] font-bold text-lg mb-1">24/7</h4>
                            <p className="text-xs text-white/70">Disponibilidade para casos urgentes.</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}