import { useProduct } from "@components/frontStore/catalog/ProductContext.js";
import React from "react";

export default function Flavor() {
  const { attributes } = useProduct();
  const flavor = attributes?.find((attr) => attr.attributeCode === "flavor");
  if (!flavor) {
    return null;
  }
  return (
    <div className="product__single__flavor">
      <span
        data-slot="badge"
        className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-foreground [a&amp;]:hover:bg-accent [a&amp;]:hover:text-accent-foreground mb-2">
        {flavor.optionText}
      </span>
    </div>
  );
}

export const layout = {
  areaId: "productNameBefore",
  sortOrder: 15,
};
