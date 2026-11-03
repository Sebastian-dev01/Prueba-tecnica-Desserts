export type DessertCategory =
  | "Waffle"
  | "Crème Brûlée"
  | "Macaron"
  | "Tiramisu"
  | "Baklava"
  | "Pie"
  | "Cake"
  | "Brownie"
  | "Panna Cotta"

export type Dessert = {
  id: number,
  name: string,
  category: DessertCategory,
  price: number,
  image: {
    desktop: string,
    mobile: string,
    tablet: string,
    thumbnail:string
  }
}
