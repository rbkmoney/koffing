export class PaytoolDecision {
    public contractID: string;
    public payoutToolID: string;

    constructor(contractID?: string, payoutToolID?: string) {
        this.contractID = contractID;
        this.payoutToolID = payoutToolID;
    }
}
