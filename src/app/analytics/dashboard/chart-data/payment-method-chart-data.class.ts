export class PaymentMethodChartData {
    public totalCount: number;
    public paymentSystem: string;

    constructor(totalCount: number, paymentSystem: string) {
        this.totalCount = totalCount;
        this.paymentSystem = paymentSystem;
    }
}
