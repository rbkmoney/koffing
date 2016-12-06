import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ToggleMenuBroadcaster } from '../../../broadcaster/broadcaster.module';

@Component({
    selector: 'kof-app',
    templateUrl: './container.component.pug',
    encapsulation: ViewEncapsulation.None
})
export class ContainerComponent implements OnInit {

    public isMenuOpened: boolean;

    private localStorageMenuOpened: string = 'isMenuOpened';

    constructor(
        private toggleMenuBroadcaster: ToggleMenuBroadcaster
    ) { }

    public ngOnInit() {
        this.isMenuOpened = !!localStorage.getItem(this.localStorageMenuOpened);
        this.registerToggleMenuBroadcast();
    }

    private registerToggleMenuBroadcast() {
        this.toggleMenuBroadcaster.on().subscribe(() => {
            this.isMenuOpened = !this.isMenuOpened;
            this.saveMenuState(this.isMenuOpened);
        });
    }

    private saveMenuState(isMenuOpened: boolean) {
        if (isMenuOpened) {
            localStorage.setItem(this.localStorageMenuOpened, 'true');
        } else {
            localStorage.removeItem(this.localStorageMenuOpened);
        }
    }
}
