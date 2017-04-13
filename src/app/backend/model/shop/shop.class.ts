import { ShopDetails } from './shop-details.class';
import { ShopAccount } from './shop-account.class';
import { ShopLocation } from './shop-location.class';
import { CallbackHandler } from './callback-handler.class';

export class Shop {
    public id: string;
    public createdAt: string;
    public isBlocked: boolean;
    public isSuspended: boolean;
    public categoryID: number;
    public contractID: string;
    public payoutToolID: string;
    public details: ShopDetails;
    public account: ShopAccount;
    public location: ShopLocation;
    public callbackHandler: CallbackHandler;

    constructor() {
        this.details = new ShopDetails();
        this.account = new ShopAccount();
        this.location = new ShopLocation();
        this.callbackHandler = new CallbackHandler();
    }
}
