import { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/layout/ScrollReveal";
import { ArrowLeft } from "lucide-react";

export default function EditorialAD() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const paragraphs = [
    "The brief was deceptively simple: a pre-wedding celebration in the haveli courtyard of a 17th-century Jodhpur property. 200 guests. A dinner. Some flowers. 'We knew within twenty minutes that we were building a world,' says Jayaa Mishra.",
    "What the studio built over eight days — with a team of 34 artisans, four local craft cooperatives, and one very patient structural engineer — was an installation that Architectural Digest India's editor called 'the most beautiful interior we have photographed this year, and it existed for exactly one evening.'",
    "80,000 marigold petals, hand-sourced from the mandis of Rajasthan, were woven into a ceiling canopy that filtered the setting sun into gold. 400 hand-hammered brass lanterns were positioned at precise heights to create a 'breathing light' — the studio's term for an illumination that shifts almost imperceptibly as the evening progresses, moving from the warmth of late afternoon to the intimacy of midnight.",
    "The long table — 40 metres, hand-carved sheesham wood — was set with antique silverware that the family's grandmother had never seen used. A detail so personal that three of the 200 guests cried before the first course was served.",
    "'That is what we are really doing,' Jayaa says. 'We are reaching into a family's history and holding it up, carefully, for one evening. Making the invisible visible. Making the quiet things loud — without making them ordinary.'",
    "The evening ended at 3am. The canopy of petals was composted the following morning. The lanterns were donated to a school in a nearby village. Of the installation, nothing remains except photographs — and the memory of 200 people who were, for a single evening, genuinely transported.",
  ];

  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <div className="bg-rose h-16 w-full fixed top-0 z-40" />

      <section className="relative h-[65vh] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?q=80&w=2000&auto=format&fit=crop" alt="AD" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-plum/60 via-plum/30 to-blush" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-12 max-w-5xl mx-auto">
          <ScrollReveal>
            <Link to="/press" className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-blush/70 hover:text-blush transition-colors group mb-8">
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" /> Back to Press
            </Link>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-rose mb-2">Spotlight · September 2023</p>
            <p className="font-sans text-sm tracking-widest uppercase text-blush/60 mb-3">Architectural Digest India</p>
            <h1 className="text-4xl md:text-6xl font-light text-blush leading-tight drop-shadow-lg max-w-3xl">Rajasthan by Candlelight: The Soirée That Stopped Time</h1>
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
            &ldquo;We are reaching into a family's history and holding it up, carefully, for one evening. Making the invisible visible.&rdquo;
          </blockquote>
        </ScrollReveal>
        {paragraphs.slice(2, 4).map((p, i) => (
          <ScrollReveal key={i}>
            <p className="font-sans text-sm leading-[1.9] text-plum/75">{p}</p>
          </ScrollReveal>
        ))}
        <div className="grid grid-cols-2 gap-4 my-12">
          {[
            "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=1000&auto=format&fit=crop",
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
