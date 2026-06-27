"use client";

import { Link } from "react-router-dom";
import { LogOut, Calendar, MapPin, Grid, MessageSquare, Files, User } from "lucide-react";
import { useLeads } from "../../hooks/useLeads";
import { useAnalytics } from "../../hooks/useAnalytics";
import { useAuth } from "../../hooks/useAuth";
import { DashboardSkeleton } from "../../components/common/Skeleton";
import { EmptyState } from "../../components/common/EmptyState";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { leads, fetching } = useLeads();
  const { metrics, loading: metricsLoading } = useAnalytics();
  const { logout } = useAuth();



  return (
    <div className="min-h-screen bg-blush p-6 md:p-12 lg:p-24 selection:bg-rose selection:text-blush">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-start mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-light text-plum">
              Studio <span className="italic">Dashboard</span>
            </h1>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-plum/50 mt-4">Authorized Personnel Only</p>
          </motion.div>
          
          <button 
            onClick={logout}
            className="flex items-center space-x-2 font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 hover:text-rose transition-colors duration-300 border border-rose/10 px-6 py-3 bg-white shadow-sm"
          >
            <span>Logout</span>
            <LogOut size={14} />
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content: Inquiries */}
          <section className="lg:col-span-8">
            <div className="flex justify-between items-end border-b border-rose/25 pb-4 mb-12">
               <h2 className="text-2xl font-serif text-plum">Recent Leads</h2>
            </div>
            
            {fetching ? (
              <DashboardSkeleton />
            ) : (
              <div className="space-y-6">
                {leads.map((lead, idx) => (
                   <motion.div 
                      key={lead._id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="group bg-white border border-rose/5 p-8 rounded-sm hover:shadow-xl hover:shadow-plum/5 transition-all duration-300 relative overflow-hidden"
                   >
                      {/* Subtle hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-rose/0 via-rose/[0.02] to-rose/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 relative z-10">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4">
                             <div className="w-10 h-10 rounded-full bg-rose/5 flex items-center justify-center text-rose font-sans text-xs font-bold border border-rose/10">
                               {lead.client_name.charAt(0)}
                             </div>
                             <div>
                               <h3 className="text-xl font-serif text-plum">{lead.client_name}</h3>
                               <p className="font-sans text-[10px] tracking-[0.1em] text-plum/40 uppercase">{lead.email}</p>
                             </div>
                          </div>
                          <div className="flex flex-wrap gap-4 text-[10px] font-sans tracking-[0.15em] uppercase text-plum/60">
                            <span className="flex items-center gap-1.5"><Calendar size={12} className="text-rose" /> {new Date(lead.event_date).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1.5"><MapPin size={12} className="text-rose" /> {lead.guest_count} Guests</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3 text-right">
                           <span className={`font-sans text-[9px] tracking-[0.2em] uppercase px-4 py-1.5 rounded-sm ${lead.status === 'new' ? 'bg-rose text-blush shadow-md shadow-rose/20' : 'bg-rose/5 text-rose border border-rose/10'}`}>
                             {lead.status}
                           </span>
                           <Link 
                            to={`mailto:${lead.email}`}
                            className="text-[10px] font-sans tracking-[0.2em] uppercase text-plum/40 hover:text-rose transition-colors duration-300"
                           >
                             Reply via Email
                           </Link>
                        </div>
                      </div>
                   </motion.div>
                ))}
                {leads.length === 0 && (
                  <EmptyState 
                    message="The inbox is quiet." 
                    subMessage="When a client inquires about a commission, their details will appear here." 
                    imageSrc="https://images.unsplash.com/photo-1512413914565-eb738fbfbc07?q=80&w=1500&auto=format&fit=crop"
                  />
                )}
              </div>
            )}
          </section>

          <aside className="lg:col-span-4 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-plum p-10 text-blush shadow-2xl shadow-plum/20 rounded-sm relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
               <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase opacity-60 mb-8">System Summary</h3>
               <div className="grid grid-cols-2 gap-8 mb-12">
                  <div>
                     <p className="text-3xl font-light mb-1">{metricsLoading ? '-' : (metrics?.leadFunnel?.reduce((acc: number, curr: any) => acc + curr.count, 0) || 0)}</p>
                     <p className="font-sans text-[9px] tracking-[0.2em] uppercase opacity-40">Leads</p>
                  </div>
                  <div>
                     <p className="text-3xl font-light mb-1">{metricsLoading ? '-' : (metrics?.totalBookings || 0)}</p>
                     <p className="font-sans text-[9px] tracking-[0.2em] uppercase opacity-40">Bookings</p>
                  </div>
                  <div className="col-span-2">
                     <p className="text-3xl font-light mb-1">{metricsLoading ? '-' : `$${metrics?.totalRevenue?.toLocaleString() || 0}`}</p>
                     <p className="font-sans text-[9px] tracking-[0.2em] uppercase opacity-40">Total Revenue</p>
                  </div>
               </div>
               <nav className="space-y-2 border-t border-white/5 pt-8">
                  <Link to="/portfolio" className="flex items-center gap-3 py-3 px-4 hover:bg-white/5 transition-colors font-sans text-[10px] tracking-[0.2em] uppercase opacity-60 hover:opacity-100">
                     <Grid size={14} /> Projects
                  </Link>
                  <Link to="/press" className="flex items-center gap-3 py-3 px-4 hover:bg-white/5 transition-colors font-sans text-[10px] tracking-[0.2em] uppercase opacity-60 hover:opacity-100">
                     <Files size={14} /> Press Features
                  </Link>
                  <Link to="/client/portal" className="flex items-center gap-3 py-3 px-4 hover:bg-white/5 transition-colors font-sans text-[10px] tracking-[0.2em] uppercase opacity-60 hover:opacity-100">
                     <User size={14} /> Sample Portal
                  </Link>
                  <Link to="/inquiry" className="flex items-center gap-3 py-3 px-4 hover:bg-white/5 transition-colors font-sans text-[10px] tracking-[0.2em] uppercase opacity-60 hover:opacity-100">
                     <MessageSquare size={14} /> Form Preview
                  </Link>
               </nav>
            </motion.div>

            <div className="border border-plum/10 p-10 bg-white/30 backdrop-blur-sm">
               <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-plum/50 mb-8">Resources</h3>
               <ul className="space-y-6">
                  <li>
                    <Link to="/" className="group flex justify-between items-center py-2 border-b border-rose/10 hover:border-rose transition-all">
                      <span className="font-serif text-plum italic">Global Homepage</span>
                      <LogOut size={12} className="rotate-180 opacity-20 group-hover:opacity-100" />
                    </Link>
                  </li>
               </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
