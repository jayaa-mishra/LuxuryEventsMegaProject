import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { NotificationDrawer } from '@/components/common/NotificationDrawer';

export default function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream selection:bg-olive selection:text-cream flex">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-cream flex flex-col hidden md:flex">
        <div className="p-8">
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-cream/90">
            Luxury Events
          </h2>
          <p className="font-serif italic text-cream/50 mt-2">Admin Portal</p>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2 font-sans text-[10px] tracking-[0.2em] uppercase">
          <Link to="/admin/dashboard" className="block px-4 py-3 text-white/50 hover:bg-white/5 hover:text-white transition-colors">Dashboard</Link>
          <Link to="/admin/leads" className="block px-4 py-3 text-white/50 hover:bg-white/5 hover:text-white transition-colors">Inquiries</Link>
          <Link to="/admin/quotations" className="block px-4 py-3 text-white/50 hover:bg-white/5 hover:text-white transition-colors">Quotations</Link>
          <Link to="/admin/bookings" className="block px-4 py-3 text-white/50 hover:bg-white/5 hover:text-white transition-colors">Bookings</Link>
          <Link to="/admin/packages" className="block px-4 py-3 text-white/50 hover:bg-white/5 hover:text-white transition-colors">Packages</Link>
          <Link to="/admin/gallery" className="block px-4 py-3 text-white/50 hover:bg-white/5 hover:text-white transition-colors">Gallery</Link>
          <Link to="/admin/payments" className="block px-4 py-3 text-white/50 hover:bg-white/5 hover:text-white transition-colors">Payments</Link>
          <Link to="/admin/audit" className="block px-4 py-3 text-white/50 hover:bg-white/5 hover:text-white transition-colors">Audit Logs</Link>
          <button onClick={() => setDrawerOpen(true)} className="w-full text-left block px-4 py-3 text-white/50 hover:bg-white/5 hover:text-white transition-colors">Notifications</button>
        </nav>

        <div className="p-8">
           <button className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors">Log Out</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <NotificationDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
