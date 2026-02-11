import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/app/context/AuthContext';
import { useData, TeamMember, PracticeArea, FAQ, Banner, Testimonial, Stat } from '@/app/context/DataContext';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Users,
  Briefcase,
  HelpCircle,
  FileText,
  Image as ImageIcon,
  Check,
  Slash,
  MessageSquareQuote,
  BarChart3,
  Mail,
  Gavel,
  Shield,
  Home,
  Heart,
  Handshake,
  Building2,
  Globe,
  LifeBuoy,
  Lock,
  Stethoscope,
  Car,
  Landmark,
  Scale
} from 'lucide-react';

const availableIcons = [
  { name: 'Scale', Icon: Scale },
  { name: 'Gavel', Icon: Gavel },
  { name: 'FileText', Icon: FileText },
  { name: 'Briefcase', Icon: Briefcase },
  { name: 'Shield', Icon: Shield },
  { name: 'Users', Icon: Users },
  { name: 'Home', Icon: Home },
  { name: 'Heart', Icon: Heart },
  { name: 'Handshake', Icon: Handshake },
  { name: 'Building2', Icon: Building2 },
  { name: 'Globe', Icon: Globe },
  { name: 'LifeBuoy', Icon: LifeBuoy },
  { name: 'Lock', Icon: Lock },
  { name: 'Stethoscope', Icon: Stethoscope },
  { name: 'Car', Icon: Car },
  { name: 'Landmark', Icon: Landmark }
];

type EditMode = 'about' | 'team' | 'areas' | 'faq' | 'banners' | 'testimonials' | 'stats' | 'messages' | null;

