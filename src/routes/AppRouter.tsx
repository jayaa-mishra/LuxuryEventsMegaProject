import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '@/layouts/MainLayout';
import AdminLayout from '@/layouts/AdminLayout';

// Pages
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import PressPage from '@/pages/PressPage';
import PortfolioPage from '@/pages/PortfolioPage';
import PortfolioDetailPage from '@/pages/PortfolioDetailPage';
import InquiryPage from '@/pages/InquiryPage';
import MetropolitanGalaPage from '@/pages/MetropolitanGalaPage';
import LakeComoPage from '@/pages/LakeComoPage';
import EditorialVogue from '@/pages/press/EditorialVogue';
import EditorialFT from '@/pages/press/EditorialFT';
import EditorialAD from '@/pages/press/EditorialAD';
import EditorialHarpers from '@/pages/press/EditorialHarpers';
import EditorialConde from '@/pages/press/EditorialConde';
import EditorialWallpaper from '@/pages/press/EditorialWallpaper';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminPayments from '@/pages/admin/AdminPayments';

import AdminLeads from '@/pages/admin/AdminLeads';
import AdminBookings from '@/pages/admin/AdminBookings';
import AdminPackages from '@/pages/admin/AdminPackages';
import AdminQuotations from '@/pages/admin/AdminQuotations';
import AdminGallery from '@/pages/admin/AdminGallery';
import AdminAuditLogs from '@/pages/admin/AdminAuditLogs';
import AdminLogin from '@/pages/admin/AdminLogin';
import ClientPortal from '@/pages/client/ClientPortal';
import ClientLogin from '@/pages/client/ClientLogin';
import ClientRegister from '@/pages/client/ClientRegister';
import ClientBookings from '@/pages/client/ClientBookings';
import ClientQuotations from '@/pages/client/ClientQuotations';
import ClientPayments from '@/pages/client/ClientPayments';
import ClientProfile from '@/pages/client/ClientProfile';
import ClientPortfolio from '@/pages/client/ClientPortfolio';
import ClientLayout from '@/layouts/ClientLayout';
import ProtectedRoute from './ProtectedRoute';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/press" element={<PressPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/:id" element={<PortfolioDetailPage />} />
        <Route path="/inquiry" element={<InquiryPage />} />
        <Route path="/commissions/metropolitan-gala" element={<MetropolitanGalaPage />} />
        <Route path="/commissions/lake-como" element={<LakeComoPage />} />
        <Route path="/press/vogue-living" element={<EditorialVogue />} />
        <Route path="/press/financial-times" element={<EditorialFT />} />
        <Route path="/press/architectural-digest" element={<EditorialAD />} />
        <Route path="/press/harpers-bazaar" element={<EditorialHarpers />} />
        <Route path="/press/conde-nast" element={<EditorialConde />} />
        <Route path="/press/wallpaper" element={<EditorialWallpaper />} />
        
      </Route>

      {/* Client auth (public) */}
      <Route path="/client/login" element={<ClientLogin />} />
      <Route path="/client/register" element={<ClientRegister />} />

      {/* Client protected portal */}
      <Route path="/client" element={<ProtectedRoute allowedRoles={['client', 'admin']} />}>
        <Route element={<ClientLayout />}>
          <Route path="portal" element={<ClientPortal />} />
          <Route path="bookings" element={<ClientBookings />} />
          <Route path="quotations" element={<ClientQuotations />} />
          <Route path="payments" element={<ClientPayments />} />
          <Route path="profile" element={<ClientProfile />} />
          <Route path="portfolio" element={<ClientPortfolio />} />
        </Route>
      </Route>
      
      <Route path="/admin">
        <Route path="login" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="packages" element={<AdminPackages />} />
          <Route path="quotations" element={<AdminQuotations />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="audit" element={<AdminAuditLogs />} />
        </Route>
        </Route>
      </Route>
    </Routes>
  );
}
