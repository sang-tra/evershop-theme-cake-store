import { error, info, success } from "@evershop/evershop/lib/log";
import { seedAttributeGroup, seedAttributes } from "./seed/seedAttributes.js";
import { seedCategories } from "./seed/seedCategories.js";
import { seedCollections } from "./seed/seedCollections.js";
import { seedProducts } from "./seed/seedProducts.js";
import { seedWidgets } from "./seed/seedWidgets.js";
import { seedPages } from "./seed/seedPages.js";

export default async function cakeShop() {
  async function seed() {
    let demoAttributeGroupId: number | null = null;

    try {
      info("Starting demo data seeding...\n");
      demoAttributeGroupId = await seedAttributeGroup();
      await seedAttributes(demoAttributeGroupId);
      await seedCategories();
      await seedCollections();
      if (!demoAttributeGroupId) {
        demoAttributeGroupId = await seedAttributeGroup();
      }
      await seedProducts(demoAttributeGroupId);
      await seedWidgets();
      await seedPages();

      success("✓ Demo data seeding completed successfully!");
    } catch (e: any) {
      error(`Seeding failed: ${e.message}`);
      process.exit(1);
    }
  }

  seed();
}
