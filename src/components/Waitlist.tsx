import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Waitlist() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [email, setEmail] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !pinCode) {
      setError("Please fill in your email and PIN code.");
      return;
    }

    if (!supabase) {
      setError("Database not connected. Please try again later.");
      return;
    }

    const { error: insertError } = await supabase.from("ecoshelf_waitlist").insert({
      email,
      pin_code: pinCode,
      neighborhood: neighborhood || null,
    });

    if (insertError) {
      setError("Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="py-24 bg-gradient-to-br from-eco-600 to-teal-700 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute inset-0 -z-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-warm-300/10 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white text-sm font-medium backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-warm-300 animate-pulse" />
            Early Access
          </span>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl font-bold text-white">
            Join the EcoShelf waitlist
          </h2>
          <p className="mt-4 text-white/80 text-lg">
            Be first to bring neighborhood sharing to your street.{" "}
            <span className="font-semibold text-white">Free forever for neighbors.</span>
          </p>
        </div>

        <div className={`bg-white rounded-3xl shadow-2xl p-8 transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto rounded-full bg-eco-100 flex items-center justify-center mb-5">
                <svg className="w-10 h-10 text-eco-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-eco-900 mb-2">You're on the list!</h3>
              <p className="text-eco-700/70 mb-1">
                We'll notify you as soon as EcoShelf launches in your area.
              </p>
              <p className="text-sm text-eco-500">
                PIN code: <span className="font-semibold">{pinCode}</span>
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setEmail("");
                  setPinCode("");
                  setNeighborhood("");
                }}
                className="mt-6 text-sm text-eco-600 font-medium hover:text-eco-700 transition-colors"
              >
                Sign up another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-eco-800 mb-2">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-eco-200 focus:ring-2 focus:ring-eco-400 focus:border-transparent outline-none transition-all text-eco-800"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-eco-800 mb-2">PIN code</label>
                  <input
                    type="text"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    placeholder="e.g. 110001"
                    maxLength={6}
                    className="w-full px-4 py-3 rounded-xl border border-eco-200 focus:ring-2 focus:ring-eco-400 focus:border-transparent outline-none transition-all text-eco-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-eco-800 mb-2">Neighborhood <span className="text-eco-400">(optional)</span></label>
                  <input
                    type="text"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder="e.g. Hauz Khas"
                    className="w-full px-4 py-3 rounded-xl border border-eco-200 focus:ring-2 focus:ring-eco-400 focus:border-transparent outline-none transition-all text-eco-800"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500 font-medium">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-eco-600 text-white font-semibold hover:bg-eco-700 transition-all hover:-translate-y-0.5 shadow-lg"
              >
                Join Waitlist — Free Forever
              </button>

              <p className="text-center text-xs text-eco-500">
                We'll only use your details to notify you about EcoShelf launches near you.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
