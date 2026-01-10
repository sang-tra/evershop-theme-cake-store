import {
  FilterableAttribute,
  FilterInput,
  useProductFilter,
} from "@components/frontStore/catalog/ProductFilter.js";
import React from "react";
import { _ } from "@evershop/evershop/lib/locale/translate/_";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/Select.js";

export const DefaultAttributeFilterRender: React.FC<{
  availableAttributes: FilterableAttribute[];
  currentFilters: FilterInput[];
}> = ({ availableAttributes, currentFilters }) => {
  const { updateFilter } = useProductFilter();

  const handleAttributeChange = (attributeCode: string, optionId: string) => {
    let newFilters = [...currentFilters];
    const existingFilterIndex = newFilters.findIndex(
      (f) => f.key === attributeCode
    );
    if (existingFilterIndex !== -1) {
      // Replace existing filter with the new option
      newFilters = newFilters.filter((f) => f.key !== attributeCode);
    }
    newFilters.push({
      key: attributeCode,
      operation: "eq",
      value: optionId.toString(),
    });
    updateFilter(newFilters);
  };

  return (
    <>
      {availableAttributes.map((attribute) => {
        return (
          <div
            key={attribute.attributeCode}
            className="attribute-filter-section w-full md:w-[180px]">
            <Select
              value={
                currentFilters.find((f) => f.key === attribute.attributeCode)
                  ?.value || ""
              }
              onValueChange={(val) =>
                handleAttributeChange(attribute.attributeCode, val)
              }>
              <SelectTrigger>
                <SelectValue placeholder={attribute.attributeName} />
              </SelectTrigger>
              <SelectContent>
                {attribute.options.map((option) => (
                  <SelectItem
                    key={option.optionId}
                    value={option.optionId.toString()}>
                    {option.optionText}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      })}
    </>
  );
};
