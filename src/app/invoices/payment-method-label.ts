import { PaymentMethodType } from 'koffing/backend';

export const PaymentMethodLabel = {
    [PaymentMethodType.bankCard]: 'Банковская карта',
    [PaymentMethodType.paymentTerminal]: 'Платежный терминал'
};
