import { _ } from "@evershop/evershop/lib/locale/translate/_";
import React from "react";

export default function ViewAllCakeButton() {
  return (
    <div className="text-center">
      <a
        href="/cakes"
        data-slot="button"
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 rounded-md px-6 has-[&gt;svg]:px-4">
        {_("View All Cakes")}
      </a>
    </div>
  );
}

export const layout = {
  areaId: "content",
  sortOrder: 21,
};
