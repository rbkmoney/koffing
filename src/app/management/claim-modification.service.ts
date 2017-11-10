import { Injectable } from '@angular/core';

import { PartyModification, Shop, ShopCreation, ShopDetails } from 'koffing/backend';
import { ModificationType } from 'koffing/management/modification-type';

@Injectable()
export class ClaimModificationService {

    public getModificationType(modifications: PartyModification[]): string {
        let result = 'none';
        modifications.forEach((modification: any) => {
            if (modification.shopModificationType === ModificationType.ShopCreation) {
                result = ModificationType.ShopCreation;
            } else if (modification.shopModificationType === ModificationType.ShopContractBinding) {
                const hasCreationContract = Boolean(modifications.find((item: any) => item.contractModificationType === ModificationType.ContractCreation));
                const hasCreationPayoutTool = Boolean(modifications.find((item: any) => item.contractModificationType === ModificationType.ContractPayoutToolCreation));
                if (hasCreationContract) {
                    result = ModificationType.ContractCreation;
                } else if (hasCreationPayoutTool) {
                    result = ModificationType.ContractPayoutToolCreation;
                } else {
                    result = ModificationType.ShopContractBinding;
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
            return modification.shopModificationType === ModificationType.ShopCreation;
        }) as ShopCreation;
        if (shopCreation) {
            result = shopCreation.details;
        } else if (shopID) {
            result = shops.find((shop) => shop.id === shopID).details;
        }
        return result;
    }
}
