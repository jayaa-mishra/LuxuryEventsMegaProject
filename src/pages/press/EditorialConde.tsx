import { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/layout/ScrollReveal";
import { ArrowLeft } from "lucide-react";

export default function EditorialConde() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const paragraphs = [
    "The first sign that something unusual was happening came on the morning after the wedding, when 85 of 85 guests had chosen not to catch their flights. By day three, several had called ahead to cancel the rest of their week's plans. By day four, the couple's parents were asking Jayaa Mishra if they could extend the villa booking.",
    "The Lake Como Estate wedding — three days in a 16th-century Montalcino property at the peak of the Brunello harvest — had become, against all odds and entirely on purpose, the kind of event that nobody wanted to end.",
    "'The goal was always for the wedding to feel like the beginning of something, not the end of the planning process,' Jayaa says. 'We wanted guests to leave feeling like they'd been somewhere — not just witnessed something.'",
    "The studio spent four months in Tuscany before a single flower was ordered, working with the villa's estate manager, a Michelin-starred chef from nearby Montalcino, and a local wine producer whose Brunello reserve had never before been used for an event. The result was a celebration that felt rooted in the landscape — not imposed upon it.",
    "The ceremony was held in the vine-covered loggia at golden hour. The dinner, a nine-course harvest menu, stretched past midnight. On the second day, guests were taken by vintage Fiat Cinquecento to a truffle market in San Quirico d'Orcia. On the third, a private tasting at the estate's barrel room, followed by a lazy afternoon in the olive grove.",
    "'We designed an experience, not an event,' Jayaa says simply. 'Those are very different things.'",
  ];

  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <div className="bg-rose h-16 w-full fixed top-0 z-40" />

      <section className="relative h-[65vh] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1470753937643-efeb931202a9?q=80&w=2000&auto=format&fit=crop" alt="Tuscany" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-plum/60 via-plum/30 to-blush" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-12 max-w-5xl mx-auto">
          <ScrollReveal>
            <Link to="/press" className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-blush/70 hover:text-blush transition-colors group mb-8">
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" /> Back to Press
            </Link>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-rose mb-2">Travel Feature · January 2024</p>
            <p className="font-sans text-sm tracking-widest uppercase text-blush/60 mb-3">Condé Nast Traveller</p>
            <h1 className="text-4xl md:text-6xl font-light text-blush leading-tight drop-shadow-lg max-w-3xl">The Tuscany Wedding That Made 85 Guests Stay Three Extra Days</h1>
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
            &ldquo;We designed an experience, not an event. Those are very different things.&rdquo;
          </blockquote>
        </ScrollReveal>
        {paragraphs.slice(2, 4).map((p, i) => (
          <ScrollReveal key={i}>
            <p className="font-sans text-sm leading-[1.9] text-plum/75">{p}</p>
          </ScrollReveal>
        ))}
        <div className="grid grid-cols-2 gap-4 my-12">
          {[
            "https://images.unsplash.com/photo-1536185524219-82d4476e45c2?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop",
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
