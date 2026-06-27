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
        
        {/* Client Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['client', 'admin']} />}>
          <Route path="/client/portal" element={<ClientPortal />} />
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
