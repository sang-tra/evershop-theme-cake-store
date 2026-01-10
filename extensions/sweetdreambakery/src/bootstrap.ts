import path from "path";
import { CONSTANTS } from "@evershop/evershop/lib/helpers";
import { updateWidget } from "@evershop/evershop/lib/widget";

export default () => {
  updateWidget("basic_menu", {
    component: path.resolve(
      CONSTANTS.THEMEPATH,
      "sweetdreambakery/dist/components/widgets/BasicMenu.js"
    ),
  });
  updateWidget("simple_slider", {
    component: path.resolve(
      CONSTANTS.THEMEPATH,
      "sweetdreambakery/dist/components/widgets/Slideshow.js"
    ),
  });

  updateWidget("collection_products", {
    component: path.resolve(
      CONSTANTS.THEMEPATH,
      "sweetdreambakery/dist/components/widgets/CollectionProducts.js"
    ),
  });
};
