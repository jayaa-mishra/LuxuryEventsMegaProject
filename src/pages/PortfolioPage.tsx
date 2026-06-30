import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/layout/ScrollReveal";
import { useGallery } from "@/hooks/useGallery";
import { Loader } from "@/components/common/Loader";
import { EmptyState } from "@/components/common/EmptyState";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTOPLAY_DELAY = 5000;
const VISIBLE = 3;

export default function PortfolioPage() {
  const { galleries, fetching } = useGallery();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = galleries?.length ?? 0;

  const advance = useCallback((dir: 1 | -1) => {
    setCurrent(prev => (prev + dir + total) % total);
  }, [total]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!paused && total > 0) {
      timerRef.current = setTimeout(() => advance(1), AUTOPLAY_DELAY);
    }
  }, [paused, total, advance]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, paused, resetTimer]);

  if (fetching) return <main className="min-h-screen bg-blush pt-48"><Loader /></main>;

  if (!galleries || galleries.length === 0) {
    return (
      <main className="min-h-screen bg-blush pt-24 px-6">
        <EmptyState
          message="The archive is waiting."
          subMessage="Curated events and portfolios will be showcased here."
          imageSrc="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1500&auto=format&fit=crop"
        />
      </main>
    );
  }

  const getIndex = (offset: number) => (current + offset + total) % total;

  const visibleItems = Array.from({ length: Math.min(VISIBLE, total) }, (_, i) =>
    galleries[getIndex(i - Math.floor(VISIBLE / 2))]
  );

  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <ScrollReveal className="mb-20 text-center pt-24">
          <h1 className="text-5xl md:text-7xl font-light text-plum">The <span className="italic">Portfolio</span></h1>
          <div className="w-24 h-px bg-rose/30 mx-auto mt-8" />
        </ScrollReveal>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {visibleItems.map((gallery, i) => {
              const isCenter = i === Math.floor(VISIBLE / 2);
              const img = gallery.images?.find(img => img.is_primary)?.url
                ?? gallery.images?.[0]?.url
                ?? "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80";
              return (
                <Link
                  key={gallery._id}
                  to={`/portfolio/${gallery._id}`}
                  className={`group relative overflow-hidden rounded-sm shadow-xl transition-all duration-500 block ${
                    isCenter
                      ? "scale-100 opacity-100 z-10"
                      : "scale-95 opacity-60 hover:opacity-80"
                  }`}
                >
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <img
                      src={img}
                      alt={gallery.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-plum/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center">
                    <p className="text-blush font-serif text-2xl mb-2">{gallery.title}</p>
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-peach">{gallery.category}</span>
                  </div>
                  {isCenter && (
                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-plum/80 to-transparent p-6 translate-y-0">
                      <p className="font-serif text-blush text-xl">{gallery.title}</p>
                      <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-blush/60 mt-1">{gallery.category}</p>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Left / Right buttons */}
          <button
            onClick={() => { advance(-1); setPaused(true); }}
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-20 w-12 h-12 bg-blush text-plum border border-plum/10 flex items-center justify-center rounded-full shadow-lg hover:bg-rose hover:text-blush hover:border-rose transition-all duration-200"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => { advance(1); setPaused(true); }}
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-20 w-12 h-12 bg-blush text-plum border border-plum/10 flex items-center justify-center rounded-full shadow-lg hover:bg-rose hover:text-blush hover:border-rose transition-all duration-200"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {galleries.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setPaused(true); }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-rose" : "w-3 bg-plum/20 hover:bg-plum/40"
              }`}
            />
          ))}
        </div>

        {/* Autoplay indicator */}
        <div className="text-center mt-6">
          <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-plum/30">
            {paused ? "Paused — hover to pause, move away to resume" : "Auto-advancing · hover to pause"}
          </p>
        </div>
      </div>
    </main>
  );
}
