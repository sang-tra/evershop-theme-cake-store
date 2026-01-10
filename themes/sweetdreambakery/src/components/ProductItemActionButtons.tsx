import { AddToCart } from "@components/frontStore/cart/AddToCart.js";
import { _ } from "@evershop/evershop/lib/locale/translate/_";
import React from "react";

export const ActionButtons = ({ product }) => {
  return (
    <div className="space-x-2 justify-center [.border-t]:pt-6 p-4 pt-0 flex gap-2 mt-auto">
      <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 flex-1">
        View Details
      </button>
      <AddToCart
        product={{
          sku: product.sku,
          isInStock: product.inventory.isInStock,
        }}
        qty={1}>
        {(state, actions) => (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              actions.addToCart();
            }}
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 flex-1">
            {state.isLoading ? "Adding..." : _("Add to Cart")}
          </button>
        )}
      </AddToCart>
    </div>
  );
};
