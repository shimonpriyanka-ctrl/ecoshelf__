import { useScrollReveal } from "../hooks/useScrollReveal";

const problems = [
  {
    icon: "📦",
    title: "Idle Household Assets",
    desc: "The average Indian household owns ₹40,000+ worth of items used less than once a month — drills, tents, ladders, and more gathering dust.",
    color: "warm",
  },
  {
    icon: "🔇",
    title: "Zero Local Visibility",
    desc: "You don't know what your neighbors own. The drill you need might be two doors away, but there's no way to find out.",
    color: "teal",
  },
  {
    icon: "🛒",
    title: "Marketplace Mismatch",
    desc: "OLVP and Facebook Marketplace are built for buying and selling across wide areas — not for borrowing within your own street.",
    color: "eco",
  },
  {
    icon: "🌍",
    title: "Avoidable Eco & Cost Burden",
    desc: "Every duplicate purchase means more money spent, more manufacturing emissions, and more waste heading to overflowing landfills.",
    color: "warm",
  },
];

const flow = [
  "Unused Items",
  "Low Neighborhood Visibility",
  "Duplicate Purchases",
  "Higher Expense & Waste",
];

export default function Problem() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="problem" className="py-24 bg-gradient-to-b from-cream-50 to-eco-50/50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-warm-600 font-semibold text-sm uppercase tracking-wider">The Problem</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-eco-900">
            Why we buy what we don't need
          </h2>
          <p className="mt-4 text-eco-700/70 max-w-2xl mx-auto">
            Indian homes are full of things that could be shared. But without a way to see what's nearby, we keep buying duplicates.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {problems.map((p, i) => (
            <div
              key={p.title}
              className={`bg-white rounded-2xl p-6 shadow-md border border-eco-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 bg-${p.color}-100`}>
                {p.icon}
              </div>
              <h3 className="font-display font-semibold text-lg text-eco-900 mb-2">{p.title}</h3>
              <p className="text-sm text-eco-700/70 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Flow diagram */}
        <div className={`bg-white rounded-3xl p-8 shadow-lg border border-eco-100 transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <p className="text-center text-sm font-semibold text-eco-500 uppercase tracking-wider mb-6">The Cycle of Waste</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-2">
            {flow.map((step, i) => (
              <div key={step} className="flex items-center gap-3 md:gap-2">
                <div className={`px-5 py-3 rounded-xl font-medium text-sm md:text-base text-center ${
                  i === flow.length - 1
                    ? "bg-warm-100 text-warm-700 border-2 border-warm-300"
                    : "bg-eco-50 text-eco-700 border-2 border-eco-200"
                }`}>
                  {step}
                </div>
                {i < flow.length - 1 && (
                  <svg className="w-6 h-6 text-eco-400 rotate-90 md:rotate-0 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
