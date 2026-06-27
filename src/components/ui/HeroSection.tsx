import { Link } from "react-router-dom";
import Image from "@/components/common/Image";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row page-enter">
      {/* Left Text Column: Champagne Transition */}
      <div className="w-full md:w-1/2 bg-blush pt-32 pb-24 px-6 md:px-16 flex flex-col justify-center min-h-[50vh] md:min-h-screen">
        <div className="max-w-xl">
          <p className="animate-fade-in delay-200 font-sans text-[10px] sm:text-xs text-plum/60 tracking-[0.3em] uppercase mb-8 ml-1">
            Est. 2026 &mdash; Global Reach
          </p>
          <h1 className="animate-slide-left delay-300 text-5xl md:text-6xl lg:text-[80px] leading-[1.1] text-plum font-light mb-12">
            Exquisite <span className="italic transition-all group-hover:pl-4 transition-all duration-700">Events</span> Redefined
          </h1>
          <p className="animate-fade-up delay-500 text-plum/75 text-lg leading-relaxed mb-16 max-w-md">
            We curate spaces and moments of exceptional beauty, delivering high-touch,
            editorial-style productions for the world&apos;s most discerning clientele.
          </p>
          <Link 
            to="/inquiry" 
            className="animate-fade-up delay-600 inline-block bg-rose text-blush font-sans text-xs uppercase tracking-[0.2em] px-10 py-5 btn-luxury"
          >
            Start Planning
          </Link>
        </div>
      </div>

      {/* Right Image Column: Burgundy with crimson pinstripe */}
      <div className="animate-slide-right w-full md:w-1/2 bg-rose-soft relative min-h-[50vh] md:min-h-screen bg-pinstripe">
        <div className="absolute inset-x-8 inset-y-8 md:inset-12 bg-blush/5 pointer-events-none z-0" />
        <div className="absolute inset-0 p-6 md:p-16 flex items-center justify-center pointer-events-none">
          <div className="relative w-full h-[60vh] md:h-[80vh] shadow-2xl shadow-rose/20 overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
              alt="Luxury Event Floral Arrangement"
              fill
              className="object-cover object-center img-zoom"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
