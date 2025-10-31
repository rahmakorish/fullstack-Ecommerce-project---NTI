//returns cart item to backend
export interface ICart{
    items:{
    productId:string,
    quantity:number,
    imgURL?:string
}[]
}

//cart item to display
export interface ICartItem{
    product:{
        _id:string,
        name?:string,
        price?:number
    },
    quantity:number,
    _id?:string,
    imgURL?:string,
    //to remove item from cart
    isremoved?:boolean
}

//gets a whole usercart 
//myCart
export interface IUserCart{
    _id:string,
    user:string,
    items:ICartItem[],
    totalItemsPrice:number,
    placedAt:string,
    createdAt:string,
    updatedAt:string
}
//get a whole cart
export interface ICartResponse {
userCart: IUserCart;
}

