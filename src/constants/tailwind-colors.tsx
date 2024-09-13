type GradientColors = {
  [key: string]: string;
};

type GenerationPolygons = GradientColors;

// TODO: add generation colors for gen 4 and 5
export const generationColors: GradientColors = {
  // "1": "from-[#ff80b5] to-[#9089fc]",
  "1": "from-[#ef4444] to-[#2563eb]",
  "2": "from-[#fde047] to-[#d1d5db]",
  "3": "from-[#22c55e] to-[#ea580c]",
  "4": "bg-gradient-to-b from-sky-200 via-pink-200 to-zinc-200",
  "5": "bg-gradient-to-b from-slate-900 to-slate-50",
};

// TODO: add generation polygons for gen 4 and 5
export const generationPolygons: GenerationPolygons = {
  "1": "polygon(50% 100%,100% 0,0 0)",
  "2": "polygon(100% 0,0 100%,100% 100%)",
  "3": "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%",
};
