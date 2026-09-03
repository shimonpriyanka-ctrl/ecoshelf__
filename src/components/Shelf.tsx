import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useScrollReveal } from "../hooks/useScrollReveal";

type ShelfItem = {
  id: string;
  name: string;
  category: string;
  image_url: string;
  distance: string;
  owner_name: string;
  rating: number;
  owner_note: string;
  listing_type: string;
};

export default function Shelf({ onOpenModal }: { onOpenModal: (item: ShelfItem) => void }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [items, setItems] = useState<ShelfItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("ecoshelf_items")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error && data) {
        setItems(data);
      }
      setLoading(false);
    }
    fetchItems();
  }, []);

  return (
    <section id="shelf" className="py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Live Demo Shelf</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-eco-900">
            Items your neighbors are sharing right now
          </h2>
          <p className="mt-4 text-eco-700/70 max-w-2xl mx-auto">
            Browse real listings from your neighborhood. Request to borrow or claim a gift — it takes seconds.
          </p>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-eco-50 rounded-2xl overflow-hidden border border-eco-100 animate-pulse">
                <div className="w-full h-48 bg-eco-100" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-eco-100 rounded w-3/4" />
                  <div className="h-3 bg-eco-100 rounded w-1/2" />
                  <div className="h-3 bg-eco-100 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <div
                key={item.id}
                className={`group bg-white rounded-2xl overflow-hidden border border-eco-100 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-eco-700 shadow-sm">
                      {item.category}
                    </span>
                    {item.listing_type === "gift" && (
                      <span className="px-3 py-1 rounded-full bg-warm-400 text-white text-xs font-bold shadow-sm">
                        FREE GIFT
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-eco-600/90 backdrop-blur-sm text-xs font-medium text-white shadow-sm flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18l-1.45-1.32C4.4 12.36 2 10.28 2 7.5 2 5.42 3.42 4 5.5 4c1.74 0 3.41 1.01 4.13 2.44h.74C11.09 5.01 12.76 4 14.5 4 16.58 4 18 5.42 18 7.5c0 2.78-2.4 4.86-6.55 9.18L10 18z" />
                    </svg>
                    {item.rating}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display font-semibold text-lg text-eco-900">{item.name}</h3>
                    <span className="text-xs text-eco-500 font-medium flex items-center gap-1 flex-shrink-0">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {item.distance}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-eco-700/70 leading-relaxed italic">"{item.owner_note}"</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-eco-400 to-teal-400 flex items-center justify-center text-white text-xs font-bold">
                        {item.owner_name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-eco-700">{item.owner_name}</span>
                    </div>
                    <button
                      onClick={() => onOpenModal(item)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                        item.listing_type === "gift"
                          ? "bg-warm-400 text-white hover:bg-warm-500 shadow-sm"
                          : "bg-eco-600 text-white hover:bg-eco-700 shadow-sm"
                      }`}
                    >
                      {item.listing_type === "gift" ? "Claim Gift" : "Request"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
