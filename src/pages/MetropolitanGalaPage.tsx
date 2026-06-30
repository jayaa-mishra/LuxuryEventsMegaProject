import { useEffect } from "react";
import ScrollReveal from "@/components/layout/ScrollReveal";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Users, Quote } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1400&auto=format&fit=crop",
];

const stats = [
  { label: "Guests", value: "320" },
  { label: "Floral Installations", value: "47" },
  { label: "Course Menu", value: "7" },
  { label: "Hours of Event", value: "6" },
];

const services = [
  "Full Event Direction",
  "Floral Architecture",
  "Lighting Design & Production",
  "Bespoke Menu Curation",
  "Guest Experience Management",
  "Custom Stationery & Collateral",
  "Live Entertainment Coordination",
];

export default function MetropolitanGalaPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <div className="bg-rose h-16 w-full fixed top-0 z-40" />

      {/* Hero */}
      <section className="relative h-[75vh] w-full overflow-hidden">
        <img
          src={images[0]}
          alt="The Metropolitan Gala"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-plum/60 via-plum/30 to-blush" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-16 max-w-7xl mx-auto">
          <ScrollReveal>
            <Link to="/" className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-blush/70 hover:text-blush transition-colors group mb-8">
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-rose mb-3">Gala · Featured Commission</p>
            <h1 className="text-5xl md:text-7xl font-light text-blush leading-tight mb-6 drop-shadow-lg">
              The Metropolitan <span className="italic font-serif">Gala</span>
            </h1>
            <div className="flex flex-wrap gap-6 text-blush/70 font-sans text-xs tracking-wide">
              <span className="flex items-center gap-1.5"><MapPin size={13} /> The Oberoi, New Delhi</span>
              <span className="flex items-center gap-1.5"><Calendar size={13} /> March 2023</span>
              <span className="flex items-center gap-1.5"><Users size={13} /> 320 Guests</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-plum text-blush">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <p className="text-3xl md:text-4xl font-light mb-1">{s.value}</p>
              <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-blush/50">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">

          {/* Story */}
          <div className="lg:col-span-2 space-y-12">
            <ScrollReveal>
              <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-rose border-b border-rose/20 pb-3 inline-block mb-6">The Story</p>
              <p className="font-serif text-xl md:text-2xl text-plum/80 leading-relaxed mb-8">
                An evening conceived as a dialogue between old-world grandeur and contemporary minimalism — held beneath the crystal chandeliers of The Oberoi's Grand Ballroom.
              </p>
              <p className="font-sans text-sm text-plum/65 leading-[1.9]">
                The brief was ambitious: create a black-tie gala for 320 of India's most discerning business leaders and cultural figures that felt neither ostentatious nor austere. The answer was contrast. Deep burgundy florals against white marble. Raw brass against polished glass. The ancient geometry of Mughal architecture reimagined in a lighting rig that turned the ceiling into a constellation.
              </p>
              <p className="font-sans text-sm text-plum/65 leading-[1.9] mt-6">
                Every table was dressed with custom-dyed linen in a shade we mixed ourselves — a deep plum that photographed as near-black but caught candlelight like wine. Centrepieces stood at 180cm, built from peonies, black dahlias, and branches of preserved magnolia. The scent was commissioned separately: a custom blend of oud, white musk, and bergamot diffused at 47 invisible points around the room.
              </p>
              <p className="font-sans text-sm text-plum/65 leading-[1.9] mt-6">
                Dinner was a seven-course journey written with Executive Chef Arvind Prasad — a modern Indian tasting menu where every dish was plated as its own installation. Guests were gifted handwritten menus on handmade paper, and a small box of marigold preserve to take home.
              </p>
            </ScrollReveal>

            {/* Testimonial */}
            <ScrollReveal delay={1} className="bg-white border border-rose/10 p-10 relative">
              <Quote size={32} className="text-rose/20 absolute top-8 left-8" />
              <blockquote className="font-serif text-lg md:text-xl text-plum/80 leading-relaxed italic pt-6 mb-6">
                &ldquo;I've attended galas on three continents. The Metropolitan Gala is the only one I've attended twice — and would attend again without hesitation. Jayaa's team created something that felt genuinely, irreducibly special.&rdquo;
              </blockquote>
              <div className="border-t border-rose/10 pt-5">
                <p className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-plum">Vikram Anand</p>
                <p className="font-sans text-xs text-plum/50 tracking-wide mt-0.5">Managing Director, Anand Capital Group</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <ScrollReveal direction="right">
              <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-rose border-b border-rose/20 pb-3 mb-5">Services Provided</p>
              <ul className="space-y-3">
                {services.map(s => (
                  <li key={s} className="flex items-center gap-3 font-sans text-xs text-plum/70 tracking-wide">
                    <span className="w-1 h-1 rounded-full bg-rose shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={1} className="bg-white border border-rose/10 p-6 space-y-4">
              <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-rose border-b border-rose/10 pb-3 mb-4">Event Details</p>
              <div><p className="font-sans text-[9px] tracking-widest uppercase text-plum/40 mb-1">Category</p><p className="font-sans text-sm text-plum">Corporate Gala</p></div>
              <div><p className="font-sans text-[9px] tracking-widest uppercase text-plum/40 mb-1">Venue</p><p className="font-sans text-sm text-plum">The Oberoi Grand Ballroom, New Delhi</p></div>
              <div><p className="font-sans text-[9px] tracking-widest uppercase text-plum/40 mb-1">Season</p><p className="font-sans text-sm text-plum">Spring 2023</p></div>
              <div><p className="font-sans text-[9px] tracking-widest uppercase text-plum/40 mb-1">Guests</p><p className="font-sans text-sm text-plum">320</p></div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={2}>
              <Link to="/inquiry" className="block w-full bg-rose text-blush font-sans text-[10px] tracking-[0.2em] uppercase py-4 text-center hover:bg-plum transition-colors duration-300">
                Enquire About Your Event
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-white py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-light text-plum">Visual <span className="italic font-serif">Fragments</span></h2>
            <div className="w-16 h-px bg-rose/30 mx-auto mt-6" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.slice(1).map((img, idx) => (
              <ScrollReveal key={idx} delay={(idx % 3 + 1) as 1|2|3} className={`overflow-hidden group ${idx === 0 ? 'md:col-span-2' : ''}`}>
                <div className={`relative overflow-hidden ${idx === 0 ? 'aspect-video' : 'aspect-4/3'}`}>
                  <img src={img} alt={`Metropolitan Gala — ${idx + 2}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-plum py-24 px-6 text-center">
        <ScrollReveal>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-blush/50 mb-4">Your event awaits</p>
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
