import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SelectItem } from 'koffing/common/select/select-item';
import { CostType } from 'koffing/backend/constants/invoice-template-cost-type';

@Component({
    selector: 'kof-invoice-template-form',
    templateUrl: './invoice-template-form.component.pug',
    styleUrls: ['./invoice-template-form.component.less']
})
export class InvoiceTemplateFormComponent implements OnInit {

    @Input()
    public form: FormGroup;

    public costTypesItems: SelectItem[];

    public ngOnInit() {
        this.costTypesItems = [
            new SelectItem(CostType.unlim, 'Без ограничений'),
            new SelectItem(CostType.fixed, 'Фиксированная'),
            new SelectItem(CostType.range, 'Диапазон')
        ];
    }

    public isSelected(costType: string): boolean {
        return this.form.value.selectedCostType === costType;
    }
}
