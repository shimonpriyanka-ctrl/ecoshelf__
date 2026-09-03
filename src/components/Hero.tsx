import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Hero() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background decorative shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-eco-200/40 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-warm-100/40 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-eco-100 text-eco-700 text-sm font-medium border border-eco-200">
              <span className="w-2 h-2 rounded-full bg-eco-500 animate-pulse" />
              Circular Economy & Neighborhood Sharing
            </span>

            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-eco-900 leading-[1.15]">
              Your neighbor already owns it.{" "}
              <span className="bg-gradient-to-r from-eco-600 to-teal-600 bg-clip-text text-transparent">
                Borrow it instead.
              </span>
            </h1>

            <p className="mt-6 text-lg text-eco-700/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              EcoShelf turns idle drills, tents, and books sitting in nearby homes into a shared inventory — so your street buys less and lends more.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#waitlist"
                className="px-7 py-3.5 rounded-xl bg-eco-600 text-white font-semibold text-center hover:bg-eco-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Join Your Neighborhood
              </a>
              <a
                href="#shelf"
                className="px-7 py-3.5 rounded-xl bg-white text-eco-700 font-semibold text-center border-2 border-eco-200 hover:border-eco-400 hover:bg-eco-50 transition-all shadow-sm hover:-translate-y-0.5"
              >
                Browse Items Shelf
              </a>
            </div>

            <p className="mt-8 text-sm text-eco-600/70 font-medium">
              1,200+ items shared without money changing hands
            </p>
          </div>

          {/* Visual side */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Central circle */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-eco-100 to-teal-100 border-4 border-white shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-eco-500 to-teal-500 flex items-center justify-center shadow-lg animate-float">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <p className="mt-3 font-display font-bold text-eco-800">EcoShelf</p>
                  <p className="text-xs text-eco-600">Shared by neighbors</p>
                </div>
              </div>

              {/* Floating item cards */}
              <div className="absolute top-0 left-0 animate-float" style={{ animationDelay: "0s" }}>
                <div className="bg-white rounded-2xl shadow-xl p-3 w-32 border border-eco-100">
                  <div className="w-full h-16 rounded-lg bg-warm-100 flex items-center justify-center">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-eco-800">Power Drill</p>
                  <p className="text-xs text-eco-500">120m away</p>
                </div>
              </div>

              <div className="absolute top-4 right-0 animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="bg-white rounded-2xl shadow-xl p-3 w-32 border border-eco-100">
                  <div className="w-full h-16 rounded-lg bg-teal-100 flex items-center justify-center">
                    <span className="text-2xl">⛺</span>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-eco-800">Camping Tent</p>
                  <p className="text-xs text-eco-500">340m away</p>
                </div>
              </div>

              <div className="absolute bottom-8 left-0 animate-float" style={{ animationDelay: "1s" }}>
                <div className="bg-white rounded-2xl shadow-xl p-3 w-32 border border-eco-100">
                  <div className="w-full h-16 rounded-lg bg-eco-100 flex items-center justify-center">
                    <span className="text-2xl">📚</span>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-eco-800">15 Novels</p>
                  <p className="text-xs text-eco-500">200m away</p>
                </div>
              </div>

              <div className="absolute bottom-4 right-2 animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="bg-white rounded-2xl shadow-xl p-3 w-32 border border-eco-100">
                  <div className="w-full h-16 rounded-lg bg-warm-100 flex items-center justify-center">
                    <span className="text-2xl">🪴</span>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-eco-800">Terracotta Pots</p>
                  <p className="text-xs text-eco-500">80m away</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
