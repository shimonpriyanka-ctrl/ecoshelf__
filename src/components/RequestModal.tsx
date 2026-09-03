import { useState } from "react";

type ShelfItem = {
  id: string;
  name: string;
  owner_name: string;
  listing_type: string;
};

export default function RequestModal({
  item,
  onClose,
}: {
  item: ShelfItem | null;
  onClose: () => void;
}) {
  const [dateNeeded, setDateNeeded] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setDateNeeded("");
    setNote("");
    onClose();
  };

  const isGift = item.listing_type === "gift";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-eco-900/40 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-eco-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-eco-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-eco-900 mb-2">
              {isGift ? "Gift claimed!" : "Request sent!"}
            </h3>
            <p className="text-eco-700/70 text-sm mb-6">
              {isGift
                ? `${item.owner_name} will be notified that you'd like to claim the ${item.name}. They'll reach out to arrange pickup.`
                : `${item.owner_name} will receive your request for the ${item.name} and can approve it from their dashboard.`}
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl bg-eco-600 text-white font-semibold hover:bg-eco-700 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className={`px-6 py-5 ${isGift ? "bg-warm-400" : "bg-eco-600"}`}>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-white">
                  {isGift ? `Claim: ${item.name}` : `Request: ${item.name}`}
                </h3>
                <button onClick={handleClose} className="text-white/80 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-white/80 text-sm mt-1">From: {item.owner_name}</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {!isGift && (
                <div>
                  <label className="block text-sm font-medium text-eco-800 mb-2">Date needed</label>
                  <input
                    type="date"
                    required
                    value={dateNeeded}
                    onChange={(e) => setDateNeeded(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-eco-200 focus:ring-2 focus:ring-eco-400 focus:border-transparent outline-none transition-all text-eco-800"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-eco-800 mb-2">
                  {isGift ? "Note to neighbor" : "Note to your neighbor"}
                </label>
                <textarea
                  required
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={isGift ? "Tell them why you'd love this item..." : "Hi! I'd love to borrow this for... I'll return it carefully."}
                  className="w-full px-4 py-2.5 rounded-xl border border-eco-200 focus:ring-2 focus:ring-eco-400 focus:border-transparent outline-none transition-all text-eco-800 resize-none"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-semibold text-white transition-all hover:-translate-y-0.5 ${
                  isGift ? "bg-warm-400 hover:bg-warm-500" : "bg-eco-600 hover:bg-eco-700"
                }`}
              >
                {isGift ? "Claim Gift" : "Send Request"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
