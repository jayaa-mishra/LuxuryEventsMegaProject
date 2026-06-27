"use client";

import Image from "@/components/common/Image";
import { Link } from "react-router-dom";

interface EventCardProps {
  id: string;
  title: string;
  client: string;
  image: string;
  type: string;
  aspectRatio?: "portrait" | "landscape" | "square";
}

export default function EventCard({ id, title, client, image, type, aspectRatio = "portrait" }: EventCardProps) {
  const aspectClass = aspectRatio === "portrait" ? "aspect-[3/4]" : aspectRatio === "landscape" ? "aspect-[4/3]" : "aspect-square";

  return (
    <Link 
      to={`/portfolio/${id}`} 
      className="group block flex flex-col card-hover"
    >
      <div className={`relative w-full ${aspectClass} mb-8 overflow-hidden bg-blush border border-rose/10`}>
        <Image 
          src={image} 
          alt={title}
          fill
          unoptimized
          className="object-cover img-zoom saturate-[0.85] group-hover:saturate-100"
        />
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-rose/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>
      
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-center font-sans text-[10px] tracking-[0.2em] uppercase text-plum/50">
          <span className="group-hover:text-rose transition-colors duration-300">{client}</span>
          <span className="opacity-60">{type}</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-normal text-plum group-hover:italic group-hover:text-rose transition-all duration-400">
          {title}
        </h3>
      </div>
    </Link>
  );
}
