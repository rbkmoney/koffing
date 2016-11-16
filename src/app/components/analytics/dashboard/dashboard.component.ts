import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    templateUrl: 'dashboard.component.pug'
})
export class DashboardComponent implements OnInit {

    private shopID: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.shopID = this.route.parent.snapshot.params['shopID'];
    }
}
