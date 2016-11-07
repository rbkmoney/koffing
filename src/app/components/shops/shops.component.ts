import { Component } from '@angular/core';

@Component({
    selector: 'shops',
    templateUrl: './shops.component.pug',
    styleUrls: ['./shops.component.css']
})

export class ShopsComponent {
    public shops: any[] = [];
}