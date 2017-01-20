import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { WizardArgs } from 'koffing/management/management.module';
import { ShopService } from 'koffing/backend/services/shop.service';
import {ShopArgs} from "koffing/management/classes/shop-args.class";
import {ShopDetails} from "koffing/management/classes/shop-details.class";
import {SelectItem} from "koffing/common/components/select/select.class";
import {CategoryService} from "koffing/backend/services/category.service";
import {Category} from "koffing/backend/classes/category.class";


@Component({
    selector: 'kof-wizard-step-three',
    templateUrl: './wizard-step-three.component.pug'
})
export class WizardStepThreeComponent implements OnInit {

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

    public ngOnInit() {
        delete this.wizardArgs.shopFields;
        this.isShopFieldsReady = false;
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
