import Area from "@components/common/Area.js";
import Button from "@components/common/Button.js";
import { Form } from "@components/common/form/Form.js";
import {
  AddToCart,
  AddToCartActions,
  AddToCartState,
} from "@components/frontStore/cart/AddToCart.js";
import { useProduct } from "@components/frontStore/catalog/ProductContext.js";
import { VariantSelector } from "@components/frontStore/catalog/VariantSelector.js";
import { _ } from "@evershop/evershop/lib/locale/translate/_";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Qty = ({ qty, increase, decrease }) => {
  return (
    <div>
      <div className="flex items-center space-x-3">
        <button
          data-slot="button"
          onClick={(e) => {
            e.preventDefault();
            if (qty > 1) {
              decrease();
            }
          }}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[&gt;svg]:px-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-minus h-4 w-4"
            aria-hidden="true">
            <path d="M5 12h14"></path>
          </svg>
        </button>
        <span className="text-lg w-8 text-center">{qty}</span>
        <button
          data-slot="button"
          onClick={(e) => {
            e.preventDefault();
            increase();
          }}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[&gt;svg]:px-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-plus h-4 w-4"
            aria-hidden="true">
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export function ProductSingleForm() {
  const {
    sku,
    price,
    inventory: { isInStock },
  } = useProduct();
  const form = useForm();
  const qty = form.watch("qty", 1);

  return (
    <Form id="productForm" method="POST" submitBtn={false} form={form}>
      <input type="hidden" value={sku} {...form.register("sku")} />
      <Area
        id="productSinglePageForm"
        className="space-y-4"
        coreComponents={[
          {
            component: {
              default: <VariantSelector />,
            },
            sortOrder: 10,
            id: "variantSelector",
          },
          {
            component: {
              default: (
                <div className="mt-4">
                  <span className="text-3xl">{price.regular.text}</span>
                </div>
              ),
            },
            sortOrder: 15,
            id: "price",
          },
          {
            component: {
              default: (
                <Qty
                  qty={qty}
                  increase={() => form.setValue("qty", qty + 1)}
                  decrease={() => form.setValue("qty", qty - 1)}
                />
              ),
            },
            sortOrder: 20,
            id: "qty",
          },
          {
            component: {
              default: (
                <AddToCart
                  product={{
                    sku: sku,
                    isInStock: isInStock,
                  }}
                  qty={qty}
                  onSuccess={() => {
                    // To show the mini cart after adding a product to cart
                  }}
                  onError={(errorMessage) => {
                    toast.error(
                      errorMessage || _("Failed to add product to cart")
                    );
                  }}>
                  {(state: AddToCartState, actions: AddToCartActions) => (
                    <div className="mt-6 w-full">
                      {state.isInStock === true && (
                        <div className="flex space-x-4">
                          <button
                            disabled={state.isLoading}
                            data-slot="button"
                            onClick={(e) => {
                              e.preventDefault();
                              if (!state.isLoading) {
                                form.trigger().then((isValid) => {
                                  if (isValid) {
                                    actions.addToCart();
                                  }
                                });
                              }
                            }}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6 has-[&gt;svg]:px-4 flex-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="lucide lucide-shopping-cart h-4 w-4 mr-2"
                              aria-hidden="true">
                              <circle cx="8" cy="21" r="1"></circle>
                              <circle cx="19" cy="21" r="1"></circle>
                              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                            </svg>
                            {_("Add to Cart")}
                          </button>
                        </div>
                      )}
                      {state.isInStock === false && (
                        <Button
                          title={_("SOLD OUT")}
                          onAction={() => {}}
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6 has-[>svg]:px-4 flex-1"
                        />
                      )}
                    </div>
                  )}
                </AddToCart>
              ),
            },
            sortOrder: 25,
            id: "addToCartButton",
          },
        ]}
      />
    </Form>
  );
}
