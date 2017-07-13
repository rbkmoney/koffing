export class InvoiceTemplateFormParams {
    public shopID: string;
    public product: string;
    public description: string;
    public lifetimeDays: number;
    public lifetimeMonths: number;
    public lifetimeYears: number;
    public costType: string;
    public costAmount: number;
    public costLowerBound: number;
    public costUpperBound: number;
}
