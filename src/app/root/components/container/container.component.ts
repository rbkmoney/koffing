import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Broadcaster } from '../../../backend/broadcasters/broadcaster';
import { ToggleMenuEvent } from '../../../backend/broadcasters/toggle-menu.broadcaster';

@Component({
    selector: 'kof-app',
    templateUrl: './container.component.pug',
    encapsulation: ViewEncapsulation.None,
    providers: [Broadcaster, ToggleMenuEvent]
})
export class ContainerComponent implements OnInit {

    public isMenuOpened: boolean = false;

    constructor(
        private toggleMenuEvent: ToggleMenuEvent
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
