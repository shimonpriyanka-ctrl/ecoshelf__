import { useEffect, useState } from "react";

const navLinks = [
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#shelf", label: "Shelf" },
  { href: "#rewards", label: "Rewards" },
  { href: "#calculator", label: "Calculator" },
  { href: "#roadmap", label: "Roadmap" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-eco-50/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-eco-500 to-teal-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <span className="font-display font-bold text-lg text-eco-800">EcoShelf</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg text-sm font-medium text-eco-700 hover:bg-eco-100 hover:text-eco-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-eco-600 text-white hover:bg-eco-700 transition-colors shadow-sm"
          >
            Join Waitlist
          </a>
        </div>

        <button
          className="md:hidden p-2 rounded-lg text-eco-700 hover:bg-eco-100"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-eco-50/95 backdrop-blur-md border-t border-eco-100 mt-3">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-eco-700 hover:bg-eco-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#waitlist"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold bg-eco-600 text-white text-center mt-1"
            >
              Join Waitlist
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
