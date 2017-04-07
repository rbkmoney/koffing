export class PaymentCount {
    public successfulCount: number;
    public unfinishedCount: number;

    constructor(successfulCount: number, unfinishedCount: number) {
        this.successfulCount = successfulCount;
        this.unfinishedCount = unfinishedCount;
    }
}
