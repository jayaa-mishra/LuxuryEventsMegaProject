import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ScrollReveal from "@/components/layout/ScrollReveal";
import Image from "@/components/common/Image";
import { galleryService } from "@/services/galleryService";
import { Gallery, GalleryImage } from "@/types/models";
import { ArrowLeft, MapPin, Calendar, Users, Quote } from "lucide-react";
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

  if (loading) return <main className="min-h-screen bg-blush pt-48"><Loader /></main>;

  if (!gallery) {
    return (
      <main className="min-h-screen bg-blush flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-light text-plum mb-6">Archive <span className="italic">Not Found</span></h1>
        <Link to="/portfolio" className="font-sans text-xs tracking-[0.2em] uppercase text-rose border-b border-rose/30 pb-1">Return to Portfolio</Link>
      </main>
    );
  }

  const primaryImage = gallery.images?.find(img => img.is_primary)?.url ?? gallery.images?.[0]?.url ?? "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80";
  const secondaryImages = gallery.images?.filter(img => !img.is_primary) ?? [];

  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <div className="bg-rose h-24 w-full fixed top-0 z-40" />

      {/* Hero */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src={primaryImage} alt={gallery.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-plum/50 via-plum/30 to-blush" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-16 max-w-7xl mx-auto">
          <ScrollReveal>
            <Link to="/portfolio" className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-blush/70 hover:text-blush transition-colors group mb-8">
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
            </Link>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-rose mb-3">{gallery.category}</p>
            <h1 className="text-5xl md:text-7xl font-light text-blush leading-tight mb-6 drop-shadow-lg">
              {gallery.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="italic font-serif">{gallery.title.split(' ').pop()}</span>
            </h1>
            <div className="flex flex-wrap gap-6 text-blush/70 font-sans text-xs tracking-wide">
              {gallery.location && (
                <span className="flex items-center gap-1.5"><MapPin size={13} /> {gallery.location}</span>
              )}
              {gallery.year && (
                <span className="flex items-center gap-1.5"><Calendar size={13} /> {gallery.year}</span>
              )}
              {gallery.guestCount !== undefined && (
                <span className="flex items-center gap-1.5"><Users size={13} /> {gallery.guestCount === 2 ? 'Intimate Elopement' : `${gallery.guestCount} Guests`}</span>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats bar */}
      {gallery.stats && gallery.stats.length > 0 && (
        <section className="bg-plum text-blush">
          <div className="max-w-7xl mx-auto px-6 md:px-16 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {gallery.stats.map(stat => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-light mb-1">{stat.value}</p>
                <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-blush/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">

          {/* Left — long description */}
          <div className="lg:col-span-2 space-y-12">
            <ScrollReveal>
              <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-rose border-b border-rose/20 pb-3 inline-block mb-6">The Story</p>
              <p className="font-serif text-xl md:text-2xl text-plum/80 leading-relaxed mb-8">{gallery.description}</p>
              {gallery.longDescription && (
                <p className="font-sans text-sm text-plum/65 leading-[1.9]">{gallery.longDescription}</p>
              )}
            </ScrollReveal>

            {/* Testimonial */}
            {gallery.testimonial && (
              <ScrollReveal delay={1} className="bg-white border border-rose/10 p-10 relative">
                <Quote size={32} className="text-rose/20 absolute top-8 left-8" />
                <blockquote className="font-serif text-lg md:text-xl text-plum/80 leading-relaxed italic pt-6 mb-6">
                  &ldquo;{gallery.testimonial.quote}&rdquo;
                </blockquote>
                <div className="border-t border-rose/10 pt-5">
                  <p className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-plum">{gallery.testimonial.author}</p>
                  <p className="font-sans text-xs text-plum/50 tracking-wide mt-0.5">{gallery.testimonial.role}</p>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Right — meta */}
          <div className="space-y-8">
            {/* Services */}
            {gallery.services && gallery.services.length > 0 && (
              <ScrollReveal direction="right">
                <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-rose border-b border-rose/20 pb-3 mb-5">Services Provided</p>
                <ul className="space-y-3">
                  {gallery.services.map(s => (
                    <li key={s} className="flex items-center gap-3 font-sans text-xs text-plum/70 tracking-wide">
                      <span className="w-1 h-1 rounded-full bg-rose shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            )}

            {/* Event details */}
            <ScrollReveal direction="right" delay={1} className="bg-white border border-rose/10 p-6 space-y-4">
              <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-rose border-b border-rose/10 pb-3 mb-4">Event Details</p>
              {gallery.category && (
                <div>
                  <p className="font-sans text-[9px] tracking-widest uppercase text-plum/40 mb-1">Category</p>
                  <p className="font-sans text-sm text-plum">{gallery.category}</p>
                </div>
              )}
              {gallery.location && (
                <div>
                  <p className="font-sans text-[9px] tracking-widest uppercase text-plum/40 mb-1">Location</p>
                  <p className="font-sans text-sm text-plum">{gallery.location}</p>
                </div>
              )}
              {gallery.year && (
                <div>
                  <p className="font-sans text-[9px] tracking-widest uppercase text-plum/40 mb-1">Year</p>
                  <p className="font-sans text-sm text-plum">{gallery.year}</p>
                </div>
              )}
              {gallery.guestCount !== undefined && (
                <div>
                  <p className="font-sans text-[9px] tracking-widest uppercase text-plum/40 mb-1">Guests</p>
                  <p className="font-sans text-sm text-plum">{gallery.guestCount === 2 ? 'Intimate Elopement' : gallery.guestCount}</p>
                </div>
              )}
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal direction="right" delay={2}>
              <Link to="/inquiry" className="block w-full bg-rose text-blush font-sans text-[10px] tracking-[0.2em] uppercase py-4 text-center hover:bg-plum transition-colors duration-300">
                Enquire About Your Event
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Image gallery */}
      {secondaryImages.length > 0 && (
        <section className="bg-white py-24 px-6 md:px-16">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="mb-16 text-center">
              <h2 className="text-3xl md:text-5xl font-light text-plum">Visual <span className="italic font-serif">Fragments</span></h2>
              <div className="w-16 h-[1px] bg-rose/30 mx-auto mt-6" />
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondaryImages.map((img: GalleryImage, idx: number) => (
                <ScrollReveal key={idx} delay={(idx % 3 + 1) as 1|2|3} className={`overflow-hidden group ${idx === 0 ? 'md:col-span-2' : ''}`}>
                  <div className={`relative overflow-hidden ${idx === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                    <img
                      src={img.url}
                      alt={`${gallery.title} — image ${idx + 2}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[20%] group-hover:grayscale-0"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="bg-plum py-24 px-6 text-center">
        <ScrollReveal>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-blush/50 mb-4">Start your journey</p>
          <h2 className="text-3xl md:text-5xl font-light text-blush mb-8">
            Let us create something <span className="italic font-serif text-rose">unforgettable</span> for you
          </h2>
          <Link to="/inquiry" className="inline-block px-10 py-4 bg-rose text-blush font-sans text-xs tracking-[0.2em] uppercase hover:bg-blush hover:text-plum transition-colors duration-300">
            Begin Your Inquiry
          </Link>
        </ScrollReveal>
      </section>
    </main>
  );
}
