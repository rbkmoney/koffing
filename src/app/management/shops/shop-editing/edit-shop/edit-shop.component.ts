import { Component, OnInit, Input, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';
import * as _ from 'lodash';

import { HttpCategoryService } from 'koffing/backend/backend.module';
import { Shop } from 'koffing/backend/backend.module';
import { Contract } from 'koffing/backend/backend.module';
import { PayoutTool } from 'koffing/backend/backend.module';
import { HttpContractService } from 'koffing/backend/backend.module';
import { Category } from 'koffing/backend/backend.module';
import { ShopDetails } from 'koffing/backend/backend.module';
import { ShopLocationUrl } from 'koffing/backend/backend.module';
import { SelectItem } from 'koffing/common/common.module';
import { ShopEditingTransfer } from './shop-editing-transfer.class';
import { NgForm } from '@angular/forms';
import { ShopParams } from 'koffing/backend/classes/shop-params.class';

@Component({
    selector: 'kof-edit-shop',
    templateUrl: 'edit-shop.component.pug',
})
export class EditShopComponent implements OnInit, AfterViewInit {

    @Input()
    public shop: Shop;
    @Input()
    public defaultShopChanges: ShopParams;
    public shopEditing: ShopParams;
    public selectedContract: Contract;
    public selectedPayoutTool: PayoutTool;
    public contracts: Contract[] = [];
    public payoutTools: PayoutTool[] = [];
    @Output()
    public onChange = new EventEmitter();
    @ViewChild('form')
    public form: NgForm;

    public contractItems: SelectItem[] = [];
    public payoutToolItems: SelectItem[] = [];
    public categoryItems: SelectItem[] = [];

    public isLoading: boolean = false;

    constructor(
        private httpCategoryService: HttpCategoryService,
        private httpContractService: HttpContractService
    ) { }

    public ngOnInit() {
        this.isLoading = true;
        Promise.all([
            this.loadCategories(),
            this.loadShopContracts(),
            this.loadShopPayoutTools(this.shop.contractID)
        ]).then(() => {
            this.isLoading = false;
            this.shopEditing = this.getInstance(this.shop.details);
        });
    }

    public ngAfterViewInit() {
        this.form.statusChanges.subscribe((data) => {
            this.onFormStatusChanges(data);
        });
    }

    public onFormStatusChanges(formStatus: string) {
        this.emitData();
    }

    public emitData() {
        const transfer = new ShopEditingTransfer(this.shopEditing, this.form.valid, this.form.dirty);
        this.onChange.emit(transfer);
    }

    public onFieldChange(path: string, value: any) {
        if (_.startsWith(path, 'details')) {
            this.shopEditing.details = this.shop.details;
        }
        if (_.startsWith(path, 'details.location')) {
            this.shopEditing.details.location = new ShopLocationUrl();
        }
        _.set(this.shopEditing, path, value);
    }

    public loadCategories(): Promise<Category[]> {
        return new Promise((resolve) => {
            this.httpCategoryService.getCategories().then((categories: Category[]) => {
                this.categoryItems = _.map(categories, (category) => new SelectItem(category.categoryID, category.name));
                resolve(categories);
            });
        });
    }

    public loadShopContracts(): Promise<Contract[]> {
        return new Promise((resolve) => {
            this.httpContractService.getContracts().then((contracts: Contract[]) => {
                this.contracts = contracts;
                this.selectedContract = this.findContract(this.shop.contractID);
                this.contractItems = _.map(contracts, (contract) => new SelectItem(contract.id, contract.id));
                resolve(contracts);
            });
        });
    }

    public loadShopPayoutTools(contractID: string): Promise<PayoutTool[]> {
        return new Promise((resolve) => {
            this.httpContractService.getPayoutTools(contractID).then((payoutTools: PayoutTool[]) => {
                this.payoutTools = payoutTools;
                this.payoutToolItems = _.map(payoutTools, (payoutTool) => new SelectItem(payoutTool.id, payoutTool.id));
                this.selectedPayoutTool = payoutTools[0];
                resolve(payoutTools);
            });
        });
    }

    public onSelectContract(contractID: string) {
        const id = String(contractID);
        this.shopEditing.contractID = id;
        this.selectedContract = this.findContract(id);
        this.shopEditing.payoutToolID = undefined;
        this.loadShopPayoutTools(id).then(payoutTools => {
            if (payoutTools.length) {
                this.shopEditing.payoutToolID = String(payoutTools[0].id);
            }
        });
    }

    public onSelectPayoutTool(payoutToolID: string) {
        const id = String(payoutToolID);
        this.shopEditing.payoutToolID = id;
        this.selectedPayoutTool = this.findPayoutTool(id);
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    public onSelectCategory(categoryID: string) {
        this.shopEditing.categoryID = _.toNumber(categoryID);
    }

    private findPayoutTool(payoutToolID: any) {
        return _.find(this.payoutTools, (payoutTool) => payoutTool.id === payoutToolID);
    }

    private findContract(contractID: any): Contract {
        return _.find(this.contracts, (contract) => contract.id === contractID);
    }

    private getInstance(details: ShopDetails): ShopParams {
        const instance = new ShopParams();
        instance.details = details;
        if (this.defaultShopChanges) {
            instance.update(this.defaultShopChanges);
        }
        return instance;
    }
}
