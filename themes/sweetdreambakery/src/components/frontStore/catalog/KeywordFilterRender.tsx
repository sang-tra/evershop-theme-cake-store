import React, { useState } from "react";
import { _ } from "@evershop/evershop/lib/locale/translate/_";
import {
  FilterInput,
  useProductFilter,
} from "@components/frontStore/catalog/ProductFilter.js";

export const KeywordFilterRender: React.FC<{
  currentFilters: FilterInput[];
}> = ({ currentFilters }) => {
  const { updateFilter } = useProductFilter();

  // local keyword state with initial value from current filters
  const initialKeyword =
    currentFilters.find((f) => f.key === "keyword")?.value || "";
  const [keyword, setKeyword] = useState(initialKeyword);

  const handleSearch = (keyword: string) => {
    const newFilters = currentFilters.filter((f) => f.key !== "keyword");
    newFilters.push({ key: "keyword", operation: "eq", value: keyword });
    updateFilter(newFilters);
  };

  return (
    <input
      type={"text"}
      data-slot="input"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSearch(keyword);
        }
      }}
      className={
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
      }
      placeholder={_("Search cakes")}
    />
  );
};
