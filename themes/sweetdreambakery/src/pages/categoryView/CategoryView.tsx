import Area from "@components/common/Area.js";
import {
  CategoryData,
  CategoryProvider,
} from "@components/frontStore/catalog/CategoryContext.js";
import { CategoryInfo } from "@components/frontStore/catalog/CategoryInfo.js";
import { CategoryProducts } from "@components/frontStore/catalog/CategoryProducts.js";
import { CategoryProductsFilter } from "@components/frontStore/catalog/CategoryProductsFilter.js";
import { CategoryProductsPagination } from "@components/frontStore/catalog/CategoryProductsPagination.js";
import { ProductSorting } from "@components/frontStore/catalog/ProductSorting.js";
import { _ } from "@evershop/evershop/lib/locale/translate/_";
import React from "react";

interface CategoryViewProps {
  category: CategoryData;
}

export default function CategoryView({ category }: CategoryViewProps) {
  return (
    <CategoryProvider category={category}>
      <Area id="categoryPageTop" className="category__page__top" />
      <CategoryInfo />
      <div className="page-width">
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-4 items-baseline justify-between">
            <CategoryProductsFilter />
            <ProductSorting
              showSortDirection={false}
              className="w-full md:w-[180px]"
            />
          </div>
        </div>
        <CategoryProducts />
      </div>
      <Area id="categoryPageBottom" className="category__page__bottom" />
    </CategoryProvider>
  );
}

export const layout = {
  areaId: "content",
  sortOrder: 10,
};

export const query = `
  query Query {
    category: currentCategory {
      showProducts
      name
      uuid
      description
      image {
        alt
        url
      }
      products {
        items {
          ...Product
        }
        currentFilters {
          key
          operation
          value
        }
        total
      }
      availableAttributes {
        attributeCode
        attributeName
        options {
          optionId
          optionText
        }
      }
      priceRange {
        min
        max
        minText
        maxText
      }
      children {
        categoryId,
        name
        uuid
      }
    }
}`;

export const fragments = `
  fragment Product on Product {
    productId
    name
    collections {
      collectionId
      name
      uuid
    }
    sku
    price {
      regular {
        value
        text
      }
      special {
        value
        text
      }
    }
    inventory {
      isInStock
    }
    image {
      alt
      url
    }
    url
  }
`;
