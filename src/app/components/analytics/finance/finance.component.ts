import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    templateUrl: 'finance.component.pug'
})
export class FinanceComponent implements OnInit {

    private shopID: string;

    constructor(
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.shopID = this.route.parent.snapshot.params['shopID'];
    }
}
