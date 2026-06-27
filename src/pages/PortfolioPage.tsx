import { Link } from "react-router-dom";
import ScrollReveal from "@/components/layout/ScrollReveal";
import Image from "@/components/common/Image";
import { motion } from "framer-motion";
import { useGallery } from "@/hooks/useGallery";
import { Loader } from "@/components/common/Loader";
import { EmptyState } from "@/components/common/EmptyState";

export default function PortfolioPage() {
  const { galleries, fetching } = useGallery();

  if (fetching) {
    return <main className="min-h-screen bg-blush pt-48"><Loader /></main>;
  }

  if (!galleries || galleries.length === 0) {
    return (
      <main className="min-h-screen bg-blush pt-48 px-6 max-w-7xl mx-auto">
        <EmptyState 
          message="The archive is waiting." 
          subMessage="Curated events and portfolios will be showcased here." 
          imageSrc="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1500&auto=format&fit=crop"
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush pt-48 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
       <ScrollReveal className="mb-24 text-center">
         <h1 className="text-5xl md:text-7xl font-light text-plum">The <span className="italic">Portfolio</span></h1>
         <div className="w-24 h-[1px] bg-rose/30 mx-auto mt-8" />
       </ScrollReveal>

       <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
         {galleries.map((gallery, idx) => (
            <ScrollReveal key={gallery._id} delay={(idx % 3 + 1) as 1|2|3} className="break-inside-avoid">
              <Link to={`/portfolio/${gallery._id}`} className="group block relative overflow-hidden rounded-sm shadow-xl bg-rose/5 card-hover">
                 <div className="relative w-full overflow-hidden">
                    {/* Maintain dynamic height but standard min-height to prevent jumping */}
                    <div className="min-h-[300px]">
                      <Image 
                        src={gallery.images?.find(img => img.is_primary)?.url || gallery.images?.[0]?.url || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80'} 
                        alt={gallery.title}
                        fill
                        className="object-cover img-zoom"
                      />
                    </div>
                    {/* Elegant Hover Overlay */}
                    <div className="absolute inset-0 bg-plum/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center">
                       <motion.span 
                         initial={{ y: 20, opacity: 0 }}
                         whileHover={{ y: 0, opacity: 1 }}
                         transition={{ duration: 0.4 }}
                         className="text-blush font-serif text-2xl mb-2"
                       >
                         {gallery.title}
                       </motion.span>
                       <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-peach">
                         {gallery.category}
                       </span>
                    </div>
                 </div>
              </Link>
            </ScrollReveal>
         ))}
       </div>
    </main>
  );
}
