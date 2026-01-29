import { useData } from '@/app/context/DataContext';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function FAQ() {
    const { faqs } = useData();
    const [openFaq, setOpenFaq] = useState<string | null>(null);

    return (
        <section id="faq" className="py-20 px-4 bg-muted/30">
            <div className="container mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Dúvidas Frequentes</h2>
                    <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
                </div>

                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <div
                            key={faq.id}
                            className={`border rounded-lg transition-all duration-300 ${openFaq === faq.id ? 'border-secondary bg-primary/5' : 'border-border bg-card'
                                }`}
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                                className="w-full px-6 py-5 text-left flex items-center justify-between"
                            >
                                <span className={`font-semibold text-lg ${openFaq === faq.id ? 'text-primary' : 'text-foreground'}`}>
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${openFaq === faq.id ? 'rotate-180 text-secondary' : ''
                                        }`}
                                />
                            </button>

                            <div
                                className={`grid transition-all duration-300 ease-in-out ${openFaq === faq.id ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'
                                    }`}
                            >
                                <div className="overflow-hidden px-6">
                                    <p className="text-muted-foreground leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}