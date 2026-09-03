import { useScrollReveal } from "../hooks/useScrollReveal";

const marketplaceFeatures = [
  { text: "Cash-focused transactions", eco: false },
  { text: "Wide geography, no neighborhood focus", eco: false },
  { text: "High friction — price, delivery, pickup", eco: false },
  { text: "Promotes consumerism & new purchases", eco: false },
  { text: "Purpose-built for lending & gifting", eco: true },
  { text: "Hyper-local radius within your street", eco: true },
  { text: "Zero-barrier access, no money needed", eco: true },
  { text: "Circular economy — reuse over rebuy", eco: true },
];

const impactCards = [
  {
    icon: "♻️",
    title: "Waste Reduction",
    desc: "Every shared drill or tent is one less item manufactured, packaged, and eventually dumped. Neighborhoods can cut household waste by up to 30%.",
    color: "eco",
  },
  {
    icon: "💰",
    title: "Household Savings",
    desc: "Families save ₹2,400+ per year by borrowing instead of buying items they use rarely. That's money freed up for what matters.",
    color: "teal",
  },
  {
    icon: "🤝",
    title: "Community Cohesion",
    desc: "Every exchange is a conversation. EcoShelf rebuilds the faded art of knowing and trusting the people who live next door.",
    color: "warm",
  },
];

export default function Comparison() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Why Not Just Use a Marketplace App?</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-eco-900">
            Marketplaces sell. EcoShelf shares.
          </h2>
        </div>

        {/* Two-column comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Traditional */}
          <div className={`bg-gray-50 rounded-3xl p-8 border-2 border-gray-200 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center text-2xl">
                🛍️
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-gray-700">Traditional Marketplaces</h3>
                <p className="text-sm text-gray-500">OLVP, Facebook Marketplace, etc.</p>
              </div>
            </div>
            <ul className="space-y-3">
              {marketplaceFeatures.filter(f => !f.eco).map((f) => (
                <li key={f.text} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-600">{f.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* EcoShelf */}
          <div className={`bg-eco-50 rounded-3xl p-8 border-2 border-eco-200 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "150ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-eco-200 flex items-center justify-center text-2xl">
                🌿
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-eco-800">EcoShelf</h3>
                <p className="text-sm text-eco-600">Built for neighborhoods, not commerce</p>
              </div>
            </div>
            <ul className="space-y-3">
              {marketplaceFeatures.filter(f => f.eco).map((f) => (
                <li key={f.text} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-eco-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm text-eco-700 font-medium">{f.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Impact cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {impactCards.map((card, i) => (
            <div
              key={card.title}
              className={`bg-white rounded-2xl p-6 border border-eco-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 bg-${card.color}-100`}>
                {card.icon}
              </div>
              <h3 className="font-display font-semibold text-lg text-eco-900 mb-2">{card.title}</h3>
              <p className="text-sm text-eco-700/70 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
