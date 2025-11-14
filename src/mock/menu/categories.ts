// src/mock/categories.ts
export interface CategoryProduct {
  id: number;
  name: string;
  price: number;
  currency: "Bs" | "USD" | "VES";
  imageKey: "arepa1" | "arepa2" | "pizza1" | "pizza2" | "bebida1";
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
            id: 1,
            name: "Arepa de carne mechada",
            price: 22,
            currency: "Bs",
            imageKey: "arepa1",
        },
        {
            id: 1,
            name: "Arepa de carne mechada",
            price: 22,
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
        id: 1,
        name: "Pizza de pepperoni",
        price: 22,
        currency: "Bs",
        imageKey: "pizza1",
      },
      {
        id: 1,
        name: "Pizza2",
        price: 22,
        currency: "Bs",
        imageKey: "pizza2",
      },
    ],
  },
];
