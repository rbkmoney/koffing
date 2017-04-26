export class FormSearchParams {
    public invoiceFrom: Date;
    public invoiceTo: Date;
    public paymentFrom: Date;
    public paymentTo: Date;
    public invoiceID?: string;
    public invoiceStatus?: string;
    public paymentID?: string;
    public paymentStatus?: string;
    public payerIP?: string;
    public payerEmail?: string;
}
