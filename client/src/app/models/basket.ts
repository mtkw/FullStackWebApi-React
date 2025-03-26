import { Product } from "./Product";

export type Basket = {
    basketId: string
    items: Item[]
  }
  
  export class Item  {
  constructor(prduct: Product, quantity: number) {
    this.id = prduct.id;
    this.name = prduct.name;
    this.price = prduct.price;
    this.pictureUrl = prduct.pictureUrl;
    this.brand = prduct.brand;
    this.type = prduct.type;
    this.quantity = quantity;
  }

    id: number
    name: string
    price: number
    pictureUrl: string
    brand: string
    type: string
    quantity: number
  }
  