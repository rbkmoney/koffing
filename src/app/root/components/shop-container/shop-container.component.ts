import { Component, OnInit } from '@angular/core';

import { ToggleMenuBroadcaster } from 'koffing/broadcaster/services/toggle-menu-broadcaster.service';
import { SidebarStateService } from './sidebar-state.service';

@Component({
    templateUrl: 'shop-container.component.pug'
})
export class ShopContainerComponent implements OnInit {

    public isSidebarOpened: boolean;

    constructor(
        private toggleMenuBroadcaster: ToggleMenuBroadcaster
    ) {}

    public ngOnInit() {
        this.isSidebarOpened = SidebarStateService.isOpened();
        this.registerToggleMenuBroadcast();
    }

    private registerToggleMenuBroadcast() {
        this.toggleMenuBroadcaster.on().subscribe(() => {
            SidebarStateService.toggleState();
            this.isSidebarOpened = SidebarStateService.isOpened();
        });
    }
}
