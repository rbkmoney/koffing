import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
    templateUrl: 'management.component.pug'
})
export class ManagementComponent implements OnInit, OnDestroy {

    public isFullViewMode: boolean = false;
    private fullViewModeUrls: string[] = ['/management', '/management/shops', '/management/contracts'];
    private subscription: Subscription;

    constructor(
        private router: Router,
    ) { }

    public ngOnInit() {
        this.subscription = this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                this.isFullViewMode = Boolean(_.find(this.fullViewModeUrls, (o) => o === event.url));
            }
        });
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
