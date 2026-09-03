import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useScrollReveal } from "../hooks/useScrollReveal";

type LeaderboardEntry = {
  id: string;
  name: string;
  avatar_url: string;
  eco_points: number;
  items_shared: number;
  rank_label: string;
};

const tierBadges: Record<string, { bg: string; text: string; icon: string }> = {
  "Bronze Sharer": { bg: "bg-amber-100", text: "text-amber-700", icon: "🥉" },
  "Silver Sharer": { bg: "bg-gray-100", text: "text-gray-600", icon: "🥈" },
  "Gold Sharer": { bg: "bg-yellow-100", text: "text-yellow-700", icon: "🥇" },
  "Platinum Neighbor": { bg: "bg-teal-100", text: "text-teal-700", icon: "💎" },
};

const rewardOptions = [
  { points: 100, reward: "₹50 voucher for local eco-stores / hardware stores", icon: "🏪" },
  { points: 250, reward: "₹150 Amazon / Flipkart gift voucher", icon: "🛒" },
  { points: 500, reward: "Free EcoShelf premium badge + featured listing priority", icon: "⭐" },
  { points: 1000, reward: "₹500 community sponsorship credit (donated to a local cause in your name)", icon: "❤️" },
];

export default function Rewards() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("ecoshelf_leaderboard")
        .select("*")
        .order("eco_points", { ascending: false });

      if (!error && data) {
        setLeaderboard(data);
      }
      setLoading(false);
    }
    fetchLeaderboard();
  }, []);

  // Current user demo stats
  const currentPoints = 185;
  const lifetimeShared = 14;
  const currentTier = "Bronze Sharer";
  const nextTier = "Silver Sharer";
  const nextTierThreshold = 200;
  const progressPercent = Math.min((currentPoints / nextTierThreshold) * 100, 100);

  return (
    <section id="rewards" className="py-24 bg-gradient-to-b from-eco-50/50 to-cream-50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-warm-600 font-semibold text-sm uppercase tracking-wider">EcoPoints Rewards Program</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-eco-900">
            The more you share, the more you earn
          </h2>
          <p className="mt-4 text-eco-700/70 max-w-2xl mx-auto">
            Every completed lend, gift, or sale earns EcoPoints. Redeem them for real rewards or give back to your community.
          </p>
        </div>

        {/* Points earning info */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {[
            { action: "Lend", points: 10, icon: "🔄" },
            { action: "Gift", points: 15, icon: "🎁" },
            { action: "Sell", points: 5, icon: "💰" },
            { action: "On-time Return Bonus", points: 5, icon: "⏰" },
          ].map((item) => (
            <div key={item.action} className="bg-white rounded-2xl p-4 text-center border border-eco-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-sm font-medium text-eco-700">{item.action}</p>
              <p className="text-eco-600 font-bold text-lg">+{item.points} pts</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Dashboard card */}
          <div className={`bg-gradient-to-br from-eco-600 to-teal-600 rounded-3xl p-6 text-white shadow-xl transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-bold">Rewards Dashboard</h3>
              <span className="text-3xl">🏆</span>
            </div>

            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 mb-4">
              <p className="text-white/80 text-sm">Current EcoPoints Balance</p>
              <p className="font-display text-4xl font-extrabold mt-1">{currentPoints}</p>
              <p className="text-white/70 text-xs mt-1">points</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4">
                <p className="text-white/80 text-xs">Lifetime Items Shared</p>
                <p className="font-display text-2xl font-bold mt-1">{lifetimeShared}</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4">
                <p className="text-white/80 text-xs">Current Tier</p>
                <p className="font-display text-xl font-bold mt-1 flex items-center gap-1">
                  {tierBadges[currentTier]?.icon} {currentTier}
                </p>
              </div>
            </div>

            {/* Progress to next tier */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-white/80">Progress to {nextTier}</span>
                <span className="font-semibold">{currentPoints} / {nextTierThreshold}</span>
              </div>
              <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-warm-300 rounded-full transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-white/70 text-xs mt-2">{nextTierThreshold - currentPoints} points to go!</p>
            </div>

            <div className="mt-4 flex gap-2">
              {["Bronze", "Silver", "Gold", "Platinum"].map((tier, i) => (
                <div
                  key={tier}
                  className={`flex-1 text-center py-1.5 rounded-lg text-xs font-medium ${
                    i === 0 ? "bg-white/25" : "bg-white/10"
                  }`}
                >
                  {tier}
                </div>
              ))}
            </div>
          </div>

          {/* Redeem Rewards */}
          <div className={`bg-white rounded-3xl p-6 shadow-lg border border-eco-100 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "100ms" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-bold text-eco-900">Redeem Rewards</h3>
              <span className="text-3xl">🎁</span>
            </div>

            <div className="space-y-3">
              {rewardOptions.map((opt) => (
                <div
                  key={opt.points}
                  className="flex items-start gap-3 p-4 rounded-2xl border border-eco-100 hover:border-eco-300 hover:bg-eco-50/50 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-eco-100 flex items-center justify-center text-lg flex-shrink-0">
                    {opt.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-eco-600 text-sm">{opt.points} pts</p>
                    <p className="text-sm text-eco-700/80 mt-0.5">{opt.reward}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className={`bg-white rounded-3xl p-6 shadow-lg border border-eco-100 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "200ms" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-bold text-eco-900">Leaderboard</h3>
              <span className="text-3xl">📊</span>
            </div>

            <p className="text-xs text-eco-500 font-medium mb-4">Top sharers this month</p>

            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-14 bg-eco-50 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((entry, i) => {
                  return (
                    <div
                      key={entry.id}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-eco-50 ${
                        i === 0 ? "bg-yellow-50/50 border border-yellow-200" : ""
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        i === 0 ? "bg-yellow-200 text-yellow-800" :
                        i === 1 ? "bg-gray-200 text-gray-700" :
                        i === 2 ? "bg-amber-200 text-amber-800" :
                        "bg-eco-100 text-eco-600"
                      }`}>
                        {i + 1}
                      </span>
                      <img
                        src={entry.avatar_url}
                        alt={entry.name}
                        loading="lazy"
                        className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-eco-900 truncate">{entry.name}</p>
                        <p className="text-xs text-eco-500">{entry.items_shared} items shared</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-eco-600 text-sm">{entry.eco_points}</p>
                        <p className="text-xs text-eco-400">pts</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
