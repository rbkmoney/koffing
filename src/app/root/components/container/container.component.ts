import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ToggleMenuBroadcaster } from 'kof-modules/broadcaster/broadcaster.module';
import { SidebarStateService } from './sidebarState.service';
import { LOADING_BAR_OPTIONS } from './slim-loading-bar-options.const';

@Component({
    selector: 'kof-app',
    templateUrl: './container.component.pug',
    encapsulation: ViewEncapsulation.None
})
export class ContainerComponent implements OnInit {

    public isSidebarOpened: boolean;

    public loadingBarColor: string = LOADING_BAR_OPTIONS.COLOR;

    constructor(
        private toggleMenuBroadcaster: ToggleMenuBroadcaster
    ) { }

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
