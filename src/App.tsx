import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import Shelf from "./components/Shelf";
import RequestModal from "./components/RequestModal";
import Rewards from "./components/Rewards";
import Comparison from "./components/Comparison";
import ImpactCalculator from "./components/ImpactCalculator";
import Roadmap from "./components/Roadmap";
import Waitlist from "./components/Waitlist";
import Footer from "./components/Footer";

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

export default function App() {
  const [modalItem, setModalItem] = useState<ShelfItem | null>(null);

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Shelf onOpenModal={setModalItem} />
        <Rewards />
        <Comparison />
        <ImpactCalculator />
        <Roadmap />
        <Waitlist />
      </main>
      <Footer />
      <RequestModal item={modalItem} onClose={() => setModalItem(null)} />
    </div>
  );
}
