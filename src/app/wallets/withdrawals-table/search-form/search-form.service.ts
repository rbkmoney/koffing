import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mapValues, isEqual, chain, keys, difference } from 'lodash';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';

@Injectable()
export class SearchFormService {

    public searchForm: FormGroup;

    private shopID: string;
    private urlDateFormat = 'YYYY-MM-DD';
    private defaultValues = {
        createdAtFrom: moment().subtract(1, 'month').startOf('day').toDate(),
        createdAtTo: moment().endOf('day').toDate(),
    };
    private mainSearchFields = ['walletID', 'identityID', 'status'];

    constructor(private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute) {
        this.searchForm = this.initForm();
        this.route.parent.params.subscribe((params) => {
            this.shopID = params['shopID'];
        });
        this.route.queryParams.subscribe((queryParams) => this.updateFormValue(queryParams));
        this.searchForm.valueChanges.subscribe((values) => this.updateQueryParams(values));
    }

    public hasFormAdditionalParams(): boolean {
        const formFields = chain(this.searchForm.getRawValue())
            .map((value: string, key: string) => isEqual(value, '') ? null : key)
            .filter((mapped) => mapped !== null && mapped !== 'limit')
            .value();
        const defaultFields = keys(this.defaultValues);
        return difference(formFields, defaultFields, this.mainSearchFields).length > 0;
    }

    public reset() {
        this.searchForm.reset(this.defaultValues);
    }

    private updateFormValue(queryParams: Params) {
        if (isEqual(queryParams, {})) {
            this.updateQueryParams(this.defaultValues);
        } else {
            this.searchForm.patchValue(this.queryParamsToFormValue(queryParams));
        }
    }

    private updateQueryParams(value: any) {
        const queryParams = this.formValueToQueryParams(value);
        this.router.navigate(['shop', this.shopID, 'wallets'], {queryParams});
    }

    private initForm(): FormGroup {
        return this.fb.group({
            walletID: '',
            identityID: '',
            destinationID: '',
            status: '',
            createdAtFrom: '',
            createdAtTo: '',
            amountFrom: '',
            amountTo: '',
            currencyID: '',
            continuationToken: '',
            limit: [1000, Validators.required]
        });
    }

    private formValueToQueryParams(formValue: any): Params {
        const mapped = mapValues(formValue, (value) => isEqual(value, '') ? null : value);
        return {
            ...mapped,
            createdAtFrom: moment(formValue.createdAtFrom).format(this.urlDateFormat),
            createdAtTo: moment(formValue.createdAtTo).format(this.urlDateFormat),
        };
    }

    private queryParamsToFormValue(params: Params): any {
        return {
            ...params,
            createdAtFrom: moment(params.createdAtFrom).startOf('day').toDate(),
            createdAtTo: moment(params.createdAtTo).endOf('day').toDate()
        };
    }
}
