export type Basket = {
    basketId: string
    items: Item[]
  }
  
  export type Item = {
    id: number
    name: string
    price: number
    pictureUrl: string
    brand: string
    type: string
    quantity: number
  }
  