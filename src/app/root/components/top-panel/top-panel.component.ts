import { Component } from '@angular/core';

import { AuthService } from 'koffing/auth/auth.module';
import { ToggleMenuBroadcaster } from 'koffing/broadcaster/broadcaster.module';

@Component({
    selector: 'kof-top-panel',
    templateUrl: './top-panel.component.pug',
    styleUrls: [`.dropdown-toggle { cursor: pointer; }`]
})
export class TopPanelComponent {

    public profileName: string = AuthService.getAccountInfo().profileName;
    public mailHref: string = this.generateMailHref();

    constructor(
        private toggleMenuBroadcaster: ToggleMenuBroadcaster
    ) { }

    public logout() {
        AuthService.logout();
    }

    public toggleMenu() {
        this.toggleMenuBroadcaster.fire();
    }

    private generateMailHref() {
        const email = 'test@example.com';
        const subject = 'Проблема с использованием личного кабинета';
        const body = `Опишите свою проблему\n\n\n--------------------\nEmail, на который зарегистрирован личный кабинет: ${AuthService.getAccountInfo().email}`;
        return `mailto:${email}?subject=${encodeURI(subject)}&body=${encodeURI(body)}`;
    }
}
