//myorder
export interface IOrder{
    _id:string,
    user:string,
    items:IOrderItem[],
    status:string,
    TotalPrice:number,
    orderedAt:string,
    createdAt:string,
    updatedAt:string
}
export interface IOrderItem{
    product:string,
    quantity:number,
    _id:string
}

export interface IUserOrder{
    userOrders: IOrder[]
}
export interface IPlaceOrderRequest {
    user?: string;
    items: {
    product: string;
    quantity: number;
    }[];
    totalItemsPrice?: number; 
}

export interface IStatus{
    status:string
}

export type IPlaceOrderResponse = IOrder;
