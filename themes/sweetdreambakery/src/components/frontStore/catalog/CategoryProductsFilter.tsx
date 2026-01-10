import Area from "@components/common/Area.js";
import { useCategory } from "@components/frontStore/catalog/CategoryContext.js";
import {
  FilterInput,
  ProductFilter,
} from "@components/frontStore/catalog/ProductFilter.js";
import { _ } from "@evershop/evershop/lib/locale/translate/_";
import React from "react";
import { DefaultProductFilterRender } from "@components/frontStore/catalog/DefaultProductFilterRender.js";
import { useAppDispatch } from "@components/common/context/app.js";

export function CategoryProductsFilter() {
  const category = useCategory();
  const AppContextDispatch = useAppDispatch();
  const onFilterUpdate = async (newFilters: FilterInput[]) => {
    try {
      const currentUrl = window.location.href;
      const url = new URL(currentUrl, window.location.origin);

      // Add new filter parameters
      for (const filter of newFilters) {
        if (["page", "limit", "ob", "od"].includes(filter.key)) {
          continue;
        }

        if (filter.operation === "eq") {
          url.searchParams.set(filter.key, filter.value);
        } else {
          url.searchParams.set(`${filter.key}[operation]`, filter.operation);
          url.searchParams.set(`${filter.key}[value]`, filter.value);
        }
      }

      url.searchParams.delete("page");
      const filterKeys = new Set(newFilters.map((f) => f.key));
      url.searchParams.forEach((value, key) => {
        if (
          !["page", "limit", "ob", "od", "ajax"].includes(key) &&
          !filterKeys.has(key)
        ) {
          url.searchParams.delete(key);
        }
      });
      url.searchParams.set("ajax", "true");

      await AppContextDispatch.fetchPageData(url);
      url.searchParams.delete("ajax");

      history.pushState(null, "", url);
    } catch (error) {
      console.error("Failed to update filters:", error);
    }
  };
  return (
    <>
      <ProductFilter
        currentFilters={category.products.currentFilters}
        availableAttributes={category.availableAttributes}
        categories={category.children}
        priceRange={category.priceRange}
        onFilterUpdate={onFilterUpdate}>
        {(renderProps) => (
          <DefaultProductFilterRender
            renderProps={renderProps}
            title="Product Filters"
            className="flex-grow"
            showFilterSummary={true}
          />
        )}
      </ProductFilter>
    </>
  );
}
