import { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/layout/ScrollReveal";
import { ArrowLeft } from "lucide-react";

export default function EditorialHarpers() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const paragraphs = [
    "Forty guests. One overwater villa. A ceremony that began before the sun had fully risen. By the time the couple exchanged rings, the horizon was the colour of a marigold — and forty people, many of whom had never cried at a wedding in their lives, were quietly weeping.",
    "This was the Maldives commission — the studio's smallest, by headcount, and perhaps its most profound. The brief came from a couple who had attended large weddings their entire lives and decided, with quiet certainty, that they wanted the opposite.",
    "'They said: we want to feel like we're the only two people in the world, but we want the people we love most to witness it,' Jayaa recalls. 'That paradox — intimacy at scale, privacy in public — is the most interesting creative challenge there is.'",
    "The studio's solution was to use the geography itself as the architecture. No marquees, no backdrops, no florals that competed with the ocean. Instead: a single arch of white gardenia and silk-grass, a runner of crushed coral, and the Indian Ocean in every direction. 'We spent more time deciding what to remove than what to add,' she says.",
    "The dinner that evening — nine courses, designed around the couple's shared memory of a meal they once had in coastal Kerala — was served at a single table above the water. Guests ate barefoot. The dress code, unusually, was soft white and ivory. At midnight, the couple's playlist — built from 20 years of songs they'd shared — began. Nobody went to bed until the stars had faded.",
    "Forty people. One overwater villa. A morning that none of them will forget for the rest of their lives.",
  ];

  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <div className="bg-rose h-16 w-full fixed top-0 z-40" />

      <section className="relative h-[65vh] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1538681105587-85640961bf8b?q=80&w=2000&auto=format&fit=crop" alt="Maldives" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-plum/60 via-plum/30 to-blush" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-12 max-w-5xl mx-auto">
          <ScrollReveal>
            <Link to="/press" className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-blush/70 hover:text-blush transition-colors group mb-8">
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" /> Back to Press
            </Link>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-rose mb-2">Editorial · June 2024</p>
            <p className="font-sans text-sm tracking-widest uppercase text-blush/60 mb-3">Harper's Bazaar</p>
            <h1 className="text-4xl md:text-6xl font-light text-blush leading-tight drop-shadow-lg max-w-3xl">Barefoot Luxury: The Maldives Wedding That Redefined Romance</h1>
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
            &ldquo;We spent more time deciding what to remove than what to add.&rdquo;
          </blockquote>
        </ScrollReveal>
        {paragraphs.slice(2, 4).map((p, i) => (
          <ScrollReveal key={i}>
            <p className="font-sans text-sm leading-[1.9] text-plum/75">{p}</p>
          </ScrollReveal>
        ))}
        <div className="grid grid-cols-2 gap-4 my-12">
          {[
            "https://images.unsplash.com/photo-1439130490301-25e322d88054?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1000&auto=format&fit=crop",
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
