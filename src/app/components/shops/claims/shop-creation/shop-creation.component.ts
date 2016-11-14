import { Component, Input, OnInit } from '@angular/core';

import { ShopCreation } from './../../../../services/claim/claim';

@Component({
    selector: 'shop-creation',
    templateUrl: './shop-creation.component.pug',
    styleUrls: ['./shop-creation.component.css']
})

export class ShopCreationComponent implements OnInit{
    @Input() changeset: ShopCreation;

    ngOnInit(): void {
        debugger;
    }
}