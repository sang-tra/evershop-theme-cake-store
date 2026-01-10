import React from "react";
import { _ } from "@evershop/evershop/lib/locale/translate/_";

export default function CallToAction() {
  return (
    <section className="py-16 px-4 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl mb-6">
          Ready to Order Your Perfect Cake?
        </h2>
        <p className="text-lg mb-8 text-primary-foreground/90">
          Whether you're looking for a classic favorite or something completely
          custom, we're here to make your sweet dreams come true.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/cakes"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 rounded-md px-6 has-[&gt;svg]:px-4">
            {_("Browse Cakes")}
          </a>
        </div>
      </div>
    </section>
  );
}

export const layout = {
  areaId: "content",
  sortOrder: 30,
};
