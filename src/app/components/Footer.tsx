import React from 'react';
import { Link } from 'react-router';
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import logoBranca from '@/assets/logobranca.png';
import stfImg from '@/assets/stf.png';
import stjImg from '@/assets/stj.png';
import tstImg from '@/assets/tst.png';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        // Tirei o 'overflow-hidden' daqui. Vamos deixar o conteúdo se ajustar naturalmente.
        <footer className="bg-[#0f172a] text-white pt-16 pb-8 border-t border-white/10 font-sans w-full">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* GRID RESPONSIVO:
                   - grid-cols-1: Uma coluna no celular (tudo empilhado)
                   - md:grid-cols-2: Duas colunas em tablets
                   - lg:grid-cols-4: Quatro colunas no PC
                */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center md:text-left">

                    {/* --- COLUNA 1: MARCA --- */}
                    <div className="space-y-6 flex flex-col items-center md:items-start">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <img src={logoBranca} alt="SD Advocacia" className="h-16 w-auto object-contain" />
                            <div className="hidden md:block w-px h-12 bg-[#c5a059]/50"></div>
                            <div>
                                <h2 className="font-bold text-lg leading-tight tracking-wide">ADVOCACIA</h2>
                                <p className="text-xs text-[#c5a059] uppercase tracking-wider">Diêgo Thales</p>
                            </div>
                        </div>

                        <p className="text-white/70 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                            Dedicação, ética e excelência jurídica. Defendendo seus direitos com comprometimento e resultados expressivos.
                        </p>

                        {/* flex-wrap: Se a tela for minúscula, os ícones descem pra próxima linha em vez de sumir */}
                        <div className="flex gap-3 justify-center md:justify-start flex-wrap">
                            <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#c5a059] hover:text-[#0f172a] transition-all duration-300 cursor-pointer group shrink-0">
                                <Facebook className="h-5 w-5" />
                            </div>

                            <a href="https://www.instagram.com/advogadodiegothales/" target="_blank" rel="noopener noreferrer"
                                className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#c5a059] hover:text-[#0f172a] transition-all duration-300 shrink-0">
                                <Instagram className="h-5 w-5" />
                            </a>

                            <a href="https://br.linkedin.com/in/adv-di%C3%AAgo-thales-sousa-moura-87a201222" target="_blank" rel="noopener noreferrer"
                                className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#c5a059] hover:text-[#0f172a] transition-all duration-300 shrink-0">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* --- COLUNA 2: NAVEGAÇÃO --- */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-bold mb-6 text-white border-b-2 border-[#c5a059] inline-block pb-1">
                            Navegação
                        </h3>
                        <ul className="space-y-3 w-full">
                            {[
                                { name: 'Sobre o escritório', path: '/sobre' },
                                { name: 'Nossa equipe', path: '/equipe' },
                                { name: 'Áreas de atuação', path: '/areas' },
                                { name: 'Perguntas Frequentes', path: '/faq' }
                            ].map((item, index) => (
                                <li key={index} className="flex justify-center md:justify-start">
                                    <Link to={item.path} className="text-white/70 hover:text-[#c5a059] transition-colors flex items-center gap-2 group">
                                        <ChevronRight className="h-4 w-4 text-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
                                        <span className="md:-ml-4 md:group-hover:ml-0 transition-all duration-300">{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* --- PORTAIS JURÍDICOS --- */}
                        <div className="mt-8 flex gap-4 justify-center md:justify-start">
                            <a
                                href="https://portal.stf.jus.br/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm overflow-hidden p-1"
                                title="STF - Supremo Tribunal Federal"
                            >
                                <img src={stfImg} alt="STF" className="w-full h-full object-contain" />
                            </a>
                            <a
                                href="https://www.stj.jus.br/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm overflow-hidden p-1"
                                title="STJ - Superior Tribunal de Justiça"
                            >
                                <img src={stjImg} alt="STJ" className="w-full h-full object-contain" />
                            </a>
                            <a
                                href="https://www.tst.jus.br/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm overflow-hidden p-1"
                                title="TST - Tribunal Superior do Trabalho"
                            >
                                <img src={tstImg} alt="TST" className="w-full h-full object-contain" />
                            </a>
                        </div>
                    </div>

                    {/* --- COLUNA 3: LOCALIZAÇÃO --- */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-bold mb-6 text-white border-b-2 border-[#c5a059] inline-block pb-1">
                            Localização
                        </h3>
                        {/* max-w-full e break-words garantem que o endereço não estoure */}
                        <div className="space-y-4 text-white/70 text-sm max-w-full">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
                                <MapPin className="h-5 w-5 text-[#c5a059] flex-shrink-0 mt-1 mb-2 md:mb-0" />
                                <p className="break-words"> {/* break-words é a chave aqui */}
                                    <strong className="text-white block mb-1">Complexo Jurídico</strong>
                                    R. Camilo Brasiliense, 363<br />
                                    Sala 02 - Centro<br />
                                    Limoeiro do Norte - CE<br />
                                    CEP: 62930-000
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* --- COLUNA 4: CONTATOS --- */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-bold mb-6 text-white border-b-2 border-[#c5a059] inline-block pb-1">
                            Contatos
                        </h3>
                        <div className="space-y-4 w-full flex flex-col items-center md:items-start">

                            <div className="flex flex-col md:flex-row items-center md:items-start gap-3 group w-full">
                                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#c5a059]/20 transition-colors shrink-0">
                                    <Phone className="h-5 w-5 text-[#c5a059]" />
                                </div>
                                <span className="text-white/80 group-hover:text-white transition-colors break-all md:break-normal">
                                    (88) 9 9237-5232
                                </span>
                            </div>

                            <div className="flex flex-col md:flex-row items-center md:items-start gap-3 group w-full">
                                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#c5a059]/20 transition-colors shrink-0">
                                    <Mail className="h-5 w-5 text-[#c5a059]" />
                                </div>
                                {/* break-all aqui garante que o email quebre se for maior que a tela */}
                                <span className="text-white/80 group-hover:text-white transition-colors break-all text-sm md:text-base">
                                    advogadodiegothales@gmail.com
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- RODAPÉ INFERIOR --- */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/50 gap-4 text-center md:text-left">
                    <p className="max-w-xs md:max-w-none mx-auto md:mx-0">
                        © {currentYear} Diêgo Thales. Todos os direitos reservados.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        <a href="#" className="hover:text-[#c5a059] transition-colors duration-300">Termos de Uso</a>
                        <a href="#" className="hover:text-[#c5a059] transition-colors duration-300">Privacidade</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}