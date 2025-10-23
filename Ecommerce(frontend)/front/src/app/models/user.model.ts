// 
export interface ILocationItem {
    label: string; 
    address: string; 
}

export interface ILocation {
    location: ILocationItem[]; 
}

export interface IUserData {
    _id?: string; 
    name: string;
    email: string;
    password: string;
    location?: ILocation; 
    image?: string;
}


