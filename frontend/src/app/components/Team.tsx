import { useState } from 'react';
import { useData } from '@/app/context/DataContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Team() {
    const { team } = useData();
    const [currentPage, setCurrentPage] = useState(1);

    // Configuração: 3 itens por página
    const itemsPerPage = 3;

    // Cálculos de Paginação
    const totalPages = Math.ceil(team.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMembers = team.slice(startIndex, endIndex);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <section id="team" className="py-20 px-4 bg-muted/30">
            <div className="container mx-auto max-w-6xl">

                {/* Cabeçalho */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                        Nossa Equipe
                    </h2>
                    <div className="h-1 w-20 bg-[#c5a059] mx-auto rounded-full" />
                    <p className="mt-4 text-muted-foreground text-lg">
                        Profissionais de alto calibre prontos para te atender.
                    </p>
                </div>

                {/* GRID DE MEMBROS */}
                {/* items-stretch: O SEGREDO! Faz todos os cards da linha terem a mesma altura */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mb-12 items-stretch">
                    {currentMembers.map((member) => (
                        <div
                            key={member.id}
                            // flex flex-col h-full: Garante que o card ocupe a altura total definida pelo grid
                            className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#c5a059]/50 transition-all duration-300 group flex flex-col h-full"
                        >
                            {/* IMAGEM CONTROLADA */}
                            {/* aspect-[3/4]: Define um formato retrato padrão (tipo 3x4 de documento).
                                Isso garante que a área da imagem seja IGUAL em todos os cards, alinhando o início do texto. */}
                            <div className="w-full aspect-[3/4] overflow-hidden relative border-b border-border/30">
                                <img
                                    src={member.imageUrl}
                                    alt={member.name}
                                    // object-cover: Corta o excesso lateral sem distorcer.
                                    // object-top: Garante que o rosto (geralmente no topo) não seja cortado.
                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Gradiente chique no hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* CONTEÚDO DO CARD */}
                            {/* flex-grow: Empurra o rodapé (tags) para baixo, alinhando o final de todos os cards */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-[#0f172a] mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-[#c5a059] font-bold text-xs uppercase tracking-widest border-b border-[#c5a059]/20 pb-2 inline-block">
                                        {member.role}
                                    </p>
                                </div>

                                {/* Texto da Bio: line-clamp-4 limita a 4 linhas pra não quebrar o layout se um texto for gigante */}
                                <p className="text-muted-foreground text-sm mb-6 line-clamp-4 leading-relaxed flex-grow">
                                    {member.bio}
                                </p>

                                {/* Tags alinhadas sempre no fundo */}
                                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
                                    {member.specialties.slice(0, 3).map((spec, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 bg-primary/5 text-primary text-[10px] font-bold uppercase rounded tracking-wide border border-primary/10"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                    {member.specialties.length > 3 && (
                                        <span className="px-2 py-1 text-muted-foreground text-[10px] font-bold uppercase">
                                            +{member.specialties.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- PAGINAÇÃO (Mantida igual) --- */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`p-3 rounded-full transition-all duration-300 flex items-center justify-center
                                ${currentPage === 1
                                    ? 'bg-transparent text-primary opacity-50 cursor-not-allowed'
                                    : 'bg-white border border-muted-foreground text-muted-foreground hover:bg-primary hover:text-white shadow-sm'
                                }`}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => goToPage(idx + 1)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 
                                        ${currentPage === idx + 1
                                            ? 'bg-[#0f172a] scale-125'
                                            : 'bg-muted-foreground/30 hover:bg-[#c5a059]'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className={`p-3 rounded-full transition-all duration-300 flex items-center justify-center
                                ${currentPage === totalPages
                                    ? 'bg-transparent text-muted-foreground opacity-50 cursor-not-allowed'
                                    : 'bg-white border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-white shadow-sm'
                                }`}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
}