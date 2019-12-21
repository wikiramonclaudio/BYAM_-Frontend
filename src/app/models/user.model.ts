export class User {

    constructor(
        //mandatory fields
        public name: string,
        public email: string,
        public password: string,
        //no mandatory fields
        public image?: string,
        public money?: number,
        public role?: string,
        public google?: boolean,
        public _id?: string,
        public connected?: boolean
    ){        
    }
}