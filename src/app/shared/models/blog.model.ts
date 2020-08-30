import { IBlog } from "../interfaces/blog.interfaces";

export class Blog implements IBlog {
    constructor(
        public id:number,
        public title: string,
        public text: string,
        public author: string,
        public image?: string,
        public date?: any
    ) { }
}