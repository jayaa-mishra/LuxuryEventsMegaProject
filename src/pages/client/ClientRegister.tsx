import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

export default function ClientRegister() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setIsSubmitting(true);
    try {
      await authService.register({ name: form.name, email: form.email, password: form.password, role: 'client' });
      const success = await login({ email: form.email, password: form.password });
      if (success) navigate('/client/portal');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-plum selection:bg-rose selection:text-blush">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-rose shadow-lg shadow-rose/20">
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
            <Link to="/admin/login" className="px-4 py-2 bg-blush text-plum font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-white transition-colors duration-200 rounded-sm">
              Admin
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex items-center justify-center p-6 pt-28">
      <div className="w-full max-w-md">
        <div className="text-center mb-16">
          <h1 className="text-blush text-4xl md:text-5xl font-light mb-4">
            Create <span className="italic font-serif">Account</span>
          </h1>
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-blush/50">
            Join to track your event journey
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {[
            { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your Name' },
            { label: 'Email Address', name: 'email', type: 'email', placeholder: 'your@email.com' },
            { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
            { label: 'Confirm Password', name: 'confirm', type: 'password', placeholder: '••••••••' },
          ].map((field) => (
            <div key={field.name} className="border-b border-blush/20">
              <label className="font-sans text-[9px] tracking-[0.3em] uppercase text-blush/40 block mb-2 text-center">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                required
                value={(form as any)[field.name]}
                onChange={handleChange}
                className="w-full bg-transparent border-none outline-none py-2 text-center text-blush font-serif text-xl placeholder:text-blush/20"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          <div className="pt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="block w-full bg-rose text-blush font-sans text-xs uppercase tracking-[0.2em] py-5 text-center hover:bg-blush hover:text-plum transition-colors duration-300 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>

        <div className="mt-12 text-center">
          <p className="font-sans text-[10px] tracking-[0.1em] uppercase text-blush/40">
            Already have an account?{' '}
            <Link to="/client/login" className="text-rose hover:text-blush transition-colors border-b border-rose/30 pb-0.5">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      </main>
    </div>
  );
}
