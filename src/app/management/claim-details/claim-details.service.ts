import { Injectable } from '@angular/core';
import {
    Claim,
    ContractCreation,
    ContractModification,
    ContractPayoutToolCreation,
    PartyModification,
    ShopContractBinding,
    ShopCreation,
    ShopModification
} from 'koffing/backend';
import { CLAIM_TYPE, CLAIM_TYPE_LABEL, CLAIM_TYPE_SORTED_ENUM } from './claim-type';

@Injectable()
export class ClaimDetailsService {

    public getClaimLabel(claim: Claim): string {
        let result = 100;
        claim.changeset.forEach((partyModification: any) => {
            if (partyModification.shopModificationType === CLAIM_TYPE.ShopCreation) {
                result = result > CLAIM_TYPE_SORTED_ENUM.ShopCreation ? CLAIM_TYPE_SORTED_ENUM.ShopCreation : result;
            } else
            if (partyModification.shopModificationType === CLAIM_TYPE.ShopContractBinding) {
                result = result > CLAIM_TYPE_SORTED_ENUM.ShopContractBinding ? CLAIM_TYPE_SORTED_ENUM.ShopContractBinding : result;
            } else
            if (partyModification.contractModificationType === CLAIM_TYPE.ContractCreation) {
                result = result > CLAIM_TYPE_SORTED_ENUM.ContractCreation ? CLAIM_TYPE_SORTED_ENUM.ContractCreation : result;
            } else
            if (partyModification.contractModificationType === CLAIM_TYPE.ContractPayoutToolCreation) {
                result = result > CLAIM_TYPE_SORTED_ENUM.ContractPayoutToolCreation ? CLAIM_TYPE_SORTED_ENUM.ContractPayoutToolCreation : result;
            }
        });
        return CLAIM_TYPE_LABEL[CLAIM_TYPE_SORTED_ENUM[result]];
    }

    public toContractCreations(partyModifications: PartyModification[]): ContractCreation[] {
        return this.findContractChangesetPart(partyModifications, 'ContractCreation') as ContractCreation[];
    }

    public toContractPayoutToolCreations(partyModifications: PartyModification[]): ContractPayoutToolCreation[] {
        return this.findContractChangesetPart(partyModifications, 'ContractPayoutToolCreation') as ContractPayoutToolCreation[];
    }

    public toShopCreation(partyModifications: PartyModification[]): ShopCreation[] {
        return this.findShopChangesetPart(partyModifications, 'ShopCreation') as ShopCreation[];
    }

    public toContractBinding(partyModifications: PartyModification[]): ShopContractBinding[] {
        return this.findShopChangesetPart(partyModifications, 'ShopContractBinding') as ShopContractBinding[];
    }

    private findContractChangesetPart(partyModifications: PartyModification[], modificationTypeName: string): ContractModification[] {
        return partyModifications
            .filter((modificationUnit: PartyModification) =>
                modificationUnit.partyModificationType === 'ContractModification')
            .filter((contractModification: ContractModification) =>
                contractModification.contractModificationType === modificationTypeName) as ContractModification[];
    }

    private findShopChangesetPart(partyModifications: PartyModification[], modificationTypeName: string): ShopModification[] {
        return partyModifications
            .filter((modificationUnit: PartyModification) =>
                modificationUnit.partyModificationType === 'ShopModification')
            .filter((shopModification: ShopModification) =>
                shopModification.shopModificationType === modificationTypeName) as ShopModification[];
    }
}
