import { createBrowserRouter } from 'react-router';
import { Layout } from '@/app/components/Layout';
import { Home } from '@/app/pages/Home';
import { Login } from '@/app/pages/Login';
import { AdminDashboard } from '@/app/pages/AdminDashboard';
import { PracticeAreasPage } from '@/app/pages/PracticeAreasPage';
import { MVVPage } from '@/app/pages/MVVPage';
import { TeamPage } from '@/app/pages/TeamPage';
import { FAQPage } from '@/app/pages/FAQPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'login', Component: Login },
      { path: 'admin', Component: AdminDashboard },
      { path: 'areas', Component: PracticeAreasPage },
      { path: 'sobre', Component: MVVPage },
      { path: 'equipe', Component: TeamPage },
      { path: 'faq', Component: FAQPage }
    ]
  }
]);
