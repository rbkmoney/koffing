import { Injectable } from '@angular/core';
import { chain } from 'lodash';

import { SelectItem } from 'koffing/common/select/select-item';
import { Contract } from 'koffing/backend';

@Injectable()
export class ContractCreateService {

    public getContractItems(contracts: Contract[], activeContractID: string): SelectItem[] {
        return chain(contracts)
            .filter((contract) => contract.id !== 'TEST' && contract.id !== activeContractID)
            .map((contract, index) => new SelectItem(contract.id, `Контракт ${index + 1}`))
            .reverse()
            .push(new SelectItem(activeContractID, 'Текущий контракт'))
            .reverse()
            .push(new SelectItem('', 'Новый контракт'))
            .value();
    }
}
