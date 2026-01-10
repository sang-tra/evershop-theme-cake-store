import React from "react";
import {
  CategoryFilter,
  FilterableAttribute,
  FilterInput,
  PriceRange,
} from "@components/frontStore/catalog/ProductFilter.js";
import { _ } from "@evershop/evershop/lib/locale/translate/_";

export const formatPrice = (oldFormatted: string, price: number) => {
  const match = oldFormatted.match(/^[^\d.,]+/);
  const currencySymbol = match ? match[0] : "";
  return currencySymbol + price;
};

export const getFilterSummary = (
  availableAttributes,
  currentFilters,
  priceRange,
  categories
) => {
  const summaries: string[] = [];

  // Price filters
  const minPrice = currentFilters.find((f) => f.key === "min_price");
  const maxPrice = currentFilters.find((f) => f.key === "max_price");
  if (minPrice || maxPrice) {
    const min = minPrice?.value || priceRange?.min.toString() || "0";
    const max = maxPrice?.value || priceRange?.max.toString() || "∞";
    summaries.push(
      _("Price: ${value}", {
        value: `${formatPrice(
          priceRange.minText,
          parseInt(min)
        )} - ${formatPrice(priceRange.maxText, parseInt(max))}`,
      })
    );
  }

  const categoryFilter = currentFilters.find((f) => f.key === "cat");
  if (categoryFilter) {
    const selectedCategoryIds = categoryFilter.value.split(",");
    const selectedCategories = categories.filter((cat) =>
      selectedCategoryIds.includes(cat.categoryId.toString())
    );
    if (selectedCategories.length > 0) {
      summaries.push(
        `${_("Categories")}: ${selectedCategories
          .map((c) => c.name)
          .join(", ")}`
      );
    }
  }

  availableAttributes.forEach((attr) => {
    const filter = currentFilters.find((f) => f.key === attr.attributeCode);
    if (filter) {
      const selectedOptionIds = filter.value.split(",");
      const selectedOptions = attr.options.filter((opt) =>
        selectedOptionIds.includes(opt.optionId.toString())
      );
      if (selectedOptions.length > 0) {
        summaries.push(
          `${attr.attributeName}: ${selectedOptions
            .map((o) => o.optionText)
            .join(", ")}`
        );
      }
    }
  });

  return summaries;
};

const Badge = ({ children }) => (
  <span
    data-slot="badge"
    className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 text-xs">
    {children}
  </span>
);

const Filter = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className={className}
    viewBox="0 0 24 24">
    <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"></path>
  </svg>
);

export const DefaultProductFilterSummary: React.FC<{
  availableAttributes: FilterableAttribute[];
  currentFilters: FilterInput[];
  priceRange?: PriceRange;
  categories: CategoryFilter[];
  clearAllFilters?: () => void;
}> = ({
  availableAttributes,
  currentFilters,
  priceRange,
  categories,
  clearAllFilters,
}) => {
  const filterSummary = getFilterSummary(
    availableAttributes,
    currentFilters,
    priceRange,
    categories
  );

  if (filterSummary.length === 0) {
    return null;
  }
  const searchTerm = currentFilters.find((f) => f.key === "keyword")?.value;
  return (
    <div className="flex items-center gap-2 flex-wrap mt-3">
      <Filter className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Active filters:</span>
      {searchTerm && <Badge>Search: "{searchTerm}"</Badge>}
      {filterSummary.map((summary, index) => (
        <Badge key={index}>{summary}</Badge>
      ))}
      <button
        data-slot="button"
        onClick={clearAllFilters}
        type="button"
        className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 rounded-md gap-1.5 has-[&gt;svg]:px-2.5 text-xs h-6 px-2">
        {_("Clear All")}
      </button>
    </div>
  );
};
