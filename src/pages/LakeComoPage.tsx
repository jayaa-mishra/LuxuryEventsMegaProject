import { useEffect } from "react";
import ScrollReveal from "@/components/layout/ScrollReveal";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Users, Quote } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470753937643-efeb931202a9?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1536185524219-82d4476e45c2?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1400&auto=format&fit=crop",
];

const stats = [
  { label: "Guests", value: "85" },
  { label: "Ceremony Duration", value: "40 min" },
  { label: "Courses at Dinner", value: "9" },
  { label: "Days of Celebration", value: "3" },
];

const services = [
  "Destination Wedding Direction",
  "Villa Sourcing & Buyout",
  "White Floral Architecture",
  "Guest Travel & Logistics",
  "Bespoke Couture Styling Guidance",
  "Nine-Course Dinner Curation",
  "Live Quartet & DJ Production",
  "Photography & Film Direction",
];

export default function LakeComoPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <div className="bg-rose h-16 w-full fixed top-0 z-40" />

      {/* Hero */}
      <section className="relative h-[75vh] w-full overflow-hidden">
        <img
          src={images[0]}
          alt="Lake Como Estate Wedding"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-plum/50 via-plum/20 to-blush" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-16 max-w-7xl mx-auto">
          <ScrollReveal>
            <Link to="/" className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-blush/70 hover:text-blush transition-colors group mb-8">
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-rose mb-3">Wedding · Featured Commission</p>
            <h1 className="text-5xl md:text-7xl font-light text-blush leading-tight mb-6 drop-shadow-lg">
              Lake Como <span className="italic font-serif">Estate</span>
            </h1>
            <div className="flex flex-wrap gap-6 text-blush/70 font-sans text-xs tracking-wide">
              <span className="flex items-center gap-1.5"><MapPin size={13} /> Villa del Balbianello, Como, Italy</span>
              <span className="flex items-center gap-1.5"><Calendar size={13} /> September 2023</span>
              <span className="flex items-center gap-1.5"><Users size={13} /> 85 Guests</span>
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
                Eighty-five guests. A sixteenth-century villa. The entire northern shore of Lake Como in September light. Some settings choose the wedding for you.
              </p>
              <p className="font-sans text-sm text-plum/65 leading-[1.9]">
                When Ria and Kabir came to us, they had only one instruction: "We want it to feel like we just happened to fall in love here, and invited our closest people to witness it." That deceptive simplicity — the kind that demands extraordinary effort to achieve — became the entire brief.
              </p>
              <p className="font-sans text-sm text-plum/65 leading-[1.9] mt-6">
                The ceremony took place in the vine-draped loggia of Villa del Balbianello, the same terrace that has graced the pages of Italian Vogue for a century. We asked the villa's gardener to let the white wisteria grow unpruned for six weeks prior. By September, it had become a curtain of blossoms behind the couple — entirely natural, entirely perfect.
              </p>
              <p className="font-sans text-sm text-plum/65 leading-[1.9] mt-6">
                Dinner was held in the vine-covered courtyard, lit by 2,000 hand-dipped tapers. The menu was written with a Michelin-starred chef from Milan: nine courses drawing from Italian tradition and the couple's Rajasthani heritage — an amuse-bouche of saffron panna cotta with truffle, a main of slow-cooked lamb with cardamom jus, a dessert of rose milk panna cotta with rose petal tuile. Guests still write to us about the dinner.
              </p>
              <p className="font-sans text-sm text-plum/65 leading-[1.9] mt-6">
                By the time the string quartet gave way to a lone DJ at midnight, and the last guests were dancing barefoot on the stone terrace with the lake below them, three couples had already asked us to plan their weddings.
              </p>
            </ScrollReveal>

            {/* Testimonial */}
            <ScrollReveal delay={1} className="bg-white border border-rose/10 p-10 relative">
              <Quote size={32} className="text-rose/20 absolute top-8 left-8" />
              <blockquote className="font-serif text-lg md:text-xl text-plum/80 leading-relaxed italic pt-6 mb-6">
                &ldquo;We didn't know what we wanted. We told Jayaa we wanted something that felt like us and trusted her completely. What she created was more us than we could have imagined. We still can't believe that was our wedding.&rdquo;
              </blockquote>
              <div className="border-t border-rose/10 pt-5">
                <p className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-plum">Ria & Kabir Malhotra</p>
                <p className="font-sans text-xs text-plum/50 tracking-wide mt-0.5">Lake Como, September 2023</p>
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
              <div><p className="font-sans text-[9px] tracking-widest uppercase text-plum/40 mb-1">Category</p><p className="font-sans text-sm text-plum">Destination Wedding</p></div>
              <div><p className="font-sans text-[9px] tracking-widest uppercase text-plum/40 mb-1">Location</p><p className="font-sans text-sm text-plum">Villa del Balbianello, Lake Como</p></div>
              <div><p className="font-sans text-[9px] tracking-widest uppercase text-plum/40 mb-1">Season</p><p className="font-sans text-sm text-plum">Autumn 2023</p></div>
              <div><p className="font-sans text-[9px] tracking-widest uppercase text-plum/40 mb-1">Guests</p><p className="font-sans text-sm text-plum">85 (Intimate)</p></div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={2}>
              <Link to="/inquiry" className="block w-full bg-rose text-blush font-sans text-[10px] tracking-[0.2em] uppercase py-4 text-center hover:bg-plum transition-colors duration-300">
                Enquire About Your Wedding
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
                  <img src={img} alt={`Lake Como Estate — ${idx + 2}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-plum py-24 px-6 text-center">
        <ScrollReveal>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-blush/50 mb-4">Your love story awaits</p>
          <h2 className="text-3xl md:text-5xl font-light text-blush mb-8">
            Let us design your <span className="italic font-serif text-rose">perfect day</span>
          </h2>
          <Link to="/inquiry" className="inline-block px-10 py-4 bg-rose text-blush font-sans text-xs tracking-[0.2em] uppercase hover:bg-blush hover:text-plum transition-colors duration-300">
            Begin Your Inquiry
          </Link>
        </ScrollReveal>
      </section>
    </main>
  );
}
