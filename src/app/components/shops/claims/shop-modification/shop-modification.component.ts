import { Component, Input, OnInit } from '@angular/core';

import { ShopModification } from './../../../../services/claim/claim';

@Component({
    selector: 'shop-modification',
    templateUrl: './shop-modification.component.pug',
    styleUrls: ['./shop-modification.component.css']
})

export class ShopModificationComponent implements OnInit{
    @Input() changeset: ShopModification;

    public showPanel: boolean = false;
    public isModification: boolean = false;
    public details: any;

    ngOnInit(): void {
        this.details = this.changeset.details.details;
        this.isModification = this.changeset.details.modificationType === 'ShopModification';
    }
    show(): void {
        this.showPanel = !this.showPanel;
    }
}