/* eslint-disable react/prop-types */
import { useAppDispatch } from "@components/common/context/app.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/Select.js";
import { _ } from "@evershop/evershop/lib/locale/translate/_";
import React, { ReactNode, useCallback } from "react";

export interface SortOption {
  code: string;
  name: string;
  label?: string;
  disabled?: boolean;
}

export interface SortState {
  sortBy: string;
  sortOrder: "asc" | "desc";
}

interface ProductSortingProps {
  sortOptions?: SortOption[];
  defaultSortBy?: string;
  defaultSortOrder?: "asc" | "desc";
  showSortDirection?: boolean;
  enableUrlUpdate?: boolean;
  onSortChange?: (sortState: SortState) => Promise<void> | void;
  renderSortSelect?: (props: {
    options: SortOption[];
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
  }) => ReactNode;
  renderSortDirection?: (props: {
    sortOrder: "asc" | "desc";
    onToggle: () => void;
    disabled?: boolean;
  }) => ReactNode;
  className?: string;
  disabled?: boolean;
}

const defaultSortOptions: SortOption[] = [
  {
    code: "price_asc",
    name: _("Price"),
    label: _("Price: Low to High"),
  },
  {
    code: "price_desc",
    name: _("Price"),
    label: _("Price: High to Low"),
  },
  { code: "name_asc", name: _("Name"), label: _("Name: A-Z") },
];

export function ProductSorting({
  sortOptions = defaultSortOptions,
  defaultSortBy = "",
  defaultSortOrder = "asc",
  showSortDirection = true,
  enableUrlUpdate = true,
  onSortChange,
  renderSortSelect,
  renderSortDirection,
  className = "",
  disabled = false,
}: ProductSortingProps) {
  const AppContextDispatch = useAppDispatch();

  const [sortBy, setSortBy] = React.useState<string>(() => {
    // Check if this is browser or server
    if (typeof window !== "undefined") {
      const params = new URL(document.location.href).searchParams;
      return params.get("ob") || defaultSortBy;
    }
    return defaultSortBy;
  });

  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">(() => {
    // Check if this is browser or server
    if (typeof window !== "undefined") {
      const params = new URL(document.location.href).searchParams;
      return (params.get("od") as "asc" | "desc") || defaultSortOrder;
    }
    return defaultSortOrder;
  });

  const defaultSortChangeHandler = useCallback(
    async (newSortState: SortState) => {
      if (!enableUrlUpdate) return;

      const currentUrl = window.location.href;
      const url = new URL(currentUrl, window.location.origin);

      if (newSortState.sortBy === "" || newSortState.sortBy === defaultSortBy) {
        url.searchParams.delete("ob");
      } else {
        url.searchParams.set("ob", newSortState.sortBy);
      }

      if (newSortState.sortOrder === defaultSortOrder) {
        url.searchParams.delete("od");
      } else {
        url.searchParams.set("od", newSortState.sortOrder);
      }

      url.searchParams.append("ajax", "true");
      await AppContextDispatch.fetchPageData(url);
      url.searchParams.delete("ajax");
      history.pushState(null, "", url);
    },
    [AppContextDispatch, enableUrlUpdate, defaultSortBy, defaultSortOrder]
  );

  const handleSortChange = onSortChange || defaultSortChangeHandler;

  const onChangeSort = useCallback(
    async (newSortBy: string) => {
      if (disabled) return;
      // Parse sortOrder from newSortBy if possible
      let sortBy, sortOrder;
      if (newSortBy === "price_asc") {
        sortBy = "price";
        sortOrder = "asc";
      } else if (newSortBy === "price_desc") {
        sortBy = "price";
        sortOrder = "desc";
      } else {
        sortBy = "name";
        sortOrder = "asc";
      }
      const newSortState = { sortBy, sortOrder };
      setSortBy(sortBy);
      setSortOrder(sortOrder);
      await handleSortChange(newSortState);
    },
    [sortOrder, handleSortChange, disabled]
  );

  const onChangeDirection = useCallback(async () => {
    if (disabled) return;

    const newOrder: "asc" | "desc" = sortOrder === "asc" ? "desc" : "asc";
    const newSortState = { sortBy, sortOrder: newOrder };
    setSortOrder(newOrder);
    await handleSortChange(newSortState);
  }, [sortBy, sortOrder, handleSortChange, disabled]);

  const defaultSortSelect = (props: {
    options: SortOption[];
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
  }) => (
    <Select
      onValueChange={(value) => props.onChange(value)}
      value={(sortBy && sortOrder ? `${sortBy}_${sortOrder}` : "").toString()}
      disabled={props.disabled}>
      <SelectTrigger>
        <SelectValue placeholder={"Sort"} />
      </SelectTrigger>
      <SelectContent>
        {props.options.map((option) => (
          <SelectItem
            key={option.code}
            value={option.code}
            disabled={option.disabled}>
            {option.label || option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
  const containerContent = (
    <>
      <div className="w-full md:w-[180px]">
        {renderSortSelect
          ? renderSortSelect({
              options: sortOptions,
              value: sortBy,
              onChange: onChangeSort,
              disabled,
            })
          : defaultSortSelect({
              options: sortOptions,
              value: sortBy,
              onChange: onChangeSort,
              disabled,
            })}
      </div>
      {showSortDirection && (
        <div className="sort-direction self-center">
          {renderSortDirection &&
            renderSortDirection({
              sortOrder,
              onToggle: onChangeDirection,
              disabled,
            })}
        </div>
      )}
    </>
  );

  return (
    <div className={`product-sorting ${className}`}>{containerContent}</div>
  );
}
