import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

//fallback images

//about
import diegoAbout from '@/assets/diego-copia.png';

//team
import diegoTeam from '@/assets/diego.png';
import jonatasTeam from '@/assets/jonatas.png';
import heloisaTeam from '@/assets/heloisa.png';
const fallbackTeam: TeamMember[] = [
  {
    id: 'f-diego',
    name: 'Diego',
    role: 'Advogado Sênior',
    bio: 'Especialista em Direito Civil e Estratégico, com foco em soluções inovadoras para casos complexos.',
    imageUrl: diegoTeam,
    specialties: ['Direito Civil', 'Estratégia Jurídica']
  },
  {
    id: 'f-jonatas',
    name: 'Jonatas',
    role: 'Especialista Jurídico',
    bio: 'Vasta experiência em negociações e direito empresarial, garantindo segurança jurídica aos parceiros.',
    imageUrl: jonatasTeam,
    specialties: ['Direito Empresarial', 'Negociação']
  },
  {
    id: 'f-heloisa',
    name: 'Heloisa',
    role: 'Consultora Jurídica',
    bio: 'Focada em direito humanizado e resoluções céleres, priorizando sempre o bem-estar do cliente.',
    imageUrl: heloisaTeam,
    specialties: ['Direito de Família', 'Consultoria']
  }
];

//testimonials
import diegoTestimonial from '@/assets/diego.png';
import jonatasTestimonial from '@/assets/jonatas.png';
import heloisaTestimonial from '@/assets/heloisa.png';

const fallbackTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Carlos Oliveira',
    role: 'Empresário',
    content: 'O atendimento superou minhas expectativas. Resolveram uma questão contratual complexa com agilidade e transparência total.',
    avatar: diegoTestimonial
  },
  {
    id: 't2',
    name: 'Ana Paula Souza',
    role: 'Cliente Civil',
    content: 'Excelente profissional. Senti muita segurança desde a primeira consulta. Recomendo fortemente para quem busca ética e resultados.',
    avatar: heloisaTestimonial
  },
  {
    id: 't3',
    name: 'Ricardo Silva',
    role: 'Diretor Comercial',
    content: 'Equipe de alto calibre. A visão estratégica aplicada ao meu caso fez toda a diferença no desfecho positivo.',
    avatar: jonatasTestimonial
  }
];

//banners
import banner1 from '@/assets/banner1.jpg';
import banner2 from '@/assets/banner2.jpg';
import banner3 from '@/assets/banner3.jpg';

const fallbackBannersList = [
  { id: 'f1', imageUrl: banner1, title: 'DT Advocacia', description: 'Defendendo seus direitos com ética', active: true },
  { id: 'f2', imageUrl: banner2, title: 'Consultoria Jurídica', description: 'Comprometimento e transparência', active: true },
  { id: 'f3', imageUrl: banner3, title: 'Excelência Jurídica', description: 'Sua causa é a nossa prioridade', active: true },
];

//stats
import statsBackground from '@/assets/escritorio.png';

const fallbackStats: Stat[] = [
  { id: 's1', label: 'Processos Ativos', value: '300+' },
  { id: 's2', label: 'Clientes Satisfeitos', value: '200+' },
  { id: 's3', label: 'Casos Resolvidos', value: '500+' },
];

// MVV
const defaultAbout: AboutOffice = {
  id: '0',
  title: 'Sobre mim',
  description: 'Com 8 anos de experiência na advocacia, este profissional consolidou uma carreira marcada por comprometimento, ética e resultados expressivos. Atuando em diversas áreas do Direito, desenvolveu habilidades estratégicas para análise de casos complexos, negociação e defesa dos interesses de seus clientes. Sua trajetória é pautada pela constante atualização jurídica, garantindo soluções eficazes e seguras.',
  mission: 'Atuar com excelência na advocacia, oferecendo serviços jurídicos de alta qualidade, pautados na ética, transparência e compromisso com o cliente. Buscar soluções inovadoras e eficazes, sempre em conformidade com a legislação vigente, visando a satisfação e segurança dos clientes.',
  vision: 'Ser referência na advocacia, reconhecido pela excelência técnica, atendimento humanizado e resultados expressivos. Expandir a atuação para novas áreas e regiões, consolidando uma reputação de confiança e competência no mercado jurídico.',
  values: ['Ética inegociável', 'Transparência absoluta', 'Excelência técnica', 'Foco no cliente']
};

