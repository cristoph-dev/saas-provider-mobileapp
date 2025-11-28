// src/mock/categoriesService.ts
import type { Category, CategoryProduct } from "./categories";
import { categories } from "./categories";

export const CategoriesService = {
  getAll(): Category[] {
    return categories;
  },

  getById(id: number): Category | undefined {
    return categories.find((c) => c.id === id);
  },

  addCategory(name = "Nueva categoría"): Category {
    const newId =
      categories.length > 0
        ? Math.max(...categories.map((c) => c.id)) + 1
        : 1;

    const newCategory: Category = {
      id: newId,
      name,
      maxProducts: 20,
      products: [],
    };

    categories.push(newCategory);
    return newCategory;
  },

  addProduct(
    categoryId: number,
    data: Omit<CategoryProduct, "id">
  ): CategoryProduct {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) throw new Error("Categoría no encontrada");

    const allProducts = categories.flatMap((c) => c.products);
    const newId =
      allProducts.length > 0
        ? Math.max(...allProducts.map((p) => p.id)) + 1
        : 100;

    const newProduct: CategoryProduct = { id: newId, ...data };
    category.products.push(newProduct);
    return newProduct;
  },
};
