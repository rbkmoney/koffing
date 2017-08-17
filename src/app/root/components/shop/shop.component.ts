import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { find } from 'lodash';

import { ToggleMenuBroadcaster } from 'koffing/broadcaster/services/toggle-menu-broadcaster.service';
import { SidebarStateService } from './sidebar-state.service';

@Component({
    templateUrl: 'shop.component.pug'
})
export class ShopComponent implements OnInit {

    public isSidebarOpened: boolean;
    public isSidebarDisabled: boolean;

    constructor(
        private router: Router,
        private toggleMenuBroadcaster: ToggleMenuBroadcaster
    ) {}

    public ngOnInit() {
        this.isSidebarOpened = SidebarStateService.isOpened();
        this.registerToggleMenuBroadcast();
        this.router.events.subscribe((navigation) => {
            if (navigation instanceof NavigationEnd) {
                const urlParts = navigation.url.split('/');
                this.isSidebarDisabled = Boolean(find(urlParts, (i) => i === 'account'));
            }
        });
    }

    private registerToggleMenuBroadcast() {
        this.toggleMenuBroadcaster.on().subscribe(() => {
            SidebarStateService.toggleState();
            this.isSidebarOpened = SidebarStateService.isOpened();
        });
    }
}
