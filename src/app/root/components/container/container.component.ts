import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ToggleMenuBroadcaster } from 'kof-modules/broadcaster/broadcaster.module';

@Component({
    selector: 'kof-app',
    templateUrl: './container.component.pug',
    encapsulation: ViewEncapsulation.None
})
export class ContainerComponent implements OnInit {

    public isMenuOpened: boolean = false;

    constructor(
        private toggleMenuBroadcaster: ToggleMenuBroadcaster
    ) { }

    public ngOnInit() {
        this.registerToggleMenuBroadcast();
    }

    private registerToggleMenuBroadcast() {
        this.toggleMenuBroadcaster.on().subscribe(() => {
            this.isMenuOpened = !this.isMenuOpened;
        });
    }
}
