import { Editor } from "@components/common/Editor.js";
import { Row } from "@components/common/form/Editor.js";
import { ProductList } from "@components/frontStore/catalog/ProductList.js";
import { _ } from "@evershop/evershop/lib/locale/translate/_";
import React from "react";
import { ActionButtons } from "../ProductItemActionButtons.js";

interface CollectionProductsProps {
  collection: {
    collectionId: number;
    name: string;
    description?: Row[];
    products: {
      items: Array<React.ComponentProps<typeof ProductList>["products"][0]>;
    };
  } | null;
  collectionProductsWidget?: {
    countPerRow?: number;
  };
}

export default function CollectionProducts({
  collection,
  collectionProductsWidget: { countPerRow } = {},
}: CollectionProductsProps) {
  if (!collection) {
    return null;
  }
  return (
    <div className="pt-16 pb-12 max-w-7xl mx-auto collection__products__widget">
      <div className="page-width">
        <h3 className="text-3xl md:text-4xl mb-4 text-center">
          {collection?.name}
        </h3>
        {collection?.description && <Editor rows={collection?.description} />}
        <ProductList
          products={collection?.products?.items}
          gridColumns={countPerRow}
          showAddToCart
          imageWidth={400}
          imageHeight={400}
          customAddToCartRenderer={(product) => (
            <ActionButtons product={product} />
          )}
        />
      </div>
    </div>
  );
}

export const query = `
  query Query($collection: String, $count: Int, $countPerRow: Int) {
    collection (code: $collection) {
      collectionId
      name
      description
      products (filters: [{key: "limit", operation: eq, value: $count}]) {
        items {
          ...Product
        }
      }
    }
    collectionProductsWidget(collection: $collection, count: $count, countPerRow: $countPerRow) {
      countPerRow
    }
  }
`;

export const fragments = `
  fragment Product on Product {
    productId
    name
    collections {
      collectionId
      name
      uuid
    }
    metaDescription
    sku
    attributes: attributeIndex {
      attributeCode
      optionText
    }
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

export const variables = `{
  collection: getWidgetSetting("collection"),
  count: getWidgetSetting("count"),
  countPerRow: getWidgetSetting("countPerRow", 4)
}`;
