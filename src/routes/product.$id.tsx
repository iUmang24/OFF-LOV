import { useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Corners, ProductCard, reveal, stagger, useStore } from "@/components/brand/site";
import { meta, products, rupees } from "@/lib/store";
export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) =>
    meta(
      loaderData ? `${loaderData.name} — OFF CULTURE` : "Product not found — OFF CULTURE",
      loaderData
        ? `${loaderData.name}. ${loaderData.description}`
        : "This piece could not be found.",
    ),
  component: ProductPage,
});
function ProductPage() {
  const product = Route.useLoaderData();
  const [size, setSize] = useState("M");
  const { add } = useStore();
  const related = products
    .filter(
      (p) => p.id !== product.id && (p.category === product.category || p.drop === product.drop),
    )
    .slice(0, 4);
  return (
    <main className="px-[var(--pad-x)] pt-8 pb-24">
      <Link
        to="/shop"
        search={{}}
        className="text-[length:var(--micro)] text-muted-foreground tracking-[.2em] hover:text-foreground"
      >
        ← BACK TO CATALOG
      </Link>
      <div className="grid lg:grid-cols-2 gap-9 lg:gap-16 mt-8 items-start">
        <motion.div {...reveal} className="relative p-3">
          <Corners />
          <img
            src={product.image}
            alt={product.name}
            width={1024}
            height={1280}
            className="w-full aspect-[4/5] object-cover"
          />
        </motion.div>
        <motion.div {...reveal} className="lg:sticky lg:top-12 py-5">
          <p className="text-[length:var(--micro)] tracking-[.22em] text-muted-foreground">
            {product.category} / DROP {product.drop}
          </p>
          <h1 className="font-orbitron font-black text-3xl md:text-5xl leading-tight mt-6">
            {product.name}
          </h1>
          <p className="text-xl mt-6">{rupees(product.price)}</p>
          <p className="text-muted-foreground leading-relaxed mt-10 max-w-md">
            {product.description}
          </p>
          <div className="mt-12">
            <p className="text-[length:var(--micro)] tracking-[.2em] mb-4">SELECT SIZE</p>
            <div className="flex gap-2">
              {["S", "M", "L", "XL"].map((s) => (
                <Button
                  key={s}
                  variant={size === s ? "brand" : "brandOutline"}
                  className="w-12 h-12 p-0 text-xs tracking-normal"
                  onClick={() => setSize(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
          <Button
            variant="brand"
            className="w-full max-w-md mt-8 justify-between"
            onClick={() => add(product, size)}
          >
            ADD TO BAG <ArrowUpRight size={17} />
          </Button>
          <p className="text-[length:var(--micro)] tracking-[.16em] text-muted-foreground mt-8">
            {product.care}
          </p>
        </motion.div>
      </div>
      <section className="mt-24">
        <motion.h2 {...reveal} className="font-orbitron font-bold text-2xl mb-8">
          YOU MIGHT ALSO LIKE
        </motion.h2>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </motion.div>
      </section>
    </main>
  );
}
