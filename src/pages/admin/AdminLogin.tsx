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
    <main className="min-h-screen bg-rose flex items-center justify-center p-6 selection:bg-plum selection:text-blush">
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
  );
}
