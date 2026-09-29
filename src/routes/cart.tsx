import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus, ShoppingBag, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore, reveal } from "@/components/brand/site";
import { meta, rupees } from "@/lib/store";
export const Route = createFileRoute("/cart")({
  head: () =>
    meta("Your Bag — OFF CULTURE", "Review your OFF CULTURE bag and try the demo checkout."),
  component: Cart,
});
function Cart() {
  const { items, remove, qty, clear } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const subtotal = items.reduce((n, i) => n + i.product.price * i.qty, 0);
  return (
    <main className="px-[var(--pad-x)] py-12 pb-24">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-[60vh] flex flex-col items-center justify-center text-center"
          >
            <Check size={72} strokeWidth={1} />
            <h1 className="font-orbitron font-black text-2xl md:text-4xl mt-8">
              ORDER SUBMITTED SUCCESSFULLY
            </h1>
            <p className="text-muted-foreground mt-4">A demo order. No payment was collected.</p>
            <Button variant="brand" asChild className="mt-10">
              <Link to="/shop" search={{}}>
                CONTINUE SHOPPING <ArrowUpRight size={17} />
              </Link>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="bag"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div {...reveal}>
              <p className="text-[length:var(--micro)] text-muted-foreground tracking-[.2em]">
                YOUR SELECTION
              </p>
              <h1 className="font-orbitron font-black text-4xl md:text-6xl mt-4 mb-12">YOUR BAG</h1>
            </motion.div>
            {items.length === 0 ? (
              <div className="min-h-[40vh] flex flex-col items-center justify-center gap-6 border-t border-border">
                <ShoppingBag size={42} strokeWidth={1} />
                <p>Your bag is empty.</p>
                <Button variant="brand" asChild>
                  <Link to="/shop" search={{}}>
                    EXPLORE THE CATALOG <ArrowUpRight size={16} />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-[1fr_340px] gap-12">
                <div className="border-t border-border">
                  <AnimatePresence>
                    {items.map((i) => (
                      <motion.div
                        layout
                        key={`${i.product.id}-${i.size}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -60, height: 0 }}
                        className="flex gap-4 sm:gap-8 py-6 border-b border-border"
                      >
                        <Link to="/product/$id" params={{ id: i.product.id }}>
                          <img
                            src={i.product.image}
                            alt={i.product.name}
                            className="w-24 sm:w-36 aspect-[4/5] object-cover grayscale"
                          />
                        </Link>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="flex justify-between gap-3">
                            <div>
                              <p className="text-[length:var(--micro)] text-muted-foreground tracking-[.15em]">
                                {i.product.category} / SIZE {i.size}
                              </p>
                              <Link
                                to="/product/$id"
                                params={{ id: i.product.id }}
                                className="font-orbitron font-bold text-xs sm:text-base block mt-3"
                              >
                                {i.product.name}
                              </Link>
                            </div>
                            <Button
                              variant="iconPlain"
                              size="icon"
                              aria-label={`Remove ${i.product.name}`}
                              onClick={() => remove(i.product.id, i.size)}
                            >
                              <X size={18} />
                            </Button>
                          </div>
                          <div className="flex items-end justify-between gap-3">
                            <div className="flex border border-border items-center">
                              <Button
                                variant="iconPlain"
                                size="icon"
                                aria-label={`Decrease ${i.product.name} quantity`}
                                onClick={() => qty(i.product.id, i.size, -1)}
                              >
                                <Minus size={14} />
                              </Button>
                              <span className="w-8 text-center text-sm">{i.qty}</span>
                              <Button
                                variant="iconPlain"
                                size="icon"
                                aria-label={`Increase ${i.product.name} quantity`}
                                onClick={() => qty(i.product.id, i.size, 1)}
                              >
                                <Plus size={14} />
                              </Button>
                            </div>
                            <p className="text-sm">{rupees(i.product.price * i.qty)}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <aside className="border-t border-border pt-6 lg:sticky lg:top-10 self-start">
                  <h2 className="font-orbitron font-bold text-lg mb-8">ORDER SUMMARY</h2>
                  <div className="flex justify-between text-sm py-3">
                    <span>SUBTOTAL</span>
                    <span>{rupees(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm py-3 text-muted-foreground">
                    <span>SHIPPING</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between border-t border-border mt-5 pt-5 font-bold">
                    <span>TOTAL</span>
                    <span>{rupees(subtotal)}</span>
                  </div>
                  <Button
                    variant="brand"
                    className="mt-8 w-full justify-between"
                    onClick={() => {
                      clear();
                      setSubmitted(true);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    CHECKOUT NOW <ArrowUpRight size={17} />
                  </Button>
                  <p className="text-[length:var(--micro)] text-muted-foreground mt-4">
                    DEMO CHECKOUT · NO PAYMENT REQUIRED
                  </p>
                </aside>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
