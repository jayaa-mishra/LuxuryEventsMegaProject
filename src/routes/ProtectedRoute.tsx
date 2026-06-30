import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loader } from '../components/common/Loader';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="h-screen flex items-center justify-center"><Loader /></div>;
  }

  if (!user) {
    const isClientRoute = location.pathname.startsWith('/client');
    return <Navigate to={isClientRoute ? '/client/login' : '/admin/login'} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === 'client' ? '/client/portal' : '/'} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
