import { Component, OnInit } from '@angular/core';
import { BreadcrumbBroadcaster } from 'koffing/broadcaster';
import { LegalEntityTypeEnum } from 'koffing/backend/model/contract/contractor/legal-entity-type-enum';
import { InitCreateShopService } from 'koffing/management/init-create-shop/init-create-shop.service';
import { FormGroup } from '@angular/forms';
import { SelectItem } from 'koffing/common/select/select-item';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'init-create-shop.component.pug',
    providers: [InitCreateShopService]
})
export class InitCreateShopComponent implements OnInit {

    public types: SelectItem[] = [
        {value: LegalEntityTypeEnum.RussianLegalEntity, label: 'Резидент РФ'},
        {value: LegalEntityTypeEnum.InternationalLegalEntity, label: 'Неризедент РФ'}
    ];
    public form: FormGroup;

    constructor(
        private breadcrumbBroadcaster: BreadcrumbBroadcaster,
        private initCreateShopService: InitCreateShopService,
        private router: Router
    ) { }

    public ngOnInit() {
        this.form = this.initCreateShopService.createForm;
        this.breadcrumbBroadcaster.fire([{label: 'Создание магазина'}]);
    }

    public next() {
        switch (this.form.value.entityType) {
            case LegalEntityTypeEnum.RussianLegalEntity:
                this.router.navigate(['/shop/create/resident'])
                break;
            case LegalEntityTypeEnum.InternationalLegalEntity:
                this.router.navigate(['/shop/create/nonresident'])
                break;
        }
    }
}
