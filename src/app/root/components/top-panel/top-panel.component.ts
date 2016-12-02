import { Component } from '@angular/core';

import { AuthService } from '../../../auth/services/auth.service';
import { ToggleMenuBroadcaster } from '../../../common/classes/broadcaster/toggle-menu-broadcaster.class';

@Component({
    selector: 'kof-top-panel',
    templateUrl: './top-panel.component.pug',
    providers: [ToggleMenuBroadcaster]
})
export class TopPanelComponent {

    public profileName: string = AuthService.getAccountInfo().profileName;

    constructor(private toggleMenuEvent: ToggleMenuBroadcaster) { }

    public logout() {
        AuthService.logout();
    }

    public toggleMenu() {
        this.toggleMenuEvent.fire();
    }
}
