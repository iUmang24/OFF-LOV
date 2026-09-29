import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, ChevronRight, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { articles, drops, products, rupees, type Product } from "@/lib/store";

type Item = { product: Product; size: string; qty: number };
type Drawer = "shop" | "drops" | "journal" | "cart" | null;
type Store = {
  items: Item[];
  add: (p: Product, size?: string) => void;
  remove: (id: string, size: string) => void;
  qty: (id: string, size: string, delta: number) => void;
  clear: () => void;
  drawer: Drawer;
  setDrawer: (v: Drawer) => void;
  notify: (text: string) => void;
};
const StoreContext = createContext<Store | null>(null);
export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("Store provider missing");
  return ctx;
}
export const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};
export const stagger = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
export const child = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};
export function BrandButton({
  children,
  onClick,
  outline = false,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  outline?: boolean;
  className?: string;
}) {
  return (
    <motion.span className="inline-flex" whileHover={{ scale: 1.015 }}>
      <Button variant={outline ? "brandOutline" : "brand"} onClick={onClick} className={className}>
        {children}
        <motion.span className="inline-flex" whileHover={{ x: 3, y: -3 }}>
          <ArrowUpRight size={17} />
        </motion.span>
      </Button>
    </motion.span>
  );
}
export function Corner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const paths = {
    tl: "M0 11.5V0.5H11.5",
    tr: "M0.5 0.5H11.5V11.5",
    bl: "M0 0.5V11.5H11.5",
    br: "M0.5 11.5H11.5V0.5",
  };
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`absolute ${position.includes("t") ? "top-0" : "bottom-0"} ${position.includes("l") ? "left-0" : "right-0"} h-[var(--corner)] w-[var(--corner)]`}
      aria-hidden="true"
    >
      <path d={paths[position]} />
    </svg>
  );
}
export function Corners() {
  return (
    <>
      {(["tl", "tr", "bl", "br"] as const).map((p) => (
        <Corner key={p} position={p} />
      ))}
    </>
  );
}
export function Checker() {
  return (
    <svg
      viewBox="0 0 36 18"
      className="inline-block w-[var(--checker-w)] h-[var(--checker-h)] translate-y-[2px] ml-2"
      fill="currentColor"
      aria-hidden="true"
    >
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: 7 }, (_, col) => (
          <rect
            key={`${row}-${col}`}
            x={col * 5 + (row % 2 ? 2.25 : 0)}
            y={row * 4.3}
            width="3.8"
            height="3.8"
          />
        )),
      )}
    </svg>
  );
}
export function Globe() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-[var(--globe)] h-[var(--globe)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="28" />
      <path d="M4 32h56M32 4v56" />
      <ellipse cx="32" cy="32" rx="14" ry="28" />
      <ellipse cx="32" cy="32" rx="25" ry="10" />
      <path d="M11 15c12 7 30 7 42 0M11 49c12-7 30-7 42 0" />
    </svg>
  );
}
function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null),
    ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = -100,
      y = -100,
      rx = -100,
      ry = -100,
      frame = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      }
      const interactive = (e.target as HTMLElement).closest("button,a");
      ring.current?.classList.toggle("scale-150", !!interactive);
    };
    const tick = () => {
      rx += (x - rx) * 0.15;
      ry += (y - ry) * 0.15;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <>
      <div
        ref={dot}
        className="hidden lg:block fixed -left-1 -top-1 z-[100] w-2 h-2 rounded-full bg-primary pointer-events-none"
      />
      <div
        ref={ring}
        className="hidden lg:block fixed -left-5 -top-5 z-[100] w-10 h-10 rounded-full border border-primary pointer-events-none transition-[scale] duration-200"
      />
    </>
  );
}
function Grain() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-[5] opacity-[.045]"
      aria-hidden="true"
    >
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}
export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]),
    [drawer, setDrawer] = useState<Drawer>(null),
    [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notify = (text: string) => {
    setToast(text);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 3000);
  };
  const add = (product: Product, size = "M") => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.size === size);
      return existing
        ? prev.map((i) => (i === existing ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { product, size, qty: 1 }];
    });
    notify(`Added “${product.name}” to your bag.`);
  };
  const remove = (id: string, size: string) =>
    setItems((prev) => prev.filter((i) => !(i.product.id === id && i.size === size)));
  const qty = (id: string, size: string, delta: number) =>
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === id && i.size === size ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
      ),
    );
  return (
    <StoreContext.Provider
      value={{ items, add, remove, qty, clear: () => setItems([]), drawer, setDrawer, notify }}
    >
      <CustomCursor />
      <Grain />
      {children}
      <DrawerPanel />
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 28, y: -12 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 25 }}
            className="fixed right-4 top-4 z-[90] flex max-w-[calc(100vw-2rem)] items-center gap-3 bg-primary px-5 py-4 text-primary-foreground text-xs uppercase tracking-wider"
          >
            <Check size={17} className="text-emerald-400" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </StoreContext.Provider>
  );
}
export function Header() {
  const { items, setDrawer } = useStore();
  const location = useLocation();
  const home = location.pathname === "/";
  const count = items.reduce((n, i) => n + i.qty, 0);
  return (
    <header className="relative z-20 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-5 px-[var(--pad-x)] pt-[var(--header-pt)] pb-[var(--section-gap)] sm:flex sm:items-start sm:justify-between sm:gap-5">
      <Link
        to="/"
        className="col-span-2 min-w-0 font-orbitron font-black text-[length:var(--logo)] tracking-[.15em] leading-none whitespace-nowrap hover:opacity-80 transition-opacity sm:col-span-1"
      >
        OFF CULTURE
        <span className="inline-block align-top text-[length:var(--logo-mark)] ml-0.5 -mt-0.5">
          •
        </span>
      </Link>
      <nav
        aria-label="Main navigation"
        className="col-span-2 flex w-full items-center justify-between gap-2 pt-1 sm:col-span-1 sm:w-auto sm:justify-start sm:gap-[var(--gap-nav)]"
      >
        {(["shop", "drops", "journal"] as const).map((name) =>
          home ? (
            <Button key={name} variant="nav" onClick={() => setDrawer(name)}>
              {name}
            </Button>
          ) : (
            <Link
              key={name}
              to={`/${name}` as "/shop" | "/drops" | "/journal"}
              className="nav-link"
            >
              {name}
            </Link>
          ),
        )}
        <span className="text-muted-foreground hidden sm:inline">|</span>
        <Button
          variant="iconPlain"
          size="icon"
          aria-label={`Open bag, ${count} items`}
          onClick={() => setDrawer("cart")}
          className="relative"
        >
          <ShoppingBag size={20} strokeWidth={1.5} />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] flex items-center justify-center">
              {count}
            </span>
          )}
        </Button>
      </nav>
    </header>
  );
}
function DrawerPanel() {
  const { drawer, setDrawer, items, add, remove, clear, notify } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!drawer) return;
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawer(null);
    };
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [drawer, setDrawer]);
  const heading = { shop: "Catalog", drops: "Drop Archive", journal: "Dispatch", cart: "Bag" };
  const subtotal = items.reduce((n, i) => n + i.qty * i.product.price, 0);
  return (
    <AnimatePresence>
      {drawer && (
        <div className="fixed inset-0 z-[80]">
          <motion.div
            className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawer(null)}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={heading[drawer]}
            className="absolute right-0 top-0 h-full w-full max-w-[var(--drawer-max)] bg-background border-l border-border flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-[var(--drawer-pad)] pb-5 border-b border-border flex items-start justify-between">
              <div>
                <h2 className="font-orbitron font-bold uppercase text-xl">{heading[drawer]}</h2>
                <p className="text-muted-foreground uppercase tracking-[.2em] text-[length:var(--micro)] mt-2">
                  {drawer === "shop"
                    ? "Current Lineup"
                    : drawer === "drops"
                      ? "Season Lineup"
                      : drawer === "journal"
                        ? "From The Streets"
                        : ""}
                </p>
              </div>
              <Button
                variant="iconPlain"
                size="icon"
                aria-label="Close drawer"
                onClick={() => setDrawer(null)}
              >
                <X size={22} />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto px-[var(--drawer-pad)]">
              {drawer === "shop" &&
                products.slice(0, 4).map((p, i) => (
                  <div key={p.id} className="border-b border-border py-5">
                    <p className="text-[length:var(--micro)] tracking-[.18em] text-muted-foreground">
                      {["NEW DROP", "LIMITED EDITION", "IN STOCK", "PRE-ORDER"][i]}
                    </p>
                    <div className="flex items-end justify-between gap-3 mt-2">
                      <div>
                        <Link
                          to="/product/$id"
                          params={{ id: p.id }}
                          onClick={() => setDrawer(null)}
                          className="font-orbitron text-xs font-bold leading-snug hover:opacity-50"
                        >
                          {p.name}
                        </Link>
                        <p className="text-sm mt-2">{rupees(p.price)}</p>
                      </div>
                      <Button variant="mini" onClick={() => add(p)}>
                        ADD <Plus size={12} />
                      </Button>
                    </div>
                  </div>
                ))}
              {drawer === "drops" &&
                drops.map((d) => (
                  <Link
                    to="/drops"
                    key={d.id}
                    onClick={() => setDrawer(null)}
                    className="block border-b border-border py-6 group"
                  >
                    <p className="text-[length:var(--micro)] text-muted-foreground tracking-[.2em]">
                      DROP {d.number}
                    </p>
                    <h3 className="font-orbitron font-bold mt-2 group-hover:opacity-50 transition-opacity">
                      {d.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{d.copy}</p>
                  </Link>
                ))}
              {drawer === "journal" &&
                articles.slice(0, 3).map((a) => (
                  <Link
                    to="/journal/$id"
                    params={{ id: a.id }}
                    key={a.id}
                    onClick={() => setDrawer(null)}
                    className="block border-b border-border py-6 group"
                  >
                    <p className="text-[length:var(--micro)] text-muted-foreground tracking-[.2em]">
                      {a.date}
                    </p>
                    <h3 className="font-orbitron text-xs font-bold mt-2 leading-relaxed group-hover:opacity-50 transition-opacity">
                      {a.title}
                    </h3>
                    <p className="text-[length:var(--micro)] mt-3 text-muted-foreground">
                      {a.read}
                    </p>
                  </Link>
                ))}
              {drawer === "cart" &&
                (items.length === 0 ? (
                  <div className="h-full flex flex-col justify-center items-center gap-5 text-muted-foreground">
                    <ShoppingBag size={42} strokeWidth={1} />
                    <p className="text-sm">Your bag is empty.</p>
                  </div>
                ) : (
                  items.map((i) => (
                    <div
                      key={`${i.product.id}-${i.size}`}
                      className="py-5 border-b border-border flex gap-3"
                    >
                      <img
                        src={i.product.image}
                        alt=""
                        className="w-16 h-20 object-cover grayscale"
                      />
                      <div className="flex-1">
                        <p className="font-orbitron font-bold text-[10px] leading-relaxed">
                          {i.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          SIZE {i.size} · QTY {i.qty}
                        </p>
                        <p className="text-sm mt-2">{rupees(i.product.price * i.qty)}</p>
                      </div>
                      <Button
                        variant="iconPlain"
                        size="icon"
                        aria-label={`Remove ${i.product.name}`}
                        onClick={() => remove(i.product.id, i.size)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ))
                ))}
            </div>
            <div className="p-[var(--drawer-pad)] border-t border-border">
              {drawer === "cart" && items.length > 0 ? (
                <>
                  <div className="flex justify-between text-sm mb-4">
                    <span>SUBTOTAL</span>
                    <span>{rupees(subtotal)}</span>
                  </div>
                  <Button
                    variant="brand"
                    className="w-full justify-between"
                    onClick={() => {
                      clear();
                      setDrawer(null);
                      notify("Order submitted successfully!");
                    }}
                  >
                    CHECKOUT NOW <ChevronRight size={17} />
                  </Button>
                  <Button
                    variant="link"
                    className="mt-3 w-full"
                    onClick={() => {
                      setDrawer(null);
                      navigate({ to: "/cart" });
                    }}
                  >
                    VIEW FULL BAG
                  </Button>
                </>
              ) : drawer === "cart" ? (
                <Button
                  variant="brand"
                  className="w-full"
                  onClick={() => {
                    setDrawer(null);
                    navigate({ to: "/shop", search: {} });
                  }}
                >
                  SHOP THE DROP <ArrowUpRight size={16} />
                </Button>
              ) : (
                <p className="text-center text-[length:var(--micro)] text-muted-foreground tracking-[.12em]">
                  OFF CULTURE © 2026 — STREETWEAR OUT OF JAIPUR
                </p>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
export function ProductCard({ product }: { product: Product }) {
  const { add } = useStore();
  return (
    <motion.article variants={child} className="group min-w-0">
      <div className="relative overflow-hidden bg-muted">
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          aria-label={`View ${product.name}`}
          className="block aspect-[4/5] overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1280}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-[filter,transform] duration-500"
          />
        </Link>
        <Button
          variant="mini"
          onClick={() => add(product)}
          className="absolute right-3 bottom-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
        >
          ADD <Plus size={13} />
        </Button>
      </div>
      <div className="flex justify-between gap-3 pt-4">
        <div>
          <p className="text-[length:var(--micro)] tracking-[.18em] text-muted-foreground mb-2">
            {product.category}
          </p>
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="font-orbitron font-bold text-xs sm:text-sm leading-snug hover:opacity-50 transition-opacity"
          >
            {product.name}
          </Link>
        </div>
        <p className="text-xs sm:text-sm whitespace-nowrap">{rupees(product.price)}</p>
      </div>
    </motion.article>
  );
}
export function PageFooter() {
  return (
    <footer className="relative z-10 border-t border-border px-[var(--pad-x)] py-7 flex flex-wrap justify-between gap-3 text-[length:var(--micro)] text-muted-foreground tracking-[.18em] uppercase">
      <span>OFF CULTURE © 2026</span>
      <span>STREETWEAR OUT OF JAIPUR.</span>
      <span>NOT FOR EVERYONE.</span>
    </footer>
  );
}
