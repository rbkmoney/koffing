import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class InitCreateShopService {

    public createForm: FormGroup = this.initForm();

    constructor(
        private fb: FormBuilder,
    ) {}

    public initForm(): FormGroup {
        return this.fb.group({
            entityType: ['', [
                Validators.required,
            ]]
        });
    }

}
