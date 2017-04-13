import * as _ from 'lodash';

export class ShopParams {

    public categoryID: number;
    public details: any;
    public contractID: string;
    public payoutToolID: string;
    public callbackUrl: string;

    constructor(
        categoryID?: number,
        details?: any,
        contractID?: string,
        payoutToolID?: string,
        callbackUrl?: string
    ) {
        this.categoryID = categoryID;
        this.details = details ? details : {};
        this.contractID = contractID;
        this.payoutToolID = payoutToolID;
        this.callbackUrl = callbackUrl;
    }

    public update(params: ShopParams) {
        this.categoryID = _.defaultTo(params.categoryID, this.categoryID);
        _.assign(this.details, params.details);
        this.contractID = _.defaultTo(params.contractID, this.contractID);
        this.payoutToolID = _.defaultTo(params.payoutToolID, this.payoutToolID);
        this.callbackUrl = _.defaultTo(params.callbackUrl, this.callbackUrl);
    }
}