// Pratice Areas
const fallbackAreas: PracticeArea[] = [
  {
    id: 'p1',
    title: 'Direito Civil',
    description: 'Assessoria completa em contratos, responsabilidade civil e direitos reais.',
    icon: 'Scale'
  },
  {
    id: 'p2',
    title: 'Direito de Família',
    description: 'Resolução de conflitos familiares com foco na mediação e proteção de direitos.',
    icon: 'Heart'
  },
  {
    id: 'p3',
    title: 'Direito do Trabalho',
    description: 'Defesa técnica para garantir o cumprimento da legislação trabalhista.',
    icon: 'Briefcase'
  },
  {
    id: 'p4',
    title: 'Direito Empresarial',
    description: 'Consultoria estratégica para empresas de pequeno a grande porte.',
    icon: 'Building2'
  }
];

// FAQ
const fallbackFaqs: FAQ[] = [
  {
    id: 'q1',
    question: 'Quais documentos preciso para uma consulta inicial?',
    answer: 'Geralmente, RG, CPF, comprovante de residência e todos os documentos relacionados ao seu caso (contratos, fotos, mensagens ou notificações).'
  },
  {
    id: 'q2',
    question: 'Quanto tempo demora um processo judicial?',
    answer: 'O tempo varia conforme a complexidade da causa e a agilidade do Judiciário. Durante a consultoria, analisamos as perspectivas específicas do seu caso.'
  },
  {
    id: 'q3',
    question: 'Vocês atendem apenas presencialmente?',
    answer: 'Não! Atendemos clientes em todo o país de forma digital, realizando reuniões por vídeo e peticionamento eletrônico com total segurança.'
  }
];

// --- INTERFACES ---
export interface AboutOffice { id: string; title: string; description: string; mission: string; vision: string; values: string[]; imageUrl?: string; imageFile?: File }
export interface TeamMember { id: string; name: string; role: string; bio: string; imageUrl: string; specialties: string[]; imageFile?: File }
export interface PracticeArea { id: string; title: string; description: string; icon: string; }
export interface FAQ { id: string; question: string; answer: string; }
export interface Banner { id: string; imageUrl: string; title?: string; description?: string; active: boolean; imageFile?: File }
export interface Stat { id: string; label: string; value: string; }
export interface StatsSetup { id?: string; backgroundImageUrl: string; imageFile?: File; }
export interface Testimonial { id: string; name: string; role: string; content: string; avatar: string; imageFile?: File }
export interface ContactMessage { id: string; name: string; email: string; phone?: string; subject?: string; message: string; createdAt?: string; }

interface DataContextType {
  name: string;
  updateName: (name: string) => void;

  about: AboutOffice;
  updateAbout: (data: Partial<AboutOffice>) => Promise<void>;

  team: TeamMember[];
  addTeamMember: (member: Omit<TeamMember, 'id'>) => Promise<void>;
  updateTeamMember: (id: string, data: Partial<TeamMember>) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;

  practiceAreas: PracticeArea[];
  addPracticeArea: (area: Omit<PracticeArea, 'id'>) => Promise<void>;
  updatePracticeArea: (id: string, data: Partial<PracticeArea>) => Promise<void>;
  deletePracticeArea: (id: string) => Promise<void>;

  faqs: FAQ[];
  addFAQ: (faq: Omit<FAQ, 'id'>) => Promise<void>;
  updateFAQ: (id: string, data: Partial<FAQ>) => Promise<void>;
  deleteFAQ: (id: string) => Promise<void>;

  banners: Banner[];
  addBanner: (banner: Omit<Banner, 'id'>) => Promise<void>;
  updateBanner: (id: string, data: Partial<Banner>) => Promise<void>;
  deleteBanner: (id: string) => Promise<void>;

  stats: Stat[];
  addStat: (stat: Omit<Stat, 'id'>) => Promise<void>;
  updateStat: (id: string, data: Partial<Stat>) => Promise<void>;
  deleteStat: (id: string) => Promise<void>;

  statsSetup: StatsSetup;
  updateStatsSetup: (data: Partial<StatsSetup>) => Promise<void>;

