export class Bet {
    constructor(
        //mandatory fields
        public table: string,
        public owner: string,
        public goalslocalteam?: number,
        public goalsawayteam?: number,
        public goals?: number,
        public tiebreakmatch?: number
    ) {
    }
}  
