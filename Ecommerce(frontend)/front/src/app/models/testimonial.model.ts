export interface ITestimonial{
    _id:string,
    user:{
        name:string},
    text:string,
    isHidden?:Boolean;
}