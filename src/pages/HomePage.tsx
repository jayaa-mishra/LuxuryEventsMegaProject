import Image from "@/components/common/Image";
import ScrollReveal from "@/components/layout/ScrollReveal";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush pb-32">
      <div className="bg-rose h-16 w-full fixed top-0 z-40"></div>
      
      {/* Cinematic Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-plum/60 via-plum/40 to-plum/90 z-10"></div>
          <Image 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2500&auto=format&fit=crop" 
            alt="Luxury Event Decor"
            fill
            className="object-cover"
          />
        </motion.div>

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-xs tracking-[0.3em] uppercase text-blush/80 mb-6"
          >
            Luxury Event Management
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight text-blush mb-8 drop-shadow-2xl"
          >
            Crafting <span className="italic font-serif text-peach">Unforgettable</span> Memories
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
          >
            <a href="/portfolio" className="px-8 py-4 bg-rose text-blush font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white hover:text-plum hover:shadow-xl hover:shadow-white/10 rounded-sm">
              View Portfolio
            </a>
            <a href="/inquiry" className="px-8 py-4 border border-blush/30 text-blush font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-blush hover:text-plum rounded-sm backdrop-blur-sm">
              Inquire Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* Trusted By / Social Proof Band */}
      <section className="border-b border-plum/5 bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-12 opacity-40 grayscale mix-blend-multiply">
           {/* Placeholder text mimicking luxury brand logos for styling purposes */}
           <span className="font-serif text-2xl tracking-widest uppercase">Vogue</span>
           <span className="font-sans font-bold text-xl tracking-[0.3em] uppercase">Cartier</span>
           <span className="font-serif italic text-2xl tracking-wider">Four Seasons</span>
           <span className="font-sans text-xl tracking-[0.4em] uppercase">Chanel</span>
           <span className="font-serif text-2xl tracking-widest uppercase">Bvlgari</span>
        </div>
      </section>

      {/* The Studio Intro */}
      <section className="pt-32 pb-16 flex flex-col lg:flex-row min-h-[90vh]">
        <ScrollReveal direction="left" className="w-full lg:w-1/2 p-6 md:p-12 lg:p-24 flex items-center">
          <div className="relative w-full aspect-[4/5] bg-rose/5 shadow-2xl shadow-plum/5 overflow-hidden group rounded-sm">
              <Image 
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop" 
                alt="Bespoke Table Setting"
                fill
                unoptimized
                className="object-cover img-zoom"
              />
          </div>
        </ScrollReveal>
        
        <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-24 flex flex-col justify-center">
          <ScrollReveal>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-plum/50 mb-8 border-b border-rose/20 pb-4 inline-block">The Studio</p>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h2 className="text-4xl md:text-6xl font-light leading-[1.2] mb-12 text-plum">
              The <span className="italic">Art</span> of Curation
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={2} className="font-serif text-lg md:text-xl text-plum/75 leading-relaxed space-y-8 max-w-xl">
            <p>
              Founded on the principle that the most memorable events are felt just as much as they are seen, we design environments that evoke extraordinary emotion.
            </p>
            <p>
              Our process is highly collaborative and relentlessly detailed. From sweeping architectural installments to the precise weight of the flatware, no element goes unconsidered.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Showcase */}
      <section className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="flex justify-between items-end mb-16 border-b border-plum/10 pb-8">
            <h2 className="text-4xl md:text-5xl font-light text-plum">Featured <span className="italic">Commissions</span></h2>
            <a href="/portfolio" className="hidden md:inline-block font-sans text-[10px] tracking-[0.2em] uppercase text-plum/50 hover:text-rose transition-colors">View Complete Archive</a>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <ScrollReveal delay={1} className="group relative aspect-[4/3] overflow-hidden rounded-sm cursor-pointer shadow-xl">
               <div className="absolute inset-0 bg-plum/20 group-hover:bg-plum/40 transition-colors duration-500 z-10" />
               <Image src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2000&auto=format&fit=crop" alt="Corporate Gala" fill className="object-cover img-zoom" />
               <div className="absolute bottom-0 left-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="bg-blush text-plum font-sans text-[9px] tracking-[0.2em] uppercase px-3 py-1 mb-4 inline-block">Gala</span>
                  <h3 className="text-3xl font-serif text-blush">The Metropolitan Gala</h3>
               </div>
             </ScrollReveal>
             
             <ScrollReveal delay={2} className="group relative aspect-[4/3] overflow-hidden rounded-sm cursor-pointer shadow-xl">
               <div className="absolute inset-0 bg-plum/20 group-hover:bg-plum/40 transition-colors duration-500 z-10" />
               <Image src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop" alt="Destination Wedding" fill className="object-cover img-zoom" />
               <div className="absolute bottom-0 left-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="bg-blush text-plum font-sans text-[9px] tracking-[0.2em] uppercase px-3 py-1 mb-4 inline-block">Wedding</span>
                  <h3 className="text-3xl font-serif text-blush">Lake Como Estate</h3>
               </div>
             </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Storytelling Timeline: The Process */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
         <ScrollReveal className="text-center mb-24">
            <h2 className="font-sans text-[10px] tracking-[0.3em] uppercase text-plum/50 mb-4">Our Methodology</h2>
            <p className="text-4xl font-light text-plum">How we <span className="italic">create</span> magic</p>
         </ScrollReveal>

         <div className="space-y-32">
            {[
              { title: "Dream", desc: "Every masterpiece begins with a vision. We sit down with you to unearth the aesthetic, the mood, and the feeling you want to evoke.", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1500&auto=format&fit=crop" },
              { title: "Design", desc: "Our architects of ambiance render your dream into blueprints. Color palettes, textures, and spatial flows are meticulously mapped.", img: "https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?q=80&w=1500&auto=format&fit=crop" },
              { title: "Execute", desc: "Precision meets passion. Our global network of elite artisans and producers bring the renders to life, ensuring flawless delivery.", img: "https://images.unsplash.com/photo-1540656041131-01eaeb3841e4?q=80&w=1500&auto=format&fit=crop" },
              { title: "Celebrate", desc: "You remain a guest at your own event. We remain invisible orchestrators, ensuring every micro-interaction is perfection.", img: "https://images.unsplash.com/photo-1485872299829-c673f5194813?q=80&w=1500&auto=format&fit=crop" }
            ].map((step, idx) => (
               <div key={step.title} className={`flex flex-col md:flex-row items-center gap-12 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <ScrollReveal direction={idx % 2 === 0 ? "right" : "left"} className="w-full md:w-1/2">
                    <div className="relative aspect-video rounded-sm overflow-hidden shadow-2xl">
                       <Image src={step.img} alt={step.title} fill className="object-cover hover:scale-105 transition-transform duration-1000" />
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={1} className="w-full md:w-1/2 flex flex-col justify-center px-8">
                     <span className="font-sans text-[10px] tracking-[0.3em] text-rose uppercase mb-4 border-b border-rose/20 pb-2 inline-block max-w-max">Phase 0{idx + 1}</span>
                     <h3 className="text-4xl font-serif text-plum mb-6">{step.title}</h3>
                     <p className="text-plum/60 font-sans leading-relaxed text-sm">{step.desc}</p>
                  </ScrollReveal>
               </div>
            ))}
         </div>
      </section>

      {/* Numbers That Matter */}
      <section className="py-24 bg-plum text-blush px-6">
         <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <ScrollReveal delay={1}>
               <p className="text-5xl font-light mb-2">500+</p>
               <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-blush/50">Events Managed</p>
            </ScrollReveal>
            <ScrollReveal delay={2}>
               <p className="text-5xl font-light mb-2">15</p>
               <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-blush/50">Countries</p>
            </ScrollReveal>
            <ScrollReveal delay={3}>
               <p className="text-5xl font-light mb-2">98%</p>
               <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-blush/50">Client Retention</p>
            </ScrollReveal>
            <ScrollReveal delay={4}>
               <p className="text-5xl font-light mb-2">12</p>
               <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-blush/50">Years of Excellence</p>
            </ScrollReveal>
         </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-48 px-6 bg-pinstripe relative">
        <div className="absolute inset-x-0 inset-y-0 bg-blush/70 pointer-events-none" />
        <ScrollReveal className="max-w-4xl mx-auto text-center relative z-10">
           <h2 className="text-3xl md:text-5xl leading-[1.3] font-light text-plum/85">
             &ldquo;We don&apos;t just plan events. We author <span className="italic text-rose">living syntax</span>&mdash;where every texture, shadow, and sound is a deliberate word in a beautiful story.&rdquo;
           </h2>
        </ScrollReveal>
      </section>

      {/* Team Grid */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
         <ScrollReveal>
           <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/50 mb-16 border-b border-rose/20 pb-4">Our Expertise</h2>
         </ScrollReveal>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {[
              { name: "Jayaa Mishra", role: "Creative Director", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1500&auto=format&fit=crop" },
              { name: "Alexander Sterling", role: "Production Head", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1500&auto=format&fit=crop" },
              { name: "Elena Vasquez", role: "Lead Event Designer", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1500&auto=format&fit=crop" },
              { name: "Marcus Chen", role: "Client Relations", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1500&auto=format&fit=crop" }
            ].map((member, index) => (
               <ScrollReveal key={member.name} delay={(index % 4) as 0 | 1 | 2 | 3} className="group card-hover">
                 <div className="relative w-full aspect-[3/4] mb-6 bg-rose/5 overflow-hidden rounded-sm border border-plum/5">
                    <Image 
                      src={member.image}
                      alt={member.name}
                      fill
                      unoptimized
                      className="object-cover grayscale mix-blend-multiply opacity-90 group-hover:grayscale-0 group-hover:opacity-100 img-zoom transition-all duration-700"
                    />
                 </div>
                 <h3 className="font-sans text-xs tracking-[0.15em] uppercase text-plum mb-2 transition-colors duration-300 group-hover:text-rose">{member.name}</h3>
                 <p className="font-serif text-plum/55 italic transition-colors duration-300 group-hover:text-plum/80">{member.role}</p>
               </ScrollReveal>
            ))}
         </div>
      </section>
    </main>
  );
}
