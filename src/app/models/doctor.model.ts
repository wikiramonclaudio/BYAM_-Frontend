import { User } from "./user.model";
import { Hospital } from "./hospital.model";

export class Doctor {

    constructor(
        //mandatory fields
        public name: string,
        public user: string,
        public hospital: string,
         //no mandatory fields
        public img?: string,    
        public _id?: string
    ){        
    }
}