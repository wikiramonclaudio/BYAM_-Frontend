export class Match {
    constructor(
        //mandatory fields
        public localteam: string,
        public awayteam: string,
        public when: string,
        public where: string,
        public tournament: string,
        public table: string,
        public result?: string,
        public selected?: boolean,
        public goals?: string,
        public localteamgoals?: string,
        public awayteamgoals?: string,
        public sport?: string
    ) {
    }
}
