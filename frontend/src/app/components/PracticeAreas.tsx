import { useData } from '@/app/context/DataContext';
import {
    Scale, Gavel, FileText, Briefcase, Shield, Users, Home, Heart,
    Handshake, Building2, Globe, LifeBuoy, Lock, Stethoscope, Car, Landmark
} from 'lucide-react';

const iconMap: Record<string, any> = {
    Scale, Gavel, FileText, Briefcase, Shield, Users, Home, Heart,
    Handshake, Building2, Globe, LifeBuoy, Lock, Stethoscope, Car, Landmark
};

export function PracticeAreas() {
    const { practiceAreas } = useData();

    return (
        <section id="areas" className="py-20 px-4 bg-muted/30">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Áreas de Atuação</h2>
                    <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Excelência jurídica em diversas especialidades para garantir a defesa dos seus direitos.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {practiceAreas.map((area) => {
                        const Icon = iconMap[area.icon] || Scale;
                        return (
                            <div
                                key={area.id}
                                className="bg-card border border-border/50 p-8 rounded-xl shadow-sm hover:shadow-xl hover:border-secondary transition-all duration-300 group"
                            >
                                <div className="h-14 w-14 bg-primary/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-secondary transition-colors">
                                    <Icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                                </div>

                                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                    {area.title}
                                </h3>

                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {area.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}