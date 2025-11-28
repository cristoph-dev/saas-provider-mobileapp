import noImage from "@/assets/products/noimage.png";
import arepa1 from "@/assets/products/Arepa.png";
import arepa2 from "@/assets/products/Arepa-2.png";
import pizza1 from "@/assets/products/pizza-margarita.png";
import pizza2 from "@/assets/products/pizza-pepperoni.png";
import bebida1 from "@/assets/products/bebida1.png";

export const productImages = {
  arepa1,
  arepa2,
  pizza1,
  pizza2,
  bebida1,
  noImage,
};

export function getProductImage(key: keyof typeof productImages) {
  return productImages[key] ?? productImages.noImage;
}
