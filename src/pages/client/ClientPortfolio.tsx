import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGallery } from '@/hooks/useGallery';
import { useAuth } from '@/hooks/useAuth';
import { ImageIcon, ExternalLink } from 'lucide-react';

const CATEGORIES = ['All', 'Wedding', 'Corporate', 'Social'];

export default function ClientPortfolio() {
  const { user } = useAuth();
  const { galleries, fetching } = useGallery();
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? galleries : galleries.filter(g => g.category === active);

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8 border-b border-rose/10 pb-6">
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-plum/40 mb-1">Curated for {user?.name?.split(' ')[0]}</p>
        <h1 className="text-3xl font-light text-plum">Our <span className="italic font-serif">Portfolio</span></h1>
        <p className="font-sans text-xs text-plum/50 mt-1 tracking-wide">
          Events we have had the privilege of designing
        </p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`font-sans text-[10px] tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-200 ${
              active === cat
                ? 'bg-plum text-blush border-plum'
                : 'bg-white text-plum/60 border-rose/20 hover:border-plum/40 hover:text-plum'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {fetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] bg-white border border-rose/10 animate-pulse rounded-sm" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24 bg-white border border-rose/10">
          <ImageIcon size={36} className="text-plum/20 mx-auto mb-4" />
          <p className="font-serif italic text-plum/40">No events in this category yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(gallery => {
            const cover = gallery.images?.find(img => img.is_primary)?.url
              || gallery.images?.[0]?.url;
            return (
              <Link
                key={gallery._id}
                to={`/portfolio/${gallery._id}`}
                className="group relative overflow-hidden rounded-sm bg-rose/5 border border-rose/10 hover:border-rose/40 hover:shadow-lg transition-all duration-300 block"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  {cover ? (
                    <img
                      src={cover}
                      alt={gallery.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-plum/5 flex items-center justify-center">
                      <ImageIcon size={32} className="text-plum/20" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-serif text-plum text-base leading-snug group-hover:text-rose transition-colors">
                        {gallery.title}
                      </p>
                      <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-plum/40 mt-1">
                        {gallery.category}
                      </p>
                    </div>
                    <ExternalLink size={13} className="text-plum/20 group-hover:text-rose transition-colors mt-0.5 shrink-0" />
                  </div>
                  {gallery.description && (
                    <p className="font-sans text-xs text-plum/50 mt-2 line-clamp-2 leading-relaxed">
                      {gallery.description}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
