import { InvoiceStatus } from 'koffing/backend';

export const InvoiceStatusLabel = {
    [InvoiceStatus.unpaid]: 'Не оплачен',
    [InvoiceStatus.cancelled]: 'Отменен',
    [InvoiceStatus.paid]: 'Оплачен',
    [InvoiceStatus.fulfilled]: 'Погашен'
};
