import { RouterProvider } from 'react-router';
import { router } from '@/app/routes';
import { ThemeProvider } from '@/app/context/ThemeContext';
import { AuthProvider } from '@/app/context/AuthContext';
import { DataProvider } from '@/app/context/DataContext';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <Toaster
            position="top-right"
            richColors
            expand={false}
            closeButton
          />
          <RouterProvider router={router} />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}