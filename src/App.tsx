import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '@/routes/AppRouter';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
        <Toaster position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  );
}
