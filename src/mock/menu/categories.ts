// src/mock/categories.ts
export interface CategoryProduct {
  id: number;
  name: string;
  price: number;
  currency: "Bs" | "USD" | "VES";
  imageKey: "arepa1" | "arepa2" | "pizza1" | "pizza2" | "bebida1" | 'noImage';
}

export interface Category {
  id: number;
  name: string;
  maxProducts: number;
  products: CategoryProduct[];
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Arepas",
    maxProducts: 20,
    products: [
      {
        id: 100,
        name: "Arepa de carne mechada",
        price: 25,
        currency: "Bs",
        imageKey: "arepa1",
      },
      {
        id: 101,
        name: "Arepa reina pepiada",
        price: 26,
        currency: "Bs",
        imageKey: "arepa2",
      },
    ],
  },

  {
    id: 2,
    name: "Pizzas",
    maxProducts: 20,
    products: [
      {
        id: 102,
        name: "Pizza de pepperoni",
        price: 22,
        currency: "Bs",
        imageKey: "pizza1",
      },
      {
        id: 103,
        name: "Pizza margarita",
        price: 22,
        currency: "Bs",
        imageKey: "pizza2",
      },
    ],
  },

  {
    id: 3,
    name: "Bebidas",
    maxProducts: 20,
    products: [
      {
        id: 104,
        name: "Coca Cola",
        price: 8,
        currency: "Bs",
        imageKey: "bebida1",
      },
    ],
  },
];
