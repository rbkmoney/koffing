import { assign, defaultTo } from 'lodash';

import { ShopDetails } from './shop-details.class';
import { ShopAccount } from './shop-account.class';
import { ShopParams } from '../classes/shop-params.class';

export class Shop {
    public id: number;
    public isBlocked: boolean;
    public isSuspended: boolean;
    public categoryID: number;
    public contractID: number;
    public payoutToolID: number;
    public details: ShopDetails;
    public account: ShopAccount;

    constructor() {
        this.details = new ShopDetails();
        this.account = new ShopAccount();
    }

    public update(params: ShopParams) {
        assign(this.details, params.details);
        this.contractID = defaultTo(params.contractID, this.contractID);
        this.payoutToolID = defaultTo(params.payoutToolID, this.payoutToolID);
    }
}
