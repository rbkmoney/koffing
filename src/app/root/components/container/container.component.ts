import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ToggleMenuBroadcaster } from '../../../common/classes/broadcaster/toggle-menu-broadcaster.class';

@Component({
    selector: 'kof-app',
    templateUrl: './container.component.pug',
    encapsulation: ViewEncapsulation.None,
    providers: [ToggleMenuBroadcaster]
})
export class ContainerComponent implements OnInit {

    public isMenuOpened: boolean = false;

    constructor(
        private toggleMenuEvent: ToggleMenuBroadcaster
    ) { }

    public ngOnInit() {
        this.registerToggleMenuBroadcast();
    }

    private registerToggleMenuBroadcast() {
        this.toggleMenuEvent.on().subscribe(() => {
            this.isMenuOpened = !this.isMenuOpened;
        });
    }
}
