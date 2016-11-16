export class ShopDetail {
    name: string;
    description: string;
    location: string;
}

export class Contractor {
    registeredName: string;
    legalEntity: string;
}

export class Contract {
    number: string;
    systemContractorRef: string;
    concludedAt: string;
    validSince: string;
    validUntil: string;
    terminatedAt: string;
}

export class Shop {
    shopID: string;
    isBlocked: boolean;
    isSuspended: boolean;
    categoryRef: number;
    shopDetails: ShopDetail;
    contractor: Contractor;
    contract: Contract;
}
export class ShopItem {
    value: string;
    label: string;
    constructor(value: string, label: string) {
        this.value = value;
        this.label = label;
    }
}