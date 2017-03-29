import { Component } from '@angular/core';

@Component({
    selector: 'kof-sidebar',
    templateUrl: './sidebar.component.pug'
})
export class SidebarComponent {

    public isOpenedSubMenu: boolean;

    public openSubMenu() {
        this.isOpenedSubMenu = !this.isOpenedSubMenu;
    }

    public closeSubMenu() {
        this.isOpenedSubMenu = false;
    }
}
