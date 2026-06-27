import ScrollReveal from "@/components/layout/ScrollReveal";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <div className="bg-rose h-16 w-full fixed top-0 z-40"></div>
      
      <section className="pt-48 pb-32 px-6 max-w-4xl mx-auto text-center min-h-[60vh] flex flex-col justify-center">
        <ScrollReveal>
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/50 mb-8">About Us</p>
        </ScrollReveal>
        <ScrollReveal delay={1}>
          <h1 className="text-5xl md:text-7xl font-light leading-[1.1] mb-12 text-plum">
            Creating <span className="italic">Timeless</span> Memories
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={2}>
          <p className="font-serif text-lg md:text-xl text-plum/75 leading-relaxed">
            Welcome to Luxury Events. We are a premier event management and design studio dedicated to crafting unforgettable experiences. Our team of visionaries brings your dreams to reality with meticulous planning and breathtaking design.
          </p>
        </ScrollReveal>
      </section>
    </main>
  );
}
