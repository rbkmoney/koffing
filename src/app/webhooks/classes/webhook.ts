export class Webhook {
    constructor(
        public url: string,
        public scope: {
            topic: string,
            shopID: number,
            eventTypes: string[]
        },
        public id: string
    ) { }
}
