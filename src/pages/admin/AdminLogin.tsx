import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await login({ email, password });
    setIsSubmitting(false);
    if (success) {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo && JSON.parse(userInfo).role === "client") {
        navigate("/client/portal");
      } else {
        navigate("/admin/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen bg-rose selection:bg-plum selection:text-blush">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-plum shadow-lg shadow-plum/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <Link to="/" className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-blush hover:opacity-70 transition-opacity">
            Luxury Events
          </Link>
          <div className="hidden md:flex items-center gap-8 font-sans text-[11px] tracking-[0.25em] uppercase text-blush">
            <Link to="/portfolio" className="hover:opacity-70 transition-opacity">Portfolio</Link>
            <Link to="/about" className="hover:opacity-70 transition-opacity">About</Link>
            <Link to="/press" className="hover:opacity-70 transition-opacity">Press</Link>
            <Link to="/inquiry" className="hover:opacity-70 transition-opacity">Inquire</Link>
            <Link to="/client/login" className="px-4 py-2 bg-blush text-plum font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-white transition-colors duration-200 rounded-sm">
              Client Portal
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex items-center justify-center p-6 pt-28">
      <div className="w-full max-w-md">
        <div className="text-center mb-16">
          <h1 className="text-blush text-4xl md:text-5xl font-light mb-4">
            Studio <span className="italic">Login</span>
          </h1>
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-blush/60">
            For authorized personnel only
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="border-b border-blush/30">
             <label className="font-sans text-[9px] tracking-[0.3em] uppercase text-blush/50 block mb-2 text-center">Admin Email</label>
             <input 
               type="email" 
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full bg-transparent border-none outline-none py-2 text-center text-blush font-serif text-xl placeholder:text-blush/20"
               placeholder="director@luxuryevents.com"
             />
          </div>
          
          <div className="border-b border-blush/30">
             <label className="font-sans text-[9px] tracking-[0.3em] uppercase text-blush/50 block mb-2 text-center">Password</label>
             <input 
               type="password" 
               required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full bg-transparent border-none outline-none py-2 text-center text-blush font-serif text-xl placeholder:text-blush/20"
               placeholder="••••••••"
             />
          </div>

          <div className="pt-8">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="block w-full bg-blush text-rose font-sans text-xs uppercase tracking-[0.2em] py-5 text-center hover:bg-white transition-colors duration-300 disabled:opacity-50"
            >
              {isSubmitting ? "Authenticating..." : "Authenticate"}
            </button>
          </div>
        </form>

        <div className="mt-16 text-center">
           <Link to="/" className="font-sans text-[9px] tracking-[0.2em] uppercase text-blush/40 hover:text-blush transition-colors border-b border-blush/20 pb-1">
             Return to Portfolio
           </Link>
        </div>
      </div>
      </main>
    </div>
  );
}
