import { Component } from '@angular/core';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.pug',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    public isActive(path: string): boolean {
        if (path == '/analytics') {
            return true;
        } else {
            return false;
        }
    }
}