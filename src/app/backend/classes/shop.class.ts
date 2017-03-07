import * as _ from 'lodash';

import { ShopDetails } from './shop-details.class';
import { Account } from './account.class';
import { CallbackHandler } from './callback-handler.class';
import { UpdateShopParams } from './update-shop-params.class';

export class Shop {
    public id: number;
    public isBlocked: boolean;
    public isSuspended: boolean;
    public categoryID: number;
    public contractID: number;
    public payoutToolID: number;
    public details: ShopDetails;
    public account: Account;
    public callbackHandler: CallbackHandler;

    constructor() {
        this.details = new ShopDetails();
        this.account = new Account();
        this.callbackHandler = new CallbackHandler();
    }

    public updateShop(params: UpdateShopParams) {
        this.categoryID = _.defaultTo(params.categoryID, this.categoryID);
        _.assign(this.details, params.details);
        this.contractID = _.defaultTo(params.contractID, this.contractID);
        this.payoutToolID = _.defaultTo(params.payoutToolID, this.payoutToolID);
        this.callbackHandler.url = _.defaultTo(params.callbackUrl, this.callbackHandler.url);
    }

    public getDifference(other: Shop): Shop {
        const updateShopParams = new UpdateShopParams();
        const result = new Shop();
        updateShopParams.categoryID = !_.isEqual(this.categoryID, other.categoryID) ? other.categoryID : void 0;
        updateShopParams.contractID = !_.isEqual(this.contractID, other.contractID) ? other.contractID : void 0;
        updateShopParams.payoutToolID = !_.isEqual(this.payoutToolID, other.payoutToolID) ? other.payoutToolID : void 0;
        if (other.callbackHandler) {
            updateShopParams.callbackUrl = !_.isEqual(this.callbackHandler.url, other.callbackHandler.url) ? other.callbackHandler.url : void 0;
        }
        if (!_.isEqual(this.details, other.details)) {
            this.details = this.details.getUpdated(other.details);
        }
        result.updateShop(updateShopParams);
        return result;
    }
}
