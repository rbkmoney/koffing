import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class InvoiceTemplateFormService {

    public form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.initForm();
        this.form.valueChanges.subscribe((change) => this.setCostGroup(change));
    }

    private initForm(): FormGroup {
        return this.fb.group({
            product: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            description: ['', [Validators.maxLength(1000)]],
            selectedCostType: '',
            cost: this.getEmptyGroup(),
            lifetime: this.fb.group({
                days: ['', Validators.min(0)],
                months: ['', Validators.min(0)],
                years: ['', Validators.min(0)]
            })
        });
    }

    private setCostGroup(change: any) {
        if (change.selectedCostType === 'InvoiceTemplateCostFixed' && !this.hasCostType('InvoiceTemplateCostFixed')) {
            this.form.setControl('cost', this.getFixedGroup());
        } else if (change.selectedCostType === 'InvoiceTemplateCostRange' && !this.hasCostType('InvoiceTemplateCostRange')) {
            this.form.setControl('cost', this.getRangedGroup());
        } else if (change.selectedCostType === '' && !this.hasCostType('')) {
            this.form.setControl('cost', this.getEmptyGroup());
        }
    }

    private hasCostType(type: string): boolean {
        return this.form.value.cost.costType === type;
    }

    private getEmptyGroup(): FormGroup {
        return this.fb.group({
            costType: ''
        });
    }

    private getFixedGroup(): FormGroup {
        return this.fb.group({
            costType: 'InvoiceTemplateCostFixed',
            amount: ['', [Validators.required, Validators.min(10)]]
        });
    }

    private getRangedGroup(): FormGroup {
        return this.fb.group({
            costType: 'InvoiceTemplateCostRange',
            lowerBound: ['', [Validators.required, Validators.min(10)]],
            upperBound: ['', [Validators.required, Validators.min(10)]]
        });
    }
}
