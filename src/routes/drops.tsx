import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { drops, meta } from "@/lib/store";
import { reveal } from "@/components/brand/site";
export const Route = createFileRoute("/drops")({
  head: () =>
    meta(
      "Drop Archive — OFF CULTURE",
      "Explore the OFF CULTURE drop archive: OFF THE GRID, CONCRETE JUNGLE, and MONOCHROME ONLY.",
    ),
  component: Drops,
});
function Drops() {
  return (
    <main className="overflow-x-clip pb-20">
      <motion.div {...reveal} className="px-[var(--pad-x)] py-16 border-b border-border">
        <p className="text-[length:var(--micro)] tracking-[.2em] text-muted-foreground mb-4">
          EVERYTHING HAS A BEGINNING
        </p>
        <h1 className="font-orbitron font-black text-4xl md:text-6xl">DROP ARCHIVE</h1>
      </motion.div>
      {drops.map((d, i) => (
        <section
          key={d.id}
          className={`grid lg:grid-cols-2 min-h-[70vh] border-b border-border ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
        >
          <motion.div
            initial={{ opacity: 0, x: i % 2 ? 45 : -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center px-[var(--pad-x)] py-16"
          >
            <p className="text-[length:var(--micro)] tracking-[.25em] text-muted-foreground">
              DROP {d.number} / 2026
            </p>
            <h2 className="font-orbitron font-black text-3xl md:text-5xl leading-tight mt-7">
              {d.title}
            </h2>
            <p className="max-w-md leading-relaxed text-muted-foreground mt-8 mb-10">{d.copy}</p>
            <div>
              <Button variant="brandOutline" asChild>
                <Link to="/shop" search={{ drop: d.id }}>
                  SHOP THIS DROP <ArrowUpRight size={17} />
                </Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="h-[55vh] lg:h-auto overflow-hidden"
          >
            <img
              src={d.image}
              alt={`${d.title} streetwear editorial`}
              loading="lazy"
              className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition-[filter,transform] duration-700"
            />
          </motion.div>
        </section>
      ))}
    </main>
  );
}
