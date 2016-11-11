import { Shop } from './../shop/shop';

export class ShopCreation {
    modificationType: string;
    shop: Shop
}

export class ShopModification {
    modificationType: string;
    shopID: string;
    details: {
        modificationType: string;
        details: {
            shopDetails: {
                name: string;
                description: string;
                location: string;
            },
            contractor: {
                registeredName: string;
                legalEntity: string;
            },
            categoryRef: string;
        }
    }
}

export class Claim {
    id: number;
    changeset: any[];
    status: {
        status: string;
    }
}