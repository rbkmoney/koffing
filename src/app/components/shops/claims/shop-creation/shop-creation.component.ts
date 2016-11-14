import { Component, Input, OnInit } from '@angular/core';

import { ShopCreation } from './../../../../services/claim/claim';

@Component({
    selector: 'shop-creation',
    templateUrl: './shop-creation.component.pug',
    styleUrls: ['./shop-creation.component.css']
})

export class ShopCreationComponent implements OnInit{
    @Input() changeset: ShopCreation;

    public showPanel: boolean = false;
    public shop: any;

    ngOnInit(): void {
        this.shop = this.changeset.shop;
    }
    show(): void {
        this.showPanel = !this.showPanel;
    }
}