import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    templateUrl: 'dashboard.component.pug'
})
export class DashboardComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        console.log(`обновление данных dashboard'a`);
    }

}