export class Message {
    constructor(
        public owner: string,
        public table: string,
        public content: string,        
        public createdAt?: Date,
        public updatedAt?: Date,
        public _id?: string
    ) {
    }
}  