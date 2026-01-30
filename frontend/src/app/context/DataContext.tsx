import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

//fallback images

//about
import diegoAbout from '@/assets/diego-copia.png';

//team
import diegoTeam from '@/assets/diego.png';
import jonatasTeam from '@/assets/jonatas.png';
import heloisaTeam from '@/assets/heloisa.png';

//testimonials
import diegoTestimonial from '@/assets/diego.png';
import jonatasTestimonial from '@/assets/jonatas.png';
import heloisaTestimonial from '@/assets/heloisa.png';

//banners
import banner1 from '@/assets/banner1.jpg';
import banner2 from '@/assets/banner2.jpg';
import banner3 from '@/assets/banner3.jpg';

//stats
import statsBackground from '@/assets/escritorio.png';

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

const defaultAbout: AboutOffice = { id: '0', title: '', description: '', mission: '', vision: '', values: [] };

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
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [statsSetup, setStatsSetup] = useState<StatsSetup>({ backgroundImageUrl: '' });
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

  // --- FETCHERS ---
  const fetchAbout = async () => {
    try {
      const res = await authenticatedFetch(`${apiUrl}/about`);
      if (res.ok) {
        const data = await res.json();
        setAbout({
          ...data,
          imageUrl: data.imageUrl || data.image_url || diegoAbout
        });
      }
    } catch (e) { console.error(e); }
  };
  const fetchTeam = async () => {
    try {
      const res = await authenticatedFetch(`${apiUrl}/team`);
      if (res.ok) {
        const data = await res.json();
        setTeam(data.map((item: any) => {
          let fallback = '';
          const lowName = item.name.toLowerCase();
          if (lowName.includes('diego')) fallback = diegoTeam;
          else if (lowName.includes('jonatas')) fallback = jonatasTeam;
          else if (lowName.includes('heloisa')) fallback = heloisaTeam;

          return { ...item, imageUrl: item.imageUrl || item.image_url || fallback };
        }));
      }
    } catch (e) { console.error(e); }
  };
  const fetchAreas = async () => {
    try { const res = await authenticatedFetch(`${apiUrl}/practice-areas`); if (res.ok) setPracticeAreas(await res.json()); } catch (e) { console.error(e); }
  };
  const fetchFaqs = async () => {
    try { const res = await authenticatedFetch(`${apiUrl}/faqs`); if (res.ok) setFaqs(await res.json()); } catch (e) { console.error(e); }
  };
  const fetchBanners = async () => {
    try {
      const res = await authenticatedFetch(`${apiUrl}/banners`);
      if (res.ok) {
        const data = await res.json();
        const fallbackBanners = [banner1, banner2, banner3];
        setBanners(data.map((item: any, idx: number) => ({
          ...item,
          imageUrl: item.imageUrl || item.image_url || fallbackBanners[idx % 3]
        })));
      }
    } catch (e) { console.error(e); }
  };
  const fetchStats = async () => {
    try { const res = await authenticatedFetch(`${apiUrl}/stats`); if (res.ok) setStats(await res.json()); } catch (e) { console.error(e); }
  };
  const fetchStatsSetup = async () => {
    try {
      const res = await authenticatedFetch(`${apiUrl}/stats-setup`);
      if (res.ok) {
        const data = await res.json();
        setStatsSetup({
          ...data,
          backgroundImageUrl: data.backgroundImageUrl || data.background_image_url || statsBackground
        });
      }
    } catch (e) { console.error(e); }
  };
  const fetchTestimonials = async () => {
    try {
      const res = await authenticatedFetch(`${apiUrl}/testimonials`);
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data.map((item: any) => {
          let fallback = '';
          const lowName = item.name.toLowerCase();
          if (lowName.includes('diego')) fallback = diegoTestimonial;
          else if (lowName.includes('jonatas')) fallback = jonatasTestimonial;
          else if (lowName.includes('heloisa')) fallback = heloisaTestimonial;

          return { ...item, avatar: item.avatar || item.image_url || fallback };
        }));
      }
    } catch (e) { console.error(e); }
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