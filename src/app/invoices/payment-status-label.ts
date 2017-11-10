import { PaymentStatus } from 'koffing/backend';

export const PaymentStatusLabel = {
    [PaymentStatus.pending]: 'Запущен',
    [PaymentStatus.processed]: 'Обработан',
    [PaymentStatus.captured]: 'Подтвержден',
    [PaymentStatus.cancelled]: 'Отменен',
    [PaymentStatus.refunded]: 'Возвращен',
    [PaymentStatus.failed]: 'Неуспешен'
};
