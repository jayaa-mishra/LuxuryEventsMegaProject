"use client";

import { Link } from "react-router-dom";
import ScrollReveal from "@/components/layout/ScrollReveal";
import { useGallery } from "@/hooks/useGallery";

export default function FeaturedEvents() {
  const { galleries, fetching } = useGallery();
  
  // Just use top 3 galleries as featured events
  const events = galleries.slice(0, 3);

  return (
    <section className="py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto">
      <ScrollReveal className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-light mb-6 text-plum">Featured <span className="italic">Portfolio</span></h2>
        <Link
          to="/portfolio"
          className="link-underline font-sans text-[11px] uppercase tracking-[0.2em] text-plum/60 hover:text-rose transition-colors duration-300"
        >
          View All Work
        </Link>
      </ScrollReveal>

      {fetching ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-pulse">
           {[1,2,3].map(i => (
             <div key={i} className="aspect-[3/4] bg-rose/5 border border-rose/10" />
           ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12 lg:gap-x-16">
          {events.map((event, index) => {
            const primaryImage = event.images?.find(img => img.is_primary)?.url 
              ?? event.images?.[0]?.url 
              ?? "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80";

            return (
              <ScrollReveal
                key={event._id}
                delay={(index + 1) as 1 | 2 | 3}
                className={`${index === 1 ? "md:mt-32" : ""} ${index === 2 ? "lg:mt-16" : ""}`}
              >
                <Link 
                  to={`/portfolio/${event._id}`}
                  className="group flex flex-col card-hover"
                >
                  <div className="relative w-full aspect-[3/4] mb-8 overflow-hidden bg-blush border border-rose/10">
                    <img 
                      src={primaryImage} 
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover img-zoom saturate-[0.85] group-hover:saturate-100"
                    />
                    {/* Subtle hover overlay */}
                    <div className="absolute inset-0 bg-rose/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-center font-sans text-[10px] tracking-[0.2em] uppercase text-plum/50">
                      <span>Client Name</span>
                      <span>{event.category}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-normal text-plum group-hover:italic group-hover:text-rose transition-all duration-400">
                      {event.title}
                    </h3>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      )}
    </section>
  );
}
