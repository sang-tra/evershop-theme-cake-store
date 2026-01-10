import React, { useState } from "react";
import { _ } from "@evershop/evershop/lib/locale/translate/_";
import {
  PriceRange,
  FilterInput,
  useProductFilter,
  ProductFilterProps,
} from "@components/frontStore/catalog/ProductFilter.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/Select.js";

export const DefaultPriceFilterRender: React.FC<{
  priceRange: PriceRange;
  currentFilters: FilterInput[];
  setting?: ProductFilterProps["setting"];
}> = ({ priceRange, currentFilters, setting }) => {
  const { updateFilter } = useProductFilter();

  // Initialize from current filters
  const [localMin, setLocalMin] = useState(() => {
    const minFilter = currentFilters.find((f) => f.key === "min_price");
    return minFilter ? parseInt(minFilter.value) : priceRange.min;
  });

  const [localMax, setLocalMax] = useState(() => {
    const maxFilter = currentFilters.find((f) => f.key === "max_price");
    return maxFilter ? parseInt(maxFilter.value) : priceRange.max;
  });
  // Sync with external filter changes
  React.useEffect(() => {
    const minFilter = currentFilters.find((f) => f.key === "min_price");
    const maxFilter = currentFilters.find((f) => f.key === "max_price");

    setLocalMin(minFilter ? parseInt(minFilter.value) : priceRange.min);
    setLocalMax(maxFilter ? parseInt(maxFilter.value) : priceRange.max);
  }, [currentFilters, priceRange]);

  // calculate thresholds for dropdown sections
  const step = (priceRange.max - priceRange.min) / 3;
  const th1 = Math.round(priceRange.min + step);
  const th2 = Math.round(priceRange.min + 2 * step);
  const [selectedSection, setSelectedSection] = useState<string>("");

  const handleSectionChange = (value: string) => {
    const section = value;
    setSelectedSection(section);
    const newFilters = currentFilters.filter(
      (f) => f.key !== "min_price" && f.key !== "max_price"
    );
    if (section === "under") {
      newFilters.push({
        key: "max_price",
        operation: "eq",
        value: th1.toString(),
      });
    } else if (section === "between") {
      newFilters.push(
        { key: "min_price", operation: "eq", value: th1.toString() },
        { key: "max_price", operation: "eq", value: th2.toString() }
      );
    } else if (section === "above") {
      newFilters.push({
        key: "min_price",
        operation: "eq",
        value: th2.toString(),
      });
    }
    updateFilter(newFilters);
  };

  return (
    <div className="price-filter-section w-full md:w-[180px]">
      <Select value="" onValueChange={(value) => handleSectionChange(value)}>
        <SelectTrigger>
          <SelectValue placeholder={"Price"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key={"under"} value={"under"}>
            Under {th1}
          </SelectItem>
          <SelectItem key={"between"} value={"between"}>
            Between {th1} and {th2}
          </SelectItem>
          <SelectItem key={"above"} value={"above"}>
            Above {th2}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
