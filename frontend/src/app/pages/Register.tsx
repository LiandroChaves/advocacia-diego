import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/app/context/AuthContext';
import { Scale, AlertCircle, UserPlus } from 'lucide-react';

export function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [userCount, setUserCount] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        // Buscar contagem de usuários para decidir se mostra senha admin
        fetch(`${apiUrl}/users/count`)
            .then(res => res.json())
            .then(data => setUserCount(data.count))
            .catch(err => console.error('Erro ao buscar contagem de usuários', err));
    }, [apiUrl]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await register({ name, email, password, adminPassword });
            navigate('/login');
        } catch (err: any) {
            setError(err.message || 'Erro ao registrar usuário');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Scale className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-foreground mb-2">Criar Conta</h1>
                    <p className="text-muted-foreground">Registre-se no painel administrativo</p>
                </div>

                <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                                Nome Completo
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                                placeholder="Seu nome"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                                placeholder="exemplo@advocacia.com"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                                Senha
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {userCount > 0 && (
                            <div>
                                <label htmlFor="adminPassword" className="block text-sm font-medium text-foreground mb-1">
                                    Senha Administration (Necessária)
                                </label>
                                <input
                                    id="adminPassword"
                                    type="password"
                                    value={adminPassword}
                                    onChange={(e) => setAdminPassword(e.target.value)}
                                    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                                    placeholder="Administrador master"
                                    required
                                />
                            </div>
                        )}

                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                                <AlertCircle className="h-4 w-4" />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? 'Registrando...' : (
                                <>
                                    <UserPlus className="h-5 w-5" />
                                    Criar Conta
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Já tem uma conta?{' '}
                            <button
                                onClick={() => navigate('/login')}
                                className="text-primary hover:underline font-medium"
                            >
                                Entre aqui
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
