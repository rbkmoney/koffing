import { InvoiceTemplateCost } from './invoice-template-cost';

export class InvoiceTemplateCostFixed extends InvoiceTemplateCost {
    public amount: number;

    constructor() {
        super();
        this.invoiceTemplateCostType = 'InvoiceTemplateCostFixed';
    }
}
