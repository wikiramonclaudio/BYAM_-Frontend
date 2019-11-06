import { User } from "./user.model";

export class Hospital {

    constructor(
        //mandatory fields
        public name: string,
        public user: string,
         //no mandatory fields
        public img?: string,    
        public _id?: string
    ){        
    }
}