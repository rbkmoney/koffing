import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

import { WizardArgs } from 'koffing/management/management.module';
import { ShopArgs } from 'koffing/management/classes/shop-args.class';
import { ShopDetails } from 'koffing/management/classes/shop-details.class';

@Component({
    selector: 'kof-step3-shop',
    templateUrl: 'step3-shop.component.pug'
})
export class Step3ShopComponent implements OnInit {

    @Output()
    public steppedForward = new EventEmitter();
    @Output()
    public steppedBackward = new EventEmitter();
    public isShopFieldsReady: boolean = false;

    @Input()
    private wizardArgs: WizardArgs;

    public createNewShopFieldsInstance() {
        this.wizardArgs.shopFields = new ShopArgs();
        this.wizardArgs.shopFields.shopDetails = new ShopDetails();
        this.wizardArgs.shopFields.categoryRef = null;
    }

    public removeShopFieldsInstance() {
        delete this.wizardArgs.shopFields;
        this.isShopFieldsReady = false;
    }

    public ngOnInit() {
        this.removeShopFieldsInstance();
        this.createNewShopFieldsInstance();
    }

    public shopFieldsReady(params: any) {
        this.isShopFieldsReady = params.valid;
    }

    public finalizeWizard() {
        this.steppedForward.emit();
    }

    public stepBackward() {
        this.steppedBackward.emit();
    }
}
