import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

import { WizardArgs } from 'koffing/management/management.module';
import { Shop } from 'koffing/backend/backend.module';
import { ShopDetail } from 'koffing/backend/backend.module';
import { CallbackHandler } from 'koffing/backend/classes/callback-handler.class';

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
    private args: WizardArgs;

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
        this.isShopFieldsReady = params.valid;
    }

    public stepForward() {
        this.steppedForward.emit();
    }

    public stepBackward() {
        this.steppedBackward.emit();
    }
}