  // Novos: Testimonials
  testimonials: Testimonial[];
  addTestimonial: (data: Omit<Testimonial, 'id'>) => Promise<void>;
  updateTestimonial: (id: string, data: Partial<Testimonial>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;

  // Novos: Contact (Inbox do Admin + Envio Público)
  contactMessages: ContactMessage[]; // Lista para o Admin
  sendContactMessage: (data: Omit<ContactMessage, 'id'>) => Promise<void>; // Função Pública
  deleteContactMessage: (id: string) => Promise<void>; // Função Admin
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Função auxiliar para criar FormData
const createFormData = (data: any, fileField: string = 'image') => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    // Se for o arquivo, e ele existir, anexa
    if (key === 'imageFile' && data[key]) {
      formData.append(fileField, data[key]);
    }
    // Ignora campos undefined/null ou o imageFile que já tratamos
    else if (key !== 'imageFile' && data[key] !== undefined && data[key] !== null) {
      // Se for array, envia como string JSON para evitar que o FormData mude para "item1,item2"
      const value = Array.isArray(data[key]) ? JSON.stringify(data[key]) : data[key];
      formData.append(key, value);
    }
  });
  return formData;
};

export function DataProvider({ children }: { children: ReactNode }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token, logout } = useAuth();

  const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
    const headers = {
      ...options.headers,
      'Authorization': token ? `Bearer ${token}` : '',
    };

    const res = await fetch(url, { ...options, headers });

    if (res.status === 401) {
      logout();
    }

    return res;
  };

  const [name, setName] = useState('DT Advocacia e Consultoria Jurídica');

  // STATES
  const [about, setAbout] = useState<AboutOffice>(defaultAbout);
  const [team, setTeam] = useState<TeamMember[]>(fallbackTeam);
  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>(fallbackAreas);
  const [faqs, setFaqs] = useState<FAQ[]>(fallbackFaqs);
  const [banners, setBanners] = useState<Banner[]>(fallbackBannersList);
  const [stats, setStats] = useState<Stat[]>(fallbackStats);
  const [statsSetup, setStatsSetup] = useState<StatsSetup>({
    backgroundImageUrl: statsBackground
  });
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

  // --- FETCHERS ---
  const fetchAbout = async () => {
    try {
      const res = await authenticatedFetch(`${apiUrl}/about`);
      if (res.ok) {
        const data = await res.json();
        const baseUrl = apiUrl?.replace(/\/api$/, '') || '';
        const imgPath = data.imageUrl || data.image_url;
        const finalImg = imgPath && imgPath.startsWith('/') ? `${baseUrl}${imgPath}` : (imgPath || diegoAbout);

        setAbout({
          ...defaultAbout,
          ...data,
          imageUrl: finalImg
        });
      }
    } catch (e) {
      console.warn("Backend offline: Mantendo informações institucionais padrão.");
      // Não faz nada, o state já tem o defaultAbout
    }
  };
  const fetchTeam = async () => {
    try {
      const res = await authenticatedFetch(`${apiUrl}/team`);
      if (res.ok) {
        const data = await res.json();

        if (Array.isArray(data)) {
          const baseUrl = apiUrl?.replace(/\/api$/, '') || '';

          setTeam(data.map((item: any) => {
            let fallbackImg = '';
            const lowName = item.name.toLowerCase();
            if (lowName.includes('diego')) fallbackImg = diegoTeam;
            else if (lowName.includes('jonatas')) fallbackImg = jonatasTeam;
            else if (lowName.includes('heloisa')) fallbackImg = heloisaTeam;

            const imgPath = item.imageUrl || item.image_url || fallbackImg || diegoTeam;

            return {
              ...item,
              imageUrl: imgPath.startsWith('/') ? `${baseUrl}${imgPath}` : imgPath
            };
          }));
        }
      }
    } catch (e) {
      console.warn("Backend offline: Mantendo equipe de fallback.");
    }
  };
  const fetchAreas = async () => {
    try {
      const res = await authenticatedFetch(`${apiUrl}/practice-areas`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setPracticeAreas(data);
        }
      }
    } catch (e) {
      console.warn("Backend offline: Mantendo áreas de atuação padrão.");
    }
  };
  const fetchFaqs = async () => {
    try {
      const res = await authenticatedFetch(`${apiUrl}/faqs`);
      if (res.ok) {
        const data = await res.json();
        // Se o banco tiver perguntas cadastradas, a gente atualiza
        if (Array.isArray(data)) {
          setFaqs(data);
        }
      }
    } catch (e) {
      console.warn("Backend offline: Mantendo FAQ de fallback.");
      // O estado permanece com o fallbackFaqs definido no useState
    }
  };
  const fetchBanners = async () => {
    try {
      const res = await authenticatedFetch(`${apiUrl}/banners`);
      if (res.ok) {
        const data = await res.json();
        // Se o backend retornou um array (mesmo que vazio), usamos ele.
        // Isso evita que o admin veja dados de fallback ("f1", etc) e tente editar.
        if (Array.isArray(data)) {
          // Ajusta URLs de imagem para incluir o domínio do backend
          const baseUrl = apiUrl?.replace(/\/api$/, '') || '';

          setBanners(data.map((item: any) => ({
            ...item,
            imageUrl: item.imageUrl && item.imageUrl.startsWith('/')
              ? `${baseUrl}${item.imageUrl}`
              : item.imageUrl
          })));
        }
      }
    } catch (e) {
      console.error("Erro ao buscar banners, mantendo fallbacks:", e);
    }
  };
  const fetchStats = async () => {
    try {
      const res = await authenticatedFetch(`${apiUrl}/stats`);
      if (res.ok) {
        const data = await res.json();
        // Se a API retornar um array com conteúdo, a gente usa
        if (Array.isArray(data)) {
          setStats(data);
        }
      }
    } catch (e) {
      console.warn("Backend de Stats offline, mantendo números padrão.");
    }
  };
  const fetchStatsSetup = async () => {
    try {
      const res = await authenticatedFetch(`${apiUrl}/stats-setup`);
      if (res.ok) {
        const data = await res.json();
        const baseUrl = apiUrl?.replace(/\/api$/, '') || '';
        const imgPath = data.backgroundImageUrl || data.background_image_url || statsBackground;

        setStatsSetup({
          ...data,
          backgroundImageUrl: imgPath.startsWith('/') ? `${baseUrl}${imgPath}` : imgPath
        });
      }
    } catch (e) {
      // Se der erro de conexão (offline), o estado continua sendo o statsBackground inicial
      console.warn("Servidor offline: usando imagem de fundo padrão para Stats.");
    }
  };
  const fetchTestimonials = async () => {
    try {
      const res = await authenticatedFetch(`${apiUrl}/testimonials`);
      if (res.ok) {
        const data = await res.json();

        if (Array.isArray(data)) {
          const baseUrl = apiUrl?.replace(/\/api$/, '') || '';

          setTestimonials(data.map((item: any) => {
            let fallbackImg = '';
            const lowName = item.name.toLowerCase();
            // Lógica de fallback de imagem baseada no nome (se você tiver fotos padrão)
            if (lowName.includes('diego')) fallbackImg = diegoTestimonial;
            else if (lowName.includes('jonatas')) fallbackImg = jonatasTestimonial;
            else if (lowName.includes('heloisa')) fallbackImg = heloisaTestimonial;

            const imgPath = item.avatar || item.image_url || fallbackImg || item.name.substring(0, 2).toUpperCase();

            return {
              ...item,
              avatar: imgPath.startsWith('/') ? `${baseUrl}${imgPath}` : imgPath
            };
          }));
        }
      }
    } catch (e) {
      console.warn("Backend offline: Mantendo depoimentos de fallback.");
    }
  };
  const fetchContacts = async () => {
    try {
      const res = await authenticatedFetch(`${apiUrl}/contacts`);
      if (res.ok) setContactMessages(await res.json());
    } catch (e) { console.error(e); }
  };

  // Carrega tudo ao iniciar
  useEffect(() => {
    fetchAbout();
    fetchTeam();
    fetchAreas();
    fetchFaqs();
    fetchBanners();
    fetchStats();
    fetchStatsSetup();
    fetchTestimonials();
    fetchContacts();
  }, []);

  // --- ACTIONS ---

  const updateName = (newName: string) => { setName(newName); };

  // ABOUT
  const updateAbout = async (data: Partial<AboutOffice>) => {
    const res = await authenticatedFetch(`${apiUrl}/about`, {
      method: 'PUT',
      body: createFormData(data, 'image')
    });

    if (res.ok) {
      fetchAbout();
    } else {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Erro ao atualizar informações do escritório');
    }
  };

  // TEAM
  const addTeamMember = async (member: Omit<TeamMember, 'id'>) => {
    await authenticatedFetch(`${apiUrl}/team`, {
      method: 'POST',
      body: createFormData(member, 'image')
    });
    fetchTeam();
  };
  const updateTeamMember = async (id: string, data: Partial<TeamMember>) => {
    await authenticatedFetch(`${apiUrl}/team/${id}`, {
      method: 'PUT',
      body: createFormData(data, 'image')
    });
    fetchTeam();
  };
  const deleteTeamMember = async (id: string) => { await authenticatedFetch(`${apiUrl}/team/${id}`, { method: 'DELETE' }); fetchTeam(); };

  // AREAS
  const addPracticeArea = async (area: Omit<PracticeArea, 'id'>) => {
    await authenticatedFetch(`${apiUrl}/practice-areas`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(area) });
    fetchAreas();
  };
  const updatePracticeArea = async (id: string, data: Partial<PracticeArea>) => {
    await authenticatedFetch(`${apiUrl}/practice-areas/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    fetchAreas();
  };
  const deletePracticeArea = async (id: string) => { await authenticatedFetch(`${apiUrl}/practice-areas/${id}`, { method: 'DELETE' }); fetchAreas(); };

  // FAQS
  const addFAQ = async (faq: Omit<FAQ, 'id'>) => {
    await authenticatedFetch(`${apiUrl}/faqs`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(faq) });
    fetchFaqs();
  };
  const updateFAQ = async (id: string, data: Partial<FAQ>) => {
    await authenticatedFetch(`${apiUrl}/faqs/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    fetchFaqs();
  };
  const deleteFAQ = async (id: string) => { await authenticatedFetch(`${apiUrl}/faqs/${id}`, { method: 'DELETE' }); fetchFaqs(); };

  // BANNERS
  const addBanner = async (banner: Partial<Banner> & { imageFile?: File }) => {
    await authenticatedFetch(`${apiUrl}/banners`, {
      method: 'POST',
      body: createFormData(banner, 'image')
    });
    fetchBanners();
  };
  const updateBanner = async (id: string, data: Partial<Banner> & { imageFile?: File }) => {
    await authenticatedFetch(`${apiUrl}/banners/${id}`, {
      method: 'PUT',
      body: createFormData(data, 'image')
    });
    fetchBanners();
  };
  const deleteBanner = async (id: string) => { await authenticatedFetch(`${apiUrl}/banners/${id}`, { method: 'DELETE' }); fetchBanners(); };

  // STATS
  const addStat = async (stat: Omit<Stat, 'id'>) => {
    await authenticatedFetch(`${apiUrl}/stats`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(stat) });
    fetchStats();
  };
  const updateStat = async (id: string, data: Partial<Stat>) => {
    await authenticatedFetch(`${apiUrl}/stats/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    fetchStats();
  };
  const deleteStat = async (id: string) => { await authenticatedFetch(`${apiUrl}/stats/${id}`, { method: 'DELETE' }); fetchStats(); };

  // STATS SETUP
  const updateStatsSetup = async (data: Partial<StatsSetup> & { imageFile?: File }) => {
    await authenticatedFetch(`${apiUrl}/stats-setup`, {
      method: 'PUT',
      body: createFormData(data, 'backgroundImage')
    });
    fetchStatsSetup();
  };

  // TESTIMONIALS
  const addTestimonial = async (data: Partial<Testimonial> & { imageFile?: File }) => {
    await authenticatedFetch(`${apiUrl}/testimonials`, {
      method: 'POST',
      body: createFormData(data, 'avatar')
    });
    fetchTestimonials();
  };
  const updateTestimonial = async (id: string, data: Partial<Testimonial> & { imageFile?: File }) => {
    await authenticatedFetch(`${apiUrl}/testimonials/${id}`, {
      method: 'PUT',
      body: createFormData(data, 'avatar')
    });
    fetchTestimonials();
  };
  const deleteTestimonial = async (id: string) => { await authenticatedFetch(`${apiUrl}/testimonials/${id}`, { method: 'DELETE' }); fetchTestimonials(); };

  // CONTACT
  const sendContactMessage = async (data: Omit<ContactMessage, 'id'>) => {
    const res = await authenticatedFetch(`${apiUrl}/contacts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!res.ok) throw new Error('Erro ao enviar mensagem');
  };
  const deleteContactMessage = async (id: string) => {
    await authenticatedFetch(`${apiUrl}/contacts/${id}`, { method: 'DELETE' });
    fetchContacts();
  };

  return (
    <DataContext.Provider value={{
      name, updateName,
      about, updateAbout,
      team, addTeamMember, updateTeamMember, deleteTeamMember,
      practiceAreas, addPracticeArea, updatePracticeArea, deletePracticeArea,
      faqs, addFAQ, updateFAQ, deleteFAQ,
      banners, addBanner, updateBanner, deleteBanner,
      stats, addStat, updateStat, deleteStat,
      statsSetup, updateStatsSetup,
      testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
      contactMessages, sendContactMessage, deleteContactMessage
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) throw new Error('useData must be used within a DataProvider');
  return context;
}