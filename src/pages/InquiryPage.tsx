"use client";

import { useState } from "react";
import { useLeads } from "@/hooks/useLeads";
import ScrollReveal from "@/components/layout/ScrollReveal";

export default function InquiryPage() {
  const { submitLead } = useLeads(undefined, { skipFetch: true });
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", event_type: "Wedding",
    event_date: "", location: "", guest_count: "", budget_range: "100k - 250k", message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    const payload = {
      client_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      guest_count: formData.guest_count ? parseInt(formData.guest_count, 10) : 0,
      event_date: formData.event_date || new Date().toISOString(),
      budget: formData.budget_range,
      message: formData.message
    };

    const success = await submitLead(payload);
    if (!success) {
      setStatus("error");
    }
    else {
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", event_type: "Wedding", event_date: "", location: "", guest_count: "", budget_range: "100k - 250k", message: "" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fieldClass = "w-full bg-transparent border-none outline-none py-2 text-plum font-serif text-lg placeholder:text-plum/20 transition-colors duration-200 focus:placeholder:text-plum/10";
  const labelClass = "font-sans text-[10px] tracking-[0.2em] uppercase text-plum/50 block mb-2";
  const wrapClass = "border-b border-rose/30 focus-within:border-rose transition-colors duration-300";

  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <div className="bg-rose h-16 w-full fixed top-0 z-40"></div>

      <section className="pt-32 pb-32 px-6 max-w-3xl mx-auto flex flex-col items-center">
        <ScrollReveal>
          <h1 className="text-5xl md:text-7xl font-light mb-16 text-center text-plum">
            Inquire <span className="italic">With Us</span>
          </h1>
        </ScrollReveal>

        {status === "success" ? (
          <div className="text-center space-y-6 animate-fade-up">
             <p className="text-2xl font-serif text-plum/75 italic">Thank you for your inquiry.</p>
             <p className="text-plum/50 font-sans text-xs tracking-[0.2em] uppercase">Our team will be in touch shortly.</p>
          </div>
        ) : (
          <ScrollReveal delay={1} className="w-full">
            <form onSubmit={handleSubmit} className="w-full space-y-12">
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className={`flex-1 ${wrapClass}`}>
                    <label className={labelClass}>Name *</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className={fieldClass} placeholder="Jane Doe" />
                  </div>
                  <div className={`flex-1 ${wrapClass}`}>
                    <label className={labelClass}>Email *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className={fieldClass} placeholder="jane@example.com" />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                  <div className={`flex-1 ${wrapClass}`}>
                    <label className={labelClass}>Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={fieldClass} />
                  </div>
                  <div className={`flex-1 ${wrapClass}`}>
                    <label className={labelClass}>Event Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className={fieldClass} placeholder="City, Country" />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                  <div className={`flex-1 ${wrapClass}`}>
                    <label className={labelClass}>Event Type</label>
                    <select name="event_type" value={formData.event_type} onChange={handleChange} className={`${fieldClass} appearance-none cursor-pointer`}>
                      <option value="Wedding">Wedding</option>
                      <option value="Gala">Gala</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Private Event">Private Event</option>
                    </select>
                  </div>
                  <div className={`flex-1 ${wrapClass}`}>
                    <label className={labelClass}>Est. Date</label>
                    <input type="date" name="event_date" value={formData.event_date} onChange={handleChange} className={fieldClass} />
                  </div>
                  <div className={`flex-1 ${wrapClass}`}>
                    <label className={labelClass}>Est. Guests</label>
                    <input type="number" name="guest_count" value={formData.guest_count} onChange={handleChange} className={fieldClass} />
                  </div>
                </div>

                <div className={wrapClass}>
                  <label className={labelClass}>Budget Range</label>
                  <select name="budget_range" value={formData.budget_range} onChange={handleChange} className={`${fieldClass} appearance-none cursor-pointer`}>
                    <option value="Under 100k">Under $100k</option>
                    <option value="100k - 250k">$100k - $250k</option>
                    <option value="250k - 500k">$250k - $500k</option>
                    <option value="500k+">$500k+</option>
                  </select>
                </div>

                <div className={wrapClass}>
                  <label className={labelClass}>Additional Details</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className={fieldClass} placeholder="Tell us about your vision..." />
                </div>
              </div>

              {status === "error" && (
                <p className="text-rose text-sm font-sans animate-fade-in">There was an error submitting your inquiry. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-rose text-blush font-sans text-xs uppercase tracking-[0.2em] py-6 btn-luxury hover:bg-plum disabled:opacity-50 mt-12"
              >
                {status === "submitting" ? "Submitting..." : "Submit Inquiry"}
              </button>
            </form>
          </ScrollReveal>
        )}
      </section>

          </main>
  );
}
