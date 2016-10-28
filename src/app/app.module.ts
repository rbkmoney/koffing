import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { RootComponent } from './components/root/root.component.ts';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopPanelComponent } from './components/top-panel/top-panel.component.ts';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        RootComponent,
        SidebarComponent,
        TopPanelComponent
    ],
    bootstrap: [ RootComponent ]
})

export class AppModule { }