export function AdminDashboard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Extraindo TUDO do contexto
  const {
    // About
    name, updateName, about, updateAbout,
    // Team
    team, addTeamMember, updateTeamMember, deleteTeamMember,
    // Areas
    practiceAreas, addPracticeArea, updatePracticeArea, deletePracticeArea,
    // FAQ
    faqs, addFAQ, updateFAQ, deleteFAQ,
    // Banners
    banners, addBanner, updateBanner, deleteBanner,
    // Testimonials
    testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
    // Stats
    stats, addStat, updateStat, deleteStat,
    statsSetup, updateStatsSetup,
    // Contacts
    contactMessages, deleteContactMessage, fetchContacts
  } = useData();

  // --- STATES DE CONTROLE DE UI ---
  const [activeTab, setActiveTab] = useState<EditMode>('about');

  // Refresh messages when tab opens
  useEffect(() => {
    if (activeTab === 'messages') {
      fetchContacts();
    }
  }, [activeTab]);

  // Forms - About
  const [editingName, setEditingName] = useState(name);
  const [editingAbout, setEditingAbout] = useState(about);
  const [valuesInput, setValuesInput] = useState('');

  // Forms - Modais
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Partial<TeamMember>>({});

  const [showAreaModal, setShowAreaModal] = useState(false);
  const [editingArea, setEditingArea] = useState<Partial<PracticeArea>>({});

  const [showFaqModal, setShowFaqModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Partial<FAQ>>({});

  const [showBannerModal, setShowBannerModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Partial<Banner>>({});

  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial>>({});

  const [showStatModal, setShowStatModal] = useState(false);
  const [editingStat, setEditingStat] = useState<Partial<Stat>>({});

  // Auth Check
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Sync Name
  useEffect(() => {
    setEditingName(name);
  }, [name]);

  // Sync About Data
  useEffect(() => {
    setEditingAbout(about);
    setValuesInput(Array.isArray(about.values) ? about.values.join(', ') : (typeof about.values === 'string' ? about.values : ''));
  }, [about]);

  // --- HANDLERS (Funções de Salvar) ---

  const handleSaveAbout = async () => {
    try {
      updateName(editingName);
      // Sincroniza o input de valores com o objeto que será enviado
      const updatedValues = valuesInput.split(',').map(v => v.trim()).filter(v => v !== '');
      await updateAbout({ ...editingAbout, values: updatedValues });
      alert('Informações salvas com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar as informações.');
    }
  };

  const handleSaveTeam = () => {
    if (editingTeam.id) {
      updateTeamMember(editingTeam.id, editingTeam);
    } else {
      addTeamMember(editingTeam as Omit<TeamMember, 'id'>);
    }
    setShowTeamModal(false);
    setEditingTeam({});
  };

  const handleSaveArea = () => {
    if (editingArea.id) {
      updatePracticeArea(editingArea.id, editingArea);
    } else {
      addPracticeArea(editingArea as Omit<PracticeArea, 'id'>);
    }
    setShowAreaModal(false);
    setEditingArea({});
  };

  const handleSaveFaq = () => {
    if (editingFaq.id) {
      updateFAQ(editingFaq.id, editingFaq);
    } else {
      addFAQ(editingFaq as Omit<FAQ, 'id'>);
    }
    setShowFaqModal(false);
    setEditingFaq({});
  };

  const handleSaveBanner = () => {
    if (editingBanner.id) {
      updateBanner(editingBanner.id, editingBanner);
    } else {
      addBanner({
        imageUrl: editingBanner.imageUrl || '',
        title: editingBanner.title || '',
        description: editingBanner.description || '',
        active: editingBanner.active ?? true
      });
    }
    setShowBannerModal(false);
    setEditingBanner({});
  };

  const handleSaveTestimonial = () => {
    if (editingTestimonial.id) {
      updateTestimonial(editingTestimonial.id, editingTestimonial);
    } else {
      addTestimonial(editingTestimonial as any);
    }
    setShowTestimonialModal(false);
    setEditingTestimonial({});
  };

  const handleSaveStat = () => {
    if (editingStat.id) {
      updateStat(editingStat.id, editingStat);
    } else {
      addStat(editingStat as Omit<Stat, 'id'>);
    }
    setShowStatModal(false);
    setEditingStat({});
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Painel Administrativo</h1>

        {/* --- NAVEGAÇÃO ENTRE ABAS --- */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'about', label: 'Sobre', icon: FileText },
            { id: 'team', label: 'Equipe', icon: Users },
            { id: 'areas', label: 'Áreas', icon: Briefcase },
            { id: 'faq', label: 'FAQ', icon: HelpCircle },
            { id: 'banners', label: 'Banners', icon: ImageIcon },
            { id: 'testimonials', label: 'Depoimentos', icon: MessageSquareQuote },
            { id: 'stats', label: 'Estatísticas', icon: BarChart3 },
            { id: 'messages', label: 'Mensagens', icon: Mail },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as EditMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap 
                ${activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground hover:bg-muted'}`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================= CONTEÚDO DAS ABAS ================= */}

        {/* 1. ABOUT TAB */}
        {activeTab === 'about' && (
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6">Informações do Escritório</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nome do Escritório</label>
                <input type="text" value={editingName} onChange={(e) => setEditingName(e.target.value)} className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Título</label>
                <input type="text" value={editingAbout.title} onChange={(e) => setEditingAbout({ ...editingAbout, title: e.target.value })} className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Descrição</label>
                <textarea value={editingAbout.description} onChange={(e) => setEditingAbout({ ...editingAbout, description: e.target.value })} rows={3} className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Missão</label>
                <textarea value={editingAbout.mission} onChange={(e) => setEditingAbout({ ...editingAbout, mission: e.target.value })} rows={2} className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Visão</label>
                <textarea value={editingAbout.vision} onChange={(e) => setEditingAbout({ ...editingAbout, vision: e.target.value })} rows={2} className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Valores (separados por vírgula)</label>
                <input
                  type="text"
                  value={valuesInput}
                  onChange={(e) => setValuesInput(e.target.value)}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Foto Principal (Advogado)</label>
                <div className="mb-2 h-32 w-full bg-muted rounded-lg overflow-hidden relative border border-dashed border-border flex items-center justify-center">
                  {editingAbout.imageUrl && !editingAbout.imageFile ? (
                    <img src={editingAbout.imageUrl.startsWith('http') ? editingAbout.imageUrl : `${import.meta.env.VITE_API_URL}${editingAbout.imageUrl}`} className="w-full h-full object-contain" />
                  ) : editingAbout.imageFile ? (
                    <img src={URL.createObjectURL(editingAbout.imageFile)} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-muted-foreground text-sm">Nenhuma foto selecionada</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setEditingAbout({ ...editingAbout, imageFile: e.target.files[0] });
                    }
                  }}
                  className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>
              <button onClick={handleSaveAbout} className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                <Save className="h-4 w-4" /> Salvar Alterações
              </button>
            </div>
          </div>
        )}

        {/* 2. TEAM TAB */}
        {activeTab === 'team' && (
          <div className="space-y-4">
            <button onClick={() => { setEditingTeam({}); setShowTeamModal(true); }} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              <Plus className="h-4 w-4" /> Adicionar Membro
            </button>
            <div className="grid gap-4">
              {team.map((member) => (
                <div key={member.id} className="bg-card border border-border rounded-lg p-4 shadow-sm flex justify-between items-start gap-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden flex-shrink-0 border border-border">
                      {member.imageUrl ? (
                        <img src={member.imageUrl.startsWith('http') ? member.imageUrl : `${import.meta.env.VITE_API_URL}${member.imageUrl}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground"><Users className="h-6 w-6" /></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                      <p className="text-primary">{member.role}</p>
                      <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{member.bio}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => { setEditingTeam(member); setShowTeamModal(true); }} className="p-2 text-primary hover:bg-muted rounded-lg transition-colors"><Edit2 className="h-4 w-4" /></button>
                    <button onClick={() => { if (confirm('Excluir?')) deleteTeamMember(member.id); }} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. AREAS TAB */}
        {activeTab === 'areas' && (
          <div className="space-y-4">
            <button onClick={() => { setEditingArea({}); setShowAreaModal(true); }} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              <Plus className="h-4 w-4" /> Adicionar Área
            </button>
            <div className="grid md:grid-cols-2 gap-4">
              {practiceAreas.map((area) => (
                <div key={area.id} className="bg-card border border-border rounded-lg p-4 shadow-sm flex justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{area.title}</h3>
                    <p className="text-xs text-muted-foreground mt-2 font-mono">Ícone: {area.icon}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => { setEditingArea(area); setShowAreaModal(true); }} className="p-2 text-primary hover:bg-muted rounded-lg transition-colors"><Edit2 className="h-4 w-4" /></button>
                    <button onClick={() => { if (confirm('Excluir?')) deletePracticeArea(area.id); }} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. FAQ TAB */}
        {activeTab === 'faq' && (
          <div className="space-y-4">
            <button onClick={() => { setEditingFaq({}); setShowFaqModal(true); }} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              <Plus className="h-4 w-4" /> Adicionar Pergunta
            </button>
            <div className="grid gap-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-card border border-border rounded-lg p-4 shadow-sm flex justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{faq.question}</h3>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{faq.answer}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => { setEditingFaq(faq); setShowFaqModal(true); }} className="p-2 text-primary hover:bg-muted rounded-lg transition-colors"><Edit2 className="h-4 w-4" /></button>
                    <button onClick={() => { if (confirm('Excluir?')) deleteFAQ(faq.id); }} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. BANNERS TAB */}
        {activeTab === 'banners' && (
          <div className="space-y-4">
            <button onClick={() => { setEditingBanner({ active: true }); setShowBannerModal(true); }} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              <Plus className="h-4 w-4" /> Adicionar Banner
            </button>
            <div className="grid md:grid-cols-2 gap-6">
              {banners.map((banner) => (
                <div key={banner.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm group flex flex-col">
                  <div className="h-48 w-full relative bg-muted">
                    <img src={banner.imageUrl.startsWith('http') ? banner.imageUrl : `${import.meta.env.VITE_API_URL}${banner.imageUrl}`} alt={banner.title} className={`w-full h-full object-cover transition-opacity duration-300 ${!banner.active ? 'opacity-50 grayscale' : ''}`} />
                    {!banner.active && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2"><Slash className="h-4 w-4" /> INATIVO</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-foreground">{banner.title || 'Sem título'}</h3>
                      <p className="text-xs text-muted-foreground">{banner.description || 'Sem descrição'}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => updateBanner(banner.id, { active: !banner.active })} className="p-2 hover:bg-muted rounded-lg transition-colors"><Check className={`h-4 w-4 ${banner.active ? 'text-green-500' : 'text-muted-foreground opacity-30'}`} /></button>
                      <button onClick={() => { setEditingBanner(banner); setShowBannerModal(true); }} className="p-2 text-primary hover:bg-muted rounded-lg transition-colors"><Edit2 className="h-4 w-4" /></button>
                      <button onClick={() => { if (confirm('Excluir?')) deleteBanner(banner.id); }} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. TESTIMONIALS TAB (Novo) */}
        {activeTab === 'testimonials' && (
          <div className="space-y-4">
            <button onClick={() => { setEditingTestimonial({}); setShowTestimonialModal(true); }} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              <Plus className="h-4 w-4" /> Adicionar Depoimento
            </button>
            <div className="grid md:grid-cols-2 gap-4">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-card border border-border p-6 rounded-lg shadow-sm flex flex-col justify-between">
                  <div>
                    <p className="italic text-muted-foreground mb-4">"{t.content}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden border border-primary/20">
                        {t.avatar?.includes('/')
                          ? <img src={t.avatar.startsWith('http') ? t.avatar : `${import.meta.env.VITE_API_URL}${t.avatar}`} className="w-full h-full object-cover" />
                          : t.avatar || t.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{t.name}</h4>
                        <p className="text-xs text-primary">{t.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4 border-t border-border/50 pt-2">
                    <button onClick={() => { setEditingTestimonial(t); setShowTestimonialModal(true); }} className="p-2 text-primary hover:bg-muted rounded-lg transition-colors"><Edit2 className="h-4 w-4" /></button>
                    <button onClick={() => { if (confirm('Excluir?')) deleteTestimonial(t.id); }} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. STATS TAB (Novo) */}
        {activeTab === 'stats' && (
          <div className="space-y-8">
            {/* Configuração do Fundo */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-foreground">Imagem de Fundo da Seção</h3>

              {/* Preview da Imagem Atual ou Selecionada */}
              <div className="mb-4 h-48 w-full bg-muted rounded-lg overflow-hidden relative border border-dashed border-border flex items-center justify-center">
                {statsSetup.backgroundImageUrl ? (
                  <img
                    src={statsSetup.backgroundImageUrl.startsWith('http') ? statsSetup.backgroundImageUrl : `${import.meta.env.VITE_API_URL}${statsSetup.backgroundImageUrl}`}
                    className="w-full h-full object-cover"
                    alt="Background Preview"
                  />
                ) : (
                  <span className="text-muted-foreground text-sm">Nenhuma imagem de fundo</span>
                )}
              </div>

              {/* Input de Upload */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    updateStatsSetup({ imageFile: e.target.files[0] });
                  }
                }}
                className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />

              <p className="text-xs text-muted-foreground mt-2">Dica: A imagem será exibida com um filtro escuro automaticamente.</p>
            </div>

            {/* Lista de Números */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-foreground">Números Exibidos</h3>
                <button onClick={() => { setEditingStat({}); setShowStatModal(true); }} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm flex gap-2 items-center hover:bg-primary/90 transition-colors">
                  <Plus className="h-4 w-4" /> Adicionar
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {stats.map((s) => (
                  <div key={s.id} className="bg-card border border-border p-6 rounded-lg text-center relative group hover:border-primary/50 transition-colors shadow-sm">
                    <h4 className="text-3xl font-bold text-primary mb-1">{s.value}</h4>
                    <p className="text-muted-foreground">{s.label}</p>
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => { setEditingStat(s); setShowStatModal(true); }} className="p-2 hover:bg-muted rounded-lg text-primary"><Edit2 className="h-4 w-4" /></button>
                      <button onClick={() => { if (confirm('Excluir?')) deleteStat(s.id); }} className="p-2 hover:bg-destructive/10 rounded-lg text-destructive"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 8. MESSAGES TAB (Novo Inbox) */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">Caixa de Entrada</h2>
            {contactMessages.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground bg-card border border-border rounded-lg">
                <Mail className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Nenhuma mensagem recebida ainda.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {contactMessages.map((msg) => (
                  <div key={msg.id} className="bg-card border border-border p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{msg.name}</h3>
                        <p className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded inline-block mt-1">{msg.subject}</p>
                      </div>
                      <button onClick={() => { if (confirm('Excluir mensagem?')) deleteContactMessage(msg.id); }} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 border-b border-border/50 pb-4">
                      <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {msg.email}</span>
                      {msg.phone && <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {msg.phone}</span>}
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg text-foreground whitespace-pre-wrap border border-border/50 text-sm leading-relaxed">
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* ================= MODAIS ================= */}

      {/* Team Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">{editingTeam.id ? 'Editar Membro' : 'Novo Membro'}</h2>
              <button onClick={() => setShowTeamModal(false)} className="p-2 hover:bg-muted rounded-lg"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nome</label>
                <input type="text" value={editingTeam.name || ''} onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })} className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Cargo</label>
                <input type="text" value={editingTeam.role || ''} onChange={(e) => setEditingTeam({ ...editingTeam, role: e.target.value })} className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Bio</label>
                <textarea value={editingTeam.bio || ''} onChange={(e) => setEditingTeam({ ...editingTeam, bio: e.target.value })} className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Foto do Membro</label>
                <div className="mb-2 h-32 w-full bg-muted rounded-lg overflow-hidden relative border border-dashed border-border flex items-center justify-center">
                  {editingTeam.imageUrl && !editingTeam.imageFile ? (
                    <img src={editingTeam.imageUrl.startsWith('http') ? editingTeam.imageUrl : `${import.meta.env.VITE_API_URL}${editingTeam.imageUrl}`} className="w-full h-full object-cover" />
                  ) : editingTeam.imageFile ? (
                    <img src={URL.createObjectURL(editingTeam.imageFile)} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-muted-foreground text-sm">Sem foto</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setEditingTeam({ ...editingTeam, imageFile: e.target.files[0] });
                    }
                  }}
                  className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Especialidades (separadas por vírgula)</label>
                <input type="text" value={Array.isArray(editingTeam.specialties) ? editingTeam.specialties.join(', ') : (typeof editingTeam.specialties === 'string' ? editingTeam.specialties : '')} onChange={(e) => setEditingTeam({ ...editingTeam, specialties: e.target.value.split(',').map(s => s.trim()) })} className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
              </div>
              <button onClick={handleSaveTeam} className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">Salvar</button>
            </div>
          </div>
        </div>
      )}

      {/* Area Modal */}
      {showAreaModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">{editingArea.id ? 'Editar Área' : 'Nova Área'}</h2>
              <button onClick={() => setShowAreaModal(false)} className="p-2 hover:bg-muted rounded-lg"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Título</label>
                <input type="text" value={editingArea.title || ''} onChange={(e) => setEditingArea({ ...editingArea, title: e.target.value })} className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Descrição</label>
                <textarea value={editingArea.description || ''} onChange={(e) => setEditingArea({ ...editingArea, description: e.target.value })} className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Selecione um Ícone</label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 p-3 bg-input-background border border-border rounded-lg max-h-48 overflow-y-auto">
                  {availableIcons.map(({ name: iconName, Icon }) => (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => setEditingArea({ ...editingArea, icon: iconName })}
                      className={`p-2 rounded-lg border flex items-center justify-center transition-all hover:bg-primary/10 
                        ${editingArea.icon === iconName
                          ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary/20'
                          : 'border-transparent text-muted-foreground'}`}
                      title={iconName}
                    >
                      <Icon className="h-5 w-5" />
                    </button>
                  ))}
                </div>
                {editingArea.icon && (
                  <p className="text-xs text-primary mt-2 font-medium">Ícone selecionado: {editingArea.icon}</p>
                )}
              </div>
              <button onClick={handleSaveArea} className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">Salvar</button>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {showFaqModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">{editingFaq.id ? 'Editar Pergunta' : 'Nova Pergunta'}</h2>
              <button onClick={() => setShowFaqModal(false)} className="p-2 hover:bg-muted rounded-lg"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Pergunta</label>
                <input type="text" value={editingFaq.question || ''} onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })} className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Resposta</label>
                <textarea value={editingFaq.answer || ''} onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })} className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none" rows={4} />
              </div>
              <button onClick={handleSaveFaq} className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">Salvar</button>
            </div>
          </div>
        </div>
      )}

      {/* Banner Modal */}
      {showBannerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">{editingBanner.id ? 'Editar Banner' : 'Novo Banner'}</h2>
              <button onClick={() => setShowBannerModal(false)} className="p-2 hover:bg-muted rounded-lg"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Título (Opcional)</label>
                <input type="text" value={editingBanner.title || ''} onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })} className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Descrição (Opcional)</label>
                <textarea value={editingBanner.description || ''} onChange={(e) => setEditingBanner({ ...editingBanner, description: e.target.value })} className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none" rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">URL da Imagem</label>
                {/* Preview da Imagem Atual ou Selecionada */}
                <div className="mb-2 h-32 w-full bg-muted rounded-lg overflow-hidden relative border border-dashed border-border flex items-center justify-center">
                  {editingBanner.imageUrl && !editingBanner.imageFile ? (
                    <img src={`${import.meta.env.VITE_API_URL}${editingBanner.imageUrl}`} className="w-full h-full object-cover" />
                  ) : editingBanner.imageFile ? (
                    <img src={URL.createObjectURL(editingBanner.imageFile)} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-muted-foreground text-sm">Nenhuma imagem</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setEditingBanner({ ...editingBanner, imageFile: e.target.files[0] });
                    }
                  }}
                  className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>
              <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                <input type="checkbox" id="banner-active" checked={editingBanner.active ?? true} onChange={(e) => setEditingBanner({ ...editingBanner, active: e.target.checked })} className="h-5 w-5 rounded border-border text-primary focus:ring-primary accent-primary" />
                <label htmlFor="banner-active" className="text-sm font-medium text-foreground cursor-pointer">Visível no site</label>
              </div>
              <button onClick={() => {
                if (editingBanner.id) {
                  updateBanner(editingBanner.id, editingBanner);
                } else {
                  addBanner(editingBanner as any);
                }
                setShowBannerModal(false);
                setEditingBanner({});
              }} className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">Salvar</button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonial Modal (Novo) */}
      {showTestimonialModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">{editingTestimonial.id ? 'Editar Depoimento' : 'Novo Depoimento'}</h2>
              <button onClick={() => setShowTestimonialModal(false)} className="p-2 hover:bg-muted rounded-lg"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nome do Cliente</label>
                <input type="text" value={editingTestimonial.name || ''} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })} className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Cargo / Caso (ex: Empresário)</label>
                <input type="text" value={editingTestimonial.role || ''} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })} className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">O Depoimento</label>
                <textarea value={editingTestimonial.content || ''} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, content: e.target.value })} className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Foto / Avatar</label>
                {/* Preview da Imagem Atual ou Selecionada */}
                <div className="mb-2 h-24 w-24 bg-muted rounded-full overflow-hidden relative border border-dashed border-border flex items-center justify-center mx-auto">
                  {editingTestimonial.avatar && !editingTestimonial.imageFile ? (
                    <img src={editingTestimonial.avatar.startsWith('http') ? editingTestimonial.avatar : `${import.meta.env.VITE_API_URL}${editingTestimonial.avatar}`} className="w-full h-full object-cover" />
                  ) : editingTestimonial.imageFile ? (
                    <img src={URL.createObjectURL(editingTestimonial.imageFile)} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-muted-foreground text-xs text-center">Iniciais ou Foto</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setEditingTestimonial({ ...editingTestimonial, imageFile: e.target.files[0] });
                    }
                  }}
                  className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>
              <button onClick={handleSaveTestimonial} className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">Salvar Depoimento</button>
            </div>
          </div>
        </div>
      )}

      {/* Stat Modal (Novo) */}
      {showStatModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg max-w-sm w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">{editingStat.id ? 'Editar Número' : 'Novo Número'}</h2>
              <button onClick={() => setShowStatModal(false)} className="p-2 hover:bg-muted rounded-lg"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Valor (ex: +300)</label>
                <input type="text" value={editingStat.value || ''} onChange={(e) => setEditingStat({ ...editingStat, value: e.target.value })} className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Rótulo (ex: Clientes)</label>
                <input type="text" value={editingStat.label || ''} onChange={(e) => setEditingStat({ ...editingStat, label: e.target.value })} className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
              </div>
              <button onClick={handleSaveStat} className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">Salvar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}