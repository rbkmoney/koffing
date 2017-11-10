import { PaymentFlowType } from 'koffing/backend';

export const PaymentFlowLabel = {
    [PaymentFlowType.instant]: 'Мгновенный',
    [PaymentFlowType.hold]: 'С удержанием'
};
