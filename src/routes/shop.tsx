import { useState } from "react";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Corners, ProductCard, stagger, reveal } from "@/components/brand/site";
import { Button } from "@/components/ui/button";
import { meta, products } from "@/lib/store";
const filters = ["ALL", "TEES", "BOXY FITS", "WAFFLES", "JERSEYS", "JEANS", "ACCESSORIES"];
export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>) =>
    typeof search["drop"] === "string" ? { drop: search["drop"] } : {},
  head: () =>
    meta("Catalog — OFF CULTURE", "Shop the current OFF CULTURE streetwear lineup from Jaipur."),
  component: Shop,
});
function Shop() {
  const { drop } = Route.useSearch();
  const [filter, setFilter] = useState("ALL");
  const filtered = products.filter(
    (p) => (filter === "ALL" || p.category === filter) && (!drop || p.drop === drop),
  );
  return (
    <main className="px-[var(--pad-x)] pt-10 pb-24">
      <motion.div {...reveal} className="relative inline-block pl-5 pt-5 pr-10 pb-4">
        <Corners />
        <p className="text-[length:var(--micro)] tracking-[.22em] text-muted-foreground mb-3">
          THE CURRENT LINEUP / {drop || "ALL DROPS"}
        </p>
        <h1 className="font-orbitron font-black text-4xl md:text-6xl">CATALOG</h1>
      </motion.div>
      <div className="flex flex-wrap gap-2 mt-10 mb-9">
        {filters.map((f) => (
          <Button
            key={f}
            variant={filter === f ? "brand" : "brandOutline"}
            className="text-[10px] px-4 py-2"
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>
      <motion.div
        key={`${filter}-${drop}`}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12"
      >
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </motion.div>
      {filtered.length === 0 && (
        <p className="py-20 text-muted-foreground">NO PIECES IN THIS FILTER.</p>
      )}
    </main>
  );
}
