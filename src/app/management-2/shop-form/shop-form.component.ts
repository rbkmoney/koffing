import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'kof-shop-group',
    templateUrl: 'shop-form.component.pug'
})
export class ShopGroupComponent {

    @Input()
    public form: FormGroup;

}
