import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { select } from "@evershop/postgres-query-builder";
import { info, success, error } from "@evershop/evershop/lib/log";
import { pool } from "@evershop/evershop/lib/postgres";
import { createCategory } from "@evershop/evershop/catalog/services";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Seed categories from JSON file
 */
export async function seedCategories(): Promise<void> {
  info("Seeding categories...");
  const dataPath = path.join(__dirname, "data", "categories.json");
  const categoriesData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  for (const categoryData of categoriesData) {
    try {
      // Check if category already exists
      const existingCategory = await select()
        .from("category_description")
        .where("url_key", "=", categoryData.url_key)
        .load(pool);

      if (existingCategory) {
        info(`Category "${categoryData.name}" already exists, skipping...`);
        continue;
      }

      await createCategory(categoryData, {});
      success(`✓ Created category: ${categoryData.name}`);
    } catch (e: any) {
      error(`Failed to create category ${categoryData.name}: ${e.message}`);
    }
  }
}
