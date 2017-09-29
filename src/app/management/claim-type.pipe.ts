import { Pipe, PipeTransform } from '@angular/core';
import { CLAIM_TYPE } from './claim-type';

@Pipe({
    name: 'kofClaimModificationName'
})
export class ClaimTypePipe implements PipeTransform {

    private MODIFICATION_NAMES = {
        [CLAIM_TYPE.ShopCreation]: 'Создание магазина',
        [CLAIM_TYPE.ContractCreation]: 'Создание контракта',
        [CLAIM_TYPE.ContractPayoutToolCreation]: 'Создание средства вывода',
        [CLAIM_TYPE.ShopContractBinding]: 'Изменение контракта'
    };

    public transform(input: string): string {
        const name = this.MODIFICATION_NAMES[input];
        return name ? name : input;
    }
}
