import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { Instagram, Twitter, Linkedin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-plum text-blush pt-32 pb-12 px-6 md:px-12 relative overflow-hidden selection:bg-rose selection:text-blush">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rose/5 rounded-full blur-[120px] pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-32">
          
          {/* Brand Story */}
          <div className="lg:col-span-2 max-w-md">
            <Link to="/" className="text-3xl font-serif mb-8 block hover:text-rose transition-colors duration-300">
              The Studio
            </Link>
            <p className="font-sans text-sm leading-relaxed text-blush/60 mb-8">
              Founded on the principle that the most memorable events are felt just as much as they are seen. We design environments that evoke extraordinary emotion, serving discerning clients globally.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-blush/10 flex items-center justify-center text-blush/60 hover:border-rose hover:text-rose hover:bg-rose/5 transition-all duration-300">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-blush/10 flex items-center justify-center text-blush/60 hover:border-rose hover:text-rose hover:bg-rose/5 transition-all duration-300">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-blush/10 flex items-center justify-center text-blush/60 hover:border-rose hover:text-rose hover:bg-rose/5 transition-all duration-300">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-blush/40 mb-8">Navigation</h4>
            <ul className="space-y-4 font-sans text-sm text-blush/80">
              <li><Link to="/" className="hover:text-rose transition-colors inline-flex items-center group">Home <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/portfolio" className="hover:text-rose transition-colors inline-flex items-center group">Portfolio <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/inquiry" className="hover:text-rose transition-colors inline-flex items-center group">Inquire <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/admin/login" className="hover:text-rose transition-colors inline-flex items-center group">Studio Login <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-blush/40 mb-8">Contact</h4>
            <ul className="space-y-4 font-sans text-sm text-blush/80">
              <li>
                <a href="mailto:hello@thestudio.com" className="hover:text-rose transition-colors border-b border-transparent hover:border-rose pb-0.5">
                  hello@thestudio.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:text-rose transition-colors border-b border-transparent hover:border-rose pb-0.5">
                  +1 (800) 555-0199
                </a>
              </li>
              <li className="pt-4 text-blush/50 text-xs">
                725 5th Ave, New York<br />
                NY 10022, United States
              </li>
            </ul>
          </div>
        </ScrollReveal>

        {/* CTA Banner inside Footer */}
        <ScrollReveal className="w-full bg-rose/5 border border-rose/10 p-12 md:p-24 rounded-sm flex flex-col md:flex-row items-center justify-between gap-12 mb-24 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-rose/0 via-rose/[0.02] to-rose/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          <div className="max-w-2xl relative z-10 text-center md:text-left">
            <h3 className="text-4xl md:text-5xl font-light mb-4">Ready to <span className="italic font-serif">design</span> your moment?</h3>
            <p className="font-sans text-sm text-blush/60">Our calendar is currently open for select global events.</p>
          </div>
          <div className="relative z-10 shrink-0">
            <Link to="/inquiry" className="px-10 py-5 bg-rose text-blush font-sans text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-plum transition-all duration-300 inline-block text-center rounded-sm">
              Begin Inquiry
            </Link>
          </div>
        </ScrollReveal>

        {/* Legal Bottom */}
        <div className="border-t border-blush/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-[10px] tracking-[0.1em] uppercase text-blush/30">
          <p>&copy; {currentYear} The Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/client/portal" className="hover:text-blush/60 transition-colors">Client Portal</Link>
            <Link to="/admin/dashboard" className="hover:text-blush/60 transition-colors">Staff Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
