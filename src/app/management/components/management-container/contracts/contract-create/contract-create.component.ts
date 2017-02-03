import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ContractService } from 'koffing/backend/services/contract.service';
import { Contract } from 'koffing/backend/classes/contract.class';
import { RussianLegalEntity } from 'koffing/backend/classes/russian-legal-entity.class';

@Component({
    selector: 'kof-contract-create',
    templateUrl: 'contract-create.component.pug'
})
export class ContractCreateComponent implements OnInit {

    public shopEditID: number = Number(this.route.snapshot.params['shopID']);
    public newContract: Contract;
    public isLoading: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private contractService: ContractService
    ) {}

    public ngOnInit() {
        this.newContract = new Contract();
        this.newContract.contractor.legalEntity = new RussianLegalEntity();
    }

    public createContract(form: any) {
        if (form.valid) {
            this.isLoading = true;
            this.contractService.createContract(this.newContract.contractor).then(() => {
                this.isLoading = false;
                this.navigateBack();
            });
        }
    }

    public navigateBack() {
        if (this.shopEditID) {
            this.router.navigate(['/shops', this.shopEditID, 'edit']);
        } else {
            this.router.navigate(['/management/contracts']);
        }
    }
}
