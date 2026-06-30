import { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/layout/ScrollReveal";
import { ArrowLeft } from "lucide-react";

export default function EditorialWallpaper() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const paragraphs = [
    "The brief arrived in seven words: 'We want something that feels like Japan.' Jayaa Mishra spent six weeks in Tokyo before she responded with a proposal. The result — a product launch for a European fashion house's first Asia-Pacific collection — became the most-discussed brand event of the season, and the only one nobody photographed.",
    "That was deliberate. Phones were placed in lacquered boxes at the entrance — a decision that generated controversy before the evening began and reverence before it ended. 'Silence was a design material,' Jayaa says. 'Not absence. Presence. The absence of noise as a form of intention.'",
    "The space — a converted 1960s ceramics workshop in the Yanaka neighbourhood of Tokyo — was dressed in a way that owed more to ikebana than event production. Three arrangements, each by a different master of the form. A single long table, bare except for hand-thrown ceramic bowls containing the collection's signature fragrance. No branding visible from any seated position.",
    "The collection itself was revealed in the final fifteen minutes, when the studio's lighting designer — working with a precision usually reserved for theatre — brought the pieces, which had been present in the room since guests arrived, slowly into focus.",
    "'Guests had been sitting next to the collection for two hours without knowing it,' Jayaa says. 'When they realised, the reaction was extraordinary. Recognition. The sense that something had been revealed rather than presented. That is a very different emotional register.'",
    "Wallpaper* named it Brand Moment of the Year. The fashion house has asked the studio to design every future global launch.",
  ];

  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <div className="bg-rose h-16 w-full fixed top-0 z-40" />

      <section className="relative h-[65vh] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop" alt="Tokyo" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-plum/60 via-plum/30 to-blush" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-12 max-w-5xl mx-auto">
          <ScrollReveal>
            <Link to="/press" className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-blush/70 hover:text-blush transition-colors group mb-8">
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" /> Back to Press
            </Link>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-rose mb-2">Design · April 2024</p>
            <p className="font-sans text-sm tracking-widest uppercase text-blush/60 mb-3">Wallpaper*</p>
            <h1 className="text-4xl md:text-6xl font-light text-blush leading-tight drop-shadow-lg max-w-3xl">Silence as a Design Material: The Tokyo Launch That Said Everything</h1>
          </ScrollReveal>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-6 md:px-12 py-24 space-y-8">
        {paragraphs.slice(0, 2).map((p, i) => (
          <ScrollReveal key={i}>
            <p className={`leading-[1.9] text-plum/75 ${i === 0 ? "font-serif text-xl" : "font-sans text-sm"}`}>{p}</p>
          </ScrollReveal>
        ))}
        <ScrollReveal className="border-l-2 border-rose pl-8 py-4 my-12">
          <blockquote className="font-serif text-2xl md:text-3xl text-plum/80 italic leading-snug">
            &ldquo;Silence was a design material. Not absence. Presence. The absence of noise as a form of intention.&rdquo;
          </blockquote>
        </ScrollReveal>
        {paragraphs.slice(2, 4).map((p, i) => (
          <ScrollReveal key={i}>
            <p className="font-sans text-sm leading-[1.9] text-plum/75">{p}</p>
          </ScrollReveal>
        ))}
        <div className="grid grid-cols-2 gap-4 my-12">
          {[
            "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
          ].map((src, i) => (
            <ScrollReveal key={i} delay={(i + 1) as 1|2}>
              <div className="aspect-4/3 overflow-hidden rounded-sm">
                <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </ScrollReveal>
          ))}
        </div>
        {paragraphs.slice(4).map((p, i) => (
          <ScrollReveal key={i}>
            <p className="font-sans text-sm leading-[1.9] text-plum/75">{p}</p>
          </ScrollReveal>
        ))}
      </article>

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
