import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

import { WizardArgs } from 'koffing/management/management.module';
import { ShopDetail } from 'koffing/backend/backend.module';
import { CallbackHandler } from 'koffing/backend/classes/callback-handler.class';
import { CreateShopArgs } from 'koffing/backend/classes/create-shop-args.class';

@Component({
    selector: 'kof-selection-shop-fields',
    templateUrl: 'selection-shop-fields.component.pug'
})
export class SelectionShopComponent implements OnInit {

    @Input()
    public showFinishButton: boolean = false;
    @Output()
    public steppedForward = new EventEmitter();
    @Output()
    public steppedBackward = new EventEmitter();
    public isShopFieldsReady: boolean = false;

    @Input()
    public contractId: number;
    @Input()
    public payoutToolId: number;

    @Input()
    private args: WizardArgs;

    private createShopArgs: CreateShopArgs;

    public createNewShopFieldsInstance() {
        this.args.creatingShop.details = new ShopDetail();
        this.args.creatingShop.categoryID = null;
        this.args.creatingShop.callbackHandler = new CallbackHandler();
    }

    public ngOnInit() {
        this.isShopFieldsReady = false;
        this.createNewShopFieldsInstance();
    }

    public shopFieldsReady(params: any) {
        this.isShopFieldsReady = true;
        this.showFinishButton = true;
        this.createShopArgs = new CreateShopArgs();
        this.createShopArgs.contractID = this.contractId;
        this.createShopArgs.payoutToolID = this.payoutToolId;
        this.createShopArgs.categoryID = params.categoryId;
        this.createShopArgs.callbackUrl = params.callbackUrl;
        this.createShopArgs.details = params.shopDetail;
    }

    public stepForward() {
        this.steppedForward.emit(this.createShopArgs);
    }

    public stepBackward() {
        this.steppedBackward.emit();
    }
}
