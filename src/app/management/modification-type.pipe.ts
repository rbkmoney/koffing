import { Pipe, PipeTransform } from '@angular/core';
import { ModificationType } from './modification-type';

@Pipe({
    name: 'kofClaimModificationType'
})
export class ModificationTypePipe implements PipeTransform {

    private MODIFICATION_NAMES = {
        [ModificationType.ShopCreation]: 'Создание магазина',
        [ModificationType.ContractCreation]: 'Создание контракта',
        [ModificationType.ContractPayoutToolCreation]: 'Создание средства вывода',
        [ModificationType.ShopContractBinding]: 'Изменение контракта'
    };

    public transform(input: string): string {
        const name = this.MODIFICATION_NAMES[input];
        return name ? name : input;
    }
}
