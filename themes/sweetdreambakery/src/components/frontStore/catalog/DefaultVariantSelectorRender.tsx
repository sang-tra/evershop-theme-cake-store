import React from "react";
import "./VariantSelector.scss";
import {
  VariantAttributeGroupProps,
  VariantOptionItemProps,
} from "@components/frontStore/catalog/VariantSelector.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/Select.js";
import { _ } from "@evershop/evershop/lib/locale/translate/_";

const DefaultVariantOptionItem: React.FC<VariantOptionItemProps> = ({
  option,
  attribute,
  isSelected,
  onSelect,
}) => {
  let className = "";
  if (isSelected) {
    className = "selected";
  }
  if (option.available === false) {
    className = "un-available";
  }

  return (
    <SelectItem key={option.optionId} value={option.optionId.toString()}>
      {option.optionText}
    </SelectItem>
  );
};

const DefaultVariantAttribute: React.FC<VariantAttributeGroupProps> = ({
  attribute,
  options,
  onSelect,
  OptionItem = DefaultVariantOptionItem,
}) => {
  return (
    <div key={attribute.attributeCode}>
      <div className="mb-2 text-textSubdued uppercase">
        <span>{attribute.attributeName}</span>
      </div>

      <Select
        value={attribute.selectedOption?.toString() || ""}
        onValueChange={(value) => {
          onSelect(attribute.attributeCode, Number(value));
        }}
        aria-label={attribute.attributeName}>
        <SelectTrigger id="flavor-select">
          <SelectValue
            placeholder={_("Choose ${name}", { name: attribute.attributeName })}
          />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <OptionItem
              key={option.optionId}
              option={option}
              attribute={attribute}
              isSelected={
                attribute.selected &&
                attribute.selectedOption === option.optionId
              }
              onSelect={onSelect}
            />
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export { DefaultVariantAttribute, DefaultVariantOptionItem };
