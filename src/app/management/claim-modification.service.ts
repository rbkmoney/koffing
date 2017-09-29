import { Injectable } from '@angular/core';

import { PartyModification, Shop, ShopCreation, ShopDetails } from 'koffing/backend';
import { CLAIM_TYPE } from 'koffing/management/claim-type';

@Injectable()
export class ClaimModificationService {

    public getModificationType(modifications: PartyModification[]): string {
        let result = 'undefined';
        modifications.forEach((modification: any) => {
            if (modification.shopModificationType === CLAIM_TYPE.ShopCreation) {
                result = CLAIM_TYPE.ShopCreation;
            } else if (modification.shopModificationType === CLAIM_TYPE.ShopContractBinding) {
                const hasCreationContract = Boolean(modifications.find((item: any) => item.contractModificationType === CLAIM_TYPE.ContractCreation));
                const hasCreationPayoutTool = Boolean(modifications.find((item: any) => item.contractModificationType === CLAIM_TYPE.ContractPayoutToolCreation));
                if (hasCreationContract) {
                    result = CLAIM_TYPE.ContractCreation;
                } else if (hasCreationPayoutTool) {
                    result = CLAIM_TYPE.ContractPayoutToolCreation;
                } else {
                    result = CLAIM_TYPE.ShopContractBinding;
                }
            }
        });
        return result;
    }

    public getRelatedShopDetails(modifications: PartyModification[], shops: Shop[]): ShopDetails {
        let result;
        let shopID: string;
        const shopCreation = modifications.find((modification: any) => {
            if (modification.shopModificationType) {
                shopID = modification.shopID;
            }
            return modification.shopModificationType === CLAIM_TYPE.ShopCreation;
        }) as ShopCreation;
        if (shopCreation) {
            result = shopCreation.details;
        } else if (shopID) {
            result = shops.find((shop) => shop.id === shopID).details;
        }
        return result;
    }
}
