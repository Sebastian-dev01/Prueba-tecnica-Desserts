export type DessertImage = {
  desktop: string;
  mobile: string;
  tablet: string;
  thumbnail: string;
};

export type Dessert = {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  image: DessertImage;
};
