import { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/layout/ScrollReveal";
import { ArrowLeft } from "lucide-react";

export default function EditorialFT() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const paragraphs = [
    "The commission that broke all previous benchmarks arrived by handwritten note. No email, no WhatsApp. A folded card, in a thick cream envelope, asking if Jayaa Mishra's studio would consider designing a three-day private celebration in Dubai for a family whose name, at their request, we cannot print. She accepted. She always accepts the impossible ones.",
    "The How to Spend It team spent three days with the studio — in their Delhi atelier, at a floral supplier in the south of France, and on a site visit to the Maldives — to understand what goes into creating an event for clients who have, by definition, already experienced everything.",
    "'The client who has everything is not the hardest client,' she tells us. 'The hardest client is the one who has attended so many forgettable events that they've stopped believing a great one is possible. Our job, first of all, is to restore that belief.'",
    "The studio's working method is deliberately analogue. There are mood boards, yes — handmade ones, assembled with fabric swatches, paint chips, pressed flowers, and printed photographs — but no PowerPoints, no PDF decks. Clients come to the atelier, sit in the light, and are listened to. Sometimes for hours.",
    "'People tell us things they haven't told their therapist,' she says with a laugh. 'Because we aren't going to judge them. We're going to build them an evening around exactly who they are.'",
    "What emerges from those conversations becomes the brief — an internal document that reads less like a production schedule and more like a piece of literary fiction. Characters, arcs, a beginning, a middle, an end. Every supplier they engage must read it. The florist, the chef, the lighting designer, the string quartet. Everyone is telling the same story.",
    "We asked her what she considers the studio's greatest achievement. She pauses for a long time. 'The events nobody has heard of,' she says finally. 'The ones where the family asked us to keep everything private. Those are the ones where the work was most true.' She won't say more than that. She never does.",
  ];

  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <div className="bg-rose h-16 w-full fixed top-0 z-40" />

      <section className="relative h-[65vh] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop" alt="FT" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-plum/60 via-plum/30 to-blush" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-12 max-w-5xl mx-auto">
          <ScrollReveal>
            <Link to="/press" className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-blush/70 hover:text-blush transition-colors group mb-8">
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" /> Back to Press
            </Link>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-rose mb-2">Interview · November 2023</p>
            <p className="font-sans text-sm tracking-widest uppercase text-blush/60 mb-3">Financial Times — How to Spend It</p>
            <h1 className="text-4xl md:text-6xl font-light text-blush leading-tight drop-shadow-lg max-w-3xl">Inside the World's Most Exclusive Event Studio</h1>
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
            &ldquo;The hardest client is the one who has stopped believing a great event is possible. Our job, first of all, is to restore that belief.&rdquo;
          </blockquote>
        </ScrollReveal>
        {paragraphs.slice(2, 5).map((p, i) => (
          <ScrollReveal key={i}>
            <p className="font-sans text-sm leading-[1.9] text-plum/75">{p}</p>
          </ScrollReveal>
        ))}
        <div className="grid grid-cols-2 gap-4 my-12">
          {[
            "https://images.unsplash.com/photo-1540656041131-01eaeb3841e4?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1000&auto=format&fit=crop",
          ].map((src, i) => (
            <ScrollReveal key={i} delay={(i + 1) as 1|2}>
              <div className="aspect-4/3 overflow-hidden rounded-sm">
                <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </ScrollReveal>
          ))}
        </div>
        {paragraphs.slice(5).map((p, i) => (
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
