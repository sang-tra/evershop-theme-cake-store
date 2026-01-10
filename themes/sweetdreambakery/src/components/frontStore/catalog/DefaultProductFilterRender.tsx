import React from "react";
import { _ } from "@evershop/evershop/lib/locale/translate/_";
import Area from "@components/common/Area.js";
import { useMemo } from "react";
import {
  ProductFilterRenderProps,
  FilterComponent,
  ProductFilterDispatch,
} from "@components/frontStore/catalog/ProductFilter.js";
import { DefaultPriceFilterRender as PriceFilterRenderer } from "@components/frontStore/catalog/DefaultPriceFilterRender.js";
import { DefaultAttributeFilterRender } from "@components/frontStore/catalog/DefaultAttributeFilterRender.js";
import { DefaultProductFilterSummary } from "@components/frontStore/catalog/DefaultProductFilterSummary.js";
import { KeywordFilterRender } from "@components/frontStore/catalog/KeywordFilterRender.js";

export const DefaultProductFilterRender: React.FC<{
  renderProps: ProductFilterRenderProps;
  className?: string;
  title?: string;
  showFilterSummary?: boolean;
}> = ({ renderProps, className = "", showFilterSummary = true }) => {
  const {
    currentFilters,
    availableAttributes,
    priceRange,
    categories,
    setting,
    removeFilter,
    updateFilter,
    clearAllFilters,
    isLoading,
    activeFilterCount,
  } = renderProps;

  const defaultComponents = useMemo(() => {
    const components: FilterComponent[] = [];
    components.push({
      component: { default: KeywordFilterRender },
      props: { currentFilters },
      sortOrder: 5,
      id: "keyword-filter",
    });
    if (availableAttributes.length > 0) {
      components.push({
        component: { default: DefaultAttributeFilterRender },
        props: { availableAttributes, currentFilters },
        sortOrder: 10,
        id: "attribute-filter",
      });
    }
    if (priceRange && priceRange.min !== priceRange.max) {
      components.push({
        component: { default: PriceFilterRenderer },
        props: { priceRange, currentFilters, setting },
        sortOrder: 20,
        id: "price-filter",
      });
    }
    return components;
  }, [availableAttributes, priceRange, categories, currentFilters, setting]);

  const contextValue = useMemo(
    () => ({ updateFilter, removeFilter, clearAllFilters }),
    [updateFilter, removeFilter, clearAllFilters]
  );

  return (
    <ProductFilterDispatch.Provider value={contextValue}>
      <div className={`product__filter ${className}`}>
        <div
          className={
            isLoading
              ? "opacity-75 pointer-events-none flex flex-col md:flex-row justify-start gap-4"
              : "flex justify-start gap-4 flex-col md:flex-row"
          }>
          <Area
            id="productFilter"
            noOuter
            coreComponents={defaultComponents}
            availableAttributes={availableAttributes}
            priceRange={priceRange}
            currentFilters={currentFilters}
            categories={categories}
            setting={setting}
          />
        </div>
        {showFilterSummary && (
          <DefaultProductFilterSummary
            availableAttributes={availableAttributes}
            currentFilters={currentFilters}
            priceRange={priceRange}
            categories={categories}
            clearAllFilters={clearAllFilters}
          />
        )}
      </div>
    </ProductFilterDispatch.Provider>
  );
};
