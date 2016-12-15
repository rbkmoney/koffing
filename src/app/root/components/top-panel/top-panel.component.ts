import { Component } from '@angular/core';

import { AuthService } from 'kof-modules/auth/auth.module';
import { ToggleMenuBroadcaster } from 'kof-modules/broadcaster/broadcaster.module';

@Component({
    selector: 'kof-top-panel',
    templateUrl: './top-panel.component.pug'
})
export class TopPanelComponent {

    public profileName: string = AuthService.getAccountInfo().profileName;

    constructor(
        private toggleMenuBroadcaster: ToggleMenuBroadcaster
    ) { }

    public logout() {
        AuthService.logout();
    }

    public toggleMenu() {
        this.toggleMenuBroadcaster.fire();
    }
}
