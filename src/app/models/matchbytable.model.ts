export class MatchByTable {
    constructor(
        //mandatory fields
        public match: string,
        public table: string,
        public tiebreak?: boolean
    ) {
    }
}  