import { useState } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export function FloatingWhatsApp() {
    const { sendContactMessage } = useData();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: 'Contato via Site',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Salva no backend (Painel Admin)
            // O backend exige email, então se não tiver, mandamos um placeholder ou o user preenche
            const payload = {
                ...formData,
                email: formData.email || 'sem_email@whatsapp.com'
            };
            await sendContactMessage(payload);

            // 2. Redireciona para o WhatsApp
            const phone = "5588992375232"; // Número do Diego
            const text = `Olá, me chamo *${formData.name}*.\n\n${formData.message}\n\n(Contato enviado pelo site)`;
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

            window.open(url, '_blank');

            // 3. Reseta e fecha
            setFormData({ name: '', phone: '', email: '', subject: 'Contato via Site', message: '' });
            setIsOpen(false);
        } catch (error) {
            console.error(error);
            alert('Erro ao enviar mensagem. Tente novamente ou chame no WhatsApp direto.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Botão Flutuante */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${isOpen ? 'rotate-90 opacity-0 pointer-events-none' : 'opacity-100'
                    } bg-[#25D366] text-white hover:bg-[#20bd5a]`}
                aria-label="Falar no WhatsApp"
            >
                <MessageCircle className="h-8 w-8" />
            </button>

            {/* Modal / Chat Box */}
            <div className={`fixed bottom-6 left-6 z-50 w-[90%] max-w-sm bg-card border border-border rounded-xl shadow-2xl transition-all duration-300 origin-bottom-left ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
                }`}>
                {/* Header */}
                <div className="bg-[#075e54] text-white p-4 rounded-t-xl flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <MessageCircle className="h-6 w-6" />
                        <div>
                            <h3 className="font-bold text-sm">Falar no WhatsApp</h3>
                            <p className="text-xs text-white/80">Respondemos em instantes</p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full text-white">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 bg-background">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-xs font-semibold text-muted-foreground uppercase">Nome</label>
                            <input
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 rounded-md bg-muted/50 border border-border focus:border-[#25D366] outline-none text-sm"
                                placeholder="Seu nome"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-muted-foreground uppercase">Email (Opcional)</label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 rounded-md bg-muted/50 border border-border focus:border-[#25D366] outline-none text-sm"
                                placeholder="seu@email.com"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-muted-foreground uppercase">Telefone</label>
                            <input
                                required
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-2 rounded-md bg-muted/50 border border-border focus:border-[#25D366] outline-none text-sm"
                                placeholder="(DD) 99999-9999"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-muted-foreground uppercase">Mensagem</label>
                            <textarea
                                required
                                name="message"
                                rows={3}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-2 rounded-md bg-muted/50 border border-border focus:border-[#25D366] outline-none text-sm resize-none"
                                placeholder="Como podemos ajudar?"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2 shadow-sm"
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Iniciar Conversa <Send className="h-4 w-4" /></>}
                        </button>
                    </form>
                    <p className="text-[10px] text-center text-muted-foreground mt-3">
                        Ao enviar, você será redirecionado para o WhatsApp.
                    </p>
                </div>
            </div>
        </>
    );
}
