import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class ShopFormService {

    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) { }

    public initForm(): FormGroup {
        return this.fb.group({
            url: ['', [
                Validators.required,
                Validators.maxLength(1000)
            ]],
            name: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            description: ['', [
                Validators.maxLength(1000)
            ]]
        });
    }
}
