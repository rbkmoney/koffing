import { Injectable } from '@angular/core';
import { SelectItem } from 'koffing/common/select/select-item';
import { chain } from 'lodash';
import { Contract } from 'koffing/backend';

@Injectable()
export class ContractCreateService {

    public getContractItems(contracts: Contract[]): SelectItem[] {
        return chain(contracts)
            .filter((contract) => contract.id !== 'TEST')
            .map((contract, index) => new SelectItem(contract.id, `Контракт ${index + 1}`))
            .push(new SelectItem('', 'Новый контракт'))
            .value();
    }
}
