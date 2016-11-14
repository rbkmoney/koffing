import { Component, Input, OnInit } from '@angular/core';

import { ShopModification } from './../../../../services/claim/claim';

@Component({
    selector: 'shop-modification',
    templateUrl: './shop-modification.component.pug',
    styleUrls: ['./shop-modification.component.css']
})

export class ShopModificationComponent implements OnInit{
    @Input() changeset: ShopModification;

    ngOnInit(): void {

    }
}