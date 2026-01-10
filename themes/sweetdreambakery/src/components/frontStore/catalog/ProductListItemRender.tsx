import { Image } from "@components/common/Image.js";
import { ProductNoThumbnail } from "@components/common/ProductNoThumbnail.js";
import { AddToCart } from "@components/frontStore/cart/AddToCart.js";
import { ProductData } from "@components/frontStore/catalog/ProductContext.js";
import { _ } from "@evershop/evershop/lib/locale/translate/_";
import React, { ReactNode } from "react";
import { toast } from "react-toastify";

const CollectionLabels: React.FC<{
  collections: { collectionId: number; name: string; uuid: string }[];
}> = ({ collections }) => {
  if (collections.length === 0) {
    return null;
  }
  return (
    <div className="mb-2 flex flex-wrap gap-2 absolute top-2 left-2">
      {collections.map((collection) => {
        const colors = [
          "bg-blue-500",
          "bg-green-500",
          "bg-indigo-500",
          "bg-purple-500",
          "bg-pink-500",
          "bg-red-500",
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return (
          <span
            key={collection.uuid}
            data-slot="badge"
            className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] overflow-hidden border-transparent bg-primary text-white`}>
            {collection.name}
          </span>
        );
      })}
    </div>
  );
};

export const ProductListItemRender = ({
  product,
  imageWidth,
  imageHeight,
  layout = "grid",
  showAddToCart = false,
  customAddToCartRenderer,
}: {
  product: ProductData;
  imageWidth?: number;
  imageHeight?: number;
  layout?: "grid" | "list";
  showAddToCart?: boolean;
  customAddToCartRenderer?: (product: ProductData) => ReactNode;
}) => {
  if (layout === "list") {
    return (
      <div className="product__list__item__inner group relative overflow-hidden flex gap-4 p-4">
        <div className="product__list__image flex-shrink-0">
          {product.attributes?.find((attr) => attr.attributeCode === "flavor")
            ?.optionText && (
            <div className="mb-2 text-sm text-gray-500">
              Flavor:{" "}
              {
                product.attributes.find(
                  (attr) => attr.attributeCode === "flavor"
                )?.optionText
              }
            </div>
          )}
          <a href={product.url}>
            {product.image && (
              <Image
                src={product.image.url}
                alt={product.image.alt || product.name}
                width={imageWidth || 120}
                height={imageHeight || 120}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw" // Assume 3 columns on larger screens
                className="transition-transform duration-300 ease-in-out group-hover:scale-105 rounded-lg"
              />
            )}
            {!product.image && (
              <ProductNoThumbnail width={imageWidth} height={imageHeight} />
            )}
          </a>
        </div>

        <div className="product__list__info flex-1 flex flex-col justify-between">
          <div>
            <h3 className="product__list__name text-lg font-medium mb-2">
              <a
                href={product.url}
                className="hover:text-primary transition-colors">
                {product.name}
              </a>
            </h3>

            <div className="product__list__sku text-sm text-gray-600 mb-2">
              SKU: {product.sku}
            </div>

            <div className="product__list__price mb-2">
              {product.price.special &&
              product.price.regular < product.price.special ? (
                <div className="flex items-center gap-2">
                  <span
                    className="regular-price text-sm"
                    style={{ textDecoration: "line-through", color: "#777" }}>
                    {product.price.regular.text}
                  </span>
                  <span
                    className="special-price text-lg font-bold"
                    style={{ color: "#e53e3e" }}>
                    {product.price.special.text}
                  </span>
                </div>
              ) : (
                <span className="regular-price text-lg font-bold">
                  {product.price.regular.text}
                </span>
              )}
            </div>

            <div className="product__list__stock mb-3">
              {product.inventory.isInStock ? (
                <span className="text-green-600 text-sm font-medium">
                  {_("In Stock")}
                </span>
              ) : (
                <span className="text-red-600 text-sm font-medium">
                  {_("Out of Stock")}
                </span>
              )}
            </div>
          </div>

          {showAddToCart && (
            <div className="product__list__actions ">
              {customAddToCartRenderer ? (
                customAddToCartRenderer(product)
              ) : (
                <AddToCart
                  product={{
                    sku: product.sku,
                    isInStock: product.inventory.isInStock,
                  }}
                  qty={1}
                  onError={(error) => toast.error(error)}>
                  {(state, actions) => (
                    <button
                      className="product__list__add-to-cart transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg rounded-full"
                      style={{
                        padding: "10px 20px",
                        backgroundColor: state.isInStock
                          ? "#3182ce"
                          : "#a0aec0",
                        color: "white",
                        border: "none",
                        cursor: state.canAddToCart ? "pointer" : "not-allowed",
                        opacity: state.isLoading ? 0.7 : 1,
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                      disabled={!state.canAddToCart || state.isLoading}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        actions.addToCart();
                      }}>
                      {state.isLoading ? "Adding..." : "Add to Cart"}
                    </button>
                  )}
                </AddToCart>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="product__list__item__inner group overflow-hidden bg-card text-card-foreground gap-6 rounded-xl border group hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <a href={product.url} className="product__list__link block">
        <div className="product__list__image overflow-hidden flex w-full justify-center relative">
          {product.image && (
            <Image
              src={product.image.url}
              alt={product.image.alt || product.name}
              width={imageWidth || 120}
              height={imageHeight || 120}
              sizes="(max-width: 768px) 100vw, 33vw" // Assume 3 columns on larger screens
              className="transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          )}
          {!product.image && (
            <ProductNoThumbnail width={imageWidth} height={imageHeight} />
          )}
          <CollectionLabels collections={product.collections || []} />
        </div>
        <div className="product__list__info p-4 flex-1 flex flex-col">
          {product.attributes?.find((attr) => attr.attributeCode === "flavor")
            ?.optionText && (
            <div className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground text-xs">
              {
                product.attributes.find(
                  (attr) => attr.attributeCode === "flavor"
                )?.optionText
              }
            </div>
          )}
          <h3 className="product__list__name mt-2 mb-2 cursor-pointer hover:text-primary transition-colors">
            {product.name}
          </h3>
          {product.metaDescription && (
            <p className="product__list__description text-muted-foreground text-sm mb-3 line-clamp-2 flex-1">
              {product.metaDescription}
            </p>
          )}
          <div className="product__list__price">
            {product.price.special &&
            product.price.regular < product.price.special ? (
              <>
                <span className="special-price text-lg font-semibold">
                  {product.price.special.text}
                </span>
                <span className="regular-price text-sm text-muted-foreground line-through">
                  {product.price.regular.text}
                </span>
              </>
            ) : (
              <span className="regular-price text-lg font-semibold">
                {product.price.regular.text}
              </span>
            )}
          </div>
        </div>
      </a>
      {showAddToCart && (
        <div className="product__list__actions ">
          {customAddToCartRenderer ? (
            customAddToCartRenderer(product)
          ) : (
            <AddToCart
              product={{
                sku: product.sku,
                isInStock: product.inventory.isInStock,
              }}
              qty={1}
              onError={(error) => toast.error(error)}>
              {(state, actions) => (
                <button
                  className="product__list__add-to-cart bg-primary p-2 text-center text-white w-full rounded-full transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
                  disabled={!state.canAddToCart || state.isLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    actions.addToCart();
                  }}>
                  {state.isLoading ? "Adding..." : "Add to Cart"}
                </button>
              )}
            </AddToCart>
          )}
        </div>
      )}
    </div>
  );
};
