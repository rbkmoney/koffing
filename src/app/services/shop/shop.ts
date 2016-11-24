export class ShopDetail {

    public name: string;

    public description: string;

    public location: string;
}

export class Contractor {

    public registeredName: string;

    public legalEntity: string;
}

export class Contract {

    public number: string;

    public systemContractorRef: string;

    public concludedAt: string;

    public validSince: string;

    public validUntil: string;

    public terminatedAt: string;
}

export class Shop {

    public shopID: string;

    public isBlocked: boolean;

    public isSuspended: boolean;

    public categoryRef: number;

    public shopDetails: ShopDetail;

    public contractor: Contractor;

    public contract: Contract;

}
export class ShopItem {

    public value: string;

    public label: string;

    constructor(value: string, label: string) {
        this.value = value;
        this.label = label;
    }
}
