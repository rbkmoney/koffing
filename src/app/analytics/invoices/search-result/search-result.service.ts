import { InvoiceTableItem } from 'koffing/analytics/invoices/search-result/invoice-table-item';
import { Invoice } from 'koffing/backend/model/invoice';

export class SearchResultService {

    public static toInvoiceTableItems(invoices: Invoice[]): InvoiceTableItem[] {
        return invoices.map((invoice) => {
            return {
                invoice,
                visible: false
            };
        });
    }
}
