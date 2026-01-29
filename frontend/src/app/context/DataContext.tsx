import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import diego from '@/assets/diego.png';
import jonatas from '@/assets/jonatas.png';
import heloisa from '@/assets/heloisa.png';

export interface AboutOffice {
  id: string;
  title: string;
  description: string;
  mission: string;
  vision: string;
  values: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  specialties: string[];
}

export interface PracticeArea {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface DataContextType {
  about: AboutOffice;
  updateAbout: (data: Partial<AboutOffice>) => void;
  team: TeamMember[];
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, data: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  practiceAreas: PracticeArea[];
  addPracticeArea: (area: Omit<PracticeArea, 'id'>) => void;
  updatePracticeArea: (id: string, data: Partial<PracticeArea>) => void;
  deletePracticeArea: (id: string) => void;
  faqs: FAQ[];
  addFAQ: (faq: Omit<FAQ, 'id'>) => void;
  updateFAQ: (id: string, data: Partial<FAQ>) => void;
  deleteFAQ: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const defaultData = {
  about: {
    id: '1',
    title: 'Sobre o Escritório',
    description: 'Somos um escritório de advocacia comprometido com a excelência e ética profissional.',
    mission: 'Oferecer serviços jurídicos de alta qualidade com ética e comprometimento.',
    vision: 'Ser referência em advocacia, reconhecidos pela excelência e inovação.',
    values: ['Ética', 'Transparência', 'Comprometimento', 'Excelência']
  },
  team: [
    {
      id: '1',
      name: 'Diêgo Thales',
      role: 'Advogado Sócio Proprietário',
      bio: 'Especialista em Direito Civil com mais de 8 anos de experiência.',
      imageUrl: diego,
      specialties: ['Direito Civil', 'Direito Contratual']
    },
    {
      id: '2',
      name: 'Jonatas',
      role: 'Advogado',
      bio: 'Advogado especializado em Direito Civil.',
      imageUrl: jonatas,
      specialties: ['Direito Trabalhista', 'Direito Previdenciário']
    },
    {
      id: '3',
      name: 'Heloisa',
      role: 'Advogada Estagiária',
      bio: 'Estagiária em Direito Civil com mais de 8 anos de experiência.',
      imageUrl: heloisa,
      specialties: ['Direito Civil', 'Direito Contratual']
    }
  ],
  practiceAreas: [
    {
      id: '1',
      title: 'Direito Civil',
      description: 'Assessoria completa em questões civis, contratos e responsabilidade civil.',
      icon: 'Scale'
    },
    {
      id: '2',
      title: 'Direito Trabalhista',
      description: 'Defesa dos direitos trabalhistas, ações e consultoria preventiva.',
      icon: 'Briefcase'
    },
    {
      id: '3',
      title: 'Direito de Família',
      description: 'Divórcios, guarda, pensão alimentícia e partilha de bens.',
      icon: 'Users'
    },
    {
      id: '4',
      title: 'Direito Criminal',
      description: 'Defesa criminal em todas as esferas, com ética e profissionalismo.',
      icon: 'Shield'
    }
  ],
  faqs: [
    {
      id: '1',
      question: 'Como funciona a primeira consulta?',
      answer: 'A primeira consulta é uma reunião para entender seu caso, esclarecer dúvidas e apresentar as possíveis soluções jurídicas.'
    },
    {
      id: '2',
      question: 'Quais são as formas de pagamento?',
      answer: 'Aceitamos diversas formas de pagamento: à vista, parcelado, cartão de crédito e débito.'
    },
    {
      id: '3',
      question: 'Quanto tempo leva um processo?',
      answer: 'O tempo varia conforme o tipo de processo e a complexidade do caso. Durante a consulta, podemos dar uma estimativa mais precisa.'
    }
  ]
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [about, setAbout] = useState<AboutOffice>(() => {
    const saved = localStorage.getItem('data_about');
    return saved ? JSON.parse(saved) : defaultData.about;
  });

  const [team, setTeam] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('data_team');
    return saved ? JSON.parse(saved) : defaultData.team;
  });

  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>(() => {
    const saved = localStorage.getItem('data_practiceAreas');
    return saved ? JSON.parse(saved) : defaultData.practiceAreas;
  });

  const [faqs, setFaqs] = useState<FAQ[]>(() => {
    const saved = localStorage.getItem('data_faqs');
    return saved ? JSON.parse(saved) : defaultData.faqs;
  });

  useEffect(() => {
    localStorage.setItem('data_about', JSON.stringify(about));
  }, [about]);

  useEffect(() => {
    localStorage.setItem('data_team', JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem('data_practiceAreas', JSON.stringify(practiceAreas));
  }, [practiceAreas]);

  useEffect(() => {
    localStorage.setItem('data_faqs', JSON.stringify(faqs));
  }, [faqs]);

  const updateAbout = (data: Partial<AboutOffice>) => {
    setAbout(prev => ({ ...prev, ...data }));
  };

  const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const newMember = { ...member, id: Date.now().toString() };
    setTeam(prev => [...prev, newMember]);
  };

  const updateTeamMember = (id: string, data: Partial<TeamMember>) => {
    setTeam(prev => prev.map(m => m.id === id ? { ...m, ...data } : m));
  };

  const deleteTeamMember = (id: string) => {
    setTeam(prev => prev.filter(m => m.id !== id));
  };

  const addPracticeArea = (area: Omit<PracticeArea, 'id'>) => {
    const newArea = { ...area, id: Date.now().toString() };
    setPracticeAreas(prev => [...prev, newArea]);
  };

  const updatePracticeArea = (id: string, data: Partial<PracticeArea>) => {
    setPracticeAreas(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
  };

  const deletePracticeArea = (id: string) => {
    setPracticeAreas(prev => prev.filter(a => a.id !== id));
  };

  const addFAQ = (faq: Omit<FAQ, 'id'>) => {
    const newFaq = { ...faq, id: Date.now().toString() };
    setFaqs(prev => [...prev, newFaq]);
  };

  const updateFAQ = (id: string, data: Partial<FAQ>) => {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, ...data } : f));
  };

  const deleteFAQ = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        about,
        updateAbout,
        team,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        practiceAreas,
        addPracticeArea,
        updatePracticeArea,
        deletePracticeArea,
        faqs,
        addFAQ,
        updateFAQ,
        deleteFAQ
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
