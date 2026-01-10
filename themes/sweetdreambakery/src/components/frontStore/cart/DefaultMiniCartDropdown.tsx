import { Area } from "@components/common/Area.js";
import { CartData } from "@components/frontStore/cart/CartContext.js";
import { CartItems } from "@components/frontStore/cart/CartItems.js";
import { CartTotalSummary } from "@components/frontStore/cart/CartTotalSummary.js";
import { DefaultMiniCartDropdownEmpty } from "@components/frontStore/cart/DefaultMiniCartDropdownEmpty.js";
import { DefaultMiniCartItemList } from "@components/frontStore/cart/DefaultMiniCartItemList.js";
import { _ } from "@evershop/evershop/lib/locale/translate/_";
import React, { useEffect, useRef } from "react";

export const DefaultMiniCartDropdown: React.FC<{
  cart: CartData | null;
  isOpen: boolean;
  onClose: () => void;
  cartUrl?: string;
  dropdownPosition?: "left" | "right";
  setIsDropdownOpen: (isOpen: boolean) => void;
}> = ({
  cart,
  isOpen,
  onClose,
  cartUrl,
  dropdownPosition = "right",
  setIsDropdownOpen,
}) => {
  const totalQty = cart?.totalQty || 0;
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";

      setTimeout(() => {
        if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        }
      }, 100);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"></div>
      <div
        className={`minicart__dropdown fixed top-0 bottom-0 w-full md:w-1/3 bg-white border-x border-gray-200 z-50 shadow-xl transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ${dropdownPosition === "left" ? "left-0" : "right-0"}`}
        role="dialog"
        aria-modal="true"
        aria-label={_("Shopping Cart")}>
        <div className="minicart__dropdown__header flex justify-between items-center mb-6 border-b p-4 border-gray-200">
          <h3 className="minicart__heading font-medium text-2xl text-gray-900">
            {_("Your Cart")}
          </h3>
          <button
            type="button"
            ref={closeButtonRef}
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 rounded-full p-1"
            aria-label={_("Close cart")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {totalQty === 0 ? (
          <DefaultMiniCartDropdownEmpty setIsDropdownOpen={setIsDropdownOpen} />
        ) : (
          <div
            className="minicart__items__container flex flex-col justify-between h-full"
            style={{ height: "calc(100vh - 90px)" }}>
            <Area id="miniCartItemsBefore" noOuter />
            <div className="overflow-y-auto mb-8 px-4">
              <CartItems>
                {({ items, loading }) => (
                  <DefaultMiniCartItemList items={items} loading={loading} />
                )}
              </CartItems>
            </div>
            <Area id="miniCartItemsAfter" noOuter />
            <Area id="miniCartSummaryBefore" noOuter />
            <CartTotalSummary>
              {({ total }) => (
                <>
                  <div className="px-4">
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                          {_("Subtotal")}:
                        </span>
                        <span className="font-medium">{total || "—"}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                          {_("${count} item in cart", {
                            count: totalQty.toString(),
                          })}
                        </span>
                        <span>
                          {_("Taxes and shipping calculated at checkout")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t bg-gray-50 space-y-3">
                    <button
                      onClick={() => {
                        if (cartUrl) {
                          window.location.href = cartUrl;
                        }
                      }}
                      data-slot="button"
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6 has-[&gt;svg]:px-4 w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-shopping-bag w-4 h-4 mr-2"
                        aria-hidden="true">
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                        <path d="M3.103 6.034h17.794"></path>
                        <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"></path>
                      </svg>
                      {_("View Cart (${totalQty})", {
                        totalQty: totalQty.toString(),
                      })}
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onClose();
                      }}
                      data-slot="button"
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 rounded-md px-6 has-[&gt;svg]:px-4 w-full">
                      Continue Shopping
                    </button>
                  </div>
                </>
              )}
            </CartTotalSummary>
            <Area id="miniCartSummaryAfter" noOuter />
          </div>
        )}
      </div>
    </>
  );
};
