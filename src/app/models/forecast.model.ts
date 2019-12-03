export class Forecast {
    constructor(
        //mandatory fields
        public match: string,
        public bettype: string,
        public choice: string,
        public bet: string,
        // no mandatory fields
        public winnerchoice?: string,
        public table?: string,
        finished?: boolean,
        goalslocalteam?: number,
        goalsawayteam?: number
    ) {
    }
}  