import { useScrollReveal } from "../hooks/useScrollReveal";

const steps = [
  { num: "1", title: "List Item", icon: "📝", desc: "Snap a photo and list your unused item in under a minute." },
  { num: "2", title: "Discover", icon: "🔍", desc: "Neighbors browse the shared shelf within a hyper-local radius." },
  { num: "3", title: "Request", icon: "💬", desc: "Send a request with a date and a short note to the owner." },
  { num: "4", title: "Share", icon: "🤝", desc: "Hand over the item at your doorstep — no money, no friction." },
  { num: "5", title: "Return", icon: "↩️", desc: "Borrower returns it on time. Both earn EcoPoints for the cycle." },
];

const features = [
  "Hyper-Local Radius",
  "Lend & Gift (Non-Commercial)",
  "Smart Item Availability",
  "Circular Resource Economy",
];

export default function Solution() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="solution" className="py-24 bg-eco-50/50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-eco-600 font-semibold text-sm uppercase tracking-wider">Proposed Solution</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-eco-900">
            An inventory-based neighborhood sharing platform
          </h2>
          <p className="mt-4 text-eco-700/70 max-w-2xl mx-auto">
            EcoShelf creates a shared, visible inventory of idle household items within your neighborhood — so lending, borrowing, and gifting become effortless.
          </p>
        </div>

        {/* 5-step flow */}
        <div className="relative mb-16">
          <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-eco-200 via-teal-200 to-eco-200 rounded-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`relative text-center transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="relative inline-flex">
                  <div className="w-16 h-16 rounded-2xl bg-white border-4 border-eco-100 shadow-lg flex items-center justify-center text-2xl mx-auto relative z-10 hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-eco-600 text-white text-xs font-bold flex items-center justify-center z-20">
                    {step.num}
                  </span>
                </div>
                <h3 className="mt-4 font-display font-semibold text-eco-900">{step.title}</h3>
                <p className="mt-2 text-sm text-eco-700/70 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature tags */}
        <div className={`flex flex-wrap justify-center gap-3 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {features.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-eco-100 to-teal-100 text-eco-800 font-medium text-sm border border-eco-200 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <svg className="w-4 h-4 text-eco-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {f}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
