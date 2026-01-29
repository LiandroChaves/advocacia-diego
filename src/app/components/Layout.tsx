import { Outlet } from 'react-router';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { ScrollToTop } from '@/app/components/ScrollToTop';

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
