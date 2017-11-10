import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HoldExpiration } from 'koffing/backend/constants/hold-expiration';

@Injectable()
export class CheckoutConfigFormService {

    public form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.initForm();
    }

    private initForm(): FormGroup {
        return this.fb.group({
            name: ['', [Validators.maxLength(30)]],
            description: ['', [Validators.maxLength(30)]],
            payButtonLabel: ['', [Validators.maxLength(30)]],
            logo: [''],
            email: [''],
            redirectUrl: [''],
            paymentFlowHold: [false, [Validators.required] ],
            holdExpiration: [HoldExpiration.cancel, [Validators.required]],
            terminals: false
        });
    }
}
