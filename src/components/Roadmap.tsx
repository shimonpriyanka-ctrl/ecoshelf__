import { useScrollReveal } from "../hooks/useScrollReveal";

const timeline = [
  { phase: "Pilot Neighborhoods", status: "Active", icon: "🚀" },
  { phase: "Apartment Complexes", status: "Next", icon: "🏢" },
  { phase: "University Campuses", status: "Planned", icon: "🎓" },
  { phase: "Residential Societies", status: "Planned", icon: "🏘️" },
  { phase: "City-Wide Networks", status: "Vision", icon: "🌆" },
];

const featureCards = [
  {
    title: "Intelligent Platform Features",
    icon: "🧠",
    features: ["Smart Matching", "Verified Badging", "Lending Insurance"],
    color: "eco",
  },
  {
    title: "Sustainability Analytics & Gamification",
    icon: "📊",
    features: ["Impact Dashboard", "Eco Badges", "Institutional Sharing", "EcoPoints Rewards Program"],
    color: "teal",
  },
];

export default function Roadmap() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="roadmap" className="py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Roadmap</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-eco-900">
            From your street to your city
          </h2>
        </div>

        {/* Horizontal timeline */}
        <div className="relative mb-16">
          <div className="hidden md:block absolute top-10 left-0 right-0 h-1 bg-gradient-to-r from-eco-300 via-teal-200 to-warm-200 rounded-full" />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-2 relative">
            {timeline.map((item, i) => (
              <div
                key={item.phase}
                className={`text-center transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="relative inline-block">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mx-auto relative z-10 border-4 ${
                    item.status === "Active"
                      ? "bg-eco-100 border-eco-300 shadow-lg"
                      : "bg-white border-eco-100 shadow-md"
                  }`}>
                    {item.icon}
                  </div>
                  {item.status === "Active" && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-eco-500 animate-pulse z-20" />
                  )}
                </div>
                <p className="mt-3 font-display font-semibold text-sm text-eco-900">{item.phase}</p>
                <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.status === "Active"
                    ? "bg-eco-100 text-eco-700"
                    : item.status === "Next"
                    ? "bg-warm-100 text-warm-700"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {featureCards.map((card, i) => (
            <div
              key={card.title}
              className={`bg-gradient-to-br from-white to-eco-50/50 rounded-2xl p-7 border border-eco-100 shadow-md hover:shadow-lg transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${600 + i * 150}ms` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-12 h-12 rounded-xl bg-${card.color}-100 flex items-center justify-center text-2xl`}>
                  {card.icon}
                </div>
                <h3 className="font-display font-bold text-eco-900">{card.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {card.features.map((f) => (
                  <span
                    key={f}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-${card.color}-50 text-${card.color}-700 text-sm font-medium border border-${card.color}-200`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
