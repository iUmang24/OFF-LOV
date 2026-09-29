import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ImageRevealBackground } from "@/components/brand/reveal";
import { Checker, Corner, Corners, Globe } from "@/components/brand/site";
import { Button } from "@/components/ui/button";
import { imagery, meta } from "@/lib/store";
export const Route = createFileRoute("/")({
  head: () =>
    meta(
      "OFF CULTURE — Streetwear Out Of Jaipur",
      "Underground streetwear out of Jaipur. Not for everyone.",
    ),
  component: Home,
});
function Home() {
  return (
    <main className="relative flex-1 flex flex-col overflow-hidden">
      <ImageRevealBackground />
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row justify-between gap-8 px-[var(--pad-x)] py-[var(--main-py)]">
        <div className="flex flex-col justify-center max-w-[700px] lg:min-h-[70vh]">
          <div className="relative pl-5 pt-5">
            <Corner position="tl" />
            <h1 className="font-orbitron font-black text-[length:var(--headline)] leading-[1.05] tracking-[.08em] uppercase">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
              >
                OFF
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.12 }}
              >
                THE
              </motion.span>
              <motion.span
                className="block whitespace-nowrap"
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.24 }}
              >
                GRID
                <Checker />
              </motion.span>
            </h1>
            <span className="absolute left-0 bottom-0 -mb-5">
              <svg
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-[var(--corner)] h-[var(--corner)]"
              >
                <path d="M0 0.5V11.5H11.5" />
              </svg>
            </span>
          </div>
          <motion.div
            className="mt-14"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Button variant="brandOutline" asChild>
              <Link to="/shop" search={{}}>
                SHOP THE DROP <ArrowUpRight size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
        <div className="lg:hidden w-full border border-border aspect-[4/5] sm:aspect-[16/9] overflow-hidden">
          <img
            src={imagery.street}
            alt="OFF CULTURE streetwear in Jaipur"
            width={1536}
            height={1024}
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <motion.div
          className="relative self-end w-full sm:w-auto min-w-[var(--feature-min)] p-[var(--feature-pad)] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <Corners />
          <Globe />
          <p className="mt-6 text-[length:var(--body)] font-semibold tracking-[.18em] uppercase leading-[1.8]">
            NOT FOR EVERYONE.
            <br />
            STREETWEAR OUT OF JAIPUR.
          </p>
        </motion.div>
      </div>
      <div className="relative z-10 flex justify-between gap-4 border-t border-foreground/25 px-[var(--pad-x)] py-5 text-[length:var(--micro)] font-semibold tracking-[.2em] uppercase">
        <span>© OFF CULTURE / 2026</span>
        <span className="hidden sm:inline">INDEPENDENT BY DESIGN</span>
        <span>JAIPUR, INDIA — 26.9124° N</span>
      </div>
    </main>
  );
}
