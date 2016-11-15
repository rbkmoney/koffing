import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    templateUrl: 'finance.component.pug'
})
export class FinanceComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        console.log(`обновление данных finance`);
    }

}