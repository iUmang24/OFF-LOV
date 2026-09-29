import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { articles, meta } from "@/lib/store";
import { child, reveal, stagger } from "@/components/brand/site";
export const Route = createFileRoute("/journal")({
  head: () =>
    meta(
      "Dispatch — OFF CULTURE",
      "Stories from the streets of Jaipur, style notes, and the world behind OFF CULTURE.",
    ),
  component: Journal,
});
function Journal() {
  return (
    <main className="px-[var(--pad-x)] pt-10 pb-24">
      <motion.div {...reveal} className="py-10">
        <p className="text-[length:var(--micro)] tracking-[.22em] text-muted-foreground mb-4">
          FROM THE STREETS
        </p>
        <h1 className="font-orbitron font-black text-4xl md:text-6xl">DISPATCH</h1>
      </motion.div>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="border-t border-border"
      >
        {articles.map((a, i) => (
          <motion.div variants={child} key={a.id}>
            <Link
              to="/journal/$id"
              params={{ id: a.id }}
              className="group grid grid-cols-[100px_1fr] sm:grid-cols-[180px_1fr] md:grid-cols-[240px_1fr_auto] gap-5 md:gap-12 py-6 border-b border-border items-center"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={a.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-[filter,transform] duration-500"
                />
              </div>
              <div>
                <p className="text-[length:var(--micro)] tracking-[.2em] text-muted-foreground">
                  {a.date} <span className="mx-2">/</span> {a.read}
                </p>
                <h2 className="font-orbitron font-bold text-sm md:text-2xl leading-snug mt-3 group-hover:opacity-50 transition-opacity">
                  {a.title}
                </h2>
              </div>
              <ArrowUpRight className="hidden md:block" size={24} strokeWidth={1.4} />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
