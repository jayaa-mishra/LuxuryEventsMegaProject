import { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/layout/ScrollReveal";
import { ArrowLeft } from "lucide-react";

const article = {
  publication: "Vogue Living",
  date: "March 2024",
  category: "Feature",
  title: "The Studio Redefining Luxury Events for a New Generation",
  hero: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2000&auto=format&fit=crop",
  paragraphs: [
    "There is a certain kind of event planner who has mastered the art of making you feel that everything is effortless — that the 14,000 flowers simply arranged themselves, that the chandelier simply happened to be the right height, that the table simply happened to catch the last hour of golden Rajasthani light. Jayaa Mishra is that kind of planner. But she would resist the word 'planner' entirely.",
    "'I am not a planner,' she says, over chai in the Lutyens' Delhi home that doubles as her studio. 'A planner follows a checklist. What we do is write a story. The venue is the setting, the guest is the protagonist, and every element — the scent in the air, the texture of the napkin, the timing of the first chord — is a line of that story.'",
    "Her studio, which she founded over a decade ago from a single rented room in South Delhi, now produces some of the most talked-about events in the world. Last year alone: a gala at The Oberoi that had 320 guests asking for a sequel; a Maldives wedding so intimate it made the couple feel like the only two people on earth; and a corporate launch in Tokyo that a Japanese fashion house described as 'the event that made us believe in events again.'",
    "What she brings — and what no algorithm can replicate — is a sensibility that is entirely her own. She absorbs a client's life, their relationships, their aesthetic, their unspoken desires, and returns it to them as an evening. 'The greatest compliment I have ever received,' she says, 'was a bride who said: this is the most us thing that has ever happened to us.'",
    "The studio's atelier in Lutyens' Delhi is a lesson in restraint. No mood boards pinned to walls, no swatches fanned across desks. Instead: a long oak table, a single vase of white freesia, and natural light. 'We work very hard to make sure the space feels calm,' she says. 'Because the work we do is not calm. It is extraordinarily demanding. The room needs to absorb that, not amplify it.'",
    "In an industry increasingly dominated by spectacle, scale, and social-media choreography, Jayaa Mishra is doing something quietly revolutionary. She is insisting that the best events are the ones you forget to photograph — because you were too busy living them.",
  ],
  pullQuote: "The greatest compliment I have ever received was a bride who said: this is the most us thing that has ever happened to us.",
  images: [
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop",
  ],
};

export default function EditorialVogue() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return <EditorialPage {...article} />;
}

function EditorialPage(a: typeof article) {
  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <div className="bg-rose h-16 w-full fixed top-0 z-40" />

      {/* Hero */}
      <section className="relative h-[65vh] w-full overflow-hidden">
        <img src={a.hero} alt={a.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-plum/60 via-plum/30 to-blush" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-12 max-w-5xl mx-auto">
          <ScrollReveal>
            <Link to="/press" className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-blush/70 hover:text-blush transition-colors group mb-8">
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" /> Back to Press
            </Link>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-rose mb-2">{a.category} · {a.date}</p>
            <p className="font-sans text-sm tracking-widest uppercase text-blush/60 mb-3">{a.publication}</p>
            <h1 className="text-4xl md:text-6xl font-light text-blush leading-tight drop-shadow-lg max-w-3xl">{a.title}</h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 md:px-12 py-24 space-y-8">
        {a.paragraphs.slice(0, 2).map((p, i) => (
          <ScrollReveal key={i}>
            <p className={`leading-[1.9] text-plum/75 ${i === 0 ? "font-serif text-xl" : "font-sans text-sm"}`}>{p}</p>
          </ScrollReveal>
        ))}

        {/* Pull quote */}
        <ScrollReveal className="border-l-2 border-rose pl-8 py-4 my-12">
          <blockquote className="font-serif text-2xl md:text-3xl text-plum/80 italic leading-snug">
            &ldquo;{a.pullQuote}&rdquo;
          </blockquote>
        </ScrollReveal>

        {a.paragraphs.slice(2, 4).map((p, i) => (
          <ScrollReveal key={i}>
            <p className="font-sans text-sm leading-[1.9] text-plum/75">{p}</p>
          </ScrollReveal>
        ))}

        {/* Mid images */}
        <div className="grid grid-cols-2 gap-4 my-12">
          {a.images.map((src, i) => (
            <ScrollReveal key={i} delay={(i + 1) as 1|2}>
              <div className="aspect-4/3 overflow-hidden rounded-sm">
                <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {a.paragraphs.slice(4).map((p, i) => (
          <ScrollReveal key={i}>
            <p className="font-sans text-sm leading-[1.9] text-plum/75">{p}</p>
          </ScrollReveal>
        ))}
      </article>

      {/* CTA */}
      <section className="bg-plum py-20 px-6 text-center">
        <ScrollReveal>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-blush/40 mb-4">Experience it yourself</p>
          <h2 className="text-3xl font-light text-blush mb-8">Begin your <span className="italic font-serif">inquiry</span></h2>
          <Link to="/inquiry" className="inline-block px-10 py-4 bg-rose text-blush font-sans text-xs tracking-[0.2em] uppercase hover:bg-blush hover:text-plum transition-colors duration-300">
            Inquire Now
          </Link>
        </ScrollReveal>
      </section>
    </main>
  );
}
