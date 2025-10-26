export interface IProduct{
    _id:string,
    name:string,
    description:string,
    price:number,
    imgURL?:string,
    slug:string,
    stock:number,
    category:string,
    rating:Number
}
//returns array of products
export interface IProductsResponse{
    message:string,
    data: IProduct[]
}
//returns a single product
export interface IProductResponse{
    message:string,
    data: IProduct
}