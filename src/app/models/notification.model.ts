export class NotificationCard {
    constructor(
        //mandatory fields
        // public userslimit: string,
        // public owner: string,
        // public betamount: string,
        // public closed: boolean,
        //no mandatory fields
        public seen?: boolean,
        public subject?: string,
        public content?: string,
        public emiter?: string,
        public receiver?: string,        
        public _id?: string
    ) {
    }
}  