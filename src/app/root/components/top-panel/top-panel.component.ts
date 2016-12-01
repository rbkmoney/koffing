import { Component } from '@angular/core';

import { AuthService } from '../../../auth/services/auth.service';

@Component({
    selector: 'kof-top-panel',
    templateUrl: './top-panel.component.pug',
})
export class TopPanelComponent {

    public profileName: string = AuthService.getAccountInfo().profileName;

    public logout() {
        AuthService.logout();
    }
}
