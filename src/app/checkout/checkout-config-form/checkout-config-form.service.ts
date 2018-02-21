import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HOLD_EXPIRATION } from 'koffing/backend/constants/hold-expiration';
import { PaymentMethod } from 'koffing/backend';

@Injectable()
export class CheckoutConfigFormService {

    public form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    public initForm(methods: any): FormGroup {
        let availableMethods = {};
        if (methods) {
            availableMethods = methods.reduce((acc: {}, current: PaymentMethod) => {
                switch (current.method) {
                    case 'DigitalWallet':
                        return {...acc, wallets: false};
                    case 'PaymentTerminal':
                        return {...acc, terminals: false};
                }
            }, {});
        }
        return this.fb.group({
            name: ['', [Validators.maxLength(30)]],
            description: [''],
            email: [''],
            redirectUrl: [''],
            paymentFlowHold: [false, [Validators.required]],
            holdExpiration: [HOLD_EXPIRATION.cancel, [Validators.required]],
            ...availableMethods
        });
    }
}
