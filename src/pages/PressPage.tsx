import ScrollReveal from "@/components/layout/ScrollReveal";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const features = [
  {
    publication: "Vogue Living",
    date: "March 2024",
    title: "The Studio Redefining Luxury Events for a New Generation",
    excerpt: "In a world of over-produced spectacle, Jayaa Mishra's studio stands apart — crafting evenings that feel inevitable, as though the event always belonged to the space it inhabits.",
    category: "Feature",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop",
    href: "/press/vogue-living",
  },
  {
    publication: "Financial Times — How to Spend It",
    date: "November 2023",
    title: "Inside the World's Most Exclusive Event Studio",
    excerpt: "We are granted rare access to the team behind the Metropolitan Gala, the Como wedding, and this year's most talked-about private celebration in Dubai.",
    category: "Interview",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    href: "/press/financial-times",
  },
  {
    publication: "Architectural Digest India",
    date: "September 2023",
    title: "Rajasthan by Candlelight: The Soirée That Stopped Time",
    excerpt: "80,000 marigold petals, 400 brass lanterns, and a courtyard that felt like a dream. This is what happens when event design becomes architecture.",
    category: "Spotlight",
    image: "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?q=80&w=800&auto=format&fit=crop",
    href: "/press/architectural-digest",
  },
  {
    publication: "Harper's Bazaar",
    date: "June 2024",
    title: "Barefoot Luxury: The Maldives Wedding That Redefined Romance",
    excerpt: "A sunrise ceremony above the Indian Ocean, witnessed by forty people and the horizon. The studio's most intimate commission yet may also be their most profound.",
    category: "Editorial",
    image: "https://images.unsplash.com/photo-1538681105587-85640961bf8b?q=80&w=800&auto=format&fit=crop",
    href: "/press/harpers-bazaar",
  },
  {
    publication: "Condé Nast Traveller",
    date: "January 2024",
    title: "The Tuscany Wedding That Made 85 Guests Stay Three Extra Days",
    excerpt: "When the wine is this good and the candlelight this warm, nobody wants to leave. A harvest wedding in Montalcino that became a defining piece of Italian hospitality.",
    category: "Travel Feature",
    image: "https://images.unsplash.com/photo-1470753937643-efeb931202a9?q=80&w=800&auto=format&fit=crop",
    href: "/press/conde-nast",
  },
  {
    publication: "Wallpaper*",
    date: "April 2024",
    title: "Silence as a Design Material: The Tokyo Launch That Said Everything",
    excerpt: "A fashion house trusted this studio to design an event in complete silence. The result was the most discussed brand moment of the season.",
    category: "Design",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    href: "/press/wallpaper",
  },
];

const awards = [
  { year: "2024", award: "Best Luxury Event Studio", body: "International Luxury Event Awards" },
  { year: "2024", award: "Outstanding Floral Design", body: "ILEA Global Awards" },
  { year: "2023", award: "Event of the Year — Destination Wedding", body: "Weddings Abroad Guide" },
  { year: "2023", award: "Best Corporate Gala — Asia Pacific", body: "C&IT Awards" },
  { year: "2022", award: "Rising Studio of the Year", body: "Event Design Awards" },
];

export default function PressPage() {
  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-plum/50 mb-6">Press & Media</p>
          <h1 className="text-5xl md:text-7xl font-light leading-[1.1] mb-8 text-plum">
            In the <span className="italic font-serif">Spotlight</span>
          </h1>
          <p className="font-serif text-lg text-plum/65 leading-relaxed max-w-2xl mx-auto">
            Features, interviews, and editorial coverage from the world's leading publications on design, travel, and luxury living.
          </p>
        </ScrollReveal>
      </section>

      {/* Featured press */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto pb-24">
        <ScrollReveal className="border-b border-rose/10 pb-4 mb-12">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-rose">As Featured In</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <ScrollReveal key={idx} delay={(idx % 3 + 1) as 1|2|3} className="group bg-white border border-rose/10 hover:border-rose/40 hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-rose">{item.category}</span>
                  <span className="font-sans text-[9px] tracking-widest text-plum/40">{item.date}</span>
                </div>
                <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-plum/50 mb-2">{item.publication}</p>
                <h3 className="font-serif text-lg text-plum leading-snug mb-3 group-hover:text-rose transition-colors">{item.title}</h3>
                <p className="font-sans text-xs text-plum/60 leading-relaxed mb-5">{item.excerpt}</p>
                <Link
                  to={item.href}
                  className="inline-flex items-center gap-1.5 font-sans text-[9px] tracking-[0.2em] uppercase text-rose hover:text-plum transition-colors border-b border-rose/30 pb-0.5"
                >
                  Read Article <ArrowUpRight size={11} />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className="bg-plum py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-blush/40 mb-4">Recognition</p>
            <h2 className="text-3xl md:text-5xl font-light text-blush">Awards & <span className="italic font-serif">Accolades</span></h2>
          </ScrollReveal>
          <div className="space-y-0">
            {awards.map((a, idx) => (
              <ScrollReveal key={idx} delay={(idx % 3 + 1) as 1|2|3} className="flex items-center justify-between py-6 border-b border-blush/10 last:border-0 group">
                <div>
                  <p className="font-serif text-blush text-lg group-hover:text-rose transition-colors">{a.award}</p>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-blush/40 mt-1">{a.body}</p>
                </div>
                <span className="font-sans text-2xl font-light text-blush/30 group-hover:text-rose/60 transition-colors">{a.year}</span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Media enquiries */}
      <section className="py-24 px-6 text-center max-w-2xl mx-auto">
        <ScrollReveal>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-plum/50 mb-4">Media Enquiries</p>
          <h2 className="text-3xl font-light text-plum mb-6">Work with <span className="italic font-serif">us</span></h2>
          <p className="font-sans text-sm text-plum/60 leading-relaxed mb-8">
            For editorial requests, interview opportunities, image licensing, or press accreditation, please reach out to our communications team directly.
          </p>
          <a
            href="mailto:press@luxuryevents.com"
            className="inline-block px-8 py-4 bg-rose text-blush font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-plum transition-colors duration-300"
          >
            press@luxuryevents.com
          </a>
        </ScrollReveal>
      </section>
    </main>
  );
}
