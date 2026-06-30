import ScrollReveal from "@/components/layout/ScrollReveal";
import Image from "@/components/common/Image";
import { Link } from "react-router-dom";

const values = [
  {
    title: "Uncompromising Detail",
    body: "We measure the gap between ordinary and extraordinary in millimetres. Every fold, every fragrance, every pause in the music is deliberate.",
  },
  {
    title: "Client Sanctity",
    body: "Your vision is sacred. We listen before we speak, refine before we suggest, and remain invisible on the day so you can be fully present.",
  },
  {
    title: "Artisanal Excellence",
    body: "Our global network of florists, architects, lighting designers, and culinary curators are the finest in their discipline — full stop.",
  },
  {
    title: "Sustainable Luxury",
    body: "Beauty should not cost the earth. We source consciously, waste minimally, and partner with vendors who share our commitment to the planet.",
  },
];

const team = [
  {
    name: "Jayaa Mishra",
    role: "Web Developer & Digital Strategist",
    bio: "Jayaa Mishra is a web developer and digital strategist based in Lucknow, Uttar Pradesh. She is focused on building digital solutions that combine technology, user experience, and business impact. Her experience spans website development, UX improvements, performance optimisation, and stakeholder collaboration across business and AgriTech projects. Alongside frontend development with React.js, she is actively expanding her skills in backend development, cloud technologies, and scalable web applications — continuously exploring the intersection of web development, UX, product thinking, and digital transformation.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  },
];

const milestones = [
  { year: "2012", event: "Studio founded in New Delhi by Jayaa Mishra" },
  { year: "2014", event: "First destination wedding — Lake Pichola, Udaipur" },
  { year: "2016", event: "International debut with The Singapore Business Council Gala" },
  { year: "2018", event: "Architectural Digest India cover feature" },
  { year: "2020", event: "Launched virtual & hybrid event division during the pandemic" },
  { year: "2022", event: "500th event milestone — Tuscany harvest wedding" },
  { year: "2024", event: "Named Best Luxury Event Studio — International Luxury Event Awards" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <div className="bg-rose h-16 w-full fixed top-0 z-40" />

      {/* Hero */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop"
            alt="Studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-plum/60 via-plum/30 to-blush" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pb-12">
          <ScrollReveal>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-blush/60 mb-6">About Us</p>
            <h1 className="text-5xl md:text-7xl font-light text-blush leading-[1.1] drop-shadow-xl">
              Creating <span className="italic font-serif">Timeless</span> Memories
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Origin story */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <ScrollReveal direction="left">
          <div className="relative aspect-4/5 overflow-hidden rounded-sm shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1000&auto=format&fit=crop"
              alt="Luxury event setup"
              className="w-full h-full object-cover"
            />
          </div>
        </ScrollReveal>
        <div>
          <ScrollReveal>
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-rose border-b border-rose/20 pb-3 inline-block mb-8">Our Story</p>
            <h2 className="text-4xl md:text-5xl font-light text-plum leading-tight mb-8">
              Born from a belief that<br /><span className="italic font-serif">events are architecture</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={1} className="space-y-6 font-serif text-lg text-plum/70 leading-relaxed">
            <p>
              In 2012, Jayaa Mishra returned to New Delhi after years studying architecture and design in Milan with one conviction: the most transformative spaces are temporary ones. A dinner table dressed perfectly for a single evening. A mandap that exists for a few hours but lives in memory forever.
            </p>
            <p>
              What began as a small design studio handling intimate gatherings has grown into one of South Asia's most sought-after luxury event houses — crafting experiences for royalty, global corporations, and families who understand that the details are everything.
            </p>
            <p>
              We have never believed in templates. Every event we create is a bespoke composition — its own world, its own language, its own reason to exist.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-plum py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-blush">
          {[
            { value: "500+", label: "Events Created" },
            { value: "18", label: "Countries" },
            { value: "98%", label: "Client Retention" },
            { value: "12", label: "Years of Excellence" },
          ].map(s => (
            <ScrollReveal key={s.label}>
              <p className="text-5xl font-light mb-3">{s.value}</p>
              <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-blush/50">{s.label}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-32">
        <ScrollReveal className="mb-20">
          <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-rose border-b border-rose/20 pb-3 inline-block mb-6">What We Stand For</p>
          <h2 className="text-4xl md:text-5xl font-light text-plum">
            Our <span className="italic font-serif">principles</span>
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((v, idx) => (
            <ScrollReveal key={v.title} delay={(idx % 3 + 1) as 1|2|3} className="bg-white border border-rose/10 hover:border-rose/30 p-10 group transition-all duration-300">
              <h3 className="font-serif text-xl text-plum mb-4 group-hover:text-rose transition-colors">{v.title}</h3>
              <p className="font-sans text-sm text-plum/60 leading-relaxed">{v.body}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Philosophy pull quote */}
      <section className="bg-rose py-32 px-6 text-center">
        <ScrollReveal className="max-w-3xl mx-auto">
          <p className="font-serif text-2xl md:text-4xl text-blush leading-relaxed font-light italic">
            &ldquo;We don't plan events. We author living syntax — where every texture, shadow, and sound is a deliberate word in a beautiful story.&rdquo;
          </p>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-blush/60 mt-8">— Jayaa Mishra, Founder</p>
        </ScrollReveal>
      </section>

      {/* Founder */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-32">
        <ScrollReveal className="mb-16">
          <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-rose border-b border-rose/20 pb-3 inline-block mb-6">The People</p>
          <h2 className="text-4xl md:text-5xl font-light text-plum">
            Meet the <span className="italic font-serif">founder</span>
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left" className="group">
            <div className="relative aspect-3/4 overflow-hidden rounded-sm bg-rose/5 shadow-2xl">
              <img
                src={team[0].image}
                alt={team[0].name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-rose border-b border-rose/20 pb-3 inline-block mb-6">{team[0].role}</p>
            <h3 className="text-4xl md:text-5xl font-light text-plum mb-8">
              {team[0].name.split(' ')[0]} <span className="italic font-serif">{team[0].name.split(' ').slice(1).join(' ')}</span>
            </h3>
            <p className="font-sans text-sm text-plum/65 leading-[1.9] mb-8">{team[0].bio}</p>
            <div className="flex flex-wrap gap-3 mt-6">
              {["React.js · JavaScript", "UX & Digital Strategy", "Backend & Cloud", "Lucknow, India"].map(tag => (
                <span key={tag} className="font-sans text-[9px] tracking-[0.2em] uppercase text-plum/60 border border-plum/15 px-4 py-2">{tag}</span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-32 px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="mb-16 text-center">
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-rose border-b border-rose/20 pb-3 inline-block mb-6">Our Journey</p>
            <h2 className="text-4xl font-light text-plum">A decade of <span className="italic font-serif">extraordinary</span></h2>
          </ScrollReveal>
          <div className="space-y-0">
            {milestones.map((m, idx) => (
              <ScrollReveal key={m.year} delay={(idx % 3 + 1) as 1|2|3} className="flex gap-8 py-8 border-b border-plum/10 last:border-0 group items-start">
                <span className="font-sans text-2xl font-light text-rose/40 group-hover:text-rose transition-colors w-16 shrink-0">{m.year}</span>
                <p className="font-serif text-lg text-plum/75 leading-snug group-hover:text-plum transition-colors">{m.event}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center max-w-2xl mx-auto">
        <ScrollReveal>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-plum/40 mb-6">Work With Us</p>
          <h2 className="text-4xl font-light text-plum mb-8">
            Let's create something <span className="italic font-serif text-rose">together</span>
          </h2>
          <Link
            to="/inquiry"
            className="inline-block px-10 py-4 bg-rose text-blush font-sans text-xs tracking-[0.2em] uppercase hover:bg-plum transition-colors duration-300"
          >
            Begin Your Inquiry
          </Link>
        </ScrollReveal>
      </section>
    </main>
  );
}
