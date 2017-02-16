import * as _ from 'lodash';

import { BankAccount } from 'koffing/backend/classes/bank-account.class';

export class PayoutToolComparator {

    public static isEqual(value: BankAccount, other: BankAccount): boolean {
        return _.isEqualWith(value, other, this.customizer);
    }

    private static customizer(value: BankAccount, other: BankAccount): boolean {
        const key = _.findKey(value, (fieldValue: string, fieldName: string) => {
            if (_.isObject(fieldValue)) {
                console.error('unsupported compare type', value, fieldValue);
            }
            return !_.chain(fieldValue).trim().isEqual(_.trim(other[fieldName])).value();
        });
        return _.isUndefined(key);
    }
}
