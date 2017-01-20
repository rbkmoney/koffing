import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContractService } from 'koffing/backend/services/contract.service';

@Component({
    selector: 'kof-contract-create',
    templateUrl: 'contract-create.component.pug'
})
export class ContractCreateComponent implements OnInit {

    public newContract: any;
    
    constructor(
        private router: Router,
        private contractService: ContractService
    ) {}

    public ngOnInit() {
        this.newContract = {};
        this.newContract.concludedAt = '';
        this.newContract.terminatedAt = '';
        this.newContract.payoutAccounts = [];
        this.newContract.contractor = {};
        this.newContract.contractor.bankAccount = {};
        this.newContract.contractor.bankAccount.account = '';
        this.newContract.contractor.bankAccount.bankBik = '';
        this.newContract.contractor.bankAccount.bankName = '';
        this.newContract.contractor.bankAccount.bankPostAccount = '';
        this.newContract.contractor.entity = {};
        this.newContract.contractor.entity.entityType = 'RussianLegalEntity';
        this.newContract.contractor.entity.registeredName = '';
        this.newContract.contractor.entity.registeredNumber = '';
        this.newContract.contractor.entity.inn = '';
        this.newContract.contractor.entity.actualAddress = '';
        this.newContract.contractor.entity.postAddress = '';
        this.newContract.contractor.entity.representativePosition = '';
        this.newContract.contractor.entity.representativeFullName = '';
        this.newContract.contractor.entity.representativeDocument = '';
    }

    public createContract(form: any) {
        if (form.valid) {
            this.contractService.createContract(this.newContract.contractor).then((response) => {
                this.router.navigate(['/management/contracts']);
            });
        }
    }
}
