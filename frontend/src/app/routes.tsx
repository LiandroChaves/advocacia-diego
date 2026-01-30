import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { Layout } from '@/app/components/Layout';
import { Home } from '@/app/pages/Home';
import { Login } from '@/app/pages/Login';
import { AdminDashboard } from '@/app/pages/AdminDashboard';
import { PracticeAreasPage } from '@/app/pages/PracticeAreasPage';
import { MVVPage } from '@/app/pages/MVVPage';
import { TeamPage } from '@/app/pages/TeamPage';
import { FAQPage } from '@/app/pages/FAQPage';
import { Register } from '@/app/pages/Register';
import { useAuth } from '@/app/context/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      {
        path: 'admin',
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        )
      },
      { path: 'areas', Component: PracticeAreasPage },
      { path: 'sobre', Component: MVVPage },
      { path: 'equipe', Component: TeamPage },
      { path: 'faq', Component: FAQPage }
    ]
  }
]);
