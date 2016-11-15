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
        // noinspection TypeScriptUnresolvedFunction
        this.router.routerState.parent(this.route).params.subscribe((params: any) => {
            this.shopID = params['shopID'];
        });
    }
}
