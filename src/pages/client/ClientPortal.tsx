import ScrollReveal from "@/components/layout/ScrollReveal";
import Image from "@/components/common/Image";
import { Link } from "react-router-dom";
import { Lock, FileText, Image as ImageIcon, MessageSquare, ExternalLink, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useBookings } from "../../hooks/useBookings";
import { useQuotations } from "../../hooks/useQuotations";
import { Loader } from "../../components/common/Loader";
import { EmptyState } from "../../components/common/EmptyState";
import { DashboardSkeleton } from "../../components/common/Skeleton";
import { QuotationPreview } from "../../components/quotation/QuotationPreview";
import { QuotationDownloadButton } from "../../components/quotation/QuotationDownloadButton";
import { QuotationStatusBadge } from "../../components/quotation/QuotationStatusBadge";
import { usePayment } from "../../hooks/usePayment";
import { useState } from 'react';
import { motion } from "framer-motion";
import { PaymentHistoryTable } from "../../components/payments/PaymentHistoryTable";

export default function ClientPortal() {
  const { user, logout } = useAuth();
  const { bookings, fetching } = useBookings(user ? { client_id: user._id } : undefined);
  const booking = bookings?.[0];
  
  // Use lead_id if user doesn't have quotation_id directly, but typically booking has quotation_id
  const { quotations } = useQuotations();
  const myQuotations = quotations.filter(q => q._id === booking?.quotation_id || (typeof q.lead_id === 'object' && (q.lead_id as any).email === user?.email));

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { initPayment, loading: paymentLoading } = usePayment();

  if (fetching) return <main className="min-h-screen bg-blush pt-48 px-6 max-w-7xl mx-auto"><DashboardSkeleton /></main>;
  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <div className="bg-rose h-24 w-full fixed top-0 z-40"></div>
      
      <section className="pt-48 pb-32 px-6 max-w-7xl mx-auto">
        <motion.div 
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24 border-b border-rose/20 pb-12"
        >
           <div className="max-w-2xl">
             <div className="flex items-center gap-3 mb-6">
                <span className="bg-rose/10 text-rose px-3 py-1 font-sans text-[10px] tracking-[0.2em] uppercase rounded-sm border border-rose/10">Private Portal</span>
                <span className="text-plum/40 flex items-center gap-1 font-sans text-[10px] tracking-[0.1em] uppercase"><Lock size={10} /> Secure</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-light text-plum">
               {user?.name.split(' ').map((n, i) => i === 1 ? <span key={i} className="italic">{n}</span> : <span key={i}>{n} </span>)}
             </h1>
             {booking && (
               <div className="mt-6 flex items-center space-x-4">
                 <p className="font-sans text-xs tracking-[0.2em] uppercase text-plum/60">
                   {new Date(booking.event_date).toLocaleDateString()} &mdash; {booking.venue || 'Location TBD'}
                 </p>
                 <span className={`px-2 py-1 text-[10px] uppercase tracking-wider font-semibold ${
                   booking.status === 'pending' ? 'bg-rose/10 text-rose' :
                   booking.status === 'in_progress' ? 'bg-blue-500/10 text-blue-500' :
                   booking.status === 'completed' ? 'bg-olive/10 text-olive' :
                   'bg-gray-500/10 text-gray-500'
                 }`}>
                   {booking.status.replace('_', ' ')}
                 </span>
                 {booking.payment_status === 'pending' && (
                   <button 
                     onClick={() => initPayment(booking._id)}
                     disabled={paymentLoading}
                     className="px-4 py-2 bg-plum text-white text-[10px] uppercase tracking-widest hover:bg-rose transition-colors disabled:opacity-50"
                   >
                     {paymentLoading ? 'Processing...' : 'Pay Advance'}
                   </button>
                 )}
                 {booking.payment_status === 'paid' && (
                   <span className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold bg-olive/10 text-olive">
                     Paid
                   </span>
                 )}
               </div>
             )}
           </div>
           
            <div className="flex gap-4">
              <button onClick={logout} className="bg-white border border-rose/10 text-plum px-8 py-4 font-sans text-[10px] tracking-[0.2em] uppercase hover:text-rose hover:shadow-lg hover:shadow-rose/5 transition-all duration-300 flex items-center gap-2 rounded-sm"><LogOut size={14} /> Logout</button>
           </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Workspace */}
          <div className="lg:col-span-8 space-y-16">
             {/* Planning Status */}
             <ScrollReveal className="bg-white p-12 border border-rose/5 shadow-xl shadow-rose/5">
                <h2 className="text-2xl font-serif text-plum mb-8">Planning Progress</h2>
                <div className="space-y-8">
                   <div className="space-y-3">
                      <div className="flex justify-between font-sans text-[10px] tracking-[0.15em] uppercase text-plum/60">
                         <span>Design &amp; Concept</span>
                         <span>85%</span>
                      </div>
                      <div className="h-1 w-full bg-rose/10">
                         <div className="h-full bg-rose w-[85%] transition-all duration-1000 delay-500" />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between font-sans text-[10px] tracking-[0.15em] uppercase text-plum/60">
                         <span>Vendor Selection</span>
                         <span>60%</span>
                      </div>
                      <div className="h-1 w-full bg-rose/10">
                         <div className="h-full bg-rose w-[60%] transition-all duration-1000 delay-700" />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between font-sans text-[10px] tracking-[0.15em] uppercase text-plum/60">
                         <span>Logistics &amp; Travel</span>
                         <span>40%</span>
                      </div>
                      <div className="h-1 w-full bg-rose/10">
                         <div className="h-full bg-rose w-[40%] transition-all duration-1000 delay-900" />
                      </div>
                   </div>
                </div>
             </ScrollReveal>

             {/* Deliverables Section */}
             <section>
                <h3 className="text-2xl font-serif text-plum mb-12 border-b border-rose/10 pb-4">Your Quotations</h3>
                {myQuotations.length === 0 ? (
                  <EmptyState 
                    message="No deliverables yet." 
                    subMessage="Your bespoke proposals and contracts will appear here once finalized."
                    imageSrc="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1500&auto=format&fit=crop"
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {myQuotations.map((quote, idx) => (
                        <motion.div 
                          key={quote._id} 
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                          className="flex flex-col gap-6 p-6 bg-white border border-rose/5 shadow-sm hover:shadow-xl hover:shadow-plum/5 rounded-sm relative overflow-hidden group transition-all duration-300"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-rose/0 via-rose/[0.02] to-rose/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                          <div className="flex items-start justify-between relative z-10">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-rose/5 flex items-center justify-center text-rose border border-rose/10 group-hover:scale-105 transition-transform duration-300">
                                  <FileText size={20} />
                              </div>
                              <div>
                                  <p className="font-serif text-lg text-plum group-hover:text-rose transition-colors duration-300">{quote.quotationNumber || `QT-${quote._id.substring(0,6).toUpperCase()}`}</p>
                                  <p className="font-sans text-[10px] tracking-[0.1em] uppercase text-plum/40 mt-1">v{quote.versionNumber} &mdash; ${quote.total_amount?.toLocaleString()}</p>
                              </div>
                            </div>
                            <QuotationStatusBadge status={quote.status as any} />
                          </div>
                          <div className="flex gap-4 mt-2 relative z-10">
                            {quote.pdfUrl ? (
                              <>
                                <button onClick={() => setPreviewUrl(quote.pdfUrl!)} className="text-[10px] font-sans uppercase tracking-widest text-plum hover:text-rose border-b border-rose/20 hover:border-rose transition-all pb-1">Preview</button>
                                <QuotationDownloadButton quotationId={quote._id} />
                              </>
                            ) : (
                              <span className="text-[10px] font-sans uppercase tracking-widest text-plum/40">PDF processing...</span>
                            )}
                          </div>
                        </motion.div>
                    ))}
                  </div>
                )}
             </section>

             {/* Payment History Section */}
             <section className="mt-16">
                <h3 className="text-2xl font-serif text-plum mb-12 border-b border-rose/10 pb-4">Payment History</h3>
                <PaymentHistoryTable />
             </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            <ScrollReveal direction="right" className="bg-plum p-10 text-blush">
               <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase opacity-50 mb-8">Concept Deck</h3>
               <div className="relative aspect-square w-full mb-8 bg-white/10 group cursor-pointer overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80"
                    alt="Concept Cover"
                    fill
                    className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-plum/40 opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="font-sans text-[10px] tracking-[0.3em] uppercase border border-blush px-4 py-2">Open Gallery</span>
                  </div>
               </div>
               <button className="w-full border border-blush/20 py-4 font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-blush hover:text-plum transition-all">Download Brand Guidelines</button>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={2} className="p-10 border border-plum/10">
               <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-plum/50 mb-8">Your Team</h3>
               <div className="space-y-8">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all border border-rose/20">
                        <img src="https://images.unsplash.com/photo-1544005313-94ff9c7c443e?q=80&w=150" alt="Lead" />
                     </div>
                     <div>
                        <p className="font-serif text-plum italic underline decoration-rose/30">Julianne Ross</p>
                        <p className="font-sans text-[9px] tracking-[0.1em] uppercase text-plum/40">Lead Strategist</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all border border-rose/20">
                        <img src="https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?q=80&w=150" alt="Design" />
                     </div>
                     <div>
                        <p className="font-serif text-plum italic underline decoration-rose/30">Marcus Vane</p>
                        <p className="font-sans text-[9px] tracking-[0.1em] uppercase text-plum/40">Art Director</p>
                     </div>
                  </div>
               </div>
               <button className="mt-12 flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 hover:text-rose transition-colors">
                  <MessageSquare size={14} /> Send a Message
               </button>
            </ScrollReveal>
          </aside>
        </div>
      </section>

      {previewUrl && <QuotationPreview pdfUrl={previewUrl} onClose={() => setPreviewUrl(null)} />}
    </main>
  );
}
