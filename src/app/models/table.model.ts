export class Table {
    constructor(
        //mandatory fields
        public userslimit: string,
        public owner: string,
        public betamount: string,
        public closed: boolean,
        //no mandatory fields
        public chat?: boolean,
        public totalamount?: string,
        public type?: string,
        public winner?: string,
        public _id?: string
    ) {
    }
}  