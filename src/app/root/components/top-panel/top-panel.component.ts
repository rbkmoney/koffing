import { Component } from '@angular/core';

import { AuthService } from '../../../auth/services/auth.service';
import { ToggleMenuEvent } from '../../../backend/broadcasters/toggle-menu.broadcaster';

@Component({
    selector: 'kof-top-panel',
    templateUrl: './top-panel.component.pug',
    providers: [ToggleMenuEvent]
})
export class TopPanelComponent {

    public profileName: string = AuthService.getAccountInfo().profileName;

    constructor(private toggleMenuEvent: ToggleMenuEvent) { }

    public logout() {
        AuthService.logout();
    }

    public toggleMenu() {
        this.toggleMenuEvent.fire();
    }
}
