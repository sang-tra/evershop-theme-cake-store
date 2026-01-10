import Area from "@components/common/Area.js";
import { useProduct } from "@components/frontStore/catalog/ProductContext.js";
import React from "react";

export const ProductSingleAttributes = () => {
  const { attributes, sku } = useProduct();
  const list = attributes
    ? [
        { attributeCode: "sku", attributeName: "SKU", optionText: sku },
        ...attributes,
      ]
    : [];
  if (!list || list.length === 0) {
    return null;
  }

  return (
    <>
      <div
        data-orientation="horizontal"
        role="none"
        data-slot="separator-root"
        className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-6"></div>
      <Area id="productAttributesBefore" noOuter />
      <div className="space-y-6">
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
          <div className="[&:last-child]:pb-6 p-6">
            <h3 className="mb-4">Product Details</h3>
            <div className="space-y-3">
              {list.map((spec, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-muted-foreground">
                    {spec.attributeName}:
                  </span>
                  <span>{spec.optionText}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Area id="productAttributesAfter" noOuter />
    </>
  );
};
