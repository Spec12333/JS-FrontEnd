export type Product = {
    id : number,
    name : string,
    price : number,
    picture : string
}

export type Basket = Product & {quantity : number}