export class BetTypeOption {
    constructor(
        //mandatory fields
        public name: string,
        public betType?: string,
        public selected?: boolean                                            
    ) {
    }
}  