import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { CalendarDays, FileText, CreditCard, User, LogOut, Home, ImageIcon } from 'lucide-react';

export default function ClientLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/client/login');
  };

  return (
    <div className="min-h-screen bg-blush flex">
      {/* Sidebar */}
      <aside className="w-64 bg-plum text-blush flex-col hidden md:flex">
        <div className="p-8 border-b border-blush/10">
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-blush/90">
            Luxury Events
          </h2>
          <p className="font-serif italic text-blush/50 mt-1 text-sm">Client Portal</p>
          {user && (
            <p className="font-sans text-[10px] tracking-widest uppercase text-rose mt-4 truncate">{user.name}</p>
          )}
        </div>

        <nav className="flex-1 px-4 py-8 space-y-1 font-sans text-[10px] tracking-[0.2em] uppercase">
          <Link to="/client/portal" className="flex items-center gap-3 px-4 py-3 text-blush/50 hover:bg-blush/5 hover:text-blush transition-colors rounded-sm">
            <Home size={14} /> Overview
          </Link>
          <Link to="/client/bookings" className="flex items-center gap-3 px-4 py-3 text-blush/50 hover:bg-blush/5 hover:text-blush transition-colors rounded-sm">
            <CalendarDays size={14} /> My Bookings
          </Link>
          <Link to="/client/quotations" className="flex items-center gap-3 px-4 py-3 text-blush/50 hover:bg-blush/5 hover:text-blush transition-colors rounded-sm">
            <FileText size={14} /> Quotations
          </Link>
          <Link to="/client/payments" className="flex items-center gap-3 px-4 py-3 text-blush/50 hover:bg-blush/5 hover:text-blush transition-colors rounded-sm">
            <CreditCard size={14} /> Payments
          </Link>
          <Link to="/client/profile" className="flex items-center gap-3 px-4 py-3 text-blush/50 hover:bg-blush/5 hover:text-blush transition-colors rounded-sm">
            <User size={14} /> Profile
          </Link>
          <Link to="/client/portfolio" className="flex items-center gap-3 px-4 py-3 text-blush/50 hover:bg-blush/5 hover:text-blush transition-colors rounded-sm">
            <ImageIcon size={14} /> Portfolio
          </Link>
        </nav>

        <div className="p-8 border-t border-blush/10 space-y-3">
          <Link to="/" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-blush/40 hover:text-blush transition-colors">
            Back to Website
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-blush/40 hover:text-rose transition-colors">
            <LogOut size={12} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
