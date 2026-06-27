import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ScrollReveal from "@/components/layout/ScrollReveal";
import Image from "@/components/common/Image";
import { galleryService } from "@/services/galleryService";
import { Gallery, GalleryImage } from "@/types/models";
import { ArrowLeft, MapPin, Calendar, Star } from "lucide-react";
import { Loader } from "@/components/common/Loader";

export default function PortfolioDetailPage() {
  const { id } = useParams();
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      galleryService.getGalleryById(id).then(data => {
        setGallery(data || null);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <main className="min-h-screen bg-blush pt-48"><Loader /></main>;
  }

  if (!gallery) {
    return (
      <main className="min-h-screen bg-blush flex flex-col items-center justify-center p-6 text-center">
         <h1 className="text-4xl font-light text-plum mb-6">Archive <span className="italic">Not Found</span></h1>
         <Link to="/portfolio" className="font-sans text-xs tracking-[0.2em] uppercase text-rose border-b border-rose/30 pb-1">Return to Portfolio</Link>
      </main>
    );
  }

  const primaryImage = gallery.images?.find((img: GalleryImage) => img.is_primary)?.url 
    ?? gallery.images?.[0]?.url 
    ?? "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80";

  const imagesList = (gallery.images || []).length > 1 
    ? gallery.images?.slice(1) || []
    : [];

  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <div className="bg-rose h-24 w-full fixed top-0 z-40"></div>
      
      <section className="pt-48 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <ScrollReveal className="mb-12">
          <Link to="/portfolio" className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-plum/40 hover:text-rose transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-16">
            <ScrollReveal direction="left">
               <div className="flex items-center gap-3 mb-6 font-sans text-[10px] tracking-[0.3em] uppercase text-rose">
                  <span className="opacity-60">{gallery.category}</span>
                  <span className="w-8 h-[1px] bg-rose/20"></span>
               </div>
               <h1 className="text-6xl md:text-8xl font-light text-plum leading-[1.05] mb-8">
                 {gallery.title.split(' ').slice(0, -1).join(' ')} <span className="italic">{gallery.title.split(' ').pop()}</span>
               </h1>
            </ScrollReveal>

            <ScrollReveal delay={2} className="space-y-8 font-serif text-xl tracking-wide text-plum/80 leading-relaxed max-w-lg">
               <p>{gallery.description || "A meticulously curated celebration focusing on the finest details and a unique client vision."}</p>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="right" className="relative aspect-[3/4] w-full bg-rose/5 group overflow-hidden shadow-2xl shadow-rose/5">
             <Image 
               src={primaryImage} 
               alt={gallery.title}
               fill
               unoptimized
               className="object-cover img-zoom"
             />
             <div className="absolute inset-0 bg-pinstripe opacity-10" />
          </ScrollReveal>
        </div>
      </section>

      {imagesList.length > 0 && (
        <section className="bg-peach/15 py-48 px-6 md:px-12 my-32">
           <div className="max-w-7xl mx-auto">
              <ScrollReveal className="mb-24 text-center">
                 <h2 className="text-3xl md:text-5xl font-light text-plum">Visual <span className="italic">Fragments</span></h2>
                 <div className="w-24 h-[1px] bg-rose/30 mx-auto mt-8" />
              </ScrollReveal>
              
              <div className="columns-1 md:columns-2 gap-12 space-y-12">
                 {imagesList.map((img: GalleryImage, idx: number) => (
                    <ScrollReveal 
                      key={idx} 
                      delay={(idx % 2 + 1) as 1|2}
                      className="break-inside-avoid relative group cursor-pointer overflow-hidden shadow-xl"
                    >
                       <img 
                         src={img.url} 
                         alt="detail" 
                         className="w-full grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105" 
                       />
                    </ScrollReveal>
                 ))}
              </div>
           </div>
        </section>
      )}
    </main>
  );
}
