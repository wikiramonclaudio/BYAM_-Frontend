export class MatchTypeRelation {
    constructor(
        //mandatory fields
        public match: string,
        public bettype: string,
        public table: string,
        public tiebreak?: boolean
    ) {
    }
}  