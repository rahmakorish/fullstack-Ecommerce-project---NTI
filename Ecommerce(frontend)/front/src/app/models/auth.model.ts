export interface ICredintials{
    email:string,
    password:String
}

export interface IAuthresponse{
    message:string,
    data:string
}

export interface ITokenDecode{
    id:string,
    name:string,
    role:string,
    iat:number,
    exp:number
}

export interface INewUser{
    name:string,
    email:string,
    password:string
}