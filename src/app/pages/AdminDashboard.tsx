import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/app/context/AuthContext';
import { useData, TeamMember, PracticeArea, FAQ } from '@/app/context/DataContext';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Users,
  Briefcase,
  HelpCircle,
  FileText
} from 'lucide-react';

type EditMode = 'about' | 'team' | 'areas' | 'faq' | null;

export function AdminDashboard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const {
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
  } = useData();

  const [activeTab, setActiveTab] = useState<EditMode>('about');
  const [editingAbout, setEditingAbout] = useState(about);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Partial<TeamMember>>({});
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [editingArea, setEditingArea] = useState<Partial<PracticeArea>>({});
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Partial<FAQ>>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setEditingAbout(about);
  }, [about]);

  const handleSaveAbout = () => {
    updateAbout(editingAbout);
    alert('Informações salvas com sucesso!');
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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Painel Administrativo</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'about'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-foreground hover:bg-muted'
            }`}
          >
            <FileText className="h-4 w-4" />
            Sobre
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'team'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-foreground hover:bg-muted'
            }`}
          >
            <Users className="h-4 w-4" />
            Equipe
          </button>
          <button
            onClick={() => setActiveTab('areas')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'areas'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-foreground hover:bg-muted'
            }`}
          >
            <Briefcase className="h-4 w-4" />
            Áreas
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'faq'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-foreground hover:bg-muted'
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            FAQ
          </button>
        </div>

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6">Informações Sobre o Escritório</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Título</label>
                <input
                  type="text"
                  value={editingAbout.title}
                  onChange={(e) => setEditingAbout({ ...editingAbout, title: e.target.value })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Descrição</label>
                <textarea
                  value={editingAbout.description}
                  onChange={(e) => setEditingAbout({ ...editingAbout, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Missão</label>
                <textarea
                  value={editingAbout.mission}
                  onChange={(e) => setEditingAbout({ ...editingAbout, mission: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Visão</label>
                <textarea
                  value={editingAbout.vision}
                  onChange={(e) => setEditingAbout({ ...editingAbout, vision: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Valores (separados por vírgula)
                </label>
                <input
                  type="text"
                  value={editingAbout.values.join(', ')}
                  onChange={(e) =>
                    setEditingAbout({
                      ...editingAbout,
                      values: e.target.value.split(',').map((v) => v.trim())
                    })
                  }
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>
              <button
                onClick={handleSaveAbout}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Save className="h-4 w-4" />
                Salvar Alterações
              </button>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="space-y-4">
            <button
              onClick={() => {
                setEditingTeam({});
                setShowTeamModal(true);
              }}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Adicionar Membro
            </button>

            <div className="grid gap-4">
              {team.map((member) => (
                <div key={member.id} className="bg-card border border-border rounded-lg p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                      <p className="text-primary">{member.role}</p>
                      <p className="text-muted-foreground text-sm mt-2">{member.bio}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {member.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => {
                          setEditingTeam(member);
                          setShowTeamModal(true);
                        }}
                        className="p-2 text-primary hover:bg-muted rounded-lg transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Deseja realmente excluir este membro?')) {
                            deleteTeamMember(member.id);
                          }
                        }}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Areas Tab */}
        {activeTab === 'areas' && (
          <div className="space-y-4">
            <button
              onClick={() => {
                setEditingArea({});
                setShowAreaModal(true);
              }}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Adicionar Área
            </button>

            <div className="grid md:grid-cols-2 gap-4">
              {practiceAreas.map((area) => (
                <div key={area.id} className="bg-card border border-border rounded-lg p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground">{area.title}</h3>
                      <p className="text-muted-foreground text-sm mt-2">{area.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">Ícone: {area.icon}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => {
                          setEditingArea(area);
                          setShowAreaModal(true);
                        }}
                        className="p-2 text-primary hover:bg-muted rounded-lg transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Deseja realmente excluir esta área?')) {
                            deletePracticeArea(area.id);
                          }
                        }}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="space-y-4">
            <button
              onClick={() => {
                setEditingFaq({});
                setShowFaqModal(true);
              }}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Adicionar Pergunta
            </button>

            <div className="grid gap-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-card border border-border rounded-lg p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground">{faq.question}</h3>
                      <p className="text-muted-foreground text-sm mt-2">{faq.answer}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => {
                          setEditingFaq(faq);
                          setShowFaqModal(true);
                        }}
                        className="p-2 text-primary hover:bg-muted rounded-lg transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Deseja realmente excluir esta pergunta?')) {
                            deleteFAQ(faq.id);
                          }
                        }}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Team Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {editingTeam.id ? 'Editar Membro' : 'Novo Membro'}
              </h2>
              <button onClick={() => setShowTeamModal(false)} className="p-2 hover:bg-muted rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nome</label>
                <input
                  type="text"
                  value={editingTeam.name || ''}
                  onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Cargo</label>
                <input
                  type="text"
                  value={editingTeam.role || ''}
                  onChange={(e) => setEditingTeam({ ...editingTeam, role: e.target.value })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                <textarea
                  value={editingTeam.bio || ''}
                  onChange={(e) => setEditingTeam({ ...editingTeam, bio: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">URL da Imagem</label>
                <input
                  type="text"
                  value={editingTeam.imageUrl || ''}
                  onChange={(e) => setEditingTeam({ ...editingTeam, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Especialidades (separadas por vírgula)
                </label>
                <input
                  type="text"
                  value={editingTeam.specialties?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingTeam({
                      ...editingTeam,
                      specialties: e.target.value.split(',').map((s) => s.trim())
                    })
                  }
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>
              <button
                onClick={handleSaveTeam}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Area Modal */}
      {showAreaModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {editingArea.id ? 'Editar Área' : 'Nova Área'}
              </h2>
              <button onClick={() => setShowAreaModal(false)} className="p-2 hover:bg-muted rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Título</label>
                <input
                  type="text"
                  value={editingArea.title || ''}
                  onChange={(e) => setEditingArea({ ...editingArea, title: e.target.value })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Descrição</label>
                <textarea
                  value={editingArea.description || ''}
                  onChange={(e) => setEditingArea({ ...editingArea, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Ícone (Scale, Briefcase, Users, Shield)
                </label>
                <input
                  type="text"
                  value={editingArea.icon || ''}
                  onChange={(e) => setEditingArea({ ...editingArea, icon: e.target.value })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>
              <button
                onClick={handleSaveArea}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {showFaqModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {editingFaq.id ? 'Editar Pergunta' : 'Nova Pergunta'}
              </h2>
              <button onClick={() => setShowFaqModal(false)} className="p-2 hover:bg-muted rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Pergunta</label>
                <input
                  type="text"
                  value={editingFaq.question || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Resposta</label>
                <textarea
                  value={editingFaq.answer || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                />
              </div>
              <button
                onClick={handleSaveFaq}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
