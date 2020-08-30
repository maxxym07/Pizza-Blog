import { IUser } from "../interfaces/user.interface";

export class User implements IUser {
    constructor(public idAuthUser: any,
    public firstName: string,
    public lastName:string,
    public orders: any,
    public role: string,
    public email: string){ }
}