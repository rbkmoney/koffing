export class Invoice {
    public id: string;
    public shopID: string;
    public createdAt: string;
    public dueDate: string;
    public amount: number;
    public currency: string;
    public description: string;
    public product: string;
    public status: string;
    public metadata: {};
    public invoiceStatus: any;
}
