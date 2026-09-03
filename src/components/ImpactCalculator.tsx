import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const neighborOptions = [10, 50, 100, 250];

// Indian pricing assumptions:
// Average item cost avoided: ₹3,000 (drill ₹3,000, tent ₹2,500, ladder ₹1,500, books ₹800, etc.)
// Items shared per household per year: ~4
// CO₂ per item manufactured: ~8 kg CO₂ eq
// Trees absorb ~21 kg CO₂ per year
// A car in Delhi emits ~3.5 kg CO₂ per day

function formatINR(amount: number): string {
  if (amount >= 100000) {
    const lakhs = (amount / 100000).toFixed(1);
    return `₹${lakhs} Lakh`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function ImpactCalculator() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [sliderIndex, setSliderIndex] = useState(1); // Default to 50 neighbors

  const neighbors = neighborOptions[sliderIndex];

  // Calculations
  const households = neighbors;
  const itemsPerHouseholdPerYear = 4;
  const avgItemCost = 3000;
  const annualMoneySaved = households * itemsPerHouseholdPerYear * avgItemCost;
  const perHouseholdSavings = itemsPerHouseholdPerYear * avgItemCost;

  const totalItemsDiverted = households * itemsPerHouseholdPerYear;
  const co2PerItem = 8; // kg CO₂
  const totalCO2 = totalItemsDiverted * co2PerItem;
  const treesEquivalent = Math.round(totalCO2 / 21);
  const carDaysEquivalent = Math.round(totalCO2 / 3.5);

  return (
    <section id="calculator" className="py-24 bg-gradient-to-b from-cream-50 to-eco-50/50">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-warm-600 font-semibold text-sm uppercase tracking-wider">Impact Calculator</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-eco-900">
            See what your neighborhood could save
          </h2>
          <p className="mt-4 text-eco-700/70 max-w-2xl mx-auto">
            Drag the slider to see how much money, carbon, and waste your community can save by sharing instead of buying.
          </p>
        </div>

        <div className={`bg-white rounded-3xl shadow-xl border border-eco-100 p-8 sm:p-10 transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          {/* Slider */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <label className="font-display font-semibold text-eco-900 text-lg">Number of neighbors</label>
              <span className="px-4 py-1.5 rounded-full bg-eco-100 text-eco-700 font-bold text-lg">
                {neighbors} neighbors
              </span>
            </div>

            <div className="relative">
              <input
                type="range"
                min={0}
                max={neighborOptions.length - 1}
                step={1}
                value={sliderIndex}
                onChange={(e) => setSliderIndex(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between mt-3 px-1">
                {neighborOptions.map((n, i) => (
                  <button
                    key={n}
                    onClick={() => setSliderIndex(i)}
                    className={`text-sm font-medium transition-colors ${
                      i === sliderIndex ? "text-eco-700 font-bold" : "text-eco-400"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid md:grid-cols-3 gap-5">
            {/* Money Saved */}
            <div className="bg-gradient-to-br from-eco-500 to-eco-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">💰</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Annual</span>
              </div>
              <p className="text-white/80 text-sm">Money Saved</p>
              <p className="font-display text-3xl font-extrabold mt-1">{formatINR(annualMoneySaved)}+</p>
              <div className="mt-3 pt-3 border-t border-white/20">
                <p className="text-xs text-white/70">
                  ~{formatINR(perHouseholdSavings)} per household/year
                </p>
                <p className="text-xs text-white/70 mt-1">
                  Avoiding buying items like a ₹3,000 drill, ₹2,500 tent, etc.
                </p>
              </div>
            </div>

            {/* Carbon Prevented */}
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">🌱</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Annual</span>
              </div>
              <p className="text-white/80 text-sm">Carbon Prevented</p>
              <p className="font-display text-3xl font-extrabold mt-1">{totalCO2.toLocaleString("en-IN")} kg</p>
              <p className="text-xs text-white/70 mt-1">CO₂ equivalent</p>
              <div className="mt-3 pt-3 border-t border-white/20">
                <p className="text-xs text-white/70">
                  Equal to planting <strong className="text-white">{treesEquivalent} trees</strong>
                </p>
                <p className="text-xs text-white/70 mt-1">
                  Or removing a car from Delhi's roads for <strong className="text-white">{carDaysEquivalent} days</strong>
                </p>
              </div>
            </div>

            {/* Items Diverted */}
            <div className="bg-gradient-to-br from-warm-400 to-warm-500 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">♻️</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Annual</span>
              </div>
              <p className="text-white/80 text-sm">Items Diverted</p>
              <p className="font-display text-3xl font-extrabold mt-1">{totalItemsDiverted.toLocaleString("en-IN")}</p>
              <p className="text-xs text-white/70 mt-1">from landfill</p>
              <div className="mt-3 pt-3 border-t border-white/20">
                <p className="text-xs text-white/70">
                  ~{itemsPerHouseholdPerYear} items per household that would've been bought new
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-eco-500 mt-6">
            Estimates based on Indian household consumption patterns. Actual savings vary by neighborhood participation.
          </p>
        </div>
      </div>
    </section>
  );
}
